import React from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    <section className="py-20 bg-[var(--primary-bg)]">
      <div className="max-w-lg mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-[var(--primary-text)] text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Contact Us
        </motion.h2>
        <motion.div
          className="bg-[var(--secondary-bg)] p-6 rounded-xl shadow-md shadow-blue-100 border border-blue-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-[var(--primary-text)] mb-2">Coordinator</h3>
          <p className="text-lg font-medium text-[var(--secondary-text)]">Dr. Nidheesh N</p>
          <div className="mt-4 text-[var(--muted-text)]">
            <p>
              <strong>Phone:</strong>{" "}
              <motion.a
                href="tel:+919400102589"
                className="text-[var(--link-text)] hover:text-[var(--secondary-accent)] transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                +91 9400102589
              </motion.a>
            </p>
            <p>
              <strong>Email:</strong>
            </p>
            <motion.a
              href="mailto:placements@gcek.ac.in"
              className="text-[var(--link-text)] hover:text-[var(--secondary-accent)] transition-colors duration-300 block"
              whileHover={{ scale: 1.05 }}
            >
              placements@gcek.ac.in
            </motion.a>
            <motion.a
              href="mailto:nidheesh.n@gcek.ac.in"
              className="text-[var(--link-text)] hover:text-[var(--secondary-accent)] transition-colors duration-300 block"
              whileHover={{ scale: 1.05 }}
            >
              nidheesh.n@gcek.ac.in
            </motion.a>
          </div>
          <div className="mt-6 text-[var(--secondary-text)]">
            <p className="font-semibold">Dr. Nidheesh N</p>
            <p>Coordinator, Career Guidance and Placement Unit (CGPU)</p>
            <p>Govt. College of Engineering Kannur</p>
            <p>Dharmasala 670563</p>
            <p>Kannur, Kerala</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;