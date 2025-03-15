import React from "react";
import { Link } from "react-scroll";
import heroImage from "../../assets/bg.avif"; // Replace with actual hero image path

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full h-96 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-[#111E6C] bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Placement Cell</h1>
            <p className="text-lg md:text-xl mb-6">Empowering students for a bright future at GCEK</p>
            <Link
              to="placementdata"
              spy={true}
              smooth={true}
              offset={-120}
              duration={800}
              className="bg-[#00BFFF] text-white px-6 py-3 rounded-md hover:bg-[#89CFF0] transition duration-300 cursor-pointer"
            >
              Explore Placements
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold text-[#111E6C] mb-8">Discover More</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <Link
            to="recruiters"
            spy={true}
            smooth={true}
            offset={-120}
            duration={800}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-[#111E6C]">Our Recruiters</h3>
            <p className="text-gray-600 mt-2">Meet the companies hiring our talent</p>
          </Link>
          <Link
            to="testimonial"
            spy={true}
            smooth={true}
            offset={-120}
            duration={800}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-[#111E6C]">Testimonials</h3>
            <p className="text-gray-600 mt-2">Hear from our successful alumni</p>
          </Link>
          <Link
            to="contact"
            spy={true}
            smooth={true}
            offset={-120}
            duration={800}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-[#111E6C]">Contact Us</h3>
            <p className="text-gray-600 mt-2">Get in touch with our team</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;