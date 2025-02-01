"use client"
import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import ClientSession from "../common/ClientSession";
import PostAdModal from "../common/PostAdModal"; // Modal for unauthenticated users
import AuthenticatedPostAdModal from "../common/AuthenticatedPostAdModal"; // Modal for authenticated users


const NavbarWebsite: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false); // Track modal state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown state
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Track logout modal state
  const { data: session, status } = useSession();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown menu

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Close dropdown if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false); // Close dropdown if click is outside
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside); // Clean up event listener on component unmount
    };
  }, []);

  if (!mounted) {
    return null;
  }

  if (status === "loading") {
    return <div>Loading...</div>; // or show a loading spinner
  }

  const userRole = session?.user?.role ?? "";
  const username = session?.user?.username || "";

  // Valid user roles
  const validRoles: ("landlord" | "employer" | "serviceProvider")[] = [
    "landlord",
    "employer",
    "serviceProvider",
  ];

  // Ensure the role is valid, otherwise fallback to "serviceProvider"
  const validUserRole = validRoles.includes(userRole as "landlord" | "employer" | "serviceProvider")
    ? (userRole as "landlord" | "employer" | "serviceProvider")
    : "serviceProvider"; // Default to "serviceProvider" if not valid

  // Handle dashboard redirection
  const handleRedirect = () => {
    if (status === "authenticated" && validUserRole) {
      // Convert the role to kebab-case for consistent URL naming
      const kebabCaseRole = validUserRole.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      router.push(`/dashboard/${kebabCaseRole}`);
    }
  };

  const openAdModal = () => {
    setIsAdModalOpen(true);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <nav className="fixed top-0 w-full bg-pivotaNavy text-pivotaWhite shadow-md z-10">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>
          Pivota
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 hidden md:flex">
          <button onClick={() => router.push("/services")} className="hover:text-pivotaTeal">
            Services
          </button>
          <button onClick={() => router.push("/jobs")} className="hover:text-pivotaTeal">
            Jobs
          </button>
          <button onClick={() => router.push("/rentals")} className="hover:text-pivotaTeal">
            Rentals
          </button>
          <button onClick={() => router.push("/about")} className="hover:text-pivotaTeal">
            About
          </button>
        </div>

        {/* Authentication & Dropdown */}
        {status === "authenticated" ? (
          <div className="flex items-center space-x-4">
            <button
              className="bg-pivotaTeal text-white px-4 py-2 rounded-md hover:bg-pivotaAqua"
              onClick={openAdModal}
            >
              Post an Ad
            </button>

            {/* Avatar & Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
                <FaUserCircle size={40} />
                <span className="font-medium">{session?.user?.name || <ClientSession />}</span>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden z-20">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={handleRedirect}
                  >
                    Dashboard
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={() => router.push("/profile")}
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={() => setShowLogoutModal(true)} // Show logout confirmation modal
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              className="bg-pivotaTeal text-white px-4 py-2 rounded-md hover:bg-pivotaAqua"
              onClick={openAdModal}
            >
              Post an Ad
            </button>

            <button
              onClick={() => router.push("/login")}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <FaUserCircle size={40} />
              <span className="font-medium">Login</span>
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {status === "authenticated" ? (
        <AuthenticatedPostAdModal
          isOpen={isAdModalOpen}
          onClose={() => setIsAdModalOpen(false)}
          userRole={validUserRole}
        />
      ) : (
        status === "unauthenticated" && (
          <PostAdModal
            isOpen={isAdModalOpen}
            onClose={() => setIsAdModalOpen(false)}
            isAuthenticated={false}
          />
        )
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm text-center">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600 mt-2">Are you sure you want to log out?</p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout} // Trigger logout
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarWebsite;
