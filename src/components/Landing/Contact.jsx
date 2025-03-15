import React from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.section
      className="py-16 bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <div className="container mx-auto px-4 max-w-lg text-center">
        <h2 className="text-4xl font-bold text-[#111E6C] mb-12 tracking-tight">
          Contact Us
        </h2>
        <motion.div
          className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          variants={fadeIn}
        >
          <h3 className="text-xl font-semibold text-[#111E6C] mb-2">Coordinator</h3>
          <p className="text-lg font-medium text-gray-700 mb-4">Dr. Nidheesh N</p>
          <div className="text-gray-600 space-y-2">
            <p><strong>Phone:</strong> +91 9400102589</p>
            <p><strong>Email:</strong> <a href="mailto:placements@gcek.ac.in" className="text-[#00BFFF] hover:text-[#89CFF0] transition-colors duration-300">placements@gcek.ac.in</a> | <a href="mailto:nidheesh.n@gcek.ac.in" className="text-[#00BFFF] hover:text-[#89CFF0] transition-colors duration-300">nidheesh.n@gcek.ac.in</a></p>
          </div>
        </motion.div>
        <motion.div
          className="mt-8 text-gray-600 space-y-1"
          variants={fadeIn}
        >
          <p className="font-semibold">Dr. Nidheesh N</p>
          <p>Career Guidance and Placement Unit (CGPU)</p>
          <p>Govt. College of Engineering Kannur</p>
          <p>Dharmasala, Kannur, Kerala 670563</p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactUs;