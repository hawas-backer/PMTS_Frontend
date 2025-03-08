import React, { useState, useEffect, useRef } from 'react';
import { Bell, Settings, LogOut, User, Menu, X } from 'lucide-react';
import gcekLogo from '../assets/gcek.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ name, userrole, profilePic, unreadCount, batch, newMessageCount, currentRoute }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleNotificationsClick = () => {
    navigate('/alumni/Notifications');
  };

  const userData = {
    name: name || 'John Doe',
    role: userrole || 'Guest',
    batch: batch || 'N/A',
    email: user?.email || 'N/A',
    department: 'Computer Science',
    notifications: unreadCount || 0,
    messages: newMessageCount || 0,
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isProfileOpen) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  // Use the full currentRoute directly, default to '/alumni' if empty
  const displayRoute = currentRoute && currentRoute !== '' ? currentRoute : '/alumni';

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-md">
      <div className="mx-auto px-2 sm:px-4 lg:px-6 relative">
        <div className="flex flex-col">
          <div className="flex items-center justify-between h-16 relative z-10">
            <div className="flex items-center">
              <Link to="/alumni" className="flex items-center">
                <img
                  src={gcekLogo}
                  alt="GCEK Logo"
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto invert brightness-125"
                />
              </Link>
            </div>

            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 text-sm text-gray-400 truncate max-w-[50%]">
              {displayRoute}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={handleNotificationsClick}
                className="relative p-2 rounded-full hover:bg-gray-700/50 transition-all duration-300 ease-in-out hover:scale-105"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-300" />
                {userData.messages > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-semibold text-white">
                    {userData.messages}
                  </span>
                )}
              </button>

              <div ref={dropdownRef} className="relative flex items-center gap-2">
                <button
                  onClick={toggleProfile}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-700/50 transition-all duration-300 ease-in-out"
                  aria-label="User Profile"
                  aria-expanded={isProfileOpen}
                >
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-gray-100 truncate max-w-[120px]">
                        {userData.name}
                      </span>
                      <span className="px-1 py-0.5 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs font-medium rounded-full shadow-sm">
                        {userData.role}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 truncate max-w-[150px]">{userData.department}</span>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center ring-2 ring-blue-500/50 overflow-hidden transition-transform duration-300 hover:scale-105">
                    {profilePic ? (
                      <img src={profilePic} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-white text-sm font-semibold">
                        {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    )}
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="hidden md:block absolute right-0 mt-2 top-full w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700/50 overflow-hidden animate-fadeIn">
                    <div className="p-3 border-b border-gray-700/50">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center ring-2 ring-blue-500/50">
                          <span className="text-white font-semibold">
                            {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-100 truncate">{userData.name}</p>
                          <p className="text-xs text-gray-400 truncate">{userData.email}</p>
                          <span className="inline-block mt-1 px-1 py-0.5 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs font-medium rounded-full shadow-sm">
                            {userData.role}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-400">
                        Batch: {userData.batch} | {userData.department}
                      </p>
                    </div>
                    <div className="py-1">
                      <button
                        className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 flex items-center gap-2 transition-all duration-200 ease-in-out hover:text-white"
                        aria-label="Profile"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </button>
                      <button
                        className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 flex items-center gap-2 transition-all duration-200 ease-in-out hover:text-white"
                        aria-label="Settings"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-700/50 flex items-center gap-2 transition-all duration-200 ease-in-out hover:text-red-300"
                        aria-label="Sign out"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={handleNotificationsClick}
                className="relative p-1 rounded-full hover:bg-gray-700/50 transition-all duration-300 ease-in-out hover:scale-105"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-300" />
                {userData.messages > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-semibold text-white animate-pulse">
                    {userData.messages}
                  </span>
                )}
              </button>
              <button
                onClick={toggleMobileMenu}
                className="p-1 rounded-full bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300 ease-in-out hover:scale-105"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-300 animate-spin-once" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-300 animate-bounce-in" />
                )}
              </button>
            </div>
          </div>

          <div className="md:hidden text-center py-1 text-xs text-gray-400">
            {displayRoute}
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-gray-900 md:hidden animate-bounceIn">
            <div className="flex flex-col h-full">
              <div className="p-3 border-b border-gray-700/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center ring-2 ring-blue-500/50">
                    <span className="text-white font-semibold">
                      {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-100 truncate">{userData.name}</p>
                    <p className="text-xs text-gray-400 truncate">{userData.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-700/50 transition-all duration-300 ease-in-out"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-gray-300" />
                </button>
              </div>
              <div className="flex-1 p-3 space-y-4">
                <p className="text-xs text-gray-400">
                  Batch: {userData.batch} | {userData.department}
                </p>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 flex items-center gap-2 transition-all duration-200 ease-in-out hover:text-white">
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 flex items-center gap-2 transition-all duration-200 ease-in-out hover:text-white">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-700/50 flex items-center gap-2 transition-all duration-200 ease-in-out hover:text-red-300"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes spinOnce {
          from { transform: rotate(0deg); }
          to { transform: rotate(180deg); }
        }
        @keyframes bounceIcon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-bounceIn {
          animation: bounceIn 0.3s ease-out forwards;
        }
        .animate-spin-once {
          animation: spinOnce 0.3s ease-out forwards;
        }
        .animate-bounce-in {
          animation: bounceIcon 0.5s ease-in-out;
        }
      `}</style>
    </header>
  );
};

export default Header;