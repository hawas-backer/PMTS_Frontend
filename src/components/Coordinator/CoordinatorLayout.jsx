import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../Header';
import Footer from '../Footer';
import { Home, Calendar, BarChart3,BarChart, Users, FileText, Briefcase } from 'lucide-react';

const CoordinatorLayout = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate();
  const { user, role } = useAuth();

  // Extract the current route for display in header
  const currentRoute = location.pathname.replace('/Coordinator/', '');
  const displayRoute = currentRoute === '' ? 'Dashboard' : currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1).replace(/-/g, ' ');

  useEffect(() => {
    // Set active tab based on current path
    const path = location.pathname.split('/').pop();
    setActiveTab(path || '');
  }, [location]);

  const navItems = [
    { id: '', icon: Home, label: 'Dashboard' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'viewAnalysis', icon: BarChart, label: 'View Analysis' },
    { id: 'results', icon: FileText, label: 'Placement Results' }, 
    { id: 'placement-drives', icon: Briefcase, label: 'Placement Drives' }, // Updated from addPlacementDrive
    { id: 'aptitude-tests', icon: BarChart3, label: 'Aptitude test' },
    { id: 'resources', icon: Users, label: 'resources' },
    { id: 'advisorManagement', icon: FileText, label: 'advisor management' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    navigate(`/Coordinator/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <Header currentRoute={`/Coordinator/${displayRoute}`} />

      <div className="flex flex-1 overflow-hidden">
        {/* Side navigation */}
        <div className="w-16 md:w-20 bg-gray-900 shadow-md py-4 flex flex-col items-center space-y-4 fixed h-full">
          {navItems.map((item) => (
            <div key={item.id} className="w-full flex flex-col items-center">
              <button
                onClick={() => handleNavClick(item.id)}
                className={`p-3 rounded-lg transition-all duration-200 flex flex-col items-center ${
                  activeTab === item.id
                    ? 'bg-gray-800 text-gray-100'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
                }`}
                title={item.label}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-poppins font-light mt-1 hidden md:block text-center">
                  {item.label.split(' ')[0]}
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-950 p-4 ml-16 md:ml-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4">
              <h2 className="text-xl font-poppins font-bold text-gray-200">{displayRoute}</h2>
              <p className="text-xs font-poppins font-light text-gray-500">
                Coordinator Portal / {displayRoute}
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg shadow-md border border-gray-800 p-4">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      <Footer className="bg-gray-950 text-gray-500 py-3 px-6 border-t border-gray-800 text-center text-xs font-poppins" />
    </div>
  );
};

export default CoordinatorLayout;