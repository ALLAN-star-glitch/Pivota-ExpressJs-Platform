/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth from "next-auth";

// Extend the NextAuth types
declare module "next-auth" {
  // Add the username and firstName fields to the User interface
  interface User {
    username: string;
    firstName: string; // Add firstName field
  }

  // Extend the Session interface to include both the user data
  interface Session {
    user: User & {
      username: string;
      firstName: string; // Add firstName field here too
    };
  }
}
