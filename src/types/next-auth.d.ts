import NextAuth from "next-auth";

// Extend the NextAuth types
declare module "next-auth" {
  // Add the firstName, roles, and plan fields to the User interface
  interface User {
    firstName: string;
    roles: string[]; // Use an array to store multiple roles
    plan: string;    // Add the plan field to User
  }

  // Extend the Session interface to include both the user data and the plan
  interface Session {
    user: User & {
      firstName: string;
      roles: string[]; // Include roles as an array
      plan: string;    // Include plan in session
    };
    token: {
      roles: string[]; // Include roles in the token as well
      plan: string;    // Include plan in the token
    };
  }
}
