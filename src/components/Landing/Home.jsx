import React from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import heroImage from "../../assets/bg.avif"; // Replace with actual hero image path

const Home = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <motion.section
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-[#003087] bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 tracking-wide"
              variants={fadeInUp}
            >
              Welcome to Placement Cell
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 font-light"
              variants={fadeInUp}
            >
              Empowering students for a bright future at GCEK
            </motion.p>
            <Link
              to="placementdata"
              spy={true}
              smooth={true}
              offset={-100}
              duration={800}
              className="inline-block bg-[#F7941D] text-white px-8 py-3 rounded-full hover:bg-[#FF9F40] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Placements
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Quick Links Section */}
      <motion.section
        className="py-16 bg-[#F5F5F5]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-4xl font-bold text-[#003087] text-center mb-12 tracking-wide">
          Discover More
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {[
            { to: "recruiters", title: "Our Recruiters", desc: "Meet the companies hiring our talent" },
            { to: "testimonial", title: "Testimonials", desc: "Hear from our successful alumni" },
            { to: "contact", title: "Contact Us", desc: "Get in touch with our team" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-200"
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to={item.to}
                spy={true}
                smooth={true}
                offset={-100}
                duration={800}
                className="block"
              >
                <h3 className="text-xl font-semibold text-[#003087] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;