import React from "react";
const images = import.meta.glob("/src/assets/gallery/*.jpg", { eager: true });

const Gallery = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#111E6C] mb-8">Career Guidance and Placement Unit Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.values(images).map((img, index) => (
            <img
              key={index}
              src={img.default}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;