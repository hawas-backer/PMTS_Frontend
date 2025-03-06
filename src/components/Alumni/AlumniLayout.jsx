import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../alumni/Sidebar';
import { useAuth } from '../../context/AuthContext';

const AlumniLayout = ({ username, profilePic, unreadCount }) => {
  const location = useLocation();
  // Strip '/alumni/' for activeTab, but pass full path for currentRoute
  const initialTab = location.pathname.startsWith('/alumni')
    ? location.pathname.replace('/alumni/', '').replace('/alumni', '')
    : '';
  const [activeTab, setActiveTab] = useState(initialTab);
  const { user, role } = useAuth();

  useEffect(() => {
    const currentTab = location.pathname.startsWith('/alumni')
      ? location.pathname.replace('/alumni/', '').replace('/alumni', '')
      : '';
    setActiveTab(currentTab);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-300">
      <header className="fixed top-0 left-0 right-0 bg-gray-900 z-20">
        <Header
          name={user?.name || user?.email}
          userrole={role}
          profilePic={null}
          unreadCount={unreadCount || 0}
          newMessageCount={3}
          email={user?.email || 'N/A'}
          batch={user?.batch || 'N/A'}
          currentRoute={location.pathname} // Pass full path
        />
      </header>

      <div className="flex flex-1 pt-24">
        <aside className="w-16 fixed top-2 bottom-0 bg-gray-800 z-10">
          <Sidebar unreadCount={unreadCount} setActiveTab={setActiveTab} activeTab={activeTab} />
        </aside>

        <main className="flex-1 ml-16 p-2">
          <Outlet />
        </main>
      </div>

      <footer className="p-2 text-center text-xs text-gray-500">
        <Footer />
      </footer>
    </div>
  );
};

export default AlumniLayout;