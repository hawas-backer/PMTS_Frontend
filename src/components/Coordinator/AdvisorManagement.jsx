// frontend/src/components/Coordinator/AdvisorManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit, Trash, Search } from 'lucide-react';
import AddAdvisorForm from './AddAdvisorForm';
import EditAdvisorForm from './EditAdvisorForm';

const API_BASE_URL = 'http://localhost:8080';

const AdvisorManagement = () => {
  const { user } = useAuth();
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all advisors
  const fetchAdvisors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/advisors`, {
        withCredentials: true
      });
      setAdvisors(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch advisors');
      console.error('Error fetching advisors:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchAdvisors();
  }, []);

  // Handle adding a new advisor
  const handleAddAdvisor = async (newAdvisorData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/advisors/add`,
        newAdvisorData,
        { withCredentials: true }
      );
      
      setAdvisors([...advisors, response.data.advisor]);
      setShowAddForm(false);
      return { success: true, message: 'Advisor added successfully' };
    } catch (err) {
      console.error('Error adding advisor:', err);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Failed to add advisor' 
      };
    }
  };

  // Handle editing an advisor
  const handleEditAdvisor = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/advisors/${id}`,
        updatedData,
        { withCredentials: true }
      );
      
      // Update the advisors list
      setAdvisors(advisors.map(advisor => 
        advisor.id === id ? response.data.advisor : advisor
      ));
      
      setShowEditForm(false);
      setSelectedAdvisor(null);
      return { success: true, message: 'Advisor updated successfully' };
    } catch (err) {
      console.error('Error updating advisor:', err);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Failed to update advisor' 
      };
    }
  };

  // Handle deleting an advisor
  const handleDeleteAdvisor = async (id) => {
    if (!window.confirm('Are you sure you want to delete this advisor?')) {
      return;
    }
    
    try {
      await axios.delete(
        `${API_BASE_URL}/api/advisors/${id}`,
        { withCredentials: true }
      );
      
      // Remove from advisors list
      setAdvisors(advisors.filter(advisor => advisor._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete advisor');
      console.error('Error deleting advisor:', err);
    }
  };

  // Handle opening edit form
  const handleEditClick = (advisor) => {
    setSelectedAdvisor(advisor);
    setShowEditForm(true);
  };

  // Filter advisors based on search term
  const filteredAdvisors = advisors.filter(advisor => 
    advisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advisor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advisor.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-[#0f1218] text-white">
      <h1 className="text-2xl font-bold mb-6">Advisor Management</h1>
      
      {/* Error display */}
      {error && (
        <div className="bg-red-500 text-white p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Action buttons and search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus size={18} className="mr-1" /> Add New Advisor
        </button>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search advisors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#1a1f2c] border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
          <Search size={18} className="absolute right-3 top-2.5 text-gray-400" />
        </div>
      </div>
      
      {/* Advisors table */}
      {loading ? (
        <div className="text-center py-8">Loading advisors...</div>
      ) : filteredAdvisors.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1a1f2c] rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Branch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {filteredAdvisors.map((advisor) => (
                <tr key={advisor._id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">{advisor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{advisor.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{advisor.branch}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{advisor.phoneNumber || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClick(advisor)}
                        className="text-yellow-500 hover:text-yellow-400"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteAdvisor(advisor._id)}
                        className="text-red-500 hover:text-red-400"
                        title="Delete"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 bg-[#1a1f2c] rounded-lg">
          {searchTerm ? 'No advisors matching your search' : 'No advisors found'}
        </div>
      )}
      
      {/* Add Advisor Form Modal */}
      {showAddForm && (
        <AddAdvisorForm
          onSubmit={handleAddAdvisor}
          onCancel={() => setShowAddForm(false)}
        />
      )}
      
      {/* Edit Advisor Form Modal */}
      {showEditForm && selectedAdvisor && (
        <EditAdvisorForm
          advisor={selectedAdvisor}
          onSubmit={(data) => handleEditAdvisor(selectedAdvisor._id, data)}
          onCancel={() => {
            setShowEditForm(false);
            setSelectedAdvisor(null);
          }}
        />
      )}
    </div>
  );
};


export default AdvisorManagement;