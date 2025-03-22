import React from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        duration: 0.8 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
  };

  return (
    <motion.section
      className="py-16 bg-[var(--primary-bg)] font-[Inter,Poppins,sans-serif]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.h2 
          className="text-4xl font-bold text-[var(--primary-text)] mb-12 text-center tracking-wide"
          variants={itemVariants}
        >
          Contact Us
        </motion.h2>
        
        <motion.div
          className="bg-[var(--secondary-bg)] rounded-xl p-8 border border-blue-200 backdrop-blur-sm shadow-lg hover:shadow-[var(--primary-accent)]/20 transition-all duration-500"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.02,
            borderColor: "rgba(30, 64, 175, 0.5)",
          }}
        >
          <h3 className="text-xl font-semibold text-[var(--primary-text)] mb-2">Coordinator</h3>
          <p className="text-lg font-medium text-[var(--secondary-text)] mb-4">Dr. Nidheesh N</p>
          
          <div className="space-y-3 text-[var(--secondary-text)]">
            <motion.p 
              whileHover={{ x: 5, color: "#1E40AF" }}
              className="flex items-center gap-2 transition-colors duration-300"
              aria-label="Phone number"
            >
              <span className="text-[var(--primary-accent)]">Phone:</span> 
              <a href="tel:+919400102589" className="hover:text-[var(--highlight-color)]">+91 9400102589</a>
            </motion.p>
            <motion.p 
              whileHover={{ x: 5, color: "#1E40AF" }}
              className="flex flex-wrap gap-2 transition-colors duration-300"
              aria-label="Email addresses"
            >
              <span className="text-[var(--primary-accent)]">Email:</span>
              <a 
                href="mailto:placements@gcek.ac.in" 
                className="text-[var(--link-text)] hover:text-[var(--highlight-color)] transition-colors duration-300"
              >
                placements@gcek.ac.in
              </a>
              <span>|</span>
              <a 
                href="mailto:nidheesh.n@gcek.ac.in" 
                className="text-[var(--link-text)] hover:text-[var(--highlight-color)] transition-colors duration-300"
              >
                nidheesh.n@gcek.ac.in
              </a>
            </motion.p>
          </div>
        </motion.div>

        <motion.div 
          className="mt-8 text-[var(--muted-text)] text-center space-y-2 relative"
          variants={itemVariants}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-[var(--primary-accent)] to-transparent"></div>
          <p className="font-semibold text-[var(--primary-text)]">Dr. Nidheesh N</p>
          <p>Career Guidance and Placement Unit (CGPU)</p>
          <p>Govt. College of Engineering Kannur</p>
          <p>Dharmasala, Kannur, Kerala 670563</p>
          <a
            href="https://maps.google.com/?q=Government+College+of+Engineering+Kannur"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-[var(--link-text)] hover:text-[var(--highlight-color)] transition-colors duration-300"
            aria-label="View location on map"
          >
            View on Map
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default React.memo(ContactUs);