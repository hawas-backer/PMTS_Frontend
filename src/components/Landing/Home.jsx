import React from "react";
import { Link } from "react-scroll";
import { ChevronDown, User, Building, Mail } from 'lucide-react';
import heroImage from "../../assets/bg.avif";

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#111E6C]/80 to-[#111E6C]/60 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <div className="animate-fadeIn">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-[#00BFFF]">Shape</span> Your Future with GCEK Placements
              </h1>
              <p className="text-lg md:text-xl mb-8 font-light max-w-2xl mx-auto">
                Connecting talented students with industry leaders for exceptional career opportunities at Government College of Engineering Kannur
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="placementdata"
                  spy={true}
                  smooth={true}
                  offset={-120}
                  duration={800}
                  className="bg-[#00BFFF] text-white px-6 py-3 rounded-md hover:bg-[#89CFF0] transition duration-300 cursor-pointer flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Explore Placements</span>
                </Link>
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-120}
                  duration={800}
                  className="bg-transparent text-white border-2 border-white px-6 py-3 rounded-md hover:bg-white hover:text-[#111E6C] transition duration-300 cursor-pointer flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <Link
            to="quicklinks"
            spy={true}
            smooth={true}
            offset={-120}
            duration={800}
            className="text-white cursor-pointer"
          >
            <ChevronDown size={36} />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-4 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-xl p-6 transform transition duration-300 hover:scale-105">
            <div className="flex items-start">
              <div className="bg-[#111E6C]/10 p-3 rounded-full">
                <User size={24} className="text-[#111E6C]" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm uppercase text-gray-500 font-medium">Placements</h3>
                <div className="flex items-end">
                  <p className="text-3xl font-bold text-[#111E6C]">95%</p>
                  <p className="ml-2 text-sm text-green-500">↑ 5%</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">Placement rate for 2023-24</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-6 transform transition duration-300 hover:scale-105">
            <div className="flex items-start">
              <div className="bg-[#111E6C]/10 p-3 rounded-full">
                <Building size={24} className="text-[#111E6C]" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm uppercase text-gray-500 font-medium">Recruiters</h3>
                <div className="flex items-end">
                  <p className="text-3xl font-bold text-[#111E6C]">50+</p>
                  <p className="ml-2 text-sm text-green-500">↑ 15%</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">Top companies visiting our campus</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-6 transform transition duration-300 hover:scale-105">
            <div className="flex items-start">
              <div className="bg-[#111E6C]/10 p-3 rounded-full">
                <Mail size={24} className="text-[#111E6C]" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm uppercase text-gray-500 font-medium">Highest Package</h3>
                <div className="flex items-end">
                  <p className="text-3xl font-bold text-[#111E6C]">13.2</p>
                  <p className="ml-2 text-xs text-gray-600">LPA</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">Sobha Developers, Dubai (2023-24)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section id="quicklinks" className="py-20 text-center w-full">
        <h2 className="text-3xl font-bold text-[#111E6C] mb-2">Discover More</h2>
        <div className="w-24 h-1 bg-[#00BFFF] mx-auto mb-8"></div>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">Explore the various resources and information available to help you navigate your career journey with GCEK's Career Guidance and Placement Unit.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          <Link
            to="recruiters"
            spy={true}
            smooth={true}
            offset={-120}
            duration={800}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
          >
            <div className="bg-[#111E6C] h-3 w-full group-hover:h-6 transition-all duration-300"></div>
            <div className="p-8">
              <div className="w-16 h-16 bg-[#111E6C]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#111E6C]/20 transition duration-300">
                <Building size={32} className="text-[#111E6C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#111E6C] group-hover:text-[#00BFFF] transition duration-300">Our Recruiters</h3>
              <p className="text-gray-600 mt-3">Meet the industry leaders that trust GCEK talent and regularly hire from our campus</p>
              <div className="mt-4 text-[#00BFFF] font-medium flex items-center justify-center">
                <span>Learn More</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </Link>
          
          <Link
            to="testimonial"
            spy={true}
            smooth={true}
            offset={-120}
            duration={800}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
          >
            <div className="bg-[#111E6C] h-3 w-full group-hover:h-6 transition-all duration-300"></div>
            <div className="p-8">
              <div className="w-16 h-16 bg-[#111E6C]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#111E6C]/20 transition duration-300">
                <User size={32} className="text-[#111E6C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#111E6C] group-hover:text-[#00BFFF] transition duration-300">Testimonials</h3>
              <p className="text-gray-600 mt-3">Hear success stories from our alumni who have excelled in their careers</p>
              <div className="mt-4 text-[#00BFFF] font-medium flex items-center justify-center">
                <span>Read Stories</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </Link>
          
          <Link
            to="contact"
            spy={true}
            smooth={true}
            offset={-120}
            duration={800}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
          >
            <div className="bg-[#111E6C] h-3 w-full group-hover:h-6 transition-all duration-300"></div>
            <div className="p-8">
              <div className="w-16 h-16 bg-[#111E6C]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#111E6C]/20 transition duration-300">
                <Mail size={32} className="text-[#111E6C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#111E6C] group-hover:text-[#00BFFF] transition duration-300">Contact Us</h3>
              <p className="text-gray-600 mt-3">Get in touch with our placement team for queries and opportunities</p>
              <div className="mt-4 text-[#00BFFF] font-medium flex items-center justify-center">
                <span>Reach Out</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-50 w-full">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#111E6C] mb-2">Upcoming Placement Events</h2>
          <div className="w-24 h-1 bg-[#00BFFF] mx-auto mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[#111E6C] to-[#00BFFF]"></div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-[#111E6C] rounded-full mb-2">Tech</span>
                    <h3 className="text-xl font-semibold text-gray-800">Microsoft Campus Recruitment</h3>
                  </div>
                  <div className="bg-[#111E6C]/10 px-3 py-2 rounded-lg text-center">
                    <span className="block text-xl font-bold text-[#111E6C]">20</span>
                    <span className="text-xs text-gray-600">Mar</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-4">Microsoft will be conducting on-campus placement drives for various roles including Software Development Engineer.</p>
                <div className="mt-4 flex items-center text-gray-500 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>9:30 AM - 4:30 PM</span>
                </div>
                <div className="mt-2 flex items-center text-gray-500 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Seminar Hall, Main Building</span>
                </div>
                <button className="mt-5 w-full bg-[#111E6C] text-white py-2 rounded-md hover:bg-[#00BFFF] transition duration-300">Register Now</button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[#111E6C] to-[#00BFFF]"></div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full mb-2">Workshop</span>
                    <h3 className="text-xl font-semibold text-gray-800">Resume Building Workshop</h3>
                  </div>
                  <div className="bg-[#111E6C]/10 px-3 py-2 rounded-lg text-center">
                    <span className="block text-xl font-bold text-[#111E6C]">25</span>
                    <span className="text-xs text-gray-600">Mar</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-4">Learn how to create an impactful resume that stands out to recruiters. Bring your laptops for hands-on practice.</p>
                <div className="mt-4 flex items-center text-gray-500 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>2:00 PM - 5:00 PM</span>
                </div>
                <div className="mt-2 flex items-center text-gray-500 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Computer Lab, CSE Department</span>
                </div>
                <button className="mt-5 w-full bg-[#111E6C] text-white py-2 rounded-md hover:bg-[#00BFFF] transition duration-300">Register Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;