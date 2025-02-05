import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../alumni/Sidebar";
import { useState } from "react";

const AlumniLayout = ({ username, profilePic, unreadCount }) => {
  const [activeTab,setActiveTab] = useState('')
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-700">
        <Header username={username} profilePic={profilePic} />
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Sidebar unreadCount={unreadCount} setActiveTab={setActiveTab} activeTab={activeTab}  />

        {/* Main Content */}
        <main className="flex-1 bg-gray-800/50 backdrop-blur-md md:ml-64 p-6 relative overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-gray-900/80 backdrop-blur-md py-4 border-t border-gray-700">
        <Footer />
      </footer>

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-[-1] overflow-hidden perspective-1000">
        {/* Floating 3D Shapes */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 animate-float-3d rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `rotate3d(${Math.random()}, ${Math.random()}, ${Math.random()}, 45deg)`,
            }}
          ></div>
        ))}

        {/* Rotating Triangles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 animate-spin-slow clip-triangle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}

        {/* Glowing Lines */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent animate-glow-line"></div>
      </div>

      {/* Tailwind Custom Styles */}
      <style>
        {`
          @keyframes float-3d {
            0% { transform: translate3d(0, 0, 0) rotate3d(1, 1, 1, 0deg); }
            50% { transform: translate3d(0, -20px, 50px) rotate3d(1, 1, 1, 180deg); }
            100% { transform: translate3d(0, 0, 0) rotate3d(1, 1, 1, 360deg); }
          }

          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes glow-line {
            0% { opacity: 0; transform: translateX(-100%); }
            50% { opacity: 1; transform: translateX(0%); }
            100% { opacity: 0; transform: translateX(100%); }
          }

          .animate-float-3d {
            animation: float-3d 8s infinite ease-in-out;
          }

          .animate-spin-slow {
            animation: spin-slow 20s infinite linear;
          }

          .animate-glow-line {
            animation: glow-line 10s infinite linear;
          }

          .clip-triangle {
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          }

          .perspective-1000 {
            perspective: 1000px;
          }
        `}
      </style>
    </div>
  );
};

export default AlumniLayout;