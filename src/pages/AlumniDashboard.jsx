import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ShareOpportunities from '../components/Alumni/ShareOpportunities';
import ShareResources from '../components/Alumni/ShareResources';
import Events from '../components/Alumni/Events';
import Networking from '../components/Alumni/Networking';
import Notifications from '../components/Alumni/Notifications';
import Sidebar from '../components/Alumni/Sidebar'; // Import the Sidebar component
import HomePage from '../pages/HomePage';



const AlumniDashboard = () => {
  const [username, setUsername] = useState('Username');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'Job Posting',
      message: 'New job posting: Software Engineer at ABC Corp.',
      timestamp: '2023-11-20 10:00 AM',
      read: false,
    },
    {
      id: 2,
      type: 'Event Reminder',
      message: 'Reminder: Alumni Meetup on 2023-11-25 at 10:00 AM.',
      timestamp: '2023-11-19 09:00 AM',
      read: false,
    },
    {
      id: 3,
      type: 'Message',
      message: 'You have a new message from John Doe.',
      timestamp: '2023-11-18 08:00 AM',
      read: true,
    },
    {
      id: 4,
      type: 'Message',
      message: 'You have a new message from John Doe.',
      timestamp: '2023-11-18 08:00 AM',
      read: true,
    },
    {
      id: 5,
      type: 'Message',
      message: 'You have a new message from John Doe.',
      timestamp: '2023-11-18 08:00 AM',
      read: true,
    },
    {
      id: 6,
      type: 'Message',
      message: 'You have a new message from John Doe.',
      timestamp: '2023-11-18 08:00 AM',
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
     <div>

      <div className="flex  h-screen ">
        <div><Sidebar unreadCount={unreadCount} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /> </div>{/* Include the Sidebar component */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-0 md:pl-64'}`}> {/* Add padding to avoid overlap with fixed header and sidebar */}
          <Routes>
        
            <Route path="/alumni/Notifications" element={<Notifications notifications={notifications} markAsRead={markAsRead} clearAllNotifications={clearAllNotifications} />} />
            
          </Routes>
        </div>
      </div>
      
     </div>

    
  );
};

export default AlumniDashboard;