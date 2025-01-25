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
        href: "/logout",
        visible: ["super_admin", "admin", "service_provider", "job_seeker", "landlord"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((item) => (
        <div className="flex flex-col gap-2" key={item.title}>
          <span className="hidden lg:block font-light text-gray-500 my-4">
            {item.title}
          </span>
          {item.items.map((i) => (
            <Link
              href={i.href}
              key={i.label}
              className="flex items-center justify-center lg:justify-start text-white gap-4 py-2 rounded-lg hover:bg-pivotaTeal hover:text-pivotaWhite transition-colors"
            >
              {/* Icon with white color */}
              <Image
                src={i.icon}
                alt={i.label}
                width={25}
                height={25}
                className="text-white transition-colors duration-200 hover:filter hover:brightness-110"
              />
              <span className="hidden lg:block">{i.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
