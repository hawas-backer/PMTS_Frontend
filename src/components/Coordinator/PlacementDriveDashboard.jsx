import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Plus, Briefcase, Calendar, Users } from 'lucide-react';

axios.defaults.baseURL = 'http://localhost:8080';

const PlacementDriveDashboard = () => {
  const { role } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    description: '',
    minCGPA: '',
    maxBacklogs: '',
    eligibleBranches: '',
    minSemestersCompleted: '',
    date: ''
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
      setDrives(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
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
    <div className="min-h-screen bg-[#0f1218] p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Placement Drive Dashboard</h2>
          <button
            onClick={() => document.getElementById('add-drive-form').scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
          >
            <Plus size={20} />
            Add Drive
          </button>
        </div>

        {/* Drives List */}
        {drives.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <Briefcase className="mx-auto mb-4" size={48} />
            <p>No placement drives available. Create one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {drives.map(drive => (
              <div
                key={drive._id}
                className="bg-[#1a2233] p-6 rounded-lg shadow-lg border border-[#2c3e50] hover:shadow-xl transition-all duration-200 cursor-pointer group"
                onClick={() => navigate(`/Coordinator/placement-drives/${drive._id}`)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="text-gray-400 group-hover:text-blue-400 transition-colors" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-200 group-hover:text-blue-400 transition-colors">
                      {drive.companyName} - {drive.role}
                    </h3>
                    <span
                      className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                        drive.status === 'Completed'
                          ? 'bg-green-900 text-green-300'
                          : drive.status === 'In Progress'
                          ? 'bg-yellow-900 text-yellow-300'
                          : 'bg-blue-900 text-blue-300'
                      }`}
                    >
                      {drive.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(drive.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{drive.applications.length} Applicants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Phases:</span>
                    <span>{drive.phases.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Drive Form */}
        <div id="add-drive-form" className="mt-12 bg-[#1a2233] p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-200 mb-6">Add New Placement Drive</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g., TechCorp"
                  className="w-full bg-[#2c3e50] text-white p-3 rounded-lg border border-[#34495e] focus:outline-none focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g., Software Engineer"
                  className="w-full bg-[#2c3e50] text-white p-3 rounded-lg border border-[#34495e] focus:outline-none focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description of the drive"
                  className="w-full bg-[#2c3e50] text-white p-3 rounded-lg border border-[#34495e] focus:outline-none focus:border-blue-500 transition-all"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Minimum CGPA</label>
                <input
                  type="number"
                  name="minCGPA"
                  value={formData.minCGPA}
                  onChange={handleChange}
                  placeholder="e.g., 7.0"
                  step="0.1"
                  className="w-full bg-[#2c3e50] text-white p-3 rounded-lg border border-[#34495e] focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Maximum Backlogs</label>
                <input
                  type="number"
                  name="maxBacklogs"
                  value={formData.maxBacklogs}
                  onChange={handleChange}
                  placeholder="e.g., 0"
                  className="w-full bg-[#2c3e50] text-white p-3 rounded-lg border border-[#34495e] focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm mb-1">Eligible Branches (comma-separated)</label>
                <input
                  type="text"
                  name="eligibleBranches"
                  value={formData.eligibleBranches}
                  onChange={handleChange}
                  placeholder="e.g., CSE, IT, ECE"
                  className="w-full bg-[#2c3e50] text-white p-3 rounded-lg border border-[#34495e] focus:outline-none focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Minimum Semesters Completed</label>
                <input
                  type="number"
                  name="minSemestersCompleted"
                  value={formData.minSemestersCompleted}
                  onChange={handleChange}
                  placeholder="e.g., 4"
                  className="w-full bg-[#2c3e50] text-white p-3 rounded-lg border border-[#34495e] focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Drive Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-[#2c3e50] text-white p-3 rounded-lg border border-[#34495e] focus:outline-none focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-200 font-medium"
            >
              Create Placement Drive
            </button>
          </form>
        </div>

        {/* Messages */}
        {errors.length > 0 && (
          <div className="mt-6 bg-red-600 bg-opacity-20 p-4 rounded-lg">
            {errors.map((error, index) => (
              <p key={index} className="text-red-400">{error}</p>
            ))}
          </div>
        )}
        {message && (
          <div className="mt-6 bg-green-600 bg-opacity-20 p-4 rounded-lg">
            <p className="text-green-400">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementDriveDashboard;