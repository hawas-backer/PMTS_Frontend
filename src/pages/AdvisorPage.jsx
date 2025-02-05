import React, { useState } from 'react';
import HomePage from './HomePage';
import ViewAnalysis from '../components/Advisor/ViewAnalysis';
import PendingRequests from '../components/Advisor/PendingRequests';
import { 
  Home, ClipboardList, BarChart
} from 'lucide-react';


const CoordinatorPage = () => {
  const [activeTab, setActiveTab] = useState('home');
 

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'aptitude', icon: ClipboardList, label: 'Pending requests' },
    { id: 'events', icon: BarChart, label: 'View Analysis' },

  ];

  return (
    <div className="flex h-screen w-screen bg-[#0f1218]">
      {/* Sidebar */}
      <div className="w-16 bg-[#1a1f2c] py-4 flex flex-col items-center space-y-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#0f1218]">
        <div className="flex-1 overflow-auto">
        {activeTab === 'home' && <HomePage/>}
          {activeTab === 'aptitude' && <ViewAnalysis/>}
          {activeTab === 'events' && <PendingRequests />}

        </div>
      </div>
    </div>
  );
};

export default CoordinatorPage;