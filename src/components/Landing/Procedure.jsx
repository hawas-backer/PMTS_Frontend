import React from 'react';
import { motion } from "framer-motion";
import placeproc from "../../assets/placeproc.png";

const Procedure = () => {
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
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-[#003087] text-center mb-12 tracking-wide">
          Procedure
        </h1>
        <motion.img
          src={placeproc}
          alt="placement procedure"
          className="max-w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
        />
      </div>
    </motion.section>
  );
};

export default Procedure;