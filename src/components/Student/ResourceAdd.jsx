import React from 'react';
import { Download, Play, BookOpen, ExternalLink } from 'lucide-react';

const ResourceAdd = () => {
  const resources = [
    {
      title: 'Interview Preparation Guide',
      description: 'Complete guide for technical interviews',
      icon: <BookOpen className="w-6 h-6 text-blue-500" />,
      type: 'Download'
    },
    {
      title: 'Mock Interview Session',
      description: 'Video recording of mock interview session',
      icon: <Play className="w-6 h-6 text-green-500" />,
      type: 'Video'
    },
    {
      title: 'Practice Platform',
      description: 'Online platform for coding practice',
      icon: <BookOpen className="w-6 h-6 text-purple-500" />,
      type: 'Platform'
    }
  ];

  return (
    <div className="p-6 min-h-screen bg-[#0B0F1A]">
      <h1 className="text-2xl font-bold text-white mb-6">Resources</h1>
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((resource, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-6 flex flex-col transition-all transform hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-2">
              {resource.icon}
              <h3 className="text-lg font-semibold text-white">{resource.title}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
            <div className="flex justify-between items-center mt-auto">
              <span></span>
              <button className="bg-violet-800 hover:bg-violet-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2">
                {resource.type === 'Download' ? (
                  <>
                    <Download className="w-4 h-4" />
                    Download
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    Visit
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceAdd;
