"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface MenuItem {
  icon: string;
  label: string;
  href?: string;
  action?: string;
  visible?: string[]; // Roles allowed to see this item
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

// Define menu structure
const menuItems: MenuSection[] = [
  {
    title: "MAIN",
    items: [
      {
        icon: "/dashboard.svg",
        label: "Dashboard",
        href: "/admin",
        visible: ["superAdmin", "landlord", "employer", "user", "serviceProvider"],
      },
    ],
  },
  {
    title: "USER MANAGEMENT",
    items: [
      {
        icon: "/user.svg",
        label: "Users",
        href: "/admin/users",
        visible: ["superAdmin"],
      },
    ],
  },
  {
    title: "JOBS",
    items: [
      {
        icon: "/joblistings.svg",
        label: "Job Listings",
        href: "/admin/job-listings",
        visible: ["employer", "superAdmin", "user"],
      },
    ],
  },
  {
    title: "SERVICES",
    items: [
      {
        icon: "/services.svg",
        label: "Service Listings",
        href: "/admin/services",
        visible: ["serviceProvider", "superAdmin", "user"],
      },
    ],
  },
  {
    title: "RENTALS",
    items: [
      {
        icon: "/properties.svg",
        label: "Property Listings",
        href: "/admin/properties",
        visible: ["superAdmin", "landlord", "user"],
      },
      {
        icon: "/properties-enquiries.svg",
        label: "Tenant Inquiries",
        href: "/admin/inquiries",
        visible: ["superAdmin", "landlord"],
      },
    ],
  },
  {
    title: "COMMUNICATION",
    items: [
      {
        icon: "/messages.svg",
        label: "Messages",
        href: "/messages",
        visible: ["superAdmin", "landlord", "employer", "user", "serviceProvider"],
      },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      {
        icon: "/platformsettings.png",
        label: "Platform Settings",
        href: "/admin/settings",
        visible: ["superAdmin"],
      },
      {
        icon: "/profilesettings.svg",
        label: "Profile Settings",
        href: "/profile",
        visible: ["superAdmin", "landlord", "employer", "user", "serviceProvider"],
      },
      {
        icon: "/logout.svg",
        label: "Logout",
        action: "logout",
        visible: ["superAdmin", "landlord", "employer", "user", "serviceProvider"],
      },
    ],
  },
];

const Menu = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Ensure the user always has at least the "user" role
  const userRoles: string[] = session?.user?.roles || ["user"];

  // Filter menu items based on user roles
  const visibleMenuItems = menuItems.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.visible?.some((role) => userRoles.includes(role))
    ),
  }));

  return (
    <div className="mt-4 text-sm">
      {visibleMenuItems.map(
        (section) =>
          section.items.length > 0 && (
            <div className="flex flex-col gap-2" key={section.title}>
              <span className="hidden lg:block font-light text-gray-300 my-4">
                {section.title}
              </span>
              {section.items.map((item) =>
                item.action === "logout" ? (
                  <button
                    key={item.label}
                    onClick={() => setShowModal(true)}
                    className="flex items-center justify-center lg:justify-start text-white gap-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Image src={item.icon} alt={item.label} width={25} height={25} />
                    <span className="hidden lg:block">{item.label}</span>
                  </button>
                ) : item.href ? (
                  <Link
                    href={item.href}
                    key={item.label}
                    className="flex items-center justify-center lg:justify-start text-white gap-4 py-2 rounded-lg hover:bg-pivotaTeal transition-colors"
                  >
                    <Image src={item.icon} alt={item.label} width={35} height={35} />
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
                ) : null
              )}
            </div>
          )
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
                onClick={() => signOut({ callbackUrl: "/login" })}
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
