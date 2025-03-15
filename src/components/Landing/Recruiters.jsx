import React from "react";
import { motion } from "framer-motion";
const images = import.meta.glob("/src/assets/recruiters/*.{png,jpg,jpeg}", { eager: true });

const Recruiters = () => {
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
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#111E6C] mb-12 tracking-tight">
          Our Recruiters
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Object.values(images).map((img, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-80 backdrop-blur-md p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <img
                src={img.default}
                alt={`Recruiter ${index + 1}`}
                className="w-full h-32 object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Recruiters;