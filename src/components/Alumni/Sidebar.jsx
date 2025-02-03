import React, { useState } from "react";
import { Menu, X, Home, Briefcase, Book, Users, LogOut, Bell, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ unreadCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-10">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white h-full w-64 p-5 fixed top-16 left-0 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 border-r border-gray-700`}
      >
        {/* Close Button for Mobile */}
        <button className="text-white absolute top-4 right-4 md:hidden" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>
        
        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          <NavItem to="/Alumni/Home" icon={<Home />} label="Home" />
          <NavItem to="/alumni/ShareOpportunities" icon={<Briefcase />} label="Share Opportunities" />
          <NavItem to="/alumni/ShareResources" icon={<Book />} label="Share Resources" />
          <NavItem to="/alumni/Events" icon={<Calendar />} label="Events" />
          <NavItem to="/alumni/Networking" icon={<Users />} label="Networking" />
          <NavItem to="/alumni/Notifications" icon={<Bell />} label="Notifications" unreadCount={unreadCount} />
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <button className="fixed top-20 left-4 text-gray-900 bg-gray-200 p-2 rounded-full shadow-lg md:hidden" onClick={() => setIsOpen(true)}>
        <Menu size={24} />
      </button>
    </div>
  );
};

// Reusable NavItem Component
const NavItem = ({ to, icon, label, unreadCount }) => (
  <Link to={to} className="flex items-center text-gray-300 p-2 rounded hover:bg-gray-700 relative">
    <div className="mr-2">{icon}</div>
    {label}
    {unreadCount > 0 && (
      <span className="absolute top-1 right-1 inline-block w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full text-center">
        {unreadCount}
      </span>
    )}
  </Link>
);

export default Sidebar;
