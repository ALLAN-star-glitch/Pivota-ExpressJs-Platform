// components/common/LayoutChecker.tsx
"use client";  // This ensures it's a client-side component

import { usePathname } from "next/navigation";
import NavbarWebsite from "../website/navbar/NavbarWebsite";
import Footer from "../website/footer/Footer";

interface LayoutCheckerProps {
  children: React.ReactNode;
}

const LayoutChecker = ({ children }: LayoutCheckerProps) => {
  const pathname = usePathname();  // Using the client-side hook to get the current path

  // Check if the current route is the dashboard or not
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  return (
    <>
      {!isDashboardRoute && <NavbarWebsite />}
      {children}
      {!isDashboardRoute && <Footer />}
    </>
  );
};

export default LayoutChecker;
