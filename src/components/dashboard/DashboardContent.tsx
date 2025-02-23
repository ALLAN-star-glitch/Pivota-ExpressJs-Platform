"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout, setUser } from "@/lib/features/auth/authslice";
import { Briefcase, Home, Wrench, LogOut, UserPlus } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { selectFirstName, selectPlan, selectUserRoles } from "@/lib/features/authSelector";
import LogoutModal from "../LogoutModal";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const colors = {
  pivotaTeal: "#008080",
  pivotaAqua: "#7FDBFF",
  pivotaGold: "#FFD700",
  pivotaNavy: "#1D1E31",
  pivotaLightGray: "#F5F5F5",
  pivotaWhite: "#FFFFFF",
  pivotaPurple: "#6A4CFF",
  pivotaCoral: "#FF6F61"
};

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
    { role: "landlord", title: "Properties", count: 45, icon: Home, action: () => router.push("/properties"), gradient: "bg-gradient-to-r from-[colors.pivotaTeal] to-[colors.pivotaAqua]" },
    { role: "employer", title: "Jobs", count: 30, icon: Briefcase, action: () => router.push("/jobs"), gradient: "bg-gradient-to-r from-[colors.pivotaGold] to-[colors.pivotaPurple]" },
    { role: "serviceProvider", title: "Clients", count: 12, icon: Wrench, action: () => router.push("/clients"), gradient: "bg-gradient-to-r from-[colors.pivotaPurple] to-[colors.pivotaCoral]" },
    { role: "user", title: "Applications", count: 20, icon: UserPlus, action: () => router.push("/applications"), gradient: "bg-gradient-to-r from-[colors.pivotaAqua] to-[colors.pivotaTeal]" },
  ];

  return (
    <div className="p-8 space-y-6 bg-gradient-to-b from-[colors.pivotaLightGray] to-[colors.pivotaWhite] min-h-screen text-[colors.pivotaNavy]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-lg shadow-md">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold capitalize">Welcome, {firstName} 👋</h1>
          <Badge className="bg-[colors.pivotaGold] text-[colors.pivotaNavy] mt-2 sm:mt-0">{plan} membership plan</Badge>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
          {userRoles.map((role, index) => (
            <Badge key={index} className="bg-[colors.pivotaTeal] text-[colors.pivotaWhite] capitalize">{role}</Badge>
          ))}
        </div>
        <Button variant="destructive" onClick={() => setShowModal(true)} className="bg-[colors.pivotaCoral] hover:bg-red-600 text-[colors.pivotaWhite]">
          <LogOut className="mr-2" size={18} /> Logout
        </Button>
      </div>
      <Separator />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.filter(({ role }) => userRoles.includes(role) || role === "user").map(({ title, count, icon: Icon, action, gradient }, index) => (
          <div key={index} className={`flex flex-col items-center justify-center p-5 w-full rounded-lg shadow-md hover:shadow-lg transition-all ${gradient}`}>            
            <Icon size={36} className="text-[colors.pivotaWhite]" />
            <span className="text-sm font-medium mt-2 text-[colors.pivotaWhite]">{title}</span>
            <span className="text-lg font-semibold text-[colors.pivotaWhite]">{count}</span>
            <Button onClick={action} className="mt-2 px-3 py-1 text-xs rounded-md bg-[colors.pivotaWhite] text-[colors.pivotaNavy] hover:bg-[colors.pivotaGold]">Manage</Button>
          </div>
        ))}
      </div>
      <div className="bg-[colors.pivotaWhite] p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">User Statistics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[{ name: "Users", count: 120 }, { name: "Properties", count: 45 }, { name: "Jobs", count: 30 }]}> 
            <XAxis dataKey="name" stroke={colors.pivotaTeal} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill={colors.pivotaTeal} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <LogoutModal show={showModal} onClose={() => setShowModal(false)} onConfirm={handleLogout} />
    </div>
  );
};

export default DashboardContent;
