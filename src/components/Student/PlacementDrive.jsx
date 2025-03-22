import React, { useState } from 'react';
import { Building, DollarSign, GraduationCap, Briefcase, Clock, MapPin, X, Calendar, Book, Users } from 'lucide-react';
import RegistrationPlacement from './RegistrationPlacement';

const PlacementDrive = () => {
  const [selectedDrive, setSelectedDrive] = useState(null);

  const drives = [
    {
      title: 'Microsoft Corporation',
      description: 'Seeking final year B.Tech students from CS/IT branches',
      icon: <Building className="w-6 h-6 text-highlight" />,
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
      icon: <Briefcase className="w-6 h-6 text-accent" />,
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
      icon: <GraduationCap className="w-6 h-6 text-orange-400" />,
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
    <div className="min-h-screen bg-primary-bg p-4 sm:p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 animate-fade-in">Placement Drives</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {drives.map((drive, index) => (
            <div key={index} className="bg-secondary-bg rounded-xl p-6 shadow-glass transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                {drive.icon}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{drive.title}</h3>
                  <span className="text-xs text-highlight">{drive.type}</span>
                </div>
              </div>
              <p className="text-text-secondary text-sm mb-4 flex-grow line-clamp-2">{drive.description}</p>
              <div className="space-y-2 text-sm text-text-secondary mb-4">
                <div className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> {drive.positions}</div>
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {drive.date}</div>
                <div className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> {drive.package}</div>
                <div className="flex items-center gap-2"><Book className="w-4 h-4" /> {drive.eligibility}</div>
              </div>
              <button
                onClick={() => setSelectedDrive(drive)}
                className="w-full bg-gradient-to-r from-highlight to-accent hover:from-accent hover:to-highlight text-text-primary py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 mt-auto"
              >
                Register Now
              </button>
            </div>
          ))}
        </div>
      </div>
      {selectedDrive && (
        <RegistrationPlacement drive={selectedDrive} onClose={() => setSelectedDrive(null)} />
      )}
    </div>
  );
};

export default PlacementDrive;