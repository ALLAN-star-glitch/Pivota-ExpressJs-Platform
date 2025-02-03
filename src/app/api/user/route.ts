import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import { db } from "@/lib/db"; // Assuming you are using a Prisma database

// Define the Zod schema for user input validation
const userSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email format." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string().min(8, { message: "Confirm password is required." }),
  phone: z
    .string()
    .regex(/^\d{10,15}$/, { message: "Check your number and try again. It must be 10-15 digits with no spaces or symbols." }),
  plan: z.enum(["free", "bronze", "silver", "gold"], { message: "Invalid plan selected." }),
  roles: z.array(z.string()).optional(), // Roles field is optional, but should be validated if present
});

export async function POST(req: Request) {
  try {
    // Parse and validate the incoming request body using Zod
    const body = await req.json();
    const parsedData = userSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          user: null,
          message: "Validation failed. Please check your inputs.",
          errors: parsedData.error.errors, // Detailed validation errors
        },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, password, confirmPassword, phone, plan, roles } = parsedData.data;

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { user: null, message: "Passwords do not match. Please try again." },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUserByEmail = await db.user.findUnique({ where: { email } });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // Check if phone number is valid and not already taken
    const existingPhoneNumber = await db.user.findUnique({ where: { phone } });
    if (existingPhoneNumber) {
      return NextResponse.json(
        { user: null, message: "An account with this phone number already exists." },
        { status: 409 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // Define valid roles for each plan
    const rolesPerPlan = {
      free: ["user"],
      bronze: ["employer", "landlord", "serviceProvider"],
      silver: ["employer", "landlord", "serviceProvider"],
      gold: ["employer", "landlord", "serviceProvider"],
    };

    // Default roles array, all users get the "user" role by default
    let roleNames = ["user"];

    // Validate selected roles based on the plan
    if (roles) {
      const invalidRoles = roles.filter(role => !rolesPerPlan[plan]?.includes(role));
      if (invalidRoles.length > 0) {
        return NextResponse.json(
          { user: null, message: `Invalid role(s): ${invalidRoles.join(", ")}` },
          { status: 400 }
        );
      }

      // Add valid roles for this plan
      roleNames = [...roleNames, ...roles];
    }

    // Fetch role records from the database (mapping the array of strings to array of role objects)
    const roleRecords = await db.role.findMany({
      where: { name: { in: roleNames } },
    });

    // Ensure all roles exist
    if (roleRecords.length !== roleNames.length) {
      return NextResponse.json(
        { user: null, message: "One or more roles do not exist in the database. Please contact support." },
        { status: 400 }
      );
    }

    // Prepare user data
    const newUserData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      plan,
      isPremium: plan !== "free",
      roles: {
        connect: roleRecords.map((role) => ({ id: role.id })),//mapping to role objects (note that in the schema, roles are array of objects)
      },
    };

    // Create the user in the database
    const newUser = await db.user.create({ data: newUserData });

    // Log the assigned roles
    console.log(`User ${newUser.email} assigned roles: ${roleNames.join(", ")} assigned plan: ${newUser.plan}`);

    // Generate success message based on plan
    let successMessage = "Your account was created successfully.";
    if (plan === "bronze") successMessage = "Your bronze premium membership has been created successfully.";
    else if (plan === "silver") successMessage = "Your silver premium membership has been created successfully.";
    else if (plan === "gold") successMessage = "Your gold premium membership has been created successfully.";

    return NextResponse.json(
      { user: newUser, message: successMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    
    return NextResponse.json(
      { user: null, message: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
