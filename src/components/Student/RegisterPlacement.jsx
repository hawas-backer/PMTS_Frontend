import React from 'react';
import { X } from 'lucide-react';


const RegistrationPlacement = ({ drive, onClose }) => {
    if (!drive) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 mt-20">
        <div className="bg-gray-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Campus Drive: {drive.title}</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Drive Details</h3>
                <div className="text-gray-300 space-y-2">
                  <p><span className="font-medium">Role:</span> {drive.positions}</p>
                  <p><span className="font-medium">Date:</span> {drive.date}</p>
                  <p><span className="font-medium">Time:</span> {drive.time}</p>
                  <p><span className="font-medium">Venue:</span> {drive.location}</p>
                  <p><span className="font-medium">Package:</span> {drive.package}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Eligibility & Process</h3>
                <div className="text-gray-300 space-y-2">
                  <p className="font-medium">Criteria:</p>
                  <p className="text-sm">{drive.eligibility}</p>
                  <p className="font-medium mt-2">Selection Process:</p>
                  <ul className="list-disc pl-4 text-sm">
                    {drive.process.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Important Instructions</h3>
                <ul className="text-gray-300 list-disc pl-4 space-y-1 text-sm">
                  <li>Carry college ID and all original documents</li>
                  <li>Report 30 minutes before schedule</li>
                  <li>Formal dress code is mandatory</li>
                  <li>Bring updated resume copies</li>
                </ul>
              </div>

              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
                onClick={() => {
                  alert('Registration successful! Check your email for further details.');
                  onClose();
                }}
              >
                Register for Drive
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
 
  export default RegistrationPlacement;