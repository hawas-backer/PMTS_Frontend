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
  const [loading, setLoading] = useState(true);

  // Redirect if user is not a student
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
      // Sort drives by createdAt (most recent first)
      const sortedDrives = studentDrives.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setDrives(sortedDrives);
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
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Eligible Placement Drives</h2>

        {loading ? (
          <p className="text-gray-400 text-center">Loading placement drives...</p>
        ) : drives.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drives.map((drive) => (
              <div
                key={drive._id}
                className="bg-[#1a2233] p-6 rounded-lg shadow-lg border border-[#2c3e50] hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2">{drive.companyName}</h3>
                <p className="text-gray-400 mb-1">{drive.role}</p>
                <p className="text-gray-400 mb-1">
                  Date: {new Date(drive.date).toLocaleDateString()}
                </p>
                <p className="text-gray-400 mb-1">
                  Min CGPA: {drive.minCGPA}, Max Backlogs: {drive.maxBacklogs}
                </p>
                <p className="mb-4">
                  Status:{' '}
                  <span className={getStatusStyle(drive.status)}>{drive.status}</span>
                </p>
                {drive.status === 'Not Applied' && (
                  <button
                    onClick={() => applyToDrive(drive._id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded text-sm font-medium transition-colors"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No eligible placement drives available.</p>
        )}

        {errors.length > 0 && (
          <div className="mt-6 bg-red-600 bg-opacity-20 p-4 rounded">
            {errors.map((error, index) => (
              <p key={index} className="text-red-400">{error}</p>
            ))}
          </div>
        )}

        {message && (
          <div className="mt-6 bg-green-600 bg-opacity-20 p-4 rounded">
            <p className="text-green-400">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPlacementDrives;