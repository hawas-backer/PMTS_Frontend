import React from 'react';
import { Home, Briefcase, Book, Users, Bell, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ unreadCount, setActiveTab, activeTab }) => {
  const navigate = useNavigate();
  const navItems = [
    { id: '', icon: Home, label: 'Home' },
    { id: 'shareResources', icon: Book, label: 'Resources' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'shareOpportunities', icon: Briefcase, label: 'Opportunities' },
    { id: 'Networking', icon: Users, label: 'Networking' },
    { id: 'Notifications', icon: Bell, label: 'Notifications' },
  ];

  return (
    <div className="bg-gray-800">
      <div className="fixed top-2 left-0 h-[calc(100vh-0.5rem)] w-16 bg-gray-800">
        <div className="flex flex-col items-center py-24 space-y-4">
          {navItems.map((item) => (
            <div key={item.id} className="relative group">
              <button
                onClick={() => {
                  const route = item.id === '' ? '/alumni' : `/alumni/${item.id}`;
                  setActiveTab(item.id); // Keep activeTab as the raw id
                  navigate(route); // Navigate to /alumni/<id>
                }}
                className={`p-2 rounded w-full h-full flex items-center justify-center ${
                  activeTab === item.id ? 'bg-blue-500 text-white' : 'text-gray-400 hover:bg-gray-700'
                }`}
              >
                <item.icon size={20} />
              </button>
              <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white text-xs p-1 rounded hidden group-hover:block">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;