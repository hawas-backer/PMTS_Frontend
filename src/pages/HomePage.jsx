import React from 'react'
import { Bell, Settings, LogOut, User,Home, Users, BookOpen, Calendar, Mail, Menu, X } from 'lucide-react';
import {Link} from 'react-router-dom'
const HomePage = () => {
    const navItems = [
        { label: 'Home', icon: Home, href: '/' },
        { label: 'Placement data', icon: Users, href: '/alumni' },
        { label: 'Recruiters', icon: Calendar, href: '/events' },
        { label: 'Gallery', icon: BookOpen, href: '/resources' },
        { label: 'Procedure', icon: Mail, href: '/contact' },
        { label: 'Testimonial', icon: Mail, href: '/contact' },
        { label: 'Contact', icon: Mail, href: '/contact' },
      ];
    
  return (
    <div>
      
      <nav className="bg-gray-50 dark:bg-gray-800 border-t   border-gray-200 dark:border-gray-700 md:border-t-0 w-screen">
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
        
    </div>
  );
}

export default HomePage
