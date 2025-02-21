"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout, setUser } from "@/lib/features/auth/authslice";
import { Briefcase, Home, Settings, LogOut, Wrench, Bell, User } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { selectUserRoles, selectFirstName, selectPlan } from "@/lib/features/authSelector";
import LogoutModal from "../LogoutModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DashboardContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const userRoles = useAppSelector(selectUserRoles);
  const plan = useAppSelector(selectPlan);
  const firstName = useAppSelector(selectFirstName) || "Loading...";

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

  const data = [
    { name: "Users", count: 120 },
    { name: "Properties", count: 45 },
    { name: "Jobs", count: 30 },
  ];

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-pivotaLightGray min-h-screen">
      {/* Dashboard Header */}
      <div className="col-span-full flex justify-between items-center bg-gradient-to-r from-pivotaTeal to-pivotaAqua p-6 rounded-lg shadow-md text-white">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/profile-pic.png" alt="User" />
            <AvatarFallback>{firstName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-semibold capitalize">Welcome, {firstName} 👋</h1>
            <Badge className="bg-pivotaGold text-black hover:bg-pivotaAqua">{plan} membership plan</Badge>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="destructive" onClick={() => setShowModal(true)} className="bg-pivotaCoral hover:bg-red-600">
            <LogOut className="mr-2" size={18} /> Logout
          </Button>
        </div>
      </div>

      <Separator className="col-span-full my-4" />

      {/* Role-Based Sections */}
      {userRoles.includes("landlord") && (
        <Card className="border-l-4 border-pivotaTeal shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center">
              <Home className="mr-2 text-pivotaTeal" /> For Landlords
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your property listings and tenants efficiently.</p>
            <Button className="mt-3 bg-pivotaTeal text-white">Manage Properties</Button>
          </CardContent>
        </Card>
      )}

      {userRoles.includes("employer") && (
        <Card className="border-l-4 border-pivotaGold shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center">
              <Briefcase className="mr-2 text-pivotaGold" /> For Employers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Post job listings, review applications, and manage hiring.</p>
            <Button className="mt-3 bg-pivotaGold text-white">Post a Job</Button>
          </CardContent>
        </Card>
      )}

      {userRoles.includes("serviceProvider") && (
        <Card className="border-l-4 border-pivotaPurple shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center">
              <Wrench className="mr-2 text-pivotaPurple" /> For Service Providers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Showcase your skills, connect with clients, and get hired.</p>
            <Button className="mt-3 bg-pivotaPurple text-white">Find Clients</Button>
          </CardContent>
        </Card>
      )}

      {/* Statistics Section */}
      <Card className="col-span-full shadow-md hover:shadow-lg transition-all bg-white border border-gray-300">
        <CardHeader>
          <CardTitle className="text-gray-800 flex items-center">User Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Settings Card */}
      <Card className="col-span-full shadow-md hover:shadow-lg transition-all bg-white border border-gray-300">
        <CardHeader>
          <CardTitle className="text-gray-800 flex items-center">
            <Settings className="mr-2 text-gray-600" /> Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage your account details and preferences.</p>
          <Button className="mt-3 bg-pivotaNavy text-white">Edit Profile</Button>
        </CardContent>
      </Card>

      {/* Logout Confirmation Modal */}
      <LogoutModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default DashboardContent;
