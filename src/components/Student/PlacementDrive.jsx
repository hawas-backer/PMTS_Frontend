import React, { useState } from 'react';
import { Building, DollarSign, GraduationCap, Briefcase, Clock, MapPin, X, Calendar, Book, Users } from 'lucide-react';
import RegistrationPlacement from './RegisterPlacement';
const PlacementDrive = () => {
  const [selectedDrive, setSelectedDrive] = useState(null);

  const drives = [
    {
      title: 'Microsoft Corporation',
      description: 'Seeking final year B.Tech students from CS/IT branches',
      icon: <Building className="w-6 h-6 text-blue-600" />,
      type: 'Core Tech',
      date: '15th March 2025',
      time: '9:00 AM - 5:00 PM',
      package: '₹25-45 LPA',
      location: 'College Auditorium',
      eligibility: 'CGPA ≥ 8.0, No backlogs',
      process: ['Online Test', 'Technical Interview', 'HR Round'],
      positions: 'Software Development Engineer'
    },
    {
      title: 'Goldman Sachs',
      description: 'Open for all engineering branches with strong programming skills',
      icon: <Briefcase className="w-6 h-6 text-green-600" />,
      type: 'Tech + Finance',
      date: '18th March 2025',
      time: '10:00 AM - 4:00 PM',
      package: '₹18-32 LPA',
      location: 'CS Department Block',
      eligibility: 'CGPA ≥ 7.5, Max 2 backlogs',
      process: ['Aptitude Test', 'Coding Round', 'Technical + HR'],
      positions: 'Technology Analyst'
    },
    {
      title: 'Amazon Web Services',
      description: 'Hiring from Computer Science and allied branches',
      icon: <GraduationCap className="w-6 h-6 text-orange-500" />,
      type: 'Product',
      date: '20th March 2025',
      time: '9:30 AM - 6:00 PM',
      package: '₹20-35 LPA',
      location: 'Central Computing Facility',
      eligibility: 'CGPA ≥ 7.0, No active backlogs',
      process: ['Online Assessment', 'Technical Rounds', 'Bar Raiser'],
      positions: 'SDE & Cloud Engineer'
    }
  ];





  return (
    <div>
      <div className="min-h-screen bg-[#0B0F1A] p-6">
        <div className="max-w-6xl">
          <h1 className="text-2xl font-bold text-white mb-6">Placemnt Drive</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drives.map((drive, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 transition-all transform hover:-translate-y-1 hover:shadow-xl flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  {drive.icon}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {drive.title}
                    </h3>
                    <span className="text-xs text-blue-400">{drive.type}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4 flex-grow">
                  {drive.description}
                </p>
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{drive.positions}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{drive.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>{drive.package}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    <span>{drive.eligibility}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDrive(drive)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 mt-auto"
                >
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedDrive && (
        <RegistrationPlacement 
          drive={selectedDrive} 
          onClose={() => setSelectedDrive(null)} 
        />
      )}
    </div>
  );
};

export default PlacementDrive;