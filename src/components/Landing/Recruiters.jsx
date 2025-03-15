import React from "react";
const images = import.meta.glob("/src/assets/recruiters/*.{png,jpg,jpeg}", { eager: true });

const Recruiters = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#111E6C] mb-8">Our Recruiters</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Object.values(images).map((img, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <img
                src={img.default}
                alt={`Recruiter ${index + 1}`}
                className="w-full h-32 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recruiters;