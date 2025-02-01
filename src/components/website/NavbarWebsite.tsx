"use client";

import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ClientSession from "../common/ClientSession";
import PostAdModal from "../common/PostAdModal";  // Import the unauthenticated modal
import AuthenticatedPostAdModal from "../common/AuthenticatedPostAdModal"; // Import the authenticated modal

const NavbarWebsite: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false); // Track modal state
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Handle case where session is still loading
  if (status === "loading") {
    return <div>Loading...</div>; // or show a loading spinner
  }

  // Get the user role and ensure it's a valid one
  const userRole = session?.user?.role ?? ""; // Default to empty string if undefined
  const validRoles: ("landlord" | "employer" | "serviceProvider")[] = ["landlord", "employer", "serviceProvider"];
  const validUserRole = validRoles.includes(userRole as "landlord" | "employer" | "serviceProvider") ? (userRole as "landlord" | "employer" | "serviceProvider") : "serviceProvider"; // Fallback to "serviceProvider" if role is invalid

  const username = session?.user?.username || "";

  const getDashboardRoute = (role: string, username: string) => {
    const roleRoutes: Record<string, string> = {
      serviceProvider: "/dashboard/service-provider",
      user: "/dashboard/user",
      landlord: "/dashboard/landlord",
      employer: "/dashboard/employer",
    };

    const dashboardRoute = roleRoutes[role] || "/dashboard";
    return `${dashboardRoute}?username=${username}&success=true`;
  };

  const handleRedirect = () => {
    if (status === "authenticated") {
      const dashboardRoute = getDashboardRoute(validUserRole, username);
      router.push(dashboardRoute);
    }
  };

  const openAdModal = () => {
    setIsAdModalOpen(true); // Open the modal for both authenticated and unauthenticated users
  };

  return (
    <nav className="fixed top-0 w-full bg-pivotaNavy text-pivotaWhite shadow-md z-10">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Pivota</div>
        <div className="space-x-6 hidden md:flex">
          <button onClick={() => router.push("/services")} className="hover:text-pivotaTeal">Services</button>
          <button onClick={() => router.push("/jobs")} className="hover:text-pivotaTeal">Jobs</button>
          <button onClick={() => router.push("/rentals")} className="hover:text-pivotaTeal">Rentals</button>
          <button onClick={() => router.push("/about")} className="hover:text-pivotaTeal">About</button>
        </div>

        {status === "authenticated" ? (
          <div className="flex items-center space-x-4 cursor-pointer">
            <button
              className="bg-pivotaTeal text-white px-4 py-2 rounded-md hover:bg-pivotaAqua"
              onClick={openAdModal} // Open modal for authenticated users
            >
              Post an Ad
            </button>

            <div className="flex items-center space-x-2 cursor-pointer" onClick={handleRedirect}>
              <FaUserCircle size={40} />
              <span className="font-medium"><ClientSession /></span>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              className="bg-pivotaTeal text-white px-4 py-2 rounded-md hover:bg-pivotaAqua"
              onClick={openAdModal}  // Open modal for unauthenticated users
            >
              Post an Ad
            </button>

            <button onClick={() => router.push("/login")} className="flex items-center space-x-2 cursor-pointer">
              <FaUserCircle size={40} />
              <span className="font-medium">Login</span>
            </button>
          </div>
        )}
      </div>

      {/* Conditional rendering based on session status */}
      {status === "authenticated" ? (
        <AuthenticatedPostAdModal
          isOpen={isAdModalOpen}
          onClose={() => setIsAdModalOpen(false)}
          userRole={validUserRole} // Pass validated role to the modal
        />
      ) : (
        status === "unauthenticated" && (
          <PostAdModal
            isOpen={isAdModalOpen}
            onClose={() => setIsAdModalOpen(false)}
            isAuthenticated={false} // Explicitly pass `false` for unauthenticated users
          />
        )
      )}
    </nav>
  );
};

export default NavbarWebsite;
