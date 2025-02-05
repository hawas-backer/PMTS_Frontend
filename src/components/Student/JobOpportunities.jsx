import React from 'react';
import { Briefcase, ExternalLink, Building, DollarSign } from 'lucide-react';

const JobOpportunities = () => {
  const jobs = [
    {
      title: 'Senior Frontend Developer',
      description: 'Build modern web applications using React',
      icon: <Briefcase className="w-6 h-6 text-blue-500" />,
      company: 'TechCorp'
    },
    {
      title: 'Backend Engineer',
      description: 'Design and implement scalable APIs',
      icon: <Building className="w-6 h-6 text-green-500" />,
      company: 'DataSystems'
    },
    {
      title: 'Full Stack Developer',
      description: 'Work on end-to-end application development',
      icon: <DollarSign className="w-6 h-6 text-purple-500" />,
      company: 'StartupHub'
    }
  ];

  return (
    <div className="p-6 min-h-screen bg-[#0B0F1A]">
      <h1 className="text-2xl font-bold text-white mb-6">Job Opportunities</h1>
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {jobs.map((job, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-6 flex flex-col transition-all transform hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-2">
              {job.icon}
              <h3 className="text-lg font-semibold text-white">{job.title}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">{job.description}</p>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-sm text-gray-400">{job.company}</span>
              <button className="text-white hover:text-gray-300 text-sm flex items-center gap-2 transition-colors">
                <ExternalLink className="w-4 h-4" />
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobOpportunities;