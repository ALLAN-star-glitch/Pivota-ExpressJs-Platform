import AccessDenied from "@/components/common/AccessDenied";
import Menu from "@/components/common/Menu";
import NavBarDashboard from "@/components/dashboard/NavBarDashboard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions)

  if (!session) {
    return(
   <AccessDenied/>
    )
  }
  
  return (
    <div className="min-h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-gradient-to-b from-pivotaNavy to-pivotaTeal h-screen flex flex-col">
        {/* Sticky Logo Section */}
        <div className="sticky top-0 z-10 bg-pivotaNavy p-4 shadow h-20 px-4">
          <Link
            href="/"
            className="flex items-center justify-center lg:justify-start gap-2"
          >
            <Image src="/mylogo.png" alt="logo" width={70} height={40} />
            <span className="hidden lg:block font-bold text-pivotaTeal">Pivota</span>
          </Link>
        </div>

        {/* Scrollable Menu */}
        <div className="overflow-y-auto flex-1 p-4 text-pivotaWhite">
          <Menu />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-pivotaLightGray flex flex-col h-screen">
        {/* Sticky NavBar */}
        <div className="sticky top-0 z-10 bg-pivotaWhite shadow">
          <NavBarDashboard/>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 text-pivotaTeal">
          {children}
        </div>
      </div>
    </div>
  );
}
