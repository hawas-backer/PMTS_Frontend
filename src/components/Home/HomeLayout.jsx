import { Outlet } from "react-router-dom";
import { Bell, Settings, LogOut, User,Home, Users, BookOpen, Calendar, Mail, Menu, X } from 'lucide-react';
import {Link } from 'react-router-dom'

const HomeLayout = () => {
    const navItems = [
        { label: 'Home', icon: Home, href: '' },
        { label: 'Placement data', icon: Users, href: `Placementdata` },
        { label: 'Recruiters', icon: Calendar, href: 'Recruiters' },
        { label: 'Gallery', icon: BookOpen, href: 'Gallery' },
        { label: 'Procedure', icon: Mail, href: 'Procedure' },
        { label: 'Testimonial', icon: Mail, href: 'Testimonial' },
        { label: 'Contact', icon: Mail, href: 'Contact' },
      ];
  return (
    <div>

      <nav className="bg-gray-50 dark:bg-gray-800 border-t   border-gray-200 dark:border-gray-700 md:border-t-0 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hidden md:flex space-x-8  h-12">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 dark:text-gray-300 dark:hover:text-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      <Outlet /> {/* This will render subroutes */}
    </div>
  );
};

export default HomeLayout;