'use client'

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTachometerAlt, FaBookOpen, FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: <FaTachometerAlt className="w-5 h-5 mr-3" /> },
    { label: "Courses", href: "/admin/course", icon: <FaBookOpen className="w-5 h-5 mr-3" /> },
  ];

  return (
    <div className="w-full md:min-h-[90.5vh] md:w-64 bg-gray-900 text-white p-4 md:p-6">
      {/* Mobile toggle button */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-400">Admin Panel</h2>
        <button
          className="text-white bg-blue-600 p-2 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop Title */}
      <h2 className="hidden md:block text-2xl font-bold mb-8 text-center text-blue-400">Admin Panel</h2>

      {/* Sidebar nav - always visible on desktop, toggled on mobile */}
      <nav
        className={`space-y-4 ${
          isOpen ? "block" : "hidden"
        } md:block transition-all duration-300`}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              pathname === item.href
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setIsOpen(false)} // close after click on mobile
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
