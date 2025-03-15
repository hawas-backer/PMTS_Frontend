import React, { useState } from 'react';
import { motion } from "framer-motion";

const PlacementDataPage = () => {
  const [activeYear, setActiveYear] = useState('2023-24');
  
  const placementData = {
    '2023-24': [
      { id: 1, name: 'Anaswara K P', qualification: 'B. Tech', specialisation: 'CE', company: 'Aarbee Structures', package: 2.5 },
      { id: 2, name: 'Ardra Rajan M', qualification: 'B. Tech', specialisation: 'CE', company: 'Aarbee Structures', package: 2.5 },
      { id: 3, name: 'B PRATHEESH', qualification: 'B. Tech', specialisation: 'EEE', company: 'ESAG', package: 12.26 },
      { id: 4, name: 'HARIKRISHNAN V', qualification: 'B. Tech', specialisation: 'ME', company: 'ESAG', package: 12.26 },
      { id: 5, name: 'Rishikesh V K', qualification: 'B. Tech', specialisation: 'CSE', company: 'Impelsys', package: 6 },
      { id: 6, name: 'ASWANTHRAJ E', qualification: 'B. Tech', specialisation: 'ME', company: 'Sobha Developers, Dubai', package: 13.2 },
      { id: 7, name: 'Carolene Joy', qualification: 'B. Tech', specialisation: 'CSE', company: 'Applied Materials', package: 11.4 },
      { id: 8, name: 'Theertha Rajeev', qualification: 'B. Tech', specialisation: 'ECE', company: 'J & J', package: 3.5 },
    ],
    '2021-22': [
      { id: 1, name: 'Amritha C Subhash', qualification: 'B.Tech', specialisation: 'CE', company: 'Aarbee', package: 2.16 },
      { id: 2, name: 'Anagha M', qualification: 'B.Tech', specialisation: 'CE', company: 'Aarbee', package: 2.16 },
      { id: 3, name: 'Prajithraj C', qualification: 'B.Tech', specialisation: 'ME', company: 'Adani (Indian Oil)', package: 4.1 },
      { id: 4, name: 'Anju Jose', qualification: 'B.Tech', specialisation: 'EC', company: 'Applied Materials', package: 9.3 },
      { id: 5, name: 'Abhijith Dasan', qualification: 'B.Tech', specialisation: 'ME', company: 'Byjus', package: 10 },
      { id: 6, name: 'Samuel Chittilakkattu Bennett', qualification: 'B.Tech', specialisation: 'EC', company: 'Continental', package: 6 },
    ],
    '2020-21': [
      { id: 1, name: 'Dheemanth Shenoy', qualification: 'B. Tech', specialisation: 'ECE', company: 'Aapveen Technologies', package: 5 },
      { id: 2, name: 'Amgadh Madhusoodanan', qualification: 'B. Tech', specialisation: 'CE', company: 'Aarbee Structures', package: 2.16 },
      { id: 3, name: 'Ananya K', qualification: 'B. Tech', specialisation: 'CE', company: 'Aarbee Structures', package: 2.16 },
      { id: 4, name: 'Anureshmi Manoj', qualification: 'B. Tech', specialisation: 'CE', company: 'Aarbee Structures', package: 2.16 },
    ]
  };

  const years = ['2023-24', '2021-22', '2020-21', '2019-20', '2018-19', '2017-18', '2016-17', '2015-16'];

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
        <h2 className="text-4xl font-bold text-[#003087] text-center mb-8 tracking-wide">
          Placement Data
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {years.map((year) => (
            <button
              key={year}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeYear === year
                  ? 'bg-[#F7941D] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-[#003087] hover:text-white'
              }`}
              onClick={() => setActiveYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
          variants={fadeInUp}
        >
          <div className="p-6 text-gray-800 font-semibold text-center">
            List of students of Government College of Engineering Kannur placed in the year {activeYear}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#003087] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Sl. No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Candidate Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Highest Qualification</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Specialisation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Package (lakhs/annum)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {placementData[activeYear] ? 
                  placementData[activeYear].map((student) => (
                    <motion.tr
                      key={student.id}
                      className="hover:bg-gray-100 transition duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.1 * student.id } }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.qualification}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.specialisation}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.package}</td>
                    </motion.tr>
                  )) : 
                  <tr>
                    <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                      No placement data available for {activeYear}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PlacementDataPage;