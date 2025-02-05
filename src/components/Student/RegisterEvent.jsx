import React from 'react';
import { X } from 'lucide-react';

const RegisterEvent = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 mt-20">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold mb-4">{event.title}</h2>
        <p className="mb-4">{event.description}</p>
        <div className="mb-4">
          <p>Date: {event.date}</p>
          <p>Time: {event.time}</p>
     
        </div>
        <form>
          <input 
            type="text" 
            required
            placeholder="Your Name" 
            className="w-full p-2 border rounded mb-4"
          />
          <input 
            type="email" 
            required
            placeholder="Your Email" 
            className="w-full p-2 border rounded mb-4"
          />
          <input 
            type="Number" 
            required
            placeholder="Admission No" 
            className="w-full p-2 border rounded mb-4"
          />
             <select 
              className="w-full p-2 border rounded mb-4  text-gray-600"
              
            >
              <option value="">Branch</option>
              <option value="1">CSE</option>
              <option value="2">CE</option>
              <option value="3">ME</option>
              <option value="4">EC</option>
            </select>
            <select 
              className="w-full p-2 border rounded mb-4  text-gray-600"
              
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>

          <button 
            type="submit" 
            className="w-full bg-violet-800 text-white py-2 rounded"
          >
            Confirm Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterEvent;