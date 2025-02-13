"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Use useRouter from next/navigation in the App Router
import dynamic from "next/dynamic";
import { RootState } from "@/lib/store";
import Cookies from "js-cookie"; 
import DashboardContent from "../../components/dashboard/DashboardContent";


const Dashboard = () => {
 
  const dispatch = useDispatch();
  const router = useRouter(); // Using Next.js useRouter from next/navigation

  const { isAuthenticated, userRoles } = useSelector(
    (state: RootState) => state.auth
  );

  console.log("user roles from redux", userRoles)
  console.log("Authenitication Status", isAuthenticated)

  
  useEffect(() => {
    if (isAuthenticated) {
      return; // If the user is already authenticated, don't check the token
    }

    const token = Cookies.get("token"); // Get token from cookies
    if (!token) {
      // If no token exists, redirect to login
      router.push("/login");
      return;
    }
     
  }, [dispatch, isAuthenticated, router]);

  // If authenticated, show the dashboard content
  return (
    <div className="p-6 space-y-6">
      <DashboardContent
        dispatch={dispatch}
        userRoles={userRoles}
      />
    </div>
  );
};

export default Dashboard;
