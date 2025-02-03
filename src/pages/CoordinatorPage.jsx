import React, { useState } from 'react';
import Events from '../components/Coordinator/Events';
import AptitudeTest from '../components/Coordinator/AptitudeTest'
import Resources from '../components/Coordinator/Resources';
import PlacementResults from '../components/Coordinator/PlacementResults';
import { 
  Home, BrainCircuit, Calendar, BookOpen, 
  BarChart3, Settings, Plus 
} from 'lucide-react';

const CoordinatorPage = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showModal, setShowModal] = useState(false);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'aptitude', icon: BrainCircuit, label: 'Aptitude Test' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'resources', icon: BookOpen, label: 'Resources' },
    { id: 'results', icon: BarChart3, label: 'Placement Results' },
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
          {activeTab === 'aptitude' && <AptitudeTest />}
          {activeTab === 'events' && <Events />}
          {activeTab === 'resources' && <Resources />}
          {activeTab === 'results' && <PlacementResults />}
        </div>
      </div>
    </div>
  );
};

export default CoordinatorPage;