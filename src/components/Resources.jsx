import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, FileText, 
  Video, Link as LinkIcon, Download 
} from 'lucide-react';

const Resources = () => {
  const [showAddResource, setShowAddResource] = useState(false);
  const [resources, setResources] = useState([
    {
      id: 1,
      title: 'Interview Preparation Guide',
      description: 'Complete guide for technical interviews',
      type: 'document',
      url: 'interview-guide.pdf',
      uploadDate: '2025-02-01'
    },
    {
      id: 2,
      title: 'Mock Interview Session',
      description: 'Video recording of mock interview session',
      type: 'video',
      url: 'mock-interview.mp4',
      uploadDate: '2025-02-05'
    },
    {
      id: 3,
      title: 'Practice Platform',
      description: 'Online platform for coding practice',
      type: 'link',
      url: 'https://practice.example.com',
      uploadDate: '2025-02-10'
    }
  ]);

  const getIcon = (type) => {
    switch (type) {
      case 'document':
        return <FileText size={20} className="text-blue-400" />;
      case 'video':
        return <Video size={20} className="text-green-400" />;
      case 'link':
        return <LinkIcon size={20} className="text-purple-400" />;
      default:
        return <FileText size={20} />;
    }
  };

  return (
    <div className="p-6 bg-[#0f1218]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-200">Resources</h2>
        <button
          onClick={() => setShowAddResource(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <Plus size={20} />
          Add Resource
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-[#1a1f2c] rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {getIcon(resource.type)}
                <h3 className="text-xl font-bold text-gray-200">{resource.title}</h3>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-blue-400">
                  <Edit size={18} />
                </button>
                <button className="text-gray-400 hover:text-red-400">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <p className="mt-2 text-gray-400">{resource.description}</p>
            
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">{resource.uploadDate}</span>
              {resource.type === 'link' ? (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <LinkIcon size={16} />
                  Visit
                </a>
              ) : (
                <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  <Download size={16} />
                  Download
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAddResource && (
        <AddResource onClose={() => setShowAddResource(false)} />
      )}
    </div>
  );
};

const AddResource = ({ onClose }) => {
  const [resourceData, setResourceData] = useState({
    title: '',
    description: '',
    type: 'document',
    file: null,
    url: ''
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResourceData({ ...resourceData, file });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1f2c] rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-gray-200 mb-4">Add Resource</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Title</label>
            <input
              type="text"
              className="w-full bg-[#0f1218] text-gray-200 p-2 rounded"
              value={resourceData.title}
              onChange={(e) => setResourceData({...resourceData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              className="w-full bg-[#0f1218] text-gray-200 p-2 rounded"
              value={resourceData.description}
              onChange={(e) => setResourceData({...resourceData, description: e.target.value})}
              rows="3"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Resource Type</label>
            <select
              className="w-full bg-[#0f1218] text-gray-200 p-2 rounded"
              value={resourceData.type}
              onChange={(e) => setResourceData({...resourceData, type: e.target.value})}
            >
              <option value="document">Document</option>
              <option value="video">Video</option>
              <option value="link">External Link</option>
            </select>
          </div>

          {resourceData.type === 'link' ? (
            <div>
              <label className="block text-gray-300 mb-2">URL</label>
              <input
                type="url"
                className="w-full bg-[#0f1218] text-gray-200 p-2 rounded"
                value={resourceData.url}
                onChange={(e) => setResourceData({...resourceData, url: e.target.value})}
                placeholder="https://"
              />
            </div>
          ) : (
            <div>
              <label className="block text-gray-300 mb-2">
                Upload {resourceData.type === 'document' ? 'Document' : 'Video'}
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full bg-[#0f1218] text-gray-200 p-2 rounded"
                  accept={resourceData.type === 'document' ? 
                    '.pdf,.doc,.docx,.txt' : 
                    '.mp4,.webm,.mov'
                  }
                />
              </div>
              {resourceData.file && (
                <p className="mt-2 text-sm text-gray-400">
                  Selected: {resourceData.file.name}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-gray-200"
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Add Resource
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resources;