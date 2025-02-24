"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout, setUser } from "@/lib/features/auth/authslice";
import { useAppSelector } from "@/lib/hooks";
import { selectFirstName, selectPlan } from "@/lib/features/authSelector";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Home, Wrench, LogOut, UserPlus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import LogoutModal from "../LogoutModal";

const gradients = [
  "bg-gradient-to-r from-pivotaAqua to-pivotaTeal",
  "bg-gradient-to-r from-pivotaGold to-yellow-500",
  "bg-gradient-to-r from-pivotaPurple to-indigo-500",
  "bg-gradient-to-r from-pivotaCoral to-red-500",
];

const DashboardContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const firstName = useAppSelector(selectFirstName) || "Loading...";
  const plan = useAppSelector(selectPlan);

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

  const cards = [
    {
      title: "Manage Properties",
      description: "Oversee and manage your listed properties efficiently.",
      count: 45,
      icon: Home,
      action: () => router.push("/properties"),
    },
    {
      title: "Job Postings",
      description: "Review and update your job listings.",
      count: 30,
      icon: Briefcase,
      action: () => router.push("/jobs"),
    },
    {
      title: "Client Requests",
      description: "Manage and respond to client inquiries.",
      count: 12,
      icon: Wrench,
      action: () => router.push("/clients"),
    },
    {
      title: "Applications",
      description: "Track and manage your applications.",
      count: 20,
      icon: UserPlus,
      action: () => router.push("/applications"),
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 bg-pivotaLightGray min-h-screen text-pivotaNavy">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-lg shadow-md">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold capitalize">Hi, {firstName} 👋</h1>
          <Badge className="bg-pivotaGold text-pivotaNavy mt-2 sm:mt-0">{plan} Membership Plan</Badge>
        </div>
        <Button variant="destructive" onClick={() => setShowModal(true)} className="bg-pivotaCoral hover:bg-red-600 text-white flex items-center gap-2">
          <LogOut size={18} /> Logout
        </Button>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ title, description, count, icon: Icon, action }, index) => (
          <div key={index} className={`p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 ${gradients[index % gradients.length]} text-white`}>
            <div className="flex items-center justify-between">
              <Icon size={36} />
              <span className="text-2xl font-semibold">{count}</span>
            </div>
            <h3 className="text-lg font-semibold mt-4">{title}</h3>
            <p className="text-sm mt-1">{description}</p>
            <Button onClick={action} className="mt-4 bg-white text-pivotaTeal hover:bg-gray-100 w-full">
              Manage
            </Button>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">User Statistics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[{ name: "Users", count: 120 }, { name: "Properties", count: 45 }, { name: "Jobs", count: 30 }]}> 
            <XAxis dataKey="name" stroke="#008080" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#008080" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <LogoutModal show={showModal} onClose={() => setShowModal(false)} onConfirm={handleLogout} />
    </div>
  );
};

export default DashboardContent;
