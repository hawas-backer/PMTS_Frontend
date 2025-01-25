import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ResourcePage = () => {
  // Dummy data for existing resources (this could come from an API)
  const [resources, setResources] = useState([
    { id: 1, title: 'Placement Handbook', type: 'document', file: 'handbook.pdf' },
    { id: 2, title: 'JavaScript Tutorial Video', type: 'video', file: 'https://youtu.be/abcd1234' },
    { id: 3, title: 'External Link to Job Portal', type: 'link', file: 'https://jobportal.com' },
  ]);

  const handleDelete = (id) => {
    // Filter out the resource by id (in a real application, you'd call an API to delete)
    setResources(resources.filter((resource) => resource.id !== id));
  };

  return (
    <div className="container mx-auto px-4 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Resources</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="border-b bg-gray-200">
              <th className="px-4 py-2 text-sm font-medium text-gray-600">Title</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">Type</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.id} className="border-b">
                <td className="px-4 py-2 text-sm text-gray-800">{resource.title}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{resource.type}</td>
                <td className="px-4 py-2 text-sm">
                  <Link to={`/edit-resource/${resource.id}`} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(resource.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link
        to="/add-resources"
        className="bg-blue-500 text-white px-6 py-2 mt-6 inline-block rounded-lg shadow hover:bg-blue-600"
      >
        Add Resource
      </Link>
    </div>
  );
};

export default ResourcePage;