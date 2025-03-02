import React from 'react';

const resources = [
  {
    id: 1,
    title: 'React Tutorial',
    description: 'A comprehensive guide to React.',
    link: '/react-tutorial', // Could be a URL or a local route
    type: 'link', // 'link' or 'file'
  },
  {
    id: 2,
    title: 'Project Proposal',
    description: 'Project proposal document.',
    file: '/files/proposal.pdf', // Path to the file
    type: 'file',
  },
  // ... more resources
];

const ShareResources= () => {
  const handleDownload = (file) => {
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = file; // Set the file path
    link.setAttribute('download', file.substring(file.lastIndexOf('/') + 1)); // Set filename
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Resources</h1>

        <div className="flex justify-end mb-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Share Resource +
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-gray-800 rounded-lg p-6 shadow-md hover:bg-gray-700 transition duration-300 h-full">
              <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
              <p className="text-gray-500 mb-4">{resource.description}</p>

              {resource.type === 'link' && (
                <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  View Link
                </a>
              )}

              {resource.type === 'file' && (
                <button onClick={() => handleDownload(resource.file)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Download
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareResources;