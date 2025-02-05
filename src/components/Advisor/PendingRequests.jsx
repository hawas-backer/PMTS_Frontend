import React, { useState } from 'react';
import { Check, X, User } from 'lucide-react';



const PendingRequests = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', year: '4th Year', branch: 'CSE', status: 'pending' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', year: '4th Year', branch: 'ECE', status: 'pending' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', year: '4th Year', branch: 'CSE', status: 'pending' }
  ]);

  const handleApprove = (id) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'approved' } : req
    ));
  };

  const handleReject = (id) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-200 mb-6">Pending Registration Requests</h2>
      
      <div className="grid gap-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-[#1a1f2c] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-[#0f1218] p-2 rounded-full">
                  <User className="text-gray-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-200">{request.name}</h3>
                  <p className="text-gray-400">{request.email}</p>
                  <div className="flex gap-4 mt-1 text-sm text-gray-400">
                    <span>{request.year}</span>
                    <span>{request.branch}</span>
                  </div>
                </div>
              </div>
              
              {request.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
              
              {request.status === 'approved' && (
                <span className="text-green-400">Approved</span>
              )}
              
              {request.status === 'rejected' && (
                <span className="text-red-400">Rejected</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingRequests 