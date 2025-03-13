import React, { useState, useEffect, useRef } from 'react';
import { Bell, Settings, LogOut, User, Menu, X } from 'lucide-react';
import gcekLogo from '../assets/gcek-transparent.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ currentRoute }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, role, logout, notifications } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Use context data directly
  
  const userData = {
    name: user?.name || user?.email || 'John Doe',
    email: user?.email || 'N/A',
    role: role || 'Guest',
    batch: user?.batch || 'N/A',
    department: user?.branch || 'N/A',
    notifications: unreadCount,
  };

  const displayRoute = currentRoute && currentRoute !== '' ? currentRoute : `${userData.role}`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isProfileOpen) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleNotificationsClick = () => {
    navigate(`/${userData.role.toLowerCase()}/notifications`);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-950 text-gray-100 shadow-md">
      <div className="mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-3">
            <Link to={`/${userData.role.toLowerCase()}`} className="flex items-center">
              <img src={gcekLogo} alt="GCEK Logo" className="h-10 w-auto invert brightness-125" />
            </Link>
            <div className="flex flex-col">
              <h1 className="text-lg font-poppins font-bold text-gray-300">Placement Portal</h1>
              <h2 className="text-xs font-poppins font-light text-gray-500">Government College of Engineering Kannur</h2>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handleNotificationsClick}
              className="relative p-1.5 rounded-full bg-gray-900 hover:bg-gray-800 transition-all duration-200"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              {userData.notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-poppins font-medium text-white">
                  {userData.notifications}
                </span>
              )}
            </button>

            <div ref={dropdownRef} className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center gap-2 p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 transition-all duration-200"
                aria-label="User Profile"
                aria-expanded={isProfileOpen}
              >
                <span className="text-sm font-poppins font-medium text-gray-100 truncate max-w-[100px]">
                  {userData.name}
                </span>
                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                  <span className="text-gray-300 text-sm font-poppins font-medium">
                    {userData.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                  </span>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-950 rounded-lg shadow-md border border-gray-800 overflow-hidden">
                  <div className="p-3 border-b border-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-300 text-sm font-poppins font-medium">
                          {userData.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-poppins font-medium text-gray-100">{userData.name}</p>
                        <p className="text-xs font-poppins font-light text-gray-400">{userData.email}</p>
                      </div>
                    </div>
                    <p className="mt-1 text-xs font-poppins font-light text-gray-500">
                      Role: {userData.role}
                    </p>
                    <p className="mt-1 text-xs font-poppins font-light text-gray-500">
                      Batch: {userData.batch} | Branch: {userData.department}
                    </p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => navigate(`/${userData.role.toLowerCase()}/profile`)}
                      className="w-full text-left px-3 py-2 text-sm font-poppins text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-all duration-200"
                    >
                      <User className="w-4 h-4 inline mr-2" /> Profile
                    </button>
                    <button
                      onClick={() => navigate(`/${userData.role.toLowerCase()}/settings`)}
                      className="w-full text-left px-3 py-2 text-sm font-poppins text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-all duration-200"
                    >
                      <Settings className="w-4 h-4 inline mr-2" /> Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm font-poppins text-red-400 hover:text-red-300 hover:bg-gray-800 transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4 inline mr-2" /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleNotificationsClick}
              className="relative p-1 rounded-full bg-gray-900 hover:bg-gray-800 transition-all duration-200"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              {userData.notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-poppins font-medium text-white">
                  {userData.notifications}
                </span>
              )}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-1.5 rounded-full bg-gray-900 hover:bg-gray-800 transition-all duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-gray-400" /> : <Menu className="w-5 h-5 text-gray-400" />}
            </button>
          </div>
        </div>

        <div className="hidden md:block py-1 text-xs font-poppins font-light text-gray-500 text-center">
          {displayRoute}
        </div>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-gray-950 md:hidden">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-300 text-sm font-poppins font-medium">
                      {userData.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-poppins font-medium text-gray-100">{userData.name}</p>
                    <p className="text-xs font-poppins font-light text-gray-400">{userData.email}</p>
                  </div>
                </div>
                <button
                  onClick={toggleMobileMenu}
                  className="p-1.5 rounded-full hover:bg-gray-800 transition-all duration-200"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="flex-1 p-4 space-y-2">
                <p className="text-xs font-poppins font-light text-gray-500">
                  Role: {userData.role}
                </p>
                <p className="text-xs font-poppins font-light text-gray-500">
                  Batch: {userData.batch} | Branch: {userData.department}
                </p>
                <button
                  onClick={() => {
                    navigate(`/${userData.role.toLowerCase()}/profile`);
                    toggleMobileMenu();
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-poppins text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-all duration-200"
                >
                  <User className="w-4 h-4 inline mr-2" /> Profile
                </button>
                <button
                  onClick={() => {
                    navigate(`/${userData.role.toLowerCase()}/settings`);
                    toggleMobileMenu();
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-poppins text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-all duration-200"
                >
                  <Settings className="w-4 h-4 inline mr-2" /> Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm font-poppins text-red-400 hover:text-red-300 hover:bg-gray-800 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4 inline mr-2" /> Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;