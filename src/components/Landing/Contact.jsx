import React from "react";

const ContactUs = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <h2 className="text-3xl font-bold text-[#111E6C] mb-8">Contact Us</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-[#111E6C]">Coordinator</h3>
          <p className="text-lg font-medium text-gray-700">Dr. Nidheesh N</p>
          <div className="mt-4 text-gray-600">
            <p><strong>Phone:</strong> +91 9400102589</p>
            <p><strong>Email:</strong> placements@gcek.ac.in | nidheesh.n@gcek.ac.in</p>
          </div>
        </div>
        <div className="mt-6 text-gray-600">
          <p className="font-semibold">Dr. Nidheesh N</p>
          <p>Career Guidance and Placement Unit (CGPU)</p>
          <p>Govt. College of Engineering Kannur</p>
          <p>Dharmasala, Kannur, Kerala 670563</p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;