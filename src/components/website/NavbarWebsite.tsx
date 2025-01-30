"use client";
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import ClientSession from "../common/ClientSession";
import { useSession } from "next-auth/react";
import LoginPromptModal from "../common/LoginPromptModal";  // Import the modal

const NavbarWebsite: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Track modal state
  const { data: session, status } = useSession();

  // Ensure the component is mounted on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const openModal = () => {
    setIsModalOpen(true);  // Show the modal when "Post an Ad" is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false);  // Close the modal
  };

  return (
    <nav className="fixed top-0 w-full bg-pivotaNavy text-pivotaWhite shadow-md z-10">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Pivota</div>
        <div className="space-x-6 hidden md:flex">
          <Link href="/services" className="hover:text-pivotaTeal">Services</Link>
          <Link href="/jobs" className="hover:text-pivotaTeal">Jobs</Link>
          <Link href="/rentals" className="hover:text-pivotaTeal">Rentals</Link>
          <Link href="/about" className="hover:text-pivotaTeal">About</Link>
        </div>

        {/* Conditionally render based on session state */}
        {status === "authenticated" ? (
          <Link href="/dashboard/super-admin">
            <div className="flex items-center space-x-2 cursor-pointer">
              <FaUserCircle size={40} />
              <span className="font-medium">
                <ClientSession />
              </span>
            </div>
          </Link>
        ) : (
          <button
            className="bg-pivotaTeal text-white px-4 py-2 rounded-md hover:bg-pivotaAqua"
            onClick={openModal}  // Open modal on button click
          >
            Post an Ad
          </button>
        )}
      </div>

      {/* Modal Component */}
      <LoginPromptModal isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
};

export default NavbarWebsite;
