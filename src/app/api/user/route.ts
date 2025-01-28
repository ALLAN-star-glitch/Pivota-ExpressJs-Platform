import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

// Define the Zod schema for user input validation
const userSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Confirm password is required" }), // Ensure confirm password is at least 8 chars
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
});

export async function POST(req: Request) {
  try {
    // Parse and validate the incoming request body using Zod
    const body = await req.json();
    const parsedData = userSchema.safeParse(body);

    if (!parsedData.success) {
      // If validation fails, return a 400 response with the validation errors
      return NextResponse.json(
        {
          user: null,
          message: "Validation failed",
          errors: parsedData.error.errors,
        },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, username, password, confirmPassword, phone } = parsedData.data;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          user: null,
          message: "Passwords do not match",
        },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this email already exists",
        },
        { status: 409 }
      );
    }

    // Check if username already exists
    const existingUserByUsername = await db.user.findUnique({
      where: { username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this username already exists",
        },
        { status: 409 }
      );
    }

    //Check if phone number already exists
    const existingPhoneNumber = await db.user.findUnique({
      where: {phone},
    });
    if(existingPhoneNumber){
      return NextResponse.json(
        {
          user: null, 
          message: "User with this phone already exists",
        },
        {
          status: 409
        },
      )
    }

    

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user
    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword, // Store the hashed password
        phone,
      },
    });

    return NextResponse.json(
      { user: newUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { user: null, message: "Error creating user" },
      { status: 500 }
    );
  }
}
