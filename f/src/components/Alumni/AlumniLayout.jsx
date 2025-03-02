import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../alumni/Sidebar";

const AlumniLayout = ({ username, profilePic, unreadCount }) => {
  const [activeTab, setActiveTab] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md shadow-md border-b border-gray-700">
        <Header username={username} profilePic={profilePic} userrole={'Alumni'}/>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 fixed h-full bg-gray-800 shadow-lg border-r border-gray-700">
          <Sidebar unreadCount={unreadCount} setActiveTab={setActiveTab} activeTab={activeTab} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-800/50 md:ml-64 p-6 relative overflow-y-auto min-h-screen">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-gray-900/90 backdrop-blur-md py-4 border-t border-gray-700 text-center text-sm">
        <Footer />
      </footer>

      {/* Background Elements */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 animate-float rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Tailwind Custom Styles */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default AlumniLayout;