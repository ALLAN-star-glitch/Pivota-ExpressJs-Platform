import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaBars, FaTimes, FaBriefcase, FaHome, FaInfoCircle, FaDollarSign, FaTools } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PostAdModal from "@/components/modals/AuthenticatedPostAdModal";
import UnauthenticatedPostAdModal from "@/components/modals/UnauthenticatedPostAdModal";

const NavbarWebsite: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [isUnauthenticatedModalOpen, setIsUnauthenticatedModalOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "Services Providers", path: "/services-providers", icon: <FaTools size={24} /> },
    { name: "Jobs", path: "/jobs", icon: <FaBriefcase size={24} /> },
    { name: "Houses", path: "/houses", icon: <FaHome size={24} /> },
    { name: "About", path: "/about", icon: <FaInfoCircle size={24} /> },
    { name: "Pricing", path: "/pricing", icon: <FaDollarSign size={24} /> }
  ];

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-20 text-pivotaTeal">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 text-3xl md:text-4xl font-bold cursor-pointer" onClick={() => router.push("/") }>
          <Image src="/mylogo.png" alt="logo" width={60} height={40} />
          <span className="text-2xl md:text-3xl lg:text-4xl">Pivota</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6">
          {menuItems.map((item) => (
            <Button key={item.path} variant="ghost" className="hover:text-pivotaGold flex items-center gap-3 text-lg" onClick={() => router.push(item.path)}>
              {item.icon} <span>{item.name}</span>
            </Button>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button className="bg-pivotaGold text-black px-4 py-2 rounded-lg hover:bg-pivotaAqua" onClick={() => setIsAdModalOpen(true)}>
            Post Ad
          </Button>
          
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Button variant="ghost" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <FaUserCircle className="w-12 h-12 md:w-14 md:h-14" />
            </Button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-30">
                <Button variant="ghost" className="w-full hover:bg-pivotaAqua" onClick={() => router.push("/dashboard")}>Dashboard</Button>
                <Button variant="ghost" className="w-full hover:bg-pivotaAqua" onClick={() => router.push("/profile")}>Profile</Button>
                <Button variant="ghost" className="w-full hover:bg-pivotaAqua" onClick={() => setShowLogoutModal(true)}>Logout</Button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <Button className="lg:hidden" variant="ghost" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6">
          <Button variant="ghost" className="w-full text-left flex justify-between items-center text-lg py-4 hover:bg-pivotaAqua" onClick={() => setIsMobileMenuOpen(false)}>
            Close <FaTimes size={24} />
          </Button>
          <div className="flex flex-col gap-6 mt-6">
            {menuItems.map((item) => (
              <Button key={item.path} variant="ghost" className="w-full text-left text-lg flex items-center gap-4 py-4 hover:bg-pivotaAqua" onClick={() => {
                router.push(item.path);
                setIsMobileMenuOpen(false);
              }}>
                {item.icon} <span>{item.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <UnauthenticatedPostAdModal isOpen={isUnauthenticatedModalOpen} onClose={() => setIsUnauthenticatedModalOpen(false)} />
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm text-center">
            <h2 className="text-lg font-semibold">Confirm Logout</h2>
            <p className="text-gray-600 mt-2">Are you sure you want to log out?</p>
            <div className="mt-4 flex justify-center gap-4">
              <Button variant="ghost" onClick={() => setShowLogoutModal(false)}>Cancel</Button>
              <Button className="bg-red-600 text-white" onClick={() => router.push("/login")}>Logout</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarWebsite;
