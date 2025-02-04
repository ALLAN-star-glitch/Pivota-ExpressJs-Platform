// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next"; // For App Router
// import { authOptions } from "@/lib/auth";

// const roleBasedRoutes: { [key: string]: string[] } = {
//   "/dashboard/super-admin": ["superAdmin"],
//   "/dashboard/service-provider": ["serviceProvider"],
//   "/dashboard/employer": ["employer"],
//   "/dashboard/landlord": ["landlord"],
//   "/dashboard/user": ["user"],
// };

// export async function middleware(req: Request) {
//   const session = await getServerSession(authOptions); // Get session data

//   if (!session) {
//     // If no session, redirect to login
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   const { user } = session;
//   const requestedRoute = new URL(req.url).pathname;

//   // Check role-based access
//   for (const route in roleBasedRoutes) {
//     if (requestedRoute.startsWith(route)) {
//       const allowedRoles = roleBasedRoutes[route];

//       if (!allowedRoles.includes(user.roles)) {
//         // If user role is not allowed, redirect to their own dashboard
//         return NextResponse.redirect(new URL(`/dashboard/${user.roles}`, req.url));
//       }
//     }
//   }

//   return NextResponse.next(); // Allow request to continue if authorized
// }

// export const config = {
//   matcher: ["/dashboard/:path*"], // Apply middleware to all dashboard pages
// };
