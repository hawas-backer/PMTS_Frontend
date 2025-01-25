import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddResource = () => {
  const navigate = useNavigate();

  const [resource, setResource] = useState({
    title: '',
    type: 'document',
    file: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResource((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setResource((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the data to your backend or API
    console.log('Resource added:', resource);

    // Redirect back to resource list after adding
    navigate('/resources');
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-2xl font-semibold mb-8 text-gray-700">Add Resource</h2>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        {/* Title Input */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={resource.title}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter resource title"
            required
          />
        </div>

        {/* Resource Type Selection */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-medium mb-2">Resource Type</label>
          <select
            name="type"
            value={resource.type}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="document">Document</option>
            <option value="video">Video</option>
            <option value="link">External Link</option>
          </select>
        </div>

        {/* Conditional Input for File Upload or URL */}
        {resource.type === 'document' || resource.type === 'video' ? (
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              {resource.type === 'document' ? 'Upload Document' : 'Upload Video'}
            </label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ) : (
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2">Resource URL</label>
            <input
              type="text"
              name="file"
              value={resource.file}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter resource URL"
              required
            />
          </div>
        )}

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-between items-center mt-6 space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Add Resource
          </button>
          <button
            type="button"
            onClick={() => navigate('/resources')}
            className="bg-gray-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddResource;