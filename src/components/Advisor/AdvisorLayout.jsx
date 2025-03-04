import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { 
  Home, ClipboardList, BarChart,Pen
} from 'lucide-react';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdvisorLayout = () => {
    const [activeTab, setActiveTab] = useState('');
    const navigate=useNavigate()
  
    const navItems = [
      { id: '', icon: Home, label: 'Home' },
      { id: 'pendingRequests', icon: ClipboardList, label: 'Pending requests' },
      { id: 'viewAnalysis', icon: BarChart, label: 'View Analysis' },
      { id: 'addStudent', icon:Pen, label: 'Add student details' },
  
    ];

  return(
  <div className="flex flex-col h-screen w-screen bg-[#0f1218]">
    <Header userrole={'Advisor'}/>

    <div className='flex flex-1  bg-[#0f1218]'>
    <div className="w-16 bg-[#1a1f2c] py-4 flex flex-col items-center space-y-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {setActiveTab(item.id);navigate(item.id)}}
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

    <Footer className=" relative mt-auto bg-gray-900/90 backdrop-blur-md py-4 border-t border-gray-700 text-center text-sm"/>
  </div>

  );
};

export default AdvisorLayout;