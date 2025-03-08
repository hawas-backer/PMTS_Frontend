import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:8080';

const PlacementDriveDashboard = () => {
  const { role } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '', role: '', description: '', minCGPA: '',
    maxBacklogs: '', eligibleBranches: '', minSemestersCompleted: '', date: ''
  });
  const [drives, setDrives] = useState([]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  if (role !== 'Coordinator') {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const response = await axios.get('/api/placement-drives/all', { withCredentials: true });
      setDrives(response.data);
    } catch (error) {
      setErrors([error.response?.data.message || 'Error fetching placement drives']);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setMessage('');

    try {
      const response = await axios.post('/api/placement-drives/create', {
        ...formData,
        eligibleBranches: formData.eligibleBranches.split(',').map(b => b.trim()),
        minCGPA: parseFloat(formData.minCGPA) || 0,
        maxBacklogs: parseInt(formData.maxBacklogs) || 0,
        minSemestersCompleted: parseInt(formData.minSemestersCompleted) || 0
      }, { withCredentials: true });
      setMessage(response.data.message);
      setFormData({
        companyName: '', role: '', description: '', minCGPA: '',
        maxBacklogs: '', eligibleBranches: '', minSemestersCompleted: '', date: ''
      });
      fetchDrives();
    } catch (error) {
      setErrors([error.response?.data.message || 'Error creating placement drive']);
    }
  };

  return (
    <div className="bg-[#0f1218] min-h-screen p-8 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Placement Drive Dashboard</h2>

        <div className="bg-[#1a2233] p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl mb-4">Add New Placement Drive</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" className="bg-[#2c3e50] text-white p-2 rounded" required />
              <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role" className="bg-[#2c3e50] text-white p-2 rounded" required />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="bg-[#2c3e50] text-white p-2 rounded col-span-2" />
              <input type="number" name="minCGPA" value={formData.minCGPA} onChange={handleChange} placeholder="Min CGPA" step="0.1" className="bg-[#2c3e50] text-white p-2 rounded" />
              <input type="number" name="maxBacklogs" value={formData.maxBacklogs} onChange={handleChange} placeholder="Max Backlogs" className="bg-[#2c3e50] text-white p-2 rounded" />
              <input type="text" name="eligibleBranches" value={formData.eligibleBranches} onChange={handleChange} placeholder="Eligible Branches (comma-separated)" className="bg-[#2c3e50] text-white p-2 rounded" required />
              <input type="number" name="minSemestersCompleted" value={formData.minSemestersCompleted} onChange={handleChange} placeholder="Min Semesters" className="bg-[#2c3e50] text-white p-2 rounded" />
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="bg-[#2c3e50] text-white p-2 rounded" required />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded">Create Placement Drive</button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drives.map(drive => (
            <div
              key={drive._id}
              className="bg-[#1a2233] p-6 rounded-lg shadow-lg border border-[#2c3e50] hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate(`/Coordinator/placement-drives/${drive._id}`)} // Updated path
            >
              <h3 className="text-xl font-bold mb-2">{drive.companyName} - {drive.role}</h3>
              <p className="text-gray-400 mb-1">Date: {new Date(drive.date).toLocaleDateString()}</p>
              <p className="text-gray-400 mb-1">Applicants: {drive.applications.length}</p>
              <p className="text-gray-400 mb-1">Phases: {drive.phases.length}</p>
              <p className="text-gray-400">Status: <span className={drive.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}>{drive.status}</span></p>
            </div>
          ))}
        </div>

        {errors.length > 0 && (
          <div className="mt-6 bg-red-600 bg-opacity-20 p-4 rounded">
            {errors.map((error, index) => <p key={index} className="text-red-400">{error}</p>)}
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

export default PlacementDriveDashboard;