"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import DashboardContent from "../../components/dashboard/DashboardContent";
import NavBarDashboard from "@/components/dashboard/NavBarDashboard";
import Image from "next/image";
import Link from "next/link";
import { logout, setUser } from "@/lib/features/auth/authslice";
import { useGetUserQuery } from "@/lib/features/api/apiSlice";


const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);


  console.log("User in Redux", user)
  // Fetch user from API
  const { data, error, isLoading } = useGetUserQuery(undefined, {
    skip: !!user, // Skip the API call only if `user` is already in Redux
  });

  useEffect(() => {
    if (data) {
      dispatch(setUser({ user: data.user })); // Store user in Redux
    } else if (error) {
      console.log("Error fetching user:", error);
      dispatch(logout());
      router.push("/login");
    }
    setLoading(false);
  }, [data, error, dispatch, router]);

  // Prevent rendering dashboard content while checking authentication
  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-pivotaLightGray">
      {/* Navbar */}
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

      {/* Sidebar + Content */}
      <div className="flex flex-1 bg-pivotaLightGray">
        {/* Sidebar */}
        <div className="w-[18%] bg-white rounded-2xl shadow-xl h-full sticky top-[15%] mx-6 my-4 p-4"></div>

        {/* Main Content */}
        <div className="w-[82%] bg-pivotaWhite flex flex-col h-full p-6 space-y-6">
        <DashboardContent 
              dispatch={dispatch} 
              userRoles={user?.roles ?? []}  // Default to an empty array
              firstName={user?.firstName ?? ""}  // Default to an empty string
            />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
