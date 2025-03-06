import React from 'react';

const Networking = () => {
  const people = [
    { id: 1, name: 'John Doe', role: 'Alumni', major: 'CS', year: 2020, bio: 'Software engineer.' },
    { id: 2, name: 'Jane Smith', role: 'Student', major: 'EE', year: 2024, bio: 'Robotics enthusiast.' },
    { id: 3, name: 'David Lee', role: 'Alumni', major: 'ME', year: 2018, bio: 'Automotive industry.' },
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-gray-300 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-lg font-semibold mb-4">Networking</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {people.map((person) => (
            <li key={person.id} className="p-3 bg-gray-800 rounded hover:bg-gray-700 transition">
              <h2 className="text-sm font-semibold">{person.name}</h2>
              <p className="text-xs text-gray-500">
                {person.role} - {person.major} ({person.year})
              </p>
              <p className="text-xs">{person.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Networking;