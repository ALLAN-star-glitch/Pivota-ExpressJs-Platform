import AccessDenied from "@/components/common/AccessDenied";
import Menu from "@/components/common/Menu";
import NavBarDashboard from "@/components/dashboard/NavBarDashboard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <AccessDenied />;
  }

  const userRoles = session.user.roles || []; // Example: ['user', 'employer']

  return (
    <div className="min-h-screen flex flex-col bg-pivotaLightGray">
      {/* TOP - Logo and NavBar Section */}
      <div className="bg-pivotaWhite shadow-md flex justify-between items-center sticky top-0 z-20">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/mylogo.png" alt="logo" width={70} height={40} />
          <span className="font-bold text-pivotaTeal text-2xl">Pivota</span>
        </Link>

        {/* NavBar Section */}
        <div className="flex items-center space-x-6">
          <NavBarDashboard />
        </div>
      </div>

      {/* BOTTOM - Left and Right Sections */}
      <div className="flex flex-1 bg-pivotaLightGray">
        {/* LEFT - Menu Section (Elevated, Fully Rounded, with Shadow and Spacing) */}
        <div className="w-[18%] bg-white rounded-2xl shadow-xl h-full sticky top-[15%] mx-6 my-4 p-4 transform hover:scale-105 transition-all duration-300 ease-in-out">
          <Menu />
        </div>

        {/* RIGHT - Main Content Section */}
        <div className="w-[82%] bg-pivotaWhite flex flex-col h-full p-6 space-y-6">
          {/* Dashboard Header Section */}
          <div className="bg-gradient-to-r from-pivotaTeal to-pivotaAqua text-pivotaWhite rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-3xl font-semibold capitalize">Welcome Back, {session?.user.firstName}! 👋</h2>
            <p className="text-sm text-pivotaLightGray">Here&apos;s your dashboard overview for today..</p>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
