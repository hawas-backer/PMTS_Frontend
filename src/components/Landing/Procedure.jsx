import React from 'react';
import { motion } from "framer-motion";
import placeproc from "../../assets/placeproc.png";

const Procedure = () => {
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
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center text-[#111E6C] mb-12 tracking-tight">
          Procedure
        </h1>
        <motion.img
          src={placeproc}
          alt="placement procedure"
          className="max-w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        />
      </div>
    </motion.section>
  );
};

export default Procedure;