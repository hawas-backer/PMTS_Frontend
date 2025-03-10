import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Plus, Briefcase, Calendar, Users, Search, Filter, Check, X, ChevronDown, ChevronUp, Award } from 'lucide-react';

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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
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
      setIsFormOpen(false);
      
      // Show success message and auto-hide after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      setErrors([error.response?.data.message || 'Error creating placement drive']);
    }
  };

  // Filter and sort drives
  const filteredDrives = drives
    .filter(drive => 
      (filterStatus === 'All' || drive.status === filterStatus) &&
      (drive.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
       drive.role.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'company') {
        return sortOrder === 'desc'
          ? b.companyName.localeCompare(a.companyName)
          : a.companyName.localeCompare(b.companyName);
      } else if (sortBy === 'applicants') {
        return sortOrder === 'desc'
          ? b.applications.length - a.applications.length
          : a.applications.length - b.applications.length;
      }
      return 0;
    });

  // Dashboard stats
  const activeDrives = drives.filter(drive => drive.status !== 'Completed').length;
  const completedDrives = drives.filter(drive => drive.status === 'Completed').length;
  const totalApplicants = drives.reduce((sum, drive) => sum + drive.applications.length, 0);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1218] to-[#1a202c] p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header with stats */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Placement Drive Dashboard
            </h2>
            <p className="text-gray-400 mt-2">Manage company placements and student applications</p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="mt-4 md:mt-0 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Plus size={20} />
            Create New Drive
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#1a2233] to-[#1e293b] p-6 rounded-lg shadow-lg border border-[#2c3e50] hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 font-medium">Active Drives</h3>
              <div className="p-2 bg-blue-600 bg-opacity-20 rounded-full">
                <Briefcase className="text-blue-400" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold mt-2">{activeDrives}</p>
            <p className="text-sm text-gray-400 mt-1">Currently in progress</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#1a2233] to-[#1e293b] p-6 rounded-lg shadow-lg border border-[#2c3e50] hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 font-medium">Completed Drives</h3>
              <div className="p-2 bg-green-600 bg-opacity-20 rounded-full">
                <Check className="text-green-400" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold mt-2">{completedDrives}</p>
            <p className="text-sm text-gray-400 mt-1">Successfully completed</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#1a2233] to-[#1e293b] p-6 rounded-lg shadow-lg border border-[#2c3e50] hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 font-medium">Total Applicants</h3>
              <div className="p-2 bg-purple-600 bg-opacity-20 rounded-full">
                <Users className="text-purple-400" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold mt-2">{totalApplicants}</p>
            <p className="text-sm text-gray-400 mt-1">Across all drives</p>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-[#1a2233] p-4 rounded-lg shadow-lg mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              placeholder="Search drives by company or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#2c3e50] text-white pl-10 pr-4 py-3 rounded-lg border border-[#34495e] focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
          
          <div className="flex gap-3 md:w-auto">
            <div className="relative inline-block">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-[#2c3e50] text-white px-4 py-3 rounded-lg border border-[#34495e] focus:outline-none focus:border-blue-500 transition-all appearance-none pr-10"
              >
                <option value="All">All Status</option>
                <option value="Upcoming">Upcoming</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Filter className="text-gray-400" size={18} />
              </div>
            </div>
            
            <button
              onClick={() => toggleSort('date')}
              className={`flex items-center gap-1 px-4 py-3 rounded-lg border ${
                sortBy === 'date' ? 'border-blue-500 bg-blue-600 bg-opacity-20' : 'border-[#34495e] bg-[#2c3e50]'
              }`}
            >
              <Calendar size={16} />
              <span className="hidden md:inline">Date</span>
              {sortBy === 'date' && (
                sortOrder === 'desc' ? <ChevronDown size={16} /> : <ChevronUp size={16} />
              )}
            </button>
            
            <button
              onClick={() => toggleSort('company')}
              className={`flex items-center gap-1 px-4 py-3 rounded-lg border ${
                sortBy === 'company' ? 'border-blue-500 bg-blue-600 bg-opacity-20' : 'border-[#34495e] bg-[#2c3e50]'
              }`}
            >
              <Briefcase size={16} />
              <span className="hidden md:inline">Company</span>
              {sortBy === 'company' && (
                sortOrder === 'desc' ? <ChevronDown size={16} /> : <ChevronUp size={16} />
              )}
            </button>
            
            <button
              onClick={() => toggleSort('applicants')}
              className={`flex items-center gap-1 px-4 py-3 rounded-lg border ${
                sortBy === 'applicants' ? 'border-blue-500 bg-blue-600 bg-opacity-20' : 'border-[#34495e] bg-[#2c3e50]'
              }`}
            >
              <Users size={16} />
              <span className="hidden md:inline">Applicants</span>
              {sortBy === 'applicants' && (
                sortOrder === 'desc' ? <ChevronDown size={16} /> : <ChevronUp size={16} />
              )}
            </button>
          </div>
        </div>

        {/* Drives List */}
        {filteredDrives.length === 0 ? (
          <div className="text-center text-gray-400 py-16 bg-[#1a2233] rounded-lg border border-[#2c3e50]">
            <Briefcase className="mx-auto mb-4 opacity-30" size={64} />
            {drives.length === 0 ? (
              <>
                <p className="text-xl font-semibold mb-2">No placement drives available</p>
                <p>Create your first drive to get started!</p>
              </>
            ) : (
              <>
                <p className="text-xl font-semibold mb-2">No matching drives found</p>
                <p>Try adjusting your search filters</p>
              </>
            )}
            <button 
              onClick={() => {
                setIsFormOpen(true);
                setSearchTerm('');
                setFilterStatus('All');
              }}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all duration-200 inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Create New Drive
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrives.map(drive => (
              <div
                key={drive._id}
                className="bg-gradient-to-br from-[#1a2233] to-[#1e293b] p-6 rounded-lg shadow-lg border border-[#2c3e50] hover:border-blue-500 hover:shadow-xl transition-all duration-200 cursor-pointer group"
                onClick={() => navigate(`/Coordinator/placement-drives/${drive._id}`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-full bg-blue-600 bg-opacity-20">
                    <Briefcase className="text-blue-400 group-hover:text-blue-300 transition-colors" size={24} />
                  </div>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
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
                
                <h3 className="text-xl font-semibold text-gray-200 group-hover:text-blue-400 transition-colors mb-1">
                  {drive.companyName}
                </h3>
                <p className="text-gray-400 mb-4">{drive.role}</p>
                
                <div className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{new Date(drive.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-400" />
                    <span><strong>{drive.applications.length}</strong> Applicants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-gray-400" />
                    <span><strong>{drive.phases.length}</strong> Selection Phases</span>
                  </div>
                  
                  {drive.minCGPA > 0 && (
                    <div className="text-xs text-gray-400 mt-3 pt-3 border-t border-[#2c3e50]">
                      Min CGPA: {drive.minCGPA} • Max Backlogs: {drive.maxBacklogs}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Drive Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1a2233] rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-[#2c3e50]">
                <h3 className="text-xl font-semibold text-gray-200">Create New Placement Drive</h3>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2 font-medium">Company Name</label>
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
                    <label className="block text-gray-300 text-sm mb-2 font-medium">Role</label>
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
                    <label className="block text-gray-300 text-sm mb-2 font-medium">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Brief description of the drive, responsibilities, and requirements"
                      className="w-full bg-[#2c3e50] text-white p-3 rounded-lg border border-[#34495e] focus:outline-none focus:border-blue-500 transition-all"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2 font-medium">Minimum CGPA</label>
                    <input
                      type="number"
                      name="minCGPA"
                      value={formData.minCGPA}
                      onChange={handleChange}
                      placeholder="e.g., 7.0"
                      step="0.1"
                      min="0"
                      max="10"
                      className="w-full bg-[#2c3e50] text-white p-3 rounded-lg border border-[#34495e] focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2 font-medium">Maximum Backlogs</label>
                    <input
                      type="number"
                      name="maxBacklogs"
                      value={formData.maxBacklogs}
                      onChange={handleChange}
                      placeholder="e.g., 0"
                      min="0"
                      className="w-full bg-[#2c3e50] text-white p-3 rounded-lg border border-[#34495e] focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2 font-medium">Minimum Semesters Completed</label>
                    <input
                      type="number"
                      name="minSemestersCompleted"
                      value={formData.minSemestersCompleted}
                      onChange={handleChange}
                      placeholder="e.g., 4"
                      min="1"
                      max="8"
                      className="w-full bg-[#2c3e50] text-white p-3 rounded-lg border border-[#34495e] focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2 font-medium">Drive Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-[#2c3e50] text-white p-3 rounded-lg border border-[#34495e] focus:outline-none focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 text-sm mb-2 font-medium">
                      Eligible Branches <span className="text-gray-400">(comma-separated)</span>
                    </label>
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
                </div>
                <div className="mt-8 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="flex-1 bg-[#2c3e50] hover:bg-[#34495e] text-white py-3 rounded-lg transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg transition-all duration-200 font-medium"
                  >
                    Create Drive
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Toast Messages */}
        {message && (
          <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up">
            <div className="flex items-center gap-2">
              <Check size={20} />
              <p>{message}</p>
            </div>
          </div>
        )}
        
        {errors.length > 0 && (
          <div className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up">
            <div className="flex items-center gap-2">
              <X size={20} />
              <p>{errors[0]}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementDriveDashboard;