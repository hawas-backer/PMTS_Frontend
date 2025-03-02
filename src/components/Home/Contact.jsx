import React from "react";

const ContactUs = () => {
  return (
    <div className="p-6 max-w-lg mx-auto text-center text-white bg-[#0f1218]">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">Contact Us</h2>
      
      <div className="bg-[#1a1d23] p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-300">Coordinator</h3>
        <p className="text-lg font-medium text-gray-200">Dr. NIDHEESH N</p>

        <div className="mt-3 text-gray-400">
          <p><strong>Phone:</strong> +91 9400102589</p>
          <p><strong>Email:</strong></p>
          <p>placements@gcek.ac.in</p>
          <p>nidheesh.n@gcek.ac.in</p>
        </div>
      </div>

      <div className="mt-6 text-gray-400">
        <p className="font-semibold text-gray-300">Dr. NIDHEESH N</p>
        <p>Coordinator, CAREER GUIDANCE AND PLACEMENT UNIT (CGPU)</p>
        <p>GOVT. COLLEGE OF ENGINEERING KANNUR</p>
        <p>DHARMASALA 670563</p>
        <p>KANNUR, KERALA</p>
      </div>
    </div>
  );
};

export default ContactUs;