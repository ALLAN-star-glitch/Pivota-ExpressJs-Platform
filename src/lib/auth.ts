import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Make the API call directly using fetch
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await response.json();

        if (response.ok && data?.access_token && data?.refresh_token) {
          // Include the user roles along with other user details
          return {
            id: data.user.id,
            name: data.user.firstName,
            email: data.user.email,
            accessToken: data.access_token,
            refreshToken: data.refresh_token, // Store the refresh token
            roles: data.user.roles || [],
            firstName: data.user.firstName,
            plan: data.user.plan,
          };
        }

        return null; // If login fails
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom sign-in page URL
  },
  callbacks: {
    async jwt({ token, user }) {
      // If it's a new sign-in or sign-up, user will be available
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken, // Store refresh token
          firstName: user.firstName,
          roles: user.roles || [], // Ensure roles are included
          plan: user.plan,
        };
      }
  
      // If not sign-in/signup, ensure token still includes the required fields
      return {
        ...token,
        accessToken: token.accessToken, // Access token should already be present
        refreshToken: token.refreshToken, // Keep refresh token if present
      };
    },
  
    async session({ session, token }) {
      // Ensure the session includes the custom fields like accessToken, refreshToken, etc.
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          firstName: token.firstName,
          roles: token.roles || [],
          plan: token.plan,
        },
      };
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Use JWT for session
  },
};

// Helper function to refresh the access token
async function refreshAccessToken(refreshToken: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  const data = await response.json();
  if (response.ok && data?.access_token) {
    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token || refreshToken, // Use new refresh token if returned
    };
  }

  throw new Error("Failed to refresh token");
}
