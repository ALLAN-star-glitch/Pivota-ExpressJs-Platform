"use client";

import DashboardContent from "../../components/dashboard/DashboardContent";
import NavBarDashboard from "@/components/dashboard/NavBarDashboard";
import Image from "next/image";
import Link from "next/link";

import Menu from "@/components/common/Menu";

const Dashboard = () => {
  


  return (
    <div className="min-h-screen flex flex-col bg-pivotaLightGray">
      {/* TOP - Navbar */}
      <div className="bg-pivotaWhite shadow-md flex justify-between items-center z-50 w-full">
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
        <div className="w-[18%] bg-white rounded-2xl shadow-xl h-full sticky top-[15%] mx-6 my-4 p-4 z-50">
          <Menu/>
        </div>

        {/* RIGHT - Main Content */}
        <div className="w-[82%] bg-pivotaWhite flex flex-col h-full p-6 space-y-6">
          <DashboardContent/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;