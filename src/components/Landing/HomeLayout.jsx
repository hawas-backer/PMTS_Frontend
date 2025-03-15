import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link, Element, scroller } from "react-scroll";
import { useEffect, useState } from "react";
import { Home, Users, BookOpen, Calendar, Mail } from 'lucide-react';
import logo from "../../assets/gcek-transparent.png"; // Replace with actual logo path
import Home1 from "./Home";
import PlacementDataPage from "./PlacementData"; // Adjusted import name
import Recruiters from "./Recruiters";
import Gallery from "./Gallery";
import Procedure from "./Procedure";
import Testimonial from "./Testimonial";
import ContactUs from "./Contact";

const HomeLayout = () => {
  const [activeSection, setActiveSection] = useState("home");
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

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="GCEK Logo" className="h-12 w-12 object-contain" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Placement Cell</h1>
              <h2 className="text-sm font-medium text-gray-600">Government College of Engineering Kannur</h2>
            </div>
          </div>
          <RouterLink to="/">
            <button className="bg-[#111E6C] text-white px-4 py-2 rounded-full hover:bg-[#00BFFF] transition-all duration-300 shadow-lg hover:shadow-xl">
              Login
            </button>
          </RouterLink>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white bg-opacity-80 backdrop-blur-md border-b border-gray-200 sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center py-4">
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  spy={true}
                  smooth={true}
                  offset={-120}
                  duration={800}
                  className={`flex items-center text-gray-700 px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    activeSection === item.href
                      ? "text-[#111E6C] border-b-2 border-[#00BFFF]"
                      : "hover:text-[#111E6C] hover:border-b-2 hover:border-[#00BFFF]"
                  }`}
                  onSetActive={() => setActiveSection(item.href)}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Sections */}
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