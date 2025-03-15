import React from "react";
import { motion } from "framer-motion";
const images = import.meta.glob("/src/assets/gallery/*.jpg", { eager: true });

const Gallery = () => {
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
          Career Guidance and Placement Unit Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.values(images).map((img, index) => (
            <motion.img
              key={index}
              src={img.default}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-48 object-cover rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Gallery;