import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionInProgress, setActionInProgress] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const { user } = useAuth();
  
axios.defaults.baseURL = 'http://localhost:8080';
  const fetchRequests = async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.get('/api/admin/pending-alumni-requests', { 
        withCredentials: true 
      });
      setRequests(res.data);
    } catch (error) {
      console.error('Failed to fetch pending requests', error);
      setError('Failed to fetch pending requests. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchRequests();
  }, []);
  
  const handleApprove = async (id) => {
    setActionInProgress(id);
    setMessage({ text: '', type: '' });
    
    try {
      const res = await axios.put(`/api/admin/approve-alumni-request/${id}`, {}, { 
        withCredentials: true 
      });
      
      // Remove the approved request from the list
      setRequests(requests.filter(req => req._id !== id));
      
      setMessage({ 
        text: 'Registration request approved successfully', 
        type: 'success' 
      });
    } catch (error) {
      console.error('Failed to approve request', error);
      setMessage({ 
        text: error.response?.data?.message || 'Failed to approve request', 
        type: 'error' 
      });
    } finally {
      setActionInProgress(null);
    }
  };
  
  const handleReject = async (id) => {
    setActionInProgress(id);
    setMessage({ text: '', type: '' });
    
    try {
      const res = await axios.put(`/api/admin/reject-alumni-request/${id}`, {}, { 
        withCredentials: true 
      });
      
      // Remove the rejected request from the list
      setRequests(requests.filter(req => req._id !== id));
      
      setMessage({ 
        text: 'Registration request rejected successfully', 
        type: 'success' 
      });
    } catch (error) {
      console.error('Failed to reject request', error);
      setMessage({ 
        text: error.response?.data?.message || 'Failed to reject request', 
        type: 'error' 
      });
    } finally {
      setActionInProgress(null);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  

  
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Pending Alumni Registration Requests
          </h1>
          <button
            onClick={fetchRequests}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
        
        {message.text && (
          <div className={`mb-4 p-3 rounded ${
            message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message.text}
          </div>
        )}
        
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-3 text-gray-600">Loading requests...</p>
          </div>
        )}
        
        {error && !loading && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{error}</p>
          </div>
        )}
        
        {!loading && !error && requests.length === 0 && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-12 text-center text-gray-500">
              No pending registration requests for your branch.
            </div>
          </div>
        )}
        
        {!loading && !error && requests.length > 0 && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Batch Year
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Branch
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.batchYear}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.branch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(request.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleApprove(request._id)}
                          disabled={actionInProgress === request._id}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                        >
                          {actionInProgress === request._id ? (
                            <span className="animate-spin h-4 w-4 mr-1 border-b-2 border-white rounded-full"></span>
                          ) : (
                            <Check className="h-4 w-4 mr-1" />
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(request._id)}
                          disabled={actionInProgress === request._id}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                        >
                          {actionInProgress === request._id ? (
                            <span className="animate-spin h-4 w-4 mr-1 border-b-2 border-white rounded-full"></span>
                          ) : (
                            <X className="h-4 w-4 mr-1" />
                          )}
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingRequests;