"use client"
import { useRouter } from "next/navigation";
import { FaHome, FaClipboardList, FaMoneyBillWave, FaBell, FaUsers } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/features/auth/authslice";
import { Dispatch } from "@reduxjs/toolkit";


// Define types for the props
interface DashboardContentProps {
  dispatch: Dispatch; // Dispatch type for redux dispatch
  userRoles: string[]; // User roles as an array of strings
}

const DashboardContent = ({ dispatch, userRoles }: DashboardContentProps) => {
  const router = useRouter(); // Now safe to use useRouter

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const hasLandlordRole = userRoles?.includes("landlord");
  const hasEmployerRole = userRoles?.includes("employer");
  const hasServiceProviderRole = userRoles?.includes("serviceProvider");

  // Log role checks to the console
  console.log("Landlord Role Check: ", hasLandlordRole);
  console.log("Employer Role Check: ", hasEmployerRole);
  console.log("Service Provider Role Check: ", hasServiceProviderRole);


  return (
    <div>
    {/* Dashboard Header */}
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-pivotaTeal">Dashboard</h1>
      <Button className="bg-pivotaGold text-black hover:bg-pivotaAqua" onClick={handleLogout}>
        Logout
      </Button>
    </div>

    {/* Always show some common content for all users */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-pivotaTeal">Notifications</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaBell className="text-pivotaGold" /> Rent payment due for Apartment A-3
            </li>
            <li className="flex items-center gap-2">
              <FaBell className="text-pivotaGold" /> Maintenance request for House D-7
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Render role-based content */}
    {hasLandlordRole && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Landlord content */}
      </div>
    )}

    {hasEmployerRole && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Employer content */}
      </div>
    )}

    {hasServiceProviderRole && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Service Provider content */}
      </div>
    )}

  </div>
  );
};

export default DashboardContent;
