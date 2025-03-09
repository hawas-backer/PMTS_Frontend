import React from 'react';
import { Home, Briefcase, Book, Users, Bell, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ unreadCount, setActiveTab, activeTab }) => {
  const navigate = useNavigate();
  const navItems = [
    { id: '', icon: Home },
    { id: 'shareResources', icon: Book },
    { id: 'events', icon: Calendar },
    { id: 'shareOpportunities', icon: Briefcase },
    { id: 'networking', icon: Users },
    { id: 'notifications', icon: Bell, count: unreadCount },
  ];

  return (
    <div className="h-full flex flex-col items-center py-6 space-y-6 bg-gray-950">
      {navItems.map((item) => (
        <div key={item.id} className="relative group w-full flex justify-center">
          <button
            onClick={() => {
              const route = item.id === '' ? '/alumni' : `/alumni/${item.id}`;
              setActiveTab(item.id);
              navigate(route);
            }}
            className={`p-2 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-gray-800 text-gray-300'
                : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
            }`}
            aria-label={`Navigate to ${item.id === '' ? 'Home' : item.id.replace('share', '').replace('Opportunities', 'Jobs')}`}
          >
            <item.icon size={20} />
            {item.count > 0 && (
              <span className="absolute -top-1 -right-1 bg-gray-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {item.count}
              </span>
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;