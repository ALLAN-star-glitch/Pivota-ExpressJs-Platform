"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import DashboardContent from "../../components/dashboard/DashboardContent";
import NavBarDashboard from "@/components/dashboard/NavBarDashboard";
import Image from "next/image";
import Link from "next/link";
import { logout } from "@/lib/features/auth/authslice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { plan, userRoles, firstName, lastName, id, phone, user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User is not authenticated, redirecting to login...");
      dispatch(logout());
      router.push("/login");
      return;
    }

    // If the user is authenticated, we proceed and set loading to false
    setLoading(false);
  }, [isAuthenticated, dispatch, router]);

  // Prevent rendering dashboard content while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-pivotaLightGray">
      {/* TOP - Navbar */}
      <div className="bg-pivotaWhite shadow-md flex justify-between items-center sticky top-0 z-50 w-full">
        <div className="flex items-center gap-4 md:w-[50%]">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/mylogo.png" alt="logo" width={70} height={40} />
            <span className="font-bold text-pivotaTeal text-2xl">Pivota</span>
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-6 md:w-[50%]">
          <NavBarDashboard />
        </div>
      </div>

      {/* BOTTOM - Sidebar + Main Content */}
      <div className="flex flex-1 bg-pivotaLightGray">
        {/* LEFT - Sidebar */}
        <div className="w-[18%] bg-white rounded-2xl shadow-xl h-full sticky top-[15%] mx-6 my-4 p-4">
          {/* Sidebar content here */}
        </div>

        {/* RIGHT - Main Content */}
        <div className="w-[82%] bg-pivotaWhite flex flex-col h-full p-6 space-y-6">
          <DashboardContent dispatch={dispatch} userRoles={userRoles} firstName={firstName} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
