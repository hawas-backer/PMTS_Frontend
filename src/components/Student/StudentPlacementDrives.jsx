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
      const sortedDrives = studentDrives.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setDrives(sortedDrives);
      setErrors([]);
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
      setErrors([]);
      fetchDrives();
    } catch (error) {
      console.error('Apply error:', error.response?.data);
      setErrors([error.response?.data?.message || 'Error applying to placement drive']);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'text-yellow-400';
      case 'Accepted': return 'text-accent'; // #10B981
      case 'Rejected': return 'text-error'; // #F87171
      case 'Not Applied': return 'text-text-secondary'; // #94A3B8
      default: return 'text-text-primary'; // #F1F5F9
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg text-text-primary p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center animate-fade-in">
          Eligible Placement Drives
        </h2>

        {loading ? (
          <p className="text-text-secondary text-center animate-pulse">Loading placement drives...</p>
        ) : drives.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {drives.map((drive) => (
              <div
                key={drive._id}
                className="bg-secondary-bg p-6 rounded-xl shadow-glass border border-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{drive.companyName}</h3>
                <p className="text-text-secondary mb-1 line-clamp-2">{drive.role}</p>
                <p className="text-text-secondary mb-1">
                  Date: {drive.date ? new Date(drive.date).toLocaleDateString('en-GB') : 'N/A'}
                </p>
                <p className="text-text-secondary mb-4">
                  Min CGPA: {drive.minCGPA} | Max Backlogs: {drive.maxBacklogs}
                </p>
                <p className="mb-4">
                  Status: <span className={getStatusStyle(drive.status)}>{drive.status}</span>
                </p>
                {drive.status === 'Not Applied' && (
                  <button
                    onClick={() => applyToDrive(drive._id)}
                    className="w-full bg-gradient-to-r from-highlight to-accent hover:from-accent hover:to-highlight text-text-primary py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary text-center py-12">No eligible placement drives available.</p>
        )}

        {errors.length > 0 && (
          <div className="mt-6 bg-error/20 p-4 rounded-xl animate-fade-in">
            {errors.map((error, index) => (
              <p key={index} className="text-error">{error}</p>
            ))}
          </div>
        )}

        {message && (
          <div className="mt-6 bg-accent/20 p-4 rounded-xl animate-fade-in">
            <p className="text-accent">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPlacementDrives;