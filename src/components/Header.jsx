// frontend/src/components/Header.jsx
import React, { useState } from 'react';
import { Bell, Settings, LogOut, User, Home, Users, BookOpen, Calendar, Mail } from 'lucide-react';
import gcekLogo from '../assets/gcek.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const Header = ({ username, userrole, profilePic, unreadCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState(null);
  
  const { logout } = useAuth(); // Get logout from AuthContext
  const navigate = useNavigate(); // For redirect after logout

  const user = {
    name: username || "John Doe",
    role: userrole || "Alumni",
    batch: "2018-2022",
    department: "Computer Science",
    email: "john.doe@example.com",
    notifications: unreadCount || 0,
  };

  const navItems = [
    { label: 'Home', icon: Home, href: `/${userrole.toLowerCase()}/gcek_iframe` },
    { label: 'Placement data', icon: Users, href: `/${userrole.toLowerCase()}` },
    { label: 'Recruiters', icon: Calendar, href: '/events' },
    { label: 'Gallery', icon: BookOpen, href: '/resources' },
    { label: 'Procedure', icon: Mail, href: '/contact' },
    { label: 'Testimonial', icon: Mail, href: '/contact' },
    { label: 'Contact', icon: Mail, href: '/contact' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const handleNavItemClick = (item) => {
    setSelectedNavItem(item);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call logout from AuthContext
      navigate('/', { replace: true }); // Redirect to login page
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Main Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Container */}
            <div className="flex items-center">
              <img
                src={gcekLogo}
                alt="GCEK Logo"
                className="h-10 w-auto dark:invert"
              />
            </div>

            {/* Mobile Profile Picture and Notification Bell */}
            <div className="md:hidden flex items-center">
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
              <button onClick={toggleProfileMenu} className="flex items-center ml-4">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile Picture" className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <span className="text-white font-medium text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
              </button>
            </div>

            {/* Right side elements */}
            <div className="hidden md:flex items-center gap-6">
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

              {/* User Profile Section */}
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</span>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                        {userrole}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{user.department}</span>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
                    {profilePic ? (
                      <img src={profilePic} alt="Profile Picture" className="h-full w-full rounded-full object-cover" />
                    ) : (
                      <span className="text-white font-medium text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
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
                              {userrole}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <p>{user.department}</p>
                        <p>{userrole === 'Alumni' || userrole === 'Student' ? `Batch of ${user.batch}` : ""}</p>
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
                      <button
                        onClick={handleLogout} // Add logout handler
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
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

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-800 shadow-md">
          <div className="grid grid-cols-2 gap-4 py-4">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => handleNavItemClick(item)}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 dark:text-gray-300 dark:hover:text-blue-500 dark:hover:border-blue-500 transition-colors ${index % 2 === 0 ? 'col-start-1' : 'col-start-2'}`}
              >
                <item.icon className="mr-1" />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* Mobile Profile Menu */}
      {isProfileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
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
                    {userrole}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              <p>{user.department}</p>
              <p>{userrole === 'Alumni' || userrole === 'Student' ? `Batch of ${user.batch}` : ""}</p>
            </div>
          </div>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={handleLogout} // Add logout handler
            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;