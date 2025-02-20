"use client"

import { useAppSelector } from "@/lib/hooks";
import NavBarDashboardClient from "./NavBarDashboardClient"; // New client-side component


const NavBarDashboard = () => {

  const firstName = useAppSelector((state) => state.auth.user?.firstName || "User");
  const plan = useAppSelector((state) => state.auth.user?.plan || "Free Plan");


 

  return (
    <div className="flex justify-between items-center py-4 pr-3 h-20 px-4 bg-pivotaWhite">
      {/* Pass session to the client-side component */}
      <NavBarDashboardClient firstName={firstName} plan={plan}/>
    </div>
  );
};

export default NavBarDashboard;
