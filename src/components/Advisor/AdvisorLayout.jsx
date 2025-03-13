import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { Home, ClipboardList, BarChart, Pen, List } from 'lucide-react';

const AdvisorLayout = () => {
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: '', icon: Home, label: 'Home' },
    { id: 'pendingRequests', icon: ClipboardList, label: 'Pending requests' },
    { id: 'viewAnalysis', icon: BarChart, label: 'View Analysis' },
    { id: 'add-students', icon: Pen, label: 'Add student details' },
    { id: 'student-list', icon: List, label: 'Student List' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (id === 'edit-student') {
      alert('Please use the student list to edit a specific student');
      return;
    }
    navigate(`/Advisor/${id}`);
  };

  // Construct currentRoute for Header
  const currentRoute = location.pathname.replace('/Advisor/', '');
  const displayRoute = currentRoute === '' ? 'Home' : currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1).replace(/-/g, ' ');

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0f1218]">
      <Header currentRoute={`/Advisor/${displayRoute}`} />

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

export default AdvisorLayout;