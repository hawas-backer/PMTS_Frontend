import React from "react";

// Dynamically import all images from assets/gallery
const images = import.meta.glob("/src/assets/gallery/*.jpg", { eager: true });

const Gallery = () => {
  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-bold mb-6">
        Career Guidance And Placement Unit
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.values(images).map((img, index) => (
          <img
            key={index}
            src={img.default}
            alt={`Gallery Image ${index + 1}`}
            className="w-full h-40 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;