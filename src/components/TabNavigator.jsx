import React from 'react';

const Nabar = ({ activeRole, setActiveRole }) => {
  const tabs = [
    { name: 'Student' },
    { name: 'Coordinator' },
    { name: 'Advisor' },
    { name: 'Alumni' },
  ];

  return (
    <div className="w-full flex justify-center border-b border-gray-200 pb-2">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={(e) => {
              e.preventDefault();
              setActiveRole(tab.name);
            }}
            className={`px-2 py-1 text-base font-medium ${
              activeRole === tab.name
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-label={`Switch to ${tab.name} login`}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Nabar;