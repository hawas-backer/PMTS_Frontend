import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-100 py-3 text-center border-t border-gray-800">
      <div className="container mx-auto px-4">
        <p className="text-xs font-poppins font-light text-gray-500">
          © {currentYear} Placement Management and Training System. All rights reserved.
        </p>
        <div className="mt-1 flex justify-center gap-3">
          <a href="/about" className="text-gray-400 hover:text-gray-300 text-xs font-poppins transition-all duration-200">
            About
          </a>
          <a href="/contact" className="text-gray-400 hover:text-gray-300 text-xs font-poppins transition-all duration-200">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;