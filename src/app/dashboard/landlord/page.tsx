
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";


const Landlord = async () => {



 const session = await getServerSession(authOptions);



  

  return (
    <div className="mt-8 p-4 flex gap-4 flex-col md:flex-row h-[calc(100vh-64px)]">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8 overflow-y-auto max-h-screen no-scrollbar">
        {/* WELCOME MESSAGE */}
        <div className="bg-gradient-to-r from-pivotaTeal to-pivotaAqua text-pivotaWhite shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold capitalize">Welcome Back, {session?.user.firstName}! 👋</h2>
          <p className="text-sm text-pivotaLightGray">Here&apos;s your dashboard overview for today..</p>
        </div>
       

        {/* QUICK LINKS */}
        <div className="bg-pivotaWhite shadow-md rounded-lg p-6 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold mb-4 text-pivotaTeal">Quick Links</h3>
            <Image className="cursor-pointer" src="/moreDark.png" alt="" width={20} height={20} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Link
              href="/teacher"
              className="bg-gradient-to-r from-pivotaTeal to-pivotaAqua text-pivotaWhite text-center py-3 px-4 rounded-lg shadow hover:bg-gradient-to-l"
            >
              Manage Users
            </Link>
            <Link
              href="/student"
              className="bg-gradient-to-r from-pivotaGold to-pivotaTeal text-pivotaWhite text-center py-3 px-4 rounded-lg shadow hover:bg-gradient-to-l"
            >
              Manage Services
            </Link>
            <Link
              href="/parent"
              className="bg-gradient-to-r from-pivotaCoral to-pivotaGold text-pivotaWhite text-center py-3 px-4 rounded-lg shadow hover:bg-gradient-to-l"
            >
              Manage Jobs
            </Link>
            <Link
              href="/finance"
              className="bg-gradient-to-r from-pivotaNavy to-pivotaTeal text-pivotaWhite text-center py-3 px-4 rounded-lg shadow hover:bg-gradient-to-l"
            >
              View Reports
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8 overflow-y-auto max-h-screen no-scrollbar bg-gradient-to-r from-pivotaTeal to-pivotaAqua">
        <h1 className="text-pivotaTeal">Right</h1>
        {/* Additional content can go here */}
      </div>

    
    </div>
  );
};

export default Landlord;
