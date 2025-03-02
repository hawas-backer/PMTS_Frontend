import React from "react";

// Dynamically import all images from assets/gallery
const images = import.meta.glob("/src/assets/recruiters/*.{png,jpg,jpeg}", { eager: true });

const Recruiters= () => {
  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-bold mb-6 text-white">
        OUR RECRUITERS
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-4 gap-4">
        {Object.values(images).map((img, index) => (
          <img
            key={index}
            src={img.default}
            alt={`recruiters ${index + 1}`}
            className="w-full h-40 object-contain bg-white p-2 rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default Recruiters;