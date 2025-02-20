"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/features/auth/authslice";
import { Briefcase, Home, Settings, LogOut, Wrench } from "lucide-react";

interface DashboardContentProps {
  userRoles: string[];
  firstName: string;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ userRoles, firstName }) => {
  const hasLandlordRole = userRoles.includes("landlord");
  const hasEmployerRole = userRoles.includes("employer");
  const hasServiceProviderRole = userRoles.includes("serviceProvider");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("refresh_token");
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-100 min-h-screen">
      {/* Dashboard Header */}
      <div className="col-span-full flex justify-between items-center bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800">Welcome, {firstName} 👋</h1>
        <Button variant="destructive" onClick={handleLogout}>
          <LogOut className="mr-2" size={18} /> Logout
        </Button>
      </div>

      {/* General Info Card */}
      <Card className="shadow-lg hover:shadow-xl transition-all">
        <CardHeader>
          <CardTitle className="text-blue-600">Dashboard Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">Manage your activities based on your roles.</p>
        </CardContent>
      </Card>

      {/* Role-Based Sections */}
      {hasLandlordRole && (
        <Card className="border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center">
              <Home className="mr-2 text-blue-500" /> For Landlords
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your property listings and tenants efficiently.</p>
          </CardContent>
        </Card>
      )}

      {hasEmployerRole && (
        <Card className="border-l-4 border-yellow-500 shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center">
              <Briefcase className="mr-2 text-yellow-500" /> For Employers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Post job listings, review applications, and manage hiring.</p>
          </CardContent>
        </Card>
      )}

      {hasServiceProviderRole && (
        <Card className="border-l-4 border-green-500 shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center">
              <Wrench className="mr-2 text-green-500" /> For Service Providers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Showcase your skills, connect with clients, and get hired.</p>
          </CardContent>
        </Card>
      )}

      {/* Settings Card */}
      <Card className="col-span-full shadow-md hover:shadow-lg transition-all">
        <CardHeader>
          <CardTitle className="text-gray-800 flex items-center">
            <Settings className="mr-2 text-gray-600" /> Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage your account details and preferences.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
