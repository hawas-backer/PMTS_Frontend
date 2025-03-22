import React from 'react';
import { X } from 'lucide-react';

const RegistrationPlacement = ({ drive, onClose }) => {
  if (!drive) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 font-sans">
      <div className="bg-secondary-bg rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-glass animate-fade-in">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Campus Drive: {drive.title}</h2>
            <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-all duration-300">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-6 text-text-primary">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Drive Details</h3>
              <div className="text-text-secondary space-y-2 text-sm">
                <p><span className="font-medium">Role:</span> {drive.positions}</p>
                <p><span className="font-medium">Date:</span> {drive.date}</p>
                <p><span className="font-medium">Time:</span> {drive.time}</p>
                <p><span className="font-medium">Venue:</span> {drive.location}</p>
                <p><span className="font-medium">Package:</span> {drive.package}</p>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Eligibility & Process</h3>
              <div className="text-text-secondary space-y-2 text-sm">
                <p className="font-medium">Criteria:</p>
                <p>{drive.eligibility}</p>
                <p className="font-medium mt-2">Selection Process:</p>
                <ul className="list-disc pl-4">
                  {drive.process.map((step, index) => <li key={index}>{step}</li>)}
                </ul>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Important Instructions</h3>
              <ul className="text-text-secondary list-disc pl-4 space-y-1 text-sm">
                <li>Carry college ID and all original documents</li>
                <li>Report 30 minutes before schedule</li>
                <li>Formal dress code is mandatory</li>
                <li>Bring updated resume copies</li>
              </ul>
            </div>
            <button 
              className="w-full bg-gradient-to-r from-highlight to-accent hover:from-accent hover:to-highlight text-text-primary py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
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