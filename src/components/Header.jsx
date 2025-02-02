import React, { useState } from 'react';
import { Bell, Settings, LogOut, User, Home, Users, BookOpen, Calendar, Mail } from 'lucide-react';
import gcekLogo from '../assets/gcek.png';

const Header = ({username,profilePic,unreadCount}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const user = {
    name: "John Doe",
    role: "Alumni",
    batch: "2018-2022",
    department: "Computer Science",
    email: "john.doe@example.com",
    notifications: {unreadCount},
  };

  const navItems = [
    { label: 'Home', href: '/alumni/gcek_iframe' },
    { label: 'Placement data', icon: Users, href: '/alumni' },
    { label: 'Recruiters', icon: Calendar, href: '/events' },
    { label: 'Gallery', icon: BookOpen, href: '/resources' },
    { label: 'Procedure', icon: Mail, href: '/contact' },
    { label: 'Testimonial', icon: Mail, href: '/contact' },
    { label: 'Contact', icon: Mail, href: '/contact' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  {{console.log("unreadCount",user.notifications);}}
  return (
    
    <div className="sticky top-0 z-50">
      {/* Main Header */}
      
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Container */}
            <div className="w-64 h-16 relative flex items-center bg-white dark:bg-gray-900">
  <img
    src={gcekLogo} // Ensure you are using a white version of the logo for dark mode, or use SVG with fill properties
    alt="GCEK Logo"
    className="object-contain w-full h-full dark:invert"
  />
</div>



            {/* Right side elements */}
            <div className="flex items-center gap-6">
              {/* Notification Bell */}
              <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                {user.notifications > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {user.notifications}
                    </span>
                  </span>
                )}
              </button>
              

              {/* User Profile Section with prominent name and role */}
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {/* User Info Section */}
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</span>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                        {user.role}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{user.department}</span>
                  </div>

                  {/* Avatar */}
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden"> {/* Added overflow-hidden */}
                  {profilePic ? 
                  (<img src={profilePic} alt="Profile Picture" className="h-full w-full rounded-full object-cover" />
                  ) : 
                  (<span className="text-white font-medium text-sm">
                  {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                  )}
                  </div>
                  </div>
                </button>
{/* Dropdown Menu */}
{isMenuOpen && (
  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-white font-medium">
            {user.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
          <div className="mt-1">
            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
              {user.role}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        <p>{user.department}</p>
        <p>Batch of {user.batch}</p>
      </div>
    </div>

    <div className="py-1">
      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
        <User className="w-4 h-4" />
        Profile
      </button>
      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
        <Settings className="w-4 h-4" />
        Settings
      </button>
    </div>

    <div className="border-t border-gray-100 dark:border-gray-700">
      <button className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
        <LogOut className="w-4 h-4" />
        Sign out
      </button>
    </div>
  </div>
)}
</div>
</div>
</div>
</div>
</header>

{/* Navigation Bar */}
<nav className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex space-x-8 justify-center h-12">
{navItems.map((item) => (
<a
key={item.label}
href={item.href}
className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 dark:text-gray-300 dark:hover:text-blue-500 dark:hover:border-blue-500 transition-colors"
>
{item.label}
</a>
))}
</div>
</div>
</nav>
</div>
);
};

export default Header;