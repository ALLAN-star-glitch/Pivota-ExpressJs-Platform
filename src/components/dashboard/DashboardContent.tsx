"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout, setUser } from "@/lib/features/auth/authslice";
import { Briefcase, Home, Wrench, LogOut, UserPlus, Settings } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { selectFirstName, selectPlan, selectUserRoles } from "@/lib/features/authSelector";
import LogoutModal from "../LogoutModal";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const DashboardContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const firstName = useAppSelector(selectFirstName) || "Loading...";
  const plan = useAppSelector(selectPlan);
  const userRoles = useAppSelector(selectUserRoles);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("authState");
      if (storedAuth) {
        dispatch(setUser(JSON.parse(storedAuth)));
      }
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("refresh_token");
    dispatch(logout());
    router.push("/login");
  };

  const quickActions = [
    { role: "landlord", title: "Properties", count: 45, icon: Home, bgGradient: "bg-gradient-to-r from-[#008080] to-[#7FDBFF]", textColor: "text-white", buttonBg: "bg-white text-[#008080]", action: () => router.push("/properties"), label: "Manage" },
    { role: "employer", title: "Jobs", count: 30, icon: Briefcase, bgGradient: "bg-gradient-to-r from-[#FFD700] to-[#FFA500]", textColor: "text-black", buttonBg: "bg-black text-[#FFD700]", action: () => router.push("/jobs"), label: "Post Job" },
    { role: "serviceProvider", title: "Clients", count: 12, icon: Wrench, bgGradient: "bg-gradient-to-r from-[#6A4CFF] to-[#4B0082]", textColor: "text-white", buttonBg: "bg-white text-[#6A4CFF]", action: () => router.push("/clients"), label: "View" },
    { role: "user", title: "Applications", count: 20, icon: UserPlus, bgGradient: "bg-gradient-to-r from-[#7FDBFF] to-[#1E90FF]", textColor: "text-black", buttonBg: "bg-black text-[#7FDBFF]", action: () => router.push("/applications"), label: "Check" },
  ];

  return (
    <div className="p-8 space-y-6 bg-[#F5F5F5] min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-r from-[#008080] to-[#7FDBFF] p-6 rounded-lg shadow-md text-white space-y-4 sm:space-y-0">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold capitalize">Welcome, {firstName} 👋</h1>
          <Badge className="bg-[#FFD700] text-black hover:bg-[#7FDBFF] mt-2 sm:mt-0">{plan} membership plan</Badge>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
          {userRoles.map((role, index) => (
            <Badge key={index} className="bg-[#1D1E31] text-white capitalize">
              {role}
            </Badge>
          ))}
        </div>
        <Button variant="destructive" onClick={() => setShowModal(true)} className="bg-[#FF6F61] hover:bg-red-600">
          <LogOut className="mr-2" size={18} /> Logout
        </Button>
      </div>
      <Separator />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.filter(({ role }) => userRoles.includes(role) || role === "user").map(({ title, count, icon: Icon, bgGradient, textColor, buttonBg, action, label }, index) => (
          <div key={index} className={`flex flex-col items-center justify-center p-5 w-full rounded-lg shadow-md transition-all transform hover:scale-105 hover:shadow-lg ${bgGradient} ${textColor}`}>
            <Icon size={36} />
            <span className="text-sm font-medium mt-2">{title}</span>
            <span className="text-lg font-semibold">{count}</span>
            <Button onClick={action} className={`mt-2 px-3 py-1 text-xs rounded-md ${buttonBg}`}>{label}</Button>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">User Statistics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[{ name: "Users", count: 120 }, { name: "Properties", count: 45 }, { name: "Jobs", count: 30 }]}> 
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <LogoutModal show={showModal} onClose={() => setShowModal(false)} onConfirm={handleLogout} />
    </div>
  );
};

export default DashboardContent;
