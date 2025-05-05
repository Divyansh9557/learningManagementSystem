'use client'

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTachometerAlt, FaBookOpen,  FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: <FaTachometerAlt className="w-5 h-5 mr-3" /> },
    { label: "Courses", href: "/admin/course", icon: <FaBookOpen className="w-5 h-5 mr-3" /> },
  ];

  return (
    <>
      {/* Mobile Sidebar - Toggled by button */}
      <div className="md:hidden">
        <button
          className=" mt-5 ml-5 z-50 text-white bg-blue-600 p-2 rounded-md shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        {isOpen && (
          <div
            className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-6 shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
          >
            <button
              className="absolute top-4 right-4 text-white p-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>
            <nav className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    pathname === item.href ? "bg-blue-600" : "hover:bg-gray-700"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-[90.5vh] w-64 bg-gray-800 text-white p-6 shadow-lg z-50">
        <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                pathname === item.href ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
