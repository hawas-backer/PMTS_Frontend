import React, { useState } from "react";
import { Menu, X, Home, Briefcase, Book, Users, LogOut, Bell, Calendar } from "lucide-react";
import {  BookOpen,  BarChart3, BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ unreadCount ,setActiveTab,activeTab}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const navItems = [
    { id: '', icon: Home, label: 'Home' },
    { id: 'shareResources', icon: Book, label: 'Share Resources' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'shareOportunities', icon: Briefcase, label: 'Share Oportunities' },
    { id: 'Networking', icon: Users, label: 'Networking' },
    { id: 'Notifications', icon: Bell, label: 'Notifications' },
  ];

  return (
    <div className="relative  z-10 bg-gray-900 h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white h-full w-64 p-5 top-16 left-0 transition-transform duration-300  ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 border-r border-gray-700`}
      >
        {/* Close Button for Mobile */}
        <button className="text-white absolute top-4 right-4 md:hidden" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>
        
        {/* Navigation Links */}
        <div className="flex flex-col text-center ">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => {setActiveTab(item.id);navigate(item.id)}}
            className={`p-3 rounded-lg transition-colors duration-200 flex flex-col-reverse justify-center items-center  ${
              activeTab === item.id
                ? 'bg-red-600 text-gray-200'
                : 'text-gray-400 hover:bg-gray-700'
            }`}
            title={item.label}
          >
            {item.label}
            <item.icon size={24} />
          </button>
        ))}
          </div>

    
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
      <span className="absolute bottom-1 right-1 inline-block w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full text-center">
        {unreadCount}
      </span>
    )}
  </Link>
);

export default Sidebar;
