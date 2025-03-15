import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link, Element, scroller } from "react-scroll";
import { useEffect, useState } from "react";
import { Home, Users, BookOpen, Calendar, Mail } from 'lucide-react';
import { motion } from "framer-motion";
import logo from "../../assets/gcek-transparent.png"; // Replace with actual logo path
import Home1 from "./Home";
import PlacementDataPage from "./PlacementData";
import Recruiters from "./Recruiters";
import Gallery from "./Gallery";
import Procedure from "./Procedure";
import Testimonial from "./Testimonial";
import ContactUs from "./Contact";

const HomeLayout = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", icon: Home, href: "home" },
    { label: "Placement Data", icon: Users, href: "placementdata" },
    { label: "Recruiters", icon: Calendar, href: "recruiters" },
    { label: "Gallery", icon: BookOpen, href: "gallery" },
    { label: "Procedure", icon: Mail, href: "procedure" },
    { label: "Testimonials", icon: Mail, href: "testimonial" },
    { label: "Contact", icon: Mail, href: "contact" },
  ];

  useEffect(() => {
    const section = location.hash.replace("#", "");
    if (section) {
      scroller.scrollTo(section, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
      setActiveSection(section);
    }
  }, [location]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.href);
      if (section) observer.observe(section);
    });

    return () => {
      navItems.forEach((item) => {
        const section = document.getElementById(item.href);
        if (section) observer.unobserve(section);
      });
    };
  }, [navItems]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const slideIn = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const logoHover = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-[#F8FAF5] font-sans">
      {/* Header */}
      <header className="bg-white bg-opacity-80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={logoHover}
          >
            <div className="relative">
              <img
                src={logo}
                alt="GCEK Logo"
                className="h-12 w-12 object-contain rounded-full border-2 border-[#A8BFA0] p-1 bg-white"
              />
              <div className="absolute inset-0 rounded-full border-2 border-[#4A7043] opacity-20" />
            </div>
            <h1 className="text-lg font-medium text-[#2F2F2F] hidden md:block">
              Placement Cell
            </h1>
          </motion.div>

          {/* Navigation and Button */}
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden text-[#4A7043] focus:outline-none z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <motion.nav
              className="hidden md:flex space-x-8 items-center"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={item.href}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={800}
                    className="flex items-center text-[#2F2F2F] font-medium hover:text-[#4A7043] transition-colors duration-300"
                    onSetActive={() => setActiveSection(item.href)}
                  >
                    <item.icon className="w-5 h-5 mr-1 text-[#4A7043]" />
                    {item.label}
                  </Link>
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A8BFA0] group-hover:w-full transition-all duration-300"
                    initial={false}
                    animate={activeSection === item.href ? { width: "100%" } : { width: 0 }}
                  />
                </motion.div>
              ))}
            </motion.nav>
            <RouterLink to="/">
              <motion.button
                className="bg-[#4A7043] text-white px-4 py-2 rounded-full font-medium hover:bg-[#A8BFA0] transition-all duration-300 shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </RouterLink>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden bg-white bg-opacity-90 backdrop-blur-md shadow-md"
          initial="hidden"
          animate={isMenuOpen ? "visible" : "hidden"}
          variants={slideIn}
        >
          <div className="p-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                spy={true}
                smooth={true}
                offset={-100}
                duration={800}
                className="block text-[#2F2F2F] font-medium hover:text-[#4A7043] transition-colors duration-300 py-2"
                onSetActive={() => {
                  setActiveSection(item.href);
                  setIsMenuOpen(false);
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main>
       		<Element name="home" id="home">
          <Home1 />
        </Element>
        <Element name="placementdata" id="placementdata">
          <PlacementDataPage />
        </Element>
        <Element name="recruiters" id="recruiters">
          <Recruiters />
        </Element>
        <Element name="gallery" id="gallery">
          <Gallery />
        </Element>
        <Element name="procedure" id="procedure">
          <Procedure />
        </Element>
        <Element name="testimonial" id="testimonial">
          <Testimonial />
        </Element>
        <Element name="contact" id="contact">
          <ContactUs />
        </Element>
      </main>
    </div>
  );
};

export default HomeLayout;