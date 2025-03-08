import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:8080';

const StudentPlacementDrives = () => {
  const { user, role } = useAuth();
  const [drives, setDrives] = useState([]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  if (role !== 'Student') {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/students/placements/me', { withCredentials: true });
      const studentDrives = response.data.eligibleDrives || [];
      setDrives(studentDrives);
      setErrors([]); // Clear errors on success
    } catch (error) {
      console.error('Fetch error:', error.response?.data);
      setErrors([error.response?.data?.message || 'Error fetching placement drives']);
    } finally {
      setLoading(false);
    }
  };
  const applyToDrive = async (driveId) => {
    try {
      const response = await axios.post(`/api/placement-drives/apply/${driveId}`, {}, { withCredentials: true });
      setMessage(response.data.message);
      setErrors([]); // Clear errors on success
      fetchDrives(); // Refresh drives to update status
    } catch (error) {
      console.error('Apply error:', error.response?.data);
      setErrors([error.response?.data?.message || 'Error applying to placement drive']);
    }
  };

  // Status styling helper
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-400';
      case 'Accepted':
        return 'text-green-400';
      case 'Rejected':
        return 'text-red-400';
      case 'Not Applied':
        return 'text-gray-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="bg-[#0f1218] min-h-screen p-8 text-white">
      <div className="max-w-4xl mx-auto bg-[#1a2233] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Eligible Placement Drives</h2>

        {loading ? (
          <p className="text-gray-400 text-center">Loading placement drives...</p>
        ) : drives.length > 0 ? (
          drives.map(drive => (
            <div key={drive._id} className="border-b border-[#2c3e50] py-4">
              <p><strong>{drive.companyName} - {drive.role}</strong></p>
              <p>Date: {new Date(drive.date).toLocaleDateString()}</p>
              <p>Min CGPA: {drive.minCGPA}, Max Backlogs: {drive.maxBacklogs}</p>
              <p>
                Status: <span className={getStatusStyle(drive.status)}>{drive.status}</span>
              </p>
              {drive.status === 'Not Applied' && (
                <button
                  onClick={() => applyToDrive(drive._id)}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 p-2 rounded text-sm"
                >
                  Apply Now
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No eligible placement drives available.</p>
        )}

        {errors.length > 0 && (
          <div className="mt-4 bg-red-600 bg-opacity-20 p-4 rounded">
            {errors.map((error, index) => (
              <p key={index} className="text-red-400">{error}</p>
            ))}
          </div>
        )}
        {message && (
          <div className="mt-4 bg-green-600 bg-opacity-20 p-4 rounded">
            <p className="text-green-400">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPlacementDrives;