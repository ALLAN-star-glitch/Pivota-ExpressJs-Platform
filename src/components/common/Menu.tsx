"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, LayoutDashboard, Briefcase, Wrench, Home, User, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { selectUserRoles } from "@/lib/features/authSelector";
import { logout, setUser } from "@/lib/features/auth/authslice";
import LogoutModal from "../LogoutModal";

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
      { icon: Briefcase, label: "Jobs", visible: ["employer"], subItems: [
        { label: "Post New Job", href: "/dashboard/jobs/post" },
        { label: "Job Applications", href: "/dashboard/jobs/applications" },
        { label: "Active Job Listings", href: "/dashboard/jobs/active" },
      ] },
      { icon: Wrench, label: "Services", visible: ["serviceProvider"], subItems: [
        { label: "Post New Service", href: "/dashboard/services/post" },
        { label: "Service Listings", href: "/dashboard/services/listings" },
        { label: "Service Requests", href: "/dashboard/services/requests" },
      ] },
      { icon: Home, label: "Properties", visible: ["landlord"], subItems: [
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

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("refresh_token");
    dispatch(logout());
    router.push("/login");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("authState");
      if (storedAuth) {
        dispatch(setUser(JSON.parse(storedAuth)));
      }
    }
  }, [dispatch]);

  const userRoles = useAppSelector(selectUserRoles);
  const visibleMenuItems = menuItems.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.visible?.some((role) => userRoles.includes(role))
    ),
  }));

  return (
    <div className="mt-4 text-sm text-pivotaNavy">
      {visibleMenuItems.map((section) =>
        section.items.length > 0 ? (
          <div className="flex flex-col gap-2" key={section.title}>
            <span className="lg:block font-light text-gray-400 my-4">
              {section.title}
            </span>
            {section.items.map((item) => {
              const isOpen = openDropdown === item.label;

              return item.action === "logout" ? (
                <button
                  key={item.label}
                  onClick={() => setShowModal(true)}
                  className="flex items-center justify-center lg:justify-start text-gray-600 gap-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <item.icon size={20} color="#FF6F61" />
                  <span className="lg:block">{item.label}</span>
                </button>
              ) : (
                <div key={item.label} className="w-full">
                  <div
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    className={`flex items-center justify-between gap-4 py-2 px-4 rounded-lg cursor-pointer transition-colors w-full ${
                      isOpen ? "bg-gray-200" : "hover:bg-pivotaAqua"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={20} color="#008080" />
                      <span className="lg:block">{item.label}</span>
                    </div>
                    {item.subItems && (
                      isOpen ? <ChevronUp size={18} color="#008080" /> : <ChevronDown size={18} color="#008080" />
                    )}
                  </div>

                  {isOpen && item.subItems && (
                    <div className="ml-6 bg-gray-100 rounded-lg p-2 mt-2 transition-all">
                      {item.subItems.map((subItem, index) => (
                        <Link
                          key={index}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-teal-200 rounded-md"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : null
      )}
      <LogoutModal show={showModal} onClose={() => setShowModal(false)} onConfirm={handleLogout} />
    </div>
  );
};

export default Menu;
