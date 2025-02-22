"use client";
import { useState } from "react";
import Menu from "@/components/common/Menu";
import { X, Menu as MenuIcon } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button (Visible on small screens) */}
      <button
        className="lg:hidden fixed top-24 left-4 bg-pivotaTeal text-white p-3 rounded-full shadow-md 
        transition-all duration-300 hover:bg-pivotaPrimaryDark z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed ${isOpen ? "top-[20%]" : "top-[18%]"} left-0 h-[calc(100vh-22%)] overflow-y-auto bg-white 
        shadow-xl p-4 rounded-2xl transition-transform duration-300 
        ${isOpen ? "translate-x-0 z-[60]" : "-translate-x-full"} 
        lg:translate-x-0 lg:w-[15%] lg:mx-3 lg:my-4`}
      >
        <Menu />
      </aside>
    </>
  );
};

export default Sidebar;
