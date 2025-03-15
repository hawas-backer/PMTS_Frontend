import React from "react";
import { motion } from "framer-motion";

const images = import.meta.glob("/src/assets/gallery/*.jpg", { eager: true });

const Gallery = () => {
  return (
    <section className="py-20 bg-[var(--primary-bg)]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-[var(--primary-text)] text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Career Guidance And Placement Unit
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.values(images).map((img, index) => (
            <motion.div
              key={index}
              className="bg-[var(--secondary-bg)] rounded-xl shadow-md shadow-blue-100 overflow-hidden border border-blue-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px -20px rgba(30, 64, 175, 0.15)" }}
            >
              <img
                src={img.default}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;