import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../alumni/Sidebar';

const AlumniLayout = () => {
  const location = useLocation();
  const initialTab = location.pathname.startsWith('/alumni')
    ? location.pathname.replace('/alumni/', '').replace('/alumni', '')
    : '';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const currentTab = location.pathname.startsWith('/alumni')
      ? location.pathname.replace('/alumni/', '').replace('/alumni', '')
      : '';
    setActiveTab(currentTab);
  }, [location.pathname]);

  // Construct currentRoute for Header
  const currentRoute = location.pathname.startsWith('/alumni')
    ? `/Alumni/${activeTab || 'Dashboard'}`
    : '/Alumni';

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <header className="fixed top-0 left-0 right-0 z-20 shadow-md">
        <Header currentRoute={currentRoute} />
      </header>

      <div className="flex flex-1 pt-16">
        <aside className="w-16 fixed top-16 bottom-0 bg-gray-950 border-r border-gray-800 shadow-sm z-10">
          <Sidebar unreadCount={0} setActiveTab={setActiveTab} activeTab={activeTab} />
        </aside>

        <main className="flex-1 ml-16 p-4 sm:p-6 lg:p-8 bg-gray-950">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default AlumniLayout;