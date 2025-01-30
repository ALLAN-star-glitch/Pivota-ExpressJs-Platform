"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MAIN",
    items: [
      {
        icon: "/home.png",
        label: "Dashboard",
        href: "/admin",
        visible: ["super_admin", "admin", "service_provider", "job_seeker", "landlord"],
      },
    ],
  },
  {
    title: "USER MANAGEMENT",
    items: [
      {
        icon: "/profile.png",
        label: "Users",
        href: "/admin/users",
        visible: ["super_admin", "admin"],
      },
    ],
  },
  {
    title: "SERVICES",
    items: [
      {
        icon: "/parent.png",
        label: "Service Listings",
        href: "/admin/services",
        visible: ["super_admin", "admin", "service_provider"],
      },
      {
        icon: "/student.png",
        label: "Bookings",
        href: "/admin/bookings",
        visible: ["super_admin", "admin", "service_provider"],
      },
    ],
  },
  {
    title: "JOBS",
    items: [
      {
        icon: "/subject.png",
        label: "Job Listings",
        href: "/admin/jobs",
        visible: ["super_admin", "admin", "job_seeker"],
      },
      {
        icon: "/singleLesson.png",
        label: "Applications",
        href: "/admin/applications",
        visible: ["super_admin", "admin", "job_seeker"],
      },
    ],
  },
  {
    title: "RENTALS",
    items: [
      {
        icon: "/teacher.png",
        label: "Property Listings",
        href: "/admin/properties",
        visible: ["super_admin", "admin", "landlord"],
      },
      {
        icon: "/filter.png",
        label: "Tenant Inquiries",
        href: "/admin/inquiries",
        visible: ["super_admin", "admin", "landlord"],
      },
    ],
  },
  {
    title: "COMMUNICATION",
    items: [
      {
        icon: "/message.png",
        label: "Messages",
        href: "/messages",
        visible: ["super_admin", "admin", "service_provider", "job_seeker", "landlord"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/announcements",
        visible: ["super_admin", "admin"],
      },
    ],
  },
  {
    title: "ANALYTICS",
    items: [
      {
        icon: "/analytics.png",
        label: "Reports",
        href: "/admin/reports",
        visible: ["super_admin", "analytics_admin"],
      },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      {
        icon: "/setting.png",
        label: "Platform Settings",
        href: "/admin/settings",
        visible: ["super_admin"],
      },
      {
        icon: "/profile.png",
        label: "Profile Settings",
        href: "/profile",
        visible: ["super_admin", "admin", "service_provider", "job_seeker", "landlord"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        action: "logout",
        visible: ["super_admin", "admin", "service_provider", "job_seeker", "landlord"],
      },
    ],
  },
];

const Menu = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((item) => (
        <div className="flex flex-col gap-2" key={item.title}>
          <span className="hidden lg:block font-light text-gray-500 my-4">{item.title}</span>
          {item.items.map((i) =>
            i.action === "logout" ? (
              <button
                key={i.label}
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center lg:justify-start text-white gap-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Image src={i.icon} alt={i.label} width={25} height={25} />
                <span className="hidden lg:block">{i.label}</span>
              </button>
            ) : i.href? (
              <Link
                href={i.href}
                key={i.label}
                className="flex items-center justify-center lg:justify-start text-white gap-4 py-2 rounded-lg hover:bg-pivotaTeal transition-colors"
              >
                <Image src={i.icon} alt={i.label} width={25} height={25} />
                <span className="hidden lg:block">{i.label}</span>
              </Link>
            ):null
          )}
        </div>
      ))}

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
