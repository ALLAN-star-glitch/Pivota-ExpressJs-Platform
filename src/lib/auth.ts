import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { NextAuthOptions } from "next-auth";


// Define roles that can access the app
const allowedRoles = ["superAdmin", "admin", "employer", "serviceProvider", "landLord"];


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
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
        });

        if (!existingUser) {
          throw new Error("No user found with this email.");
        }

        // Check if password matches
        const passwordMatch = await compare(credentials.password, existingUser.password);
        if (!passwordMatch) {
          throw new Error("Invalid password.");
        }

        // Check if the user's role is allowed to log in
        if (!allowedRoles.includes(existingUser.role)) {
          throw new Error("You do not have permission to access this application.");
        }

        // Return the user object with role
        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email,
          firstName: existingUser.firstName,
          role: existingUser.role, // Include role from the database
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Include user data and role in the JWT token
        return {
          ...token,
          username: user.username,
          firstName: user.firstName,
          role: user.role, // Save role in JWT token
        };
      }
      return token;
    },

    async session({ session, token }) {
      // Include role in session
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          firstName: token.firstName,
          role: token.role, // Include role in session
        },
      };
    },
  },
};
