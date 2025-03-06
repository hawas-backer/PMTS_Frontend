// frontend/src/components/Coordinator/CoordinatorLayout.jsx
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../Header';
import Footer from '../Footer';
import { Home, Calendar, BarChart3, Users, FileText } from 'lucide-react';

const CoordinatorLayout = () => {
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate();
  const { user, role } = useAuth(); // Get user and role from AuthContext

  const navItems = [
    { id: '', icon: Home, label: 'Home' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
    { id: 'students', icon: Users, label: 'Students' },
    { id: 'documents', icon: FileText, label: 'Documents' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    navigate(`/Coordinator/${id}`); // Prepend '/Coordinator/' to match nested route structure
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0f1218]">
      <Header
        name={user?.name || user?.email} // Prefer name, fallback to email (from reference)
        userrole={role} // Use role from useAuth
        profilePic={null}
        unreadCount={0}
        email={user?.email || 'N/A'} // Pass email (from reference)
        batch={user?.batch || 'N/A'} // Pass batch (from reference)
      />

      <div className="flex flex-1 bg-[#0f1218]">
        <div className="w-16 bg-[#1a1f2c] py-4 flex flex-col items-center space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`p-3 rounded-lg transition-colors duration-200 ${
                activeTab === item.id
                  ? 'bg-red-600 text-gray-200'
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
              title={item.label}
            >
              <item.icon size={24} />
            </button>
          ))}
        </div>
        <main className="container h-screen w-full overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <Footer className="mt-auto bg-gray-900/90 backdrop-blur-md py-4 border-t border-gray-700 text-center text-sm" />
    </div>
  );
};

export default CoordinatorLayout;