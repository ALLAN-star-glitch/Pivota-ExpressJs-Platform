"use client";

import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { selectAuthentication, selectFirstName, selectPlan, selectUserRoles } from "@/lib/features/authSelector";
import { setUser } from "@/lib/features/auth/authslice";
import PostAdModal from "../modals/AuthenticatedPostAdModal";


const NavBarDashboardClient = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch firstName and plan from Redux store
  const firstName = useAppSelector(selectFirstName) || "Loading...";
  const plan = useAppSelector(selectPlan) || "Loading...";

  useEffect(() => {
    // Load persisted state from localStorage only on the client
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("authState");
      if (storedAuth) {
        dispatch(setUser(JSON.parse(storedAuth)));
      }
    }
  }, [dispatch]);

 
  const isAuthenticated = useAppSelector(selectAuthentication);
  const userRoles = useAppSelector(selectUserRoles);


  return (
    <>
      <nav className="flex items-center justify-between w-full p-4 fixed top-0 left-0 md:shadow-md py-4 pr-3 h-20 px-4 z-50 bg-white">
        {/* Logo and Name */}
        <Link href="/" className="cursor-pointer">
          <div className="flex items-center gap-2">
            <Image src="/mylogo.png" alt="Pivota Logo" width={90} height={60} />
            <span className="text-xl font-bold text-pivotaTeal">Pivota</span>
          </div>
        </Link>

        {/* Icons and User */}
        <div className="flex items-center gap-6">
          {/* Post an Ad Button */}
          <button
            className="flex items-center bg-pivotaGold text-black px-4 py-2 rounded-md hover:bg-pivotaAqua hidden md:flex"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlusCircle size={20} className="mr-2" />
            Post an Ad
          </button>

          {/* Message Icon */}
          <div className="bg-pivotaWhite rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-pivotaTeal hover:bg-opacity-10">
            <Image src="/message.png" alt="message" width={20} height={20} />
          </div>

          {/* Announcement Icon with Badge */}
          <div className="bg-pivotaWhite rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative hover:bg-pivotaTeal hover:bg-opacity-10">
            <Image src="/announcement.png" alt="announcement" width={20} height={20} />
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-pivotaGold text-pivotaWhite rounded-full text-xs font-bold">
              1
            </div>
          </div>

          {/* User Info */}
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-medium text-pivotaTeal capitalize">
              {firstName}
            </span>
            <span className="text-xs text-pivotaTeal">
              {plan}
            </span>
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-pivotaTeal">
            <Image
              src="/allan.jpg"
              alt="avatar"
              width={36}
              height={36}
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Floating Action Button for small screens */}
        <div className="fixed bottom-20 right-10 md:hidden flex items-center justify-center space-x-2 z-50">
          <span className="text-pivotaTeal font-medium text-sm">Post Ad</span>
          <button
            className="bg-pivotaTeal text-white p-4 rounded-full shadow-lg hover:bg-pivotaAqua animate-pulse"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlusCircle size={30} />
          </button>
        </div>
      </nav>

      {/* Modal Component */}
      <PostAdModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isAuthenticated={isAuthenticated}
        userRoles={userRoles}
      />
    </>
  );
};

export default NavBarDashboardClient;
