import React from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.section
      className="py-16 bg-[#F5F5F5]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="container mx-auto px-4 max-w-lg text-center">
        <h2 className="text-4xl font-bold text-[#003087] mb-12 tracking-wide">
          Contact Us
        </h2>
        <motion.div
          className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-all duration-300 border border-gray-200"
          variants={fadeInUp}
        >
          <h3 className="text-xl font-bold text-[#003087] mb-2">Coordinator</h3>
          <p className="text-lg font-medium text-gray-800 mb-4">Dr. Nidheesh N</p>
          <div className="text-gray-600 space-y-2">
            <p><strong>Phone:</strong> +91 9400102589</p>
            <p><strong>Email:</strong> <a href="mailto:placements@gcek.ac.in" className="text-[#F7941D] hover:text-[#FF9F40] transition-colors duration-300">placements@gcek.ac.in</a> | <a href="mailto:nidheesh.n@gcek.ac.in" className="text-[#F7941D] hover:text-[#FF9F40] transition-colors duration-300">nidheesh.n@gcek.ac.in</a></p>
          </div>
        </motion.div>
        <motion.div
          className="mt-8 text-gray-600 space-y-1"
          variants={fadeInUp}
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