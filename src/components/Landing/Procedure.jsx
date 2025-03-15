import React from 'react';
import placeproc from "../../assets/placeproc.png";

const Procedure = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center text-[#111E6C] mb-8">Procedure</h1>
        <img src={placeproc} alt="placement procedure" className="max-w-full h-auto rounded-lg shadow-md" />
      </div>
    </section>
  );
};

export default Procedure;