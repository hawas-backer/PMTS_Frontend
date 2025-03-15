import React from "react";
import { motion } from "framer-motion";
const images = import.meta.glob("/src/assets/recruiters/*.{png,jpg,jpeg}", { eager: true });

const Recruiters = () => {
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
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#003087] text-center mb-12 tracking-wide">
          Our Recruiters
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Object.values(images).map((img, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 border border-gray-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: 0.1 * index }}
            >
              <img
                src={img.default}
                alt={`Recruiter ${index + 1}`}
                className="w-full h-24 object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Recruiters;