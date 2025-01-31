import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // App Router uses next-auth/next
import { authOptions } from "@/lib/auth";

// Define role-based access control for routes
const roleBasedRoutes: { [key: string]: string[] } = {
  "/dashboard/super-admin": ["superAdmin"],
  "/dashboard/service-provider": ["serviceProvider"],
  "/dashboard/employer": ["employer"],
  "/dashboard/landlord": ["landlord"],
  "/dashboard/user": ["user"],
};

export async function middleware(req: Request) {
  // Use getServerSession for App Router (note the usage of `next-auth/next` here)
  const session = await getServerSession(authOptions);
  console.log(session); // Log session to verify it's correct

  if (!session) {
    // If no session exists, redirect to login page
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { user } = session; // Extract user from session
  console.log(user); // Check if user and user.role are correctly populated
  const requestedRoute = new URL(req.url).pathname; // Get the requested route

  // Role-based access control logic
  for (const route in roleBasedRoutes) {
    if (requestedRoute.startsWith(route)) {
      const allowedRoles = roleBasedRoutes[route as keyof typeof roleBasedRoutes];
      if (!allowedRoles.includes(user.role)) {
        // If the user doesn't have access, return a 403 forbidden response
        return NextResponse.json(
          { message: "You do not have permission to access this route." },
          { status: 403 }
        );
      }
    }
  }

  // Allow the request to proceed if authorized
  return NextResponse.next();
}

// Define the matcher to specify which routes the middleware applies to
export const config = {
  matcher: [
    "/dashboard/*", // Match all routes starting with /dashboard/
    "/api/*", // Protect API routes as well
  ],
};
