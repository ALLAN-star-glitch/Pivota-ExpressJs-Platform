import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import NavBarDashboardClient from "./NavBarDashboardClient"; // New client-side component

const NavBarDashboard = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex justify-between items-center py-4 pr-3 h-20 px-4 bg-pivotaWhite">
      {/* Pass session to the client-side component */}
      <NavBarDashboardClient session={session} />
    </div>
  );
};

export default NavBarDashboard;
