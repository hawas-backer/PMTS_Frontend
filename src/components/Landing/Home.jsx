import React from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import heroImage from "../../assets/bg.avif"; // Replace with actual hero image path

const Home = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="flex flex-col items-center font-sans">
      {/* Hero Section */}
      <motion.section
        className="relative w-full h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="absolute inset-0 bg-[#111E6C] bg-opacity-70 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
              variants={fadeIn}
            >
              Welcome to Placement Cell
            </motion.h1>
            <motion.p
              className="text-lg md:text-2xl mb-6 font-light"
              variants={fadeIn}
            >
              Empowering students for a bright future at GCEK
            </motion.p>
            <Link
              to="placementdata"
              spy={true}
              smooth={true}
              offset={-120}
              duration={800}
              className="inline-block bg-[#00BFFF] text-white px-6 py-3 rounded-full hover:bg-[#89CFF0] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Explore Placements
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Quick Links Section */}
      <motion.section
        className="py-16 text-center bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-4xl font-bold text-[#111E6C] mb-12 tracking-tight">
          Discover More
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          {[
            { to: "recruiters", title: "Our Recruiters", desc: "Meet the companies hiring our talent" },
            { to: "testimonial", title: "Testimonials", desc: "Hear from our successful alumni" },
            { to: "contact", title: "Contact Us", desc: "Get in touch with our team" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.to}
              spy={true}
              smooth={true}
              offset={-120}
              duration={800}
              className="p-6 bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-[#111E6C] mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </Link>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;