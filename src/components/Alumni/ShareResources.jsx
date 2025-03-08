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

export default ShareResource;