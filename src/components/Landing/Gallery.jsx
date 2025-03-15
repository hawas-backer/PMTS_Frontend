import React from "react";
import { motion } from "framer-motion";
const images = import.meta.glob("/src/assets/gallery/*.jpg", { eager: true });

const Gallery = () => {
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
          Career Guidance and Placement Unit Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.values(images).map((img, index) => (
            <motion.img
              key={index}
              src={img.default}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: 0.1 * index }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Gallery;