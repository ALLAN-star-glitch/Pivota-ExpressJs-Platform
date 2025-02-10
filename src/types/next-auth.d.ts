import NextAuth from "next-auth";

// Extend the NextAuth types
declare module "next-auth" {
  interface User {
    firstName: string;
    roles: string[];  // Store multiple roles
    plan: string;     // Plan of the user
    image: string;    // Image URL
  }

  interface Session {
    user: User & {
      firstName: string;
      roles: string[];
      plan: string;
      image: string;
    };
    token: JWT; // Add token information
  }

  interface JWT {
    roles: string[];    // Store roles in JWT token
    plan: string;       // Add plan field in JWT
    firstName: string;  // Add firstName field in JWT
    image: string;      // Add image field in JWT
  }
}
