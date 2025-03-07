import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FileText, Video, Link as LinkIcon, 
  Download, Play 
} from 'lucide-react';

const getIcon = (type) => {
  switch (type) {
    case 'document':
      return <FileText className="w-6 h-6 text-blue-500" />;
    case 'video':
      return <Play className="w-6 h-6 text-green-500" />;
    case 'link':
      return <LinkIcon className="w-6 h-6 text-purple-500" />;
    default:
      return <FileText className="w-6 h-6 text-gray-500" />;
  }
};

const ShareResource = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8080/api/resources', {
          withCredentials: true
        });
        
        const resourceData = Array.isArray(response.data) 
          ? response.data 
          : response.data.resources || [];
        
        setResources(resourceData);
        setError(null);
      } catch (err) {
        console.error('Error fetching resources:', err);
        setError(err.message || 'Failed to fetch resources');
        setResources([]); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleResourceAction = async (resource) => {
    try {
      if (resource.type === 'link') {
        // Open link in a new tab
        window.open(resource.url, '_blank', 'noopener,noreferrer');
      } else {
        // Download file
        const response = await axios({
          url: `http://localhost:8080/api/resources/download/${resource._id}`,
          method: 'GET',
          responseType: 'blob',
          withCredentials: true
        });
        
        const blob = new Blob([response.data]);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = resource.originalFileName || 'download';
        link.click();
      }
    } catch (error) {
      console.error('Resource action error:', error);
      alert('Failed to process resource');
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 min-h-screen bg-[#0B0F1A] flex items-center justify-center">
        <div className="text-white">Loading resources...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen bg-[#0B0F1A] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-[#0B0F1A]">
      <h1 className="text-2xl font-bold text-white mb-6">Learning Resources</h1>
      
      {resources.length === 0 ? (
        <div className="text-center text-gray-400">
          No resources available at the moment.
        </div>
      ) : (
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <div 
              key={resource._id} 
              className="bg-gray-800 rounded-xl p-6 flex flex-col transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                {getIcon(resource.type)}
                <h3 className="text-lg font-semibold text-white">{resource.title}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4 flex-grow">
                {resource.description}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xs text-gray-500">
                  {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                </span>
                <button 
                  onClick={() => handleResourceAction(resource)}
                  className="bg-violet-800 hover:bg-violet-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2"
                >
                  {resource.type === 'link' ? (
                    <>
                      <LinkIcon className="w-4 h-4" />
                      Open
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Download
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShareResource;