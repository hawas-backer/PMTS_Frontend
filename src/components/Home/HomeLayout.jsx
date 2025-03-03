import { Outlet } from "react-router-dom";
import { Bell, Settings, LogOut, User, Home, Users, BookOpen, Calendar, Mail, Menu, X } from 'lucide-react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

// Import your component files
import HomePage from "../../pages/HomePage";
import PlacementData from "./PlacementData";
import Recruiters from "./Recruiters"
import Gallery from './Gallery';
import Procedure from './Procedure';
import Testimonial from './Testimonial';
import Contact from './Contact';

const HomeLayout = ({ userType = 'alumni' }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef({});
  const contentRef = useRef(null);
  const location = useLocation();

  // Calculate offset based on userType
  const getNavOffset = () => {
    // Different offset values for different user types
    return userType === 'coordinator' ? 80 : 80; // Adjust these values as needed
  };

  const navItems = [
    { label: 'Home', icon: Home, href: '', id: 'home', component: HomePage },
    { label: 'Placement data', icon: Users, href: 'Placementdata', id: 'placementdata', component: PlacementData },
    { label: 'Recruiters', icon: Calendar, href: 'Recruiters', id: 'recruiters', component: Recruiters },
    { label: 'Gallery', icon: BookOpen, href: 'Gallery', id: 'gallery', component: Gallery },
    { label: 'Procedure', icon: Mail, href: 'Procedure', id: 'procedure', component: Procedure },
    { label: 'Testimonial', icon: Mail, href: 'Testimonial', id: 'testimonial', component: Testimonial },
    { label: 'Contact', icon: Mail, href: 'Contact', id: 'contact', component: Contact },
  ];

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const navOffset = getNavOffset();
      const scrollPosition = window.scrollY + navOffset;

      // Find which section is currently in view
      let currentSection = '';
      Object.keys(sectionRefs.current).forEach(id => {
        const section = sectionRefs.current[id];
        if (section && section.offsetTop <= scrollPosition &&
            section.offsetTop + section.offsetHeight > scrollPosition) {
          currentSection = id;
        }
      });

      if (currentSection !== activeSection && currentSection !== '') {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, userType]);

  // Prevent scrolling past the Contact section
  useEffect(() => {
    const handleScrollLimit = () => {
      const contactSection = sectionRefs.current['contact'];
      
      if (contactSection) {
        const contactBottom = contactSection.offsetTop + contactSection.offsetHeight;
        
        if (window.scrollY + window.innerHeight > contactBottom + 50) {
          window.scrollTo({
            top: Math.max(0, contactSection.offsetTop - getNavOffset()),
            behavior: 'auto'
          });
        }
      }
    };

    window.addEventListener('scroll', handleScrollLimit);
    return () => window.removeEventListener('scroll', handleScrollLimit);
  }, [userType]);

  // Update active section based on URL when using router navigation
  useEffect(() => {
    const path = location.pathname.substring(1) || 'home';
    const navItem = navItems.find(item => item.href.toLowerCase() === path.toLowerCase());
    if (navItem) {
      setActiveSection(navItem.id);
    }
  }, [location, navItems]);

  // Scroll to section when clicking nav item
  const scrollToSection = (id) => {
    const section = sectionRefs.current[id];
    console.log(section)
    if (section) {
      const navOffset = getNavOffset();
      console.log(navOffset)
      window.scrollTo({
        top: section.offsetTop - navOffset,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false); // Close mobile menu when navigating
  };

  // Function to calculate if section is in viewport
  const isInViewport = (element) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= getNavOffset() + 20 &&
      rect.bottom >= getNavOffset()
    );
  };

  // More aggressive check for active section
  useEffect(() => {
    const checkVisibleSections = () => {
      for (const id in sectionRefs.current) {
        if (isInViewport(sectionRefs.current[id])) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', checkVisibleSections);
    // Initial check
    checkVisibleSections();
    
    return () => window.removeEventListener('scroll', checkVisibleSections);
  }, [userType]);

  return (
    <div className="w-full bg-gray-50 text-black" ref={contentRef}>
      {/* Fixed Navbar */}
      <nav className="fixed w-full z-50 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex space-x-8 h-16 items-center">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                    : 'text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 dark:text-gray-300 dark:hover:text-blue-500 dark:hover:border-blue-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center h-16 justify-between">
            <button 
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <span className="text-gray-700 font-medium dark:text-gray-300">
              {navItems.find(item => item.id === activeSection)?.label || 'Menu'}
            </span>
            <div className="w-6"></div> {/* Spacer for alignment */}
          </div>
        </div>
        
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-500'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Content Area with components arranged in sequence */}
      <div className="pt-16" id="scrollable-content">
        {navItems.map((item) => (
          <section
            key={item.id}
            id={item.id}
            ref={(el) => (sectionRefs.current[item.id] = el)}
            className="min-h-screen px-4 py-8"
            data-section-id={item.id}
          >
            <item.component />
          </section>
        ))}
        
        {/* Add a hard stop div after Contact to prevent scrolling further */}
        <div 
          id="scroll-limit" 
          style={{ 
            height: "1px", 
            width: "100%", 
            position: "relative", 
            pointerEvents: "none" 
          }}
        />
      </div>

      {/* Outlet is still available for nested routes if needed */}
      <Outlet />
    </div>
  );
};

export default HomeLayout;