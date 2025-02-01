"use client"
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa"; // Icon for "Post an Ad"
import PostAdModal from "../common/PostAdModal"; // Unauthenticated modal
import AuthenticatedPostAdModal from "../common/AuthenticatedPostAdModal"; // Authenticated modal
import { Session } from "next-auth";
import Image from "next/image";

interface NavBarDashboardClientProps {
  session: Session | null;
}

const NavBarDashboardClient: React.FC<NavBarDashboardClientProps> = ({ session }) => {
  const [isAdModalOpen, setIsAdModalOpen] = useState(false); // Modal state

  const userRole = session?.user?.role ?? "";
  const validRoles: ("landlord" | "employer" | "serviceProvider")[] = ["landlord", "employer", "serviceProvider"];
  const validUserRole = validRoles.includes(userRole as "landlord" | "employer" | "serviceProvider")
    ? (userRole as "landlord" | "employer" | "serviceProvider")
    : "serviceProvider"; // Fallback to "serviceProvider" if role is invalid

  return (
    <>
      {/* SEARCH BAR (Small screens only show icon, larger screens show input and icon) */}
      <div className="flex items-center gap-2 ml-3">
        {/* On small screens, show only the icon */}
        <div className="block md:hidden">
          <Image src="/search.png" height={18} width={18} alt="search" />
        </div>

        {/* On larger screens, show both the input and icon */}
        <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-pivotaTeal px-2">
          <Image src="/search.png" height={14} width={14} alt="search" />
          <input
            type="text"
            placeholder="search..."
            className="w-[200px] p-2 bg-transparent outline-none text-pivotaTeal"
          />
        </div>
      </div>

      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        {/* Post an Ad Button */}
        {session && (
          <button
            onClick={() => setIsAdModalOpen(true)}
            className="flex items-center bg-pivotaTeal text-white px-4 py-2 rounded-md hover:bg-pivotaAqua hidden md:flex"
          >
            <FaPlusCircle size={20} className="mr-2" />
            Post an Ad
          </button>
        )}

        {/* Switch Role Button */}
        {session && (
          <button
            onClick={() => {}}
            className="bg-pivotaTeal text-white px-4 py-2 rounded-md hover:bg-pivotaAqua text-sm hidden md:flex"
          >
            Switch Role
          </button>
        )}

        {/* Message Icon */}
        <div className="bg-pivotaWhite rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-pivotaTeal hover:bg-opacity-10">
          <Image src="/message.png" alt="message" width={20} height={20} />
        </div>

        {/* Announcement Icon with Badge */}
        <div className="bg-pivotaWhite rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative hover:bg-pivotaTeal hover:bg-opacity-10">
          <Image src="/announcement.png" alt="announcement" width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-pivotaGold text-pivotaWhite rounded-full text-sm">
            1
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <span className="text-sm leading-3 font-medium text-pivotaTeal capitalize">{session?.user.firstName}</span>
          <span className="text-[12px] text-pivotaTeal text-right">{session?.user.role}</span>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-pivotaTeal mr-3">
          <Image src="/allan.jpg" alt="avatar" width={36} height={36} className="object-cover" />
        </div>

        {/* Floating Action Button for small screens */}
        {session && (
          <div className="fixed bottom-20 right-10 md:hidden flex items-center justify-center space-x-2 z-50">
            {/* Text next to the FAB */}
            <span className="text-pivotaTeal font-medium text-sm">Post Ad</span>

            {/* FAB with pulsating animation */}
            <button
              onClick={() => setIsAdModalOpen(true)}
              className="bg-pivotaTeal text-white p-4 rounded-full shadow-lg hover:bg-pivotaAqua pulsate"
            >
              <FaPlusCircle size={30} />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {session ? (
        <AuthenticatedPostAdModal
          isOpen={isAdModalOpen}
          onClose={() => setIsAdModalOpen(false)}
          userRole={validUserRole}
        />
      ) : (
        <PostAdModal
          isOpen={isAdModalOpen}
          onClose={() => setIsAdModalOpen(false)}
          isAuthenticated={false}
        />
      )}
    </>
  );
};

export default NavBarDashboardClient;
