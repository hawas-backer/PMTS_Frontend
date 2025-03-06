import React from 'react';
import { Link as LinkIcon, File } from 'lucide-react';

const resources = [
  { id: 1, title: 'React Guide', desc: 'Learn React.', link: '/react', type: 'link' },
  { id: 2, title: 'Proposal', desc: 'Project doc.', file: '/proposal.pdf', type: 'file' },
];

const ShareResources = () => {
  const handleDownload = (file) => {
    const link = document.createElement('a');
    link.href = file;
    link.setAttribute('download', file.split('/').pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-300 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-lg font-semibold mb-4">Resources</h1>
        <ul className="space-y-2">
          {resources.map((resource) => (
            <li key={resource.id} className="p-3 bg-gray-800 rounded hover:bg-gray-700 transition flex justify-between items-center">
              <div>
                <h2 className="text-sm font-semibold">{resource.title}</h2>
                <p className="text-xs text-gray-500">{resource.desc}</p>
              </div>
              {resource.type === 'link' ? (
                <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 text-sm">
                  <LinkIcon size={16} />
                </a>
              ) : (
                <button onClick={() => handleDownload(resource.file)} className="text-blue-500 hover:text-blue-400">
                  <File size={16} />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShareResources;