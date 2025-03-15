import React, { useState } from 'react';
import { motion } from "framer-motion";
const images = import.meta.glob("/src/assets/testimonials/*.{png,jpg,jpeg}", { eager: true });

const TestimonialCard = ({ name, title, batch, testimonial, imgSrc }) => {
  const [expanded, setExpanded] = useState(false);
  const isLongTestimonial = testimonial.length > 200;
  const truncatedText = isLongTestimonial && !expanded ? testimonial.substring(0, 200) + '...' : testimonial;

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-200"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 flex justify-center">
          <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-200 border-4 border-[#F7941D]">
            <img 
              src={imgSrc || `/api/placeholder/150/150`} 
              alt={`${name}`} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <h3 className="text-xl font-bold text-[#003087]">{name}</h3>
          <p className="text-sm font-medium text-[#F7941D]">{title}</p>
          {batch && <p className="text-sm text-gray-600 mb-3">{batch}</p>}
          <p className="text-gray-700 mb-2">{truncatedText}</p>
          {isLongTestimonial && (
            <button 
              onClick={() => setExpanded(!expanded)} 
              className="text-[#F7941D] font-medium hover:text-[#FF9F40] transition-colors duration-300"
            >
              {expanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Testimonial = () => {
  const testimonials = [
    {
      name: "Ravikumar PA",
      title: "Chief Engineer Burj Khalifa Civil",
      batch: "1986 Batch",
      testimonial: "My great institution, the Govt. College of Engineering Kannur, which stands out as the best in Malabar, not only creates technocrats but mould them to excel in their creativity also. Enriched with a fully devoted and accomplished team of faculty, along with its curriculum it acts as a very conductive ladder for the students in achieving their aspirations and also as a concrete pillar where they need support. It is overwhelming to mention the covetous evolution of this prestigious institution since its inception. I'm so honoured that I belong to the first batch (1986) of this esteemed organization. Though it was a 'real living' of years of us with limited facilities in the beginning when we started our journey from the noisy corridors of the Town High School Payyambalam, we can proudly pronounce now that it has only boosted our morale and poise.",
      imgSrc: images["/src/assets/testimonials/revikumar.png"]?.default
    },
    // ... (other testimonials)
  ];

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
          Alumni Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              name={testimonial.name}
              title={testimonial.title}
              batch={testimonial.batch}
              testimonial={testimonial.testimonial}
              imgSrc={testimonial.imgSrc}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonial;