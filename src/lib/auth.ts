import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

// Define roles that can access the app
const allowedRoles = ["superAdmin", "user", "employer", "serviceProvider", "landlord"];

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // Custom sign-in page
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        // Check if user exists in the database
        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
          include: { roles: true }, // Include the roles in the query
        });

        if (!existingUser) {
          throw new Error("No user found with this email.");
        }

        // Check if password matches
        const passwordMatch = await compare(credentials.password, existingUser.password);
        if (!passwordMatch) {
          throw new Error("Invalid password.");
        }

        // Check if the user's roles include any of the allowed roles
        const userRoles = existingUser.roles; // `roles` is now an array
        const isAuthorized = userRoles.some(role => allowedRoles.includes(role.name));

        if (!isAuthorized) {
          throw new Error("You do not have permission to access this application.");
        }

        // Include the `plan` field when returning the user data
        return {
          id: `${existingUser.id}`,
          email: existingUser.email,
          firstName: existingUser.firstName,
          plan: existingUser.plan,  // Include the plan here
          roles: userRoles.map(role => role.name), // Return the roles as an array of role names
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Include user data and roles in the JWT token
        return {
          ...token,
          firstName: user.firstName,
          plan: user.plan, // Include plan in the token
          roles: user.roles, // Save roles as an array in JWT token
        };
      }
      return token;
    },

    async session({ session, token }) {
      // Include roles and plan in session
      return {
        ...session,
        user: {
          ...session.user,
          firstName: token.firstName,
          plan: token.plan,  // Include plan in session
          roles: token.roles, // Include roles in session
        },
      };
    },
  },
};
