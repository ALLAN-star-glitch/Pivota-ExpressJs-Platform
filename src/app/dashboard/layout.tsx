"use client";

import NavBarDashboard from "@/components/dashboard/NavBarDashboard";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col bg-pivotaLightGray">
      {/* Persistent Navbar */}
      <NavBarDashboard />

      <div className="flex bg-pivotaLightGray">
        {/* Persistent Sidebar */}
        <Sidebar />

        {/* Page-specific content */}
        <main className="overflow-y-auto flex-grow p-6 space-y-6 lg:ml-[15%]">
          {children}
        </main>
      </div>
    </div>
  );
}
