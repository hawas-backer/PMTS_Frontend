
import  {Outlet}  from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import React, { useState } from 'react';
import { 
  Home, 
  GraduationCap, 
  BookOpen, 
  BarChart3, 
  Calendar, 
  Briefcase, 
  BrainCircuit 
} from 'lucide-react';

const Layout = () => {
  const navigate =useNavigate()
    const [activeTab, setActiveTab] = useState('');
    const [tooltipItem, setTooltipItem] = useState(null);
    const navItems = [
      {
        id: '',
        icon: Home,
        label: 'Home',
        color: 'text-emerald-500',
        labelColor: 'text-emerald-400'
      },
      {
        id: 'placement',
        icon: GraduationCap,
        label: 'Placement Drive',
        color: 'text-blue-500',
        labelColor: 'text-blue-400'
      },
      {
        id: 'resources',
        icon: BookOpen,
        label: 'Resources',
        color: 'text-purple-500',
        labelColor: 'text-purple-400'
      },
      {
        id: 'analytics',
        icon: BarChart3,
        label: 'Analytics',
        color: 'text-yellow-500',
        labelColor: 'text-yellow-400'
      },
      {
        id: 'events',
        icon: Calendar,
        label: 'Events',
        color: 'text-pink-500',
        labelColor: 'text-pink-400'
      },
      {
        id: 'jobs',
        icon: Briefcase,
        label: 'Job Opportunities',
        color: 'text-orange-500',
        labelColor: 'text-orange-400'
      },
      {
        id: 'exam',
        icon: BrainCircuit,
        label: 'Exam Corner',
        color: 'text-red-500',
        labelColor: 'text-red-400'
      }
    ];
  return(
    <div className="flex flex-col h-screen">
    <Header userrole={'Student'} />

    {/* Sidebar and content wrapper */}
    <div className="flex flex-1">
      
      {/* Sidebar */}
      <div className="w-16 bg-[#1a1f2c] h-screen py-4 flex flex-col items-center space-y-4">
        {navItems.map((item) => (
          <div key={item.id} className="relative group">
            <button
              onClick={() => {setActiveTab(item.id);navigate(item.id)}}
              onMouseEnter={() => setTooltipItem(item.id)}
              onMouseLeave={() => setTooltipItem(null)}
              className={`p-3 rounded-lg transition-all duration-200 relative ${
                activeTab === item.id
                  ? 'bg-gray-700 scale-110'
                  : 'hover:bg-gray-700/50 hover:scale-105'
              }`}
            >
              <item.icon
                size={24}
                className={`${item.color} transition-all duration-200 ${
                  activeTab === item.id ? 'stroke-2' : 'stroke-1'
                }`}
              />
            </button>
            
            {/* Tooltip */}
            {tooltipItem === item.id && (
              <div 
                className={`
                  absolute top-1/2 -translate-y-1/2 left-full ml-4 
                  px-3 py-1.5 bg-gray-800 rounded-md 
                  whitespace-nowrap z-50 font-medium 
                  ${item.labelColor}
                `}
              >
                {item.label}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className='h-screen w-full bg-[#1a1f2c] overflow-y-auto'>
        <Outlet />
      </div>
     
   

    </div>

    <Footer />
  </div>
  )
};

export default Layout;