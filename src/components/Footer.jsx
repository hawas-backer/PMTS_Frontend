import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-4 text-center border-t border-gray-700 w-full"> {/* Full width, border top */}
      <div className="container mx-auto"> {/* Centered container for content */}
        <p>&copy; {currentYear} Placement Management and Training System. All rights reserved.</p>
        <div className="mt-2">
          <a href="/about" className="text-gray-400 hover:text-white mr-4">About Us</a>
          <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;