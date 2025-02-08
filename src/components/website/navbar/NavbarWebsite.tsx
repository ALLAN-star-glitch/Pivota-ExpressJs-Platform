"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import ClientSession from "../../common/ClientSession";
import PostAdModal from "../../common/PostAdModal";
import AuthenticatedPostAdModal from "../../common/AuthenticatedPostAdModal";
import Image from "next/image";

const NavbarWebsite: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Close dropdown if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  // Ensure user roles are handled as an array
  const userRoles: string[] = session?.user?.roles || ["user"]; // Default role is always 'user'

  // Extract a valid premium role if the user has one
  const premiumRole: "landlord" | "employer" | "serviceProvider" | null =
    (userRoles.find(role => ["landlord", "employer", "serviceProvider"].includes(role)) as "landlord" | "employer" | "serviceProvider") || null;

  const username = session?.user?.firstName || "";

  // Redirect user to their respective dashboard
  const handleRedirect = () => {
    if (status === "authenticated") {
      router.push(`/dashboard`);
    }
  };

  const openAdModal = () => setIsAdModalOpen(true);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleLogout = () => signOut({ callbackUrl: "/login" });

  

  return (
    <nav className="fixed top-0 w-full bg-white  text-pivotaTeal shadow-md z-10">

      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        
        <div className="flex justify-between items-center gap-2 text-2xl font-bold cursor-pointer" onClick={() => router.push("/") }>
          <Image src="/mylogo.png" alt="logo" width={50} height={30}/>
          Pivota
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 hidden md:flex">
        
          <button onClick={() => router.push("/services-providers")} className="hover:text-pivotaGold">
            Services Providers
          </button>
          <button onClick={() => router.push("/jobs") } className="hover:text-pivotaGold">
            Jobs
          </button>
          <button onClick={() => router.push("/houses") } className="hover:text-pivotaGold">
            Houses
          </button>
          <button onClick={() => router.push("/about") } className="hover:text-pivotaGold">
            About
          </button>
          <button onClick={() => router.push("/pricing") } className="hover:text-pivotaGold">
            Pricing
          </button>
        </div>

        {/* Authentication & Dropdown */}
        {status === "authenticated" ? (
          <div className="flex items-center space-x-4">
            <button
              className="bg-pivotaGold text-black px-4 py-2 rounded-md hover:bg-pivotaAqua"
              onClick={openAdModal}
            >
              Post Ad
            </button>

            {/* Avatar & Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
                <FaUserCircle size={40} />
                <span className="font-medium hidden md:flex">{username || <ClientSession />}</span>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
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
                    onClick={() => setShowLogoutModal(true)}
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
              className="bg-pivotaGold text-black px-4 py-2 rounded-md hover:bg-orange-200"
              onClick={openAdModal}
            >
              Post Ad
            </button>
            <button
              onClick={() => router.push("/login") }
              className="flex items-center space-x-2 cursor-pointer"
            >
              <FaUserCircle size={40} />
              <span className="font-medium hidden md:flex">Login</span>
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {isAdModalOpen && (
        session?.user ? (
          <AuthenticatedPostAdModal
            isOpen={isAdModalOpen}
            onClose={() => setIsAdModalOpen(false)}
           userRoles={userRoles}  // Pass the roles array
          />
        ) : (
          <PostAdModal
            isOpen={isAdModalOpen}
            onClose={() => setIsAdModalOpen(false)}
            isAuthenticated={false}
          />
        )
      )}

      {/* Logout Confirmation Modal (Only for authenticated users) */}
      {status === "authenticated" && showLogoutModal && (
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
                onClick={handleLogout}
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
