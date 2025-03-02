import React from 'react';

const opportunities = [
  {
    id: 1,
    title: 'Software Engineer Internship',
    company: 'Tech Co.',
    description: 'Exciting internship opportunity...',
    link: '/internship1', // Example link
  },
  {
    id: 2,
    title: 'Data Science Role',
    company: 'Data Analytics Inc.',
    description: 'Seeking data-driven individuals...',
    link: '/datarole1',
  },
  // ... more opportunities
];

const ShareOpportunities = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-8"> {/* Dark background, full screen height */}
      <div className="container mx-auto"> {/* Center the content */}
        <h1 className="text-3xl font-bold mb-4">Opportunities</h1>

        <div className="flex justify-end mb-4"> {/* Share button on the right */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Share Opportunity
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Responsive grid */}
          {opportunities.map((opportunity) => (
            <a key={opportunity.id} href={opportunity.link} className="block"> {/* Make card clickable */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:bg-gray-700 transition duration-300"> {/* Card styling */}
                <h2 className="text-xl font-semibold mb-2">{opportunity.title}</h2>
                <p className="text-gray-400 mb-2">{opportunity.company}</p>
                <p className="text-gray-500">{opportunity.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareOpportunities;