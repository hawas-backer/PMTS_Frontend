import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { Home, Calendar, BookOpen, BarChart3, Pen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();

  const navItems = [
    { id: "", icon: Home, label: "Home" },
    { id: "aptitude", icon: Pen, label: "Aptitude Test" },
    { id: "events", icon: Calendar, label: "Events" },
    { id: "resources", icon: BookOpen, label: "Resources" },
    { id: "results", icon: BarChart3, label: "Placement Results" },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Top Header */}
      <Header userrole={"Coordinator"} />

      {/* Main Content - Flexbox Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Navbar) */}
        <nav className="w-20 bg-[#1a1f2c] py-4 flex flex-col items-center space-y-4 h-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                navigate(item.id);
              }}
              className={`p-3 rounded-lg transition-colors duration-200 ${
                activeTab === item.id
                  ? "bg-red-600 text-gray-200"
                  : "text-gray-400 hover:bg-gray-700"
              }`}
              title={item.label}
            >
              <item.icon size={24} />
            </button>
          ))}
        </nav>

        {/* Main Content Area */}
       
          <Outlet />
        
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;