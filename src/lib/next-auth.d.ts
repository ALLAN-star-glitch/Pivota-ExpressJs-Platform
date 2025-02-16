import { User as NextAuthUser } from "next-auth";
import { Session } from "next-auth";
import "next-auth";

declare module "next-auth" {
  // Extend the NextAuth user object with custom fields
  interface User {
    accessToken: string;
    refreshToken: string; // Add refreshToken here
    firstName: string;
    roles: string[];
    plan: string;
  }

  // Extend the session object to include the refreshToken and other custom properties
  interface Session {
    user: User;
  }
}
