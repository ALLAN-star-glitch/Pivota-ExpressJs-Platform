'use client';

import { useRouter } from 'next/navigation';
import { FaHome, FaClipboardList, FaMoneyBillWave, FaBell, FaUsers, FaCalendarAlt, FaCog, FaChartBar, FaEnvelope } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { logout } from '@/lib/features/auth/authslice';
import { Dispatch } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

interface DashboardContentProps {
  dispatch: Dispatch;
  firstName: String;
  userRoles: String[];
}

const DashboardContent = ({ dispatch, userRoles, firstName }: DashboardContentProps) => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the tokens from cookies
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
  
    // Dispatch logout action to clear Redux state
    dispatch(logout());
  
    // Redirect to login page
    router.push('/login');
  };

  const hasLandlordRole = userRoles.includes('landlord');
  const hasEmployerRole = userRoles.includes('employer');
  const hasServiceProviderRole = userRoles.includes('serviceProvider');

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-pivotaLightGray min-h-screen">
      {/* Left Column (Main Content) */}
      <div className="lg:col-span-2 space-y-6">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-3xl font-bold text-pivotaTeal">Dashboard</h1>
          <Button className="bg-pivotaGold text-black hover:bg-pivotaAqua transition-transform transform hover:scale-105" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Welcome Section */}
        <Card className="shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-pivotaPurple">Welcome, {firstName}!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">Manage your activities based on your roles.</p>
          </CardContent>
        </Card>

        {/* Role-Based Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hasLandlordRole && (
            <Card className="border-l-4 border-pivotaCoral transition-transform transform hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-pivotaTeal">For Landlords</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Manage your property listings and tenants.</p>
              </CardContent>
            </Card>
          )}

          {hasEmployerRole && (
            <Card className="border-l-4 border-pivotaGold transition-transform transform hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-pivotaTeal">For Employers</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Post job listings and manage applicants.</p>
              </CardContent>
            </Card>
          )}

          {hasServiceProviderRole && (
            <Card className="border-l-4 border-pivotaAqua transition-transform transform hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-pivotaTeal">For Service Providers</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Showcase your services and get hired.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Right Column (Notifications, Events, etc.) */}
      <div className="space-y-6">
        {/* Notifications */}
        <Card className="shadow-lg border-t-4 border-pivotaTeal transition-transform transform hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pivotaTeal">
              <FaBell /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>No new notifications</li>
            </ul>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="shadow-lg border-t-4 border-pivotaPurple transition-transform transform hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pivotaPurple">
              <FaCalendarAlt /> Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">No upcoming events scheduled.</p>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card className="shadow-lg border-t-4 border-pivotaNavy transition-transform transform hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pivotaNavy">
              <FaCalendarAlt /> Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-lg border-t-4 border-pivotaGold transition-transform transform hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pivotaGold">
              <FaCog /> Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>Update Profile</li>
              <li>View Reports</li>
              <li>Manage Settings</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
