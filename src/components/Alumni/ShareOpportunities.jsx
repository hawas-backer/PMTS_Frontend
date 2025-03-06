import React from 'react';

const opportunities = [
  { id: 1, title: 'Software Intern', company: 'Tech Co.', desc: 'Internship.', link: '/intern' },
  { id: 2, title: 'Data Role', company: 'Data Inc.', desc: 'Data-driven.', link: '/data' },
];

const ShareOpportunities = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-300 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-lg font-semibold mb-4">Opportunities</h1>
        <ul className="space-y-2">
          {opportunities.map((opp) => (
            <a key={opp.id} href={opp.link} className="block">
              <li className="p-3 bg-gray-800 rounded hover:bg-gray-700 transition">
                <h2 className="text-sm font-semibold">{opp.title}</h2>
                <p className="text-xs text-gray-500">{opp.company}</p>
                <p className="text-xs">{opp.desc}</p>
              </li>
            </a>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShareOpportunities;