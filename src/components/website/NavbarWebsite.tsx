"use client";
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginPromptModal from "../common/LoginPromptModal";
import ClientSession from "../common/ClientSession";

const NavbarWebsite: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Get user role
  const userRole = session?.user?.role || "";
  const username = session?.user?.username || "";

  // Function to determine dashboard route based on role and append username
  const getDashboardRoute = (role: string, username: string) => {
    const roleRoutes: Record<string, string> = {
      serviceProvider: "/dashboard/service-provider",
      user: "/dashboard/user",
      landlord: "/dashboard/landlord",
      employer: "/dashboard/employer",
    };

    // Return the respective dashboard route and append username to the URL
    const dashboardRoute = roleRoutes[role] || "/dashboard";
    return `${dashboardRoute}?username=${username}&success=true`;
  };

  // Function to handle navigation
  const handleRedirect = () => {
    if (status === "authenticated") {
      const dashboardRoute = getDashboardRoute(userRole, username);
      router.push(dashboardRoute);
    } else {
      setIsModalOpen(true); // Show login modal for unauthenticated users
    }
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
            {/* Post an Ad button */}
            <button
              className="bg-pivotaTeal text-white px-4 py-2 rounded-md hover:bg-pivotaAqua"
              onClick={handleRedirect} // Redirects based on role
            >
              Post an Ad
            </button>

            {/* Avatar */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handleRedirect}>
              <FaUserCircle size={40} />
              <span className="font-medium"><ClientSession /></span>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            {/* Post an Ad button for logged-out users */}
            <button
              className="bg-pivotaTeal text-white px-4 py-2 rounded-md hover:bg-pivotaAqua"
              onClick={handleRedirect} // Opens modal for unauthenticated users
            >
              Post an Ad
            </button>

            {/* Login Button */}
            <button onClick={() => router.push("/login")} className="flex items-center space-x-2 cursor-pointer">
              <FaUserCircle size={40} />
              <span className="font-medium">Login</span>
            </button>
          </div>
        )}
      </div>

      {/* Login Prompt Modal */}
      <LoginPromptModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default NavbarWebsite;
