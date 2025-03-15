import React from "react";
import { motion } from "framer-motion";

const images = import.meta.glob("/src/assets/recruiters/*.{png,jpg,jpeg}", { eager: true });

const Recruiters = () => {
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
          Our Recruiters
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-4 gap-6">
          {Object.values(images).map((img, index) => (
            <motion.div
              key={index}
              className="bg-[var(--secondary-bg)] rounded-xl shadow-md shadow-blue-100 border border-blue-200 p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px -20px rgba(30, 64, 175, 0.15)" }}
            >
              <img
                src={img.default}
                alt={`Recruiter ${index + 1}`}
                className="w-full h-24 object-contain"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recruiters;