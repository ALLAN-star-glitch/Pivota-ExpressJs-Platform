"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, Briefcase, Wrench, Home, User, LogOut 
} from "lucide-react";
import { useDispatch} from "react-redux";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/lib/hooks";

interface MenuItem {
  icon: React.ComponentType<{ size?: number; color?: string }>; 
  label: string;
  href?: string;
  visible: string[];
  subItems?: { label: string; href: string }[];
  action?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuItems: MenuSection[] = [
  {
    title: "DASHBOARD",
    items: [
      { icon: LayoutDashboard, label: "Overview", href: "/dashboard", visible: ["superAdmin", "landlord", "employer", "user", "serviceProvider"] },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { icon: Briefcase, label: "My Jobs", href: "/dashboard/jobs", visible: ["employer"], subItems: [
        { label: "Post New Job", href: "/dashboard/jobs/post" },
        { label: "Job Applications", href: "/dashboard/jobs/applications" },
        { label: "Active Job Listings", href: "/dashboard/jobs/active" },
      ] },
      { icon: Wrench, label: "My Services", href: "/dashboard/services", visible: ["serviceProvider"], subItems: [
        { label: "Post New Service", href: "/dashboard/services/post" },
        { label: "Service Listings", href: "/dashboard/services/listings" },
        { label: "Service Requests", href: "/dashboard/services/requests" },
      ] },
      { icon: Home, label: "My Properties", href: "/dashboard/properties", visible: ["landlord"], subItems: [
        { label: "Add New Property", href: "/dashboard/properties/add" },
        { label: "Property Listings", href: "/dashboard/properties/listings" },
        { label: "Property Inquiries", href: "/dashboard/properties/inquiries" },
      ] },
    ],
  },
  {
    title: "EXPLORE",
    items: [
      { icon: Briefcase, label: "Bookings", href: "/dashboard/bookings", visible: ["user"] },
      { icon: Wrench, label: "Payments", href: "/dashboard/payments", visible: ["user"] },
      { icon: Home, label: "Job Applications", href: "/dashboard/applications", visible: ["user"] },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { icon: User, label: "Profile Settings", href: "/dashboard/profile", visible: ["superAdmin", "landlord", "employer", "user", "serviceProvider"] },
      { icon: LogOut, label: "Logout", action: "logout", visible: ["superAdmin", "landlord", "employer", "user", "serviceProvider"] },
    ],
  },
];

const Menu = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();
  const router = useRouter()

  const handleLogout = ()=>{

    router.push('/login');
  }

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);


   // Get user data from Redux store using useAppSelector
    const userRoles = useAppSelector((state) => state.auth.user?.roles || []);
    const firstName = useAppSelector((state) => state.auth.user?.firstName || "User");
    
  const isFreeUser = userRoles.length === 1 && userRoles.includes("user");

  const visibleMenuItems = menuItems.map((section) => ({
    ...section,
    items: section.items.filter((item) => 
      item.visible?.some((role) => userRoles.includes(role)) &&
      (section.title === "MANAGEMENT" ? (userRoles.some((role) => ["employer", "landlord", "serviceProvider"].includes(role)) || isFreeUser) : true) &&
      (section.title === "EXPLORE" ? isFreeUser : true)
    ),
  }));

  const handleMouseEnter = (itemLabel: string) => {
    if (timer) clearTimeout(timer);
    setActiveMenu(itemLabel);
  };

  const handleMouseLeave = () => {
    const newTimer = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
    setTimer(newTimer);
  };

  const handleClick = (itemLabel: string) => {
    setActiveMenu((prev) => (prev === itemLabel ? null : itemLabel));
  };

  return (
    <div className="mt-4 text-sm text-pivotaNavy">
      {visibleMenuItems.map((section) =>
        section.items.length > 0 ? (
          <div className="flex flex-col gap-2" key={section.title}>
            <span className="hidden lg:block font-light text-gray-400 my-4">
              {section.title}
            </span>
            {section.items.map((item) =>
              item.action === "logout" ? (
                <button
                  key={item.label}
                  onClick={() => setShowModal(true)}
                  className="flex items-center justify-center lg:justify-start text-gray-600 gap-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <item.icon size={20} color="#FF6F61" />
                  <span className="hidden lg:block">{item.label}</span>
                </button>
              ) : item.href ? (
                <div 
                  key={item.label} 
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)} 
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(item.label)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center justify-center lg:justify-start gap-4 py-2 rounded-lg transition-colors ${activeMenu === item.label ? 'bg-pivotaAqua' : 'hover:bg-pivotaAqua'}`}
                  >
                    <item.icon size={20} color="#008080" />
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>

                  {item.subItems && (activeMenu === item.label || window.innerWidth <= 1024) && (
                    <div className="absolute left-full top-0 ml-2 w-48 bg-white shadow-lg rounded-lg z-10">
                      {item.subItems.map((subItem, index) => (
                        <Link
                          key={`${item.label}-${subItem.label}-${index}`}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-teal-100"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : null
            )}
          </div>
        ) : null
      )}

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm text-center">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600 mt-2">Are you sure you want to log out?</p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
