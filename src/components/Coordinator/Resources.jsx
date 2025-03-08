import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, Edit, Trash2, FileText, 
  Video, Link as LinkIcon, Download, X 
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api';

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

export const AddResource = ({ onClose, onResourceAdded, resourceToEdit }) => {
  const [resourceData, setResourceData] = useState(
    resourceToEdit 
      ? {
          title: resourceToEdit.title,
          description: resourceToEdit.description,
          type: resourceToEdit.type,
          url: resourceToEdit.url || '',
          file: null
        }
      : {
          title: '',
          description: '',
          type: 'document',
          file: null,
          url: ''
        }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', resourceData.title);
    formData.append('description', resourceData.description);
    formData.append('type', resourceData.type);
    
    if (resourceData.type === 'link') {
      formData.append('url', resourceData.url);
    } else if (resourceData.file) {
      formData.append('file', resourceData.file);
    }

    try {
      let response;
      if (resourceToEdit) {
        response = await axios.put(
          `${API_BASE_URL}/resources/${resourceToEdit._id}`, 
          formData, 
          { 
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
          }
        );
        onResourceAdded(response.data);
      } else {
        response = await axios.post(
          `${API_BASE_URL}/resources`, 
          formData, 
          { 
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
          }
        );
        onResourceAdded(response.data.resource);
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving resource:', error);
      alert('Failed to save resource. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResourceData({ ...resourceData, file });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <form 
        onSubmit={handleSubmit} 
        className="bg-[#1a1f2c] rounded-lg p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-200">
            {resourceToEdit ? 'Edit Resource' : 'Add Resource'}
          </h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Resource Type</label>
            <select
              value={resourceData.type}
              onChange={(e) => setResourceData({ 
                ...resourceData, 
                type: e.target.value,
                file: null,
                url: ''
              })}
              className="w-full bg-[#2c3341] text-gray-200 p-2 rounded"
            >
              <option value="document">Document</option>
              <option value="video">Video</option>
              <option value="link">Link</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={resourceData.title}
              onChange={(e) => setResourceData({ 
                ...resourceData, 
                title: e.target.value 
              })}
              className="w-full bg-[#2c3341] text-gray-200 p-2 rounded"
              placeholder="Enter resource title"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              value={resourceData.description}
              onChange={(e) => setResourceData({ 
                ...resourceData, 
                description: e.target.value 
              })}
              className="w-full bg-[#2c3341] text-gray-200 p-2 rounded"
              placeholder="Enter resource description"
              rows="3"
            />
          </div>

          {resourceData.type === 'link' && (
            <div>
              <label className="block text-gray-300 mb-2">URL</label>
              <input
                type="url"
                value={resourceData.url}
                onChange={(e) => setResourceData({ 
                  ...resourceData, 
                  url: e.target.value 
                })}
                className="w-full bg-[#2c3341] text-gray-200 p-2 rounded"
                placeholder="Enter resource URL"
                required
              />
            </div>
          )}

          {resourceData.type !== 'link' && (
            <div>
              <label className="block text-gray-300 mb-2">File</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full bg-[#2c3341] text-gray-200 p-2 rounded"
                accept={resourceData.type === 'video' ? 'video/*' : '*'}
                required={!resourceToEdit}
              />
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            {resourceToEdit ? 'Update Resource' : 'Add Resource'}
          </button>
        </div>
      </form>
    </div>
  );
};

export const Resources = () => {
  const [resources, setResources] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddResource, setShowAddResource] = useState(false);
  const [editingResource, setEditingResource] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/resources`, {
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

  const handleDeleteResource = async (resourceId) => {
    try {
      await axios.delete(`${API_BASE_URL}/resources/${resourceId}`, {
        withCredentials: true
      });
      setResources(resources.filter(r => r._id !== resourceId));
    } catch (error) {
      console.error('Error deleting resource:', error);
      alert('Failed to delete resource');
    }
  };

  const handleDownload = async (resource) => {
    try {
      const response = await axios({
        url: `${API_BASE_URL}/resources/download/${resource._id}`,
        method: 'GET',
        responseType: 'blob',
        withCredentials: true
      });
      
      const blob = new Blob([response.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = resource.originalFileName || 'download';
      link.click();
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download resource');
    }
  };

  const handleResourceAdded = (updatedOrNewResource) => {
    if (editingResource) {
      setResources(resources.map(r => 
        r._id === updatedOrNewResource._id ? updatedOrNewResource : r
      ));
    } else {
      setResources([...resources, updatedOrNewResource]);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-[#0f1218] h-screen flex items-center justify-center">
        <div className="text-white">Loading resources...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-[#0f1218] h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#0f1218] h-screen w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-200">Resources</h2>
        <button 
          onClick={() => setShowAddResource(true)}
          className="bg-blue-600 text-white p-2 rounded flex items-center hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" /> Add Resource
        </button>
      </div>

      {resources.length === 0 ? (
        <div className="text-gray-400 text-center">
          No resources found. Add a new resource to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <div 
              key={resource._id}
              className="bg-[#1a1f2c] p-4 rounded-lg shadow-md flex flex-col"
            >
              <div className="flex justify-between items-start mb-2">
                {getIcon(resource.type)}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => {
                      setEditingResource(resource);
                      setShowAddResource(true);
                    }}
                    className="text-gray-400 hover:text-blue-400"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={() => handleDeleteResource(resource._id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-1">
                {resource.title}
              </h3>
              <p className="text-gray-400 text-sm mb-2 flex-grow">
                {resource.description}
              </p>
              {resource.type === 'link' ? (
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-sm"
                >
                  Open Link
                </a>
              ) : (
                <button 
                  onClick={() => handleDownload(resource)}
                  className="w-full bg-green-600 text-white p-2 rounded flex items-center justify-center hover:bg-green-700"
                >
                  <Download size={16} className="mr-2" /> Download
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {showAddResource && (
        <AddResource 
          onClose={() => {
            setShowAddResource(false);
            setEditingResource(null);
          }}
          onResourceAdded={handleResourceAdded}
          resourceToEdit={editingResource}
        />
      )}
    </div>
  );
};

export default Resources;