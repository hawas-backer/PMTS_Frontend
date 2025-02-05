import React, { useState } from 'react';

const Networking = () => {
  const [people, setPeople] = useState([
    {
      id: 1,
      name: 'John Doe',
      role: 'Alumni',
      major: 'Computer Science',
      graduationYear: 2020,
      bio: 'Experienced software engineer...',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Student',
      major: 'Electrical Engineering',
      graduationYear: 2024,
      bio: 'Passionate about robotics...',
    },
    {
      id: 3,
      name: 'David Lee',
      role: 'Alumni',
      major: 'Mechanical Engineering',
      graduationYear: 2018,
      bio: 'Working in the automotive industry...',
    },
  ]);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Networking</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {people.map((person) => (
            <div
              key={person.id}
              className="bg-gray-800 rounded-lg p-6 shadow-md hover:bg-gray-700 transition duration-300"
            >
              <h2 className="text-2xl font-semibold mb-2">{person.name}</h2>
              <p className="text-gray-400">
                {person.role} - {person.major} ({person.graduationYear})
              </p>
              <p className="mt-2">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Networking;