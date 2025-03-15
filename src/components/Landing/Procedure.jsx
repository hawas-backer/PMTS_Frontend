import React from "react";
import { motion } from "framer-motion";
import placeproc from "../../assets/placeproc.png";

const Procedure = () => {
  return (
    <section className="py-20 bg-[var(--primary-bg)]">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
        <motion.h1
          className="text-3xl font-bold text-[var(--primary-text)] text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Procedure
        </motion.h1>
        <motion.div
          className="bg-[var(--secondary-bg)] rounded-xl shadow-md shadow-blue-100 border border-blue-200 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ y: -5, boxShadow: "0 20px 40px -20px rgba(30, 64, 175, 0.15)" }}
        >
          <img src={placeproc} alt="Placement Procedure" className="w-full object-contain" loading="lazy" />
        </motion.div>
      </div>
    </section>
  );
};

export default Procedure;