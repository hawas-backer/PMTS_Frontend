import React, { useState } from 'react';
import { Plus, Calendar, Briefcase, X } from 'lucide-react';

const AddPlacementDrive = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    description: '',
    minCGPA: 0,
    maxBacklogs: 0,
    eligibleBranches: [],
    minSemestersCompleted: 0,
    date: '',
  });
  const [branchInput, setBranchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const commonBranches = [
    'Computer Science',
    'Information Technology',
    'Electronics',
    'Electrical',
    'Mechanical',
    'Civil',
    'Chemical',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'minCGPA' || name === 'maxBacklogs' || name === 'minSemestersCompleted'
        ? parseFloat(value)
        : value,
    });
  };

  const handleAddBranch = () => {
    if (branchInput.trim() && !formData.eligibleBranches.includes(branchInput)) {
      setFormData({
        ...formData,
        eligibleBranches: [...formData.eligibleBranches, branchInput.trim()]
      });
      setBranchInput('');
    }
  };

  const handleRemoveBranch = (branch) => {
    setFormData({
      ...formData,
      eligibleBranches: formData.eligibleBranches.filter(b => b !== branch)
    });
  };

  const handleSelectCommonBranch = (branch) => {
    if (!formData.eligibleBranches.includes(branch)) {
      setFormData({
        ...formData,
        eligibleBranches: [...formData.eligibleBranches, branch]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate required fields
    if (!formData.companyName || !formData.role || !formData.date) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    try {
      // Replace with your actual API call to save data
      const response = await fetch('/api/placement-drives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Placement drive added successfully!');
        setFormData({
          companyName: '',
          role: '',
          description: '',
          minCGPA: 0,
          maxBacklogs: 0,
          eligibleBranches: [],
          minSemestersCompleted: 0,
          date: '',
        });
        // Close the modal after successful submission
        setTimeout(() => {
          setIsOpen(false);
          setSuccess('');
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add placement drive');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        <Plus size={20} />
        Add Placement Drive
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1a1f2c] rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-200 flex items-center">
                <Briefcase className="mr-2" size={24} />
                Add New Placement Drive
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            {error && (
              <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-900 bg-opacity-20 border border-green-500 text-green-500 px-4 py-2 rounded mb-4">
                {success}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full bg-[#0f1218] text-gray-200 p-3 rounded border border-gray-700 focus:border-red-500 focus:outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-[#0f1218] text-gray-200 p-3 rounded border border-gray-700 focus:border-red-500 focus:outline-none"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full bg-[#0f1218] text-gray-200 p-3 rounded border border-gray-700 focus:border-red-500 focus:outline-none"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">
                    Minimum CGPA
                  </label>
                  <input
                    type="number"
                    name="minCGPA"
                    value={formData.minCGPA}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    step="0.1"
                    className="w-full bg-[#0f1218] text-gray-200 p-3 rounded border border-gray-700 focus:border-red-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">
                    Maximum Backlogs Allowed
                  </label>
                  <input
                    type="number"
                    name="maxBacklogs"
                    value={formData.maxBacklogs}
                    onChange={handleChange}
                    min="0"
                    className="w-full bg-[#0f1218] text-gray-200 p-3 rounded border border-gray-700 focus:border-red-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">
                    Minimum Semesters Completed
                  </label>
                  <input
                    type="number"
                    name="minSemestersCompleted"
                    value={formData.minSemestersCompleted}
                    onChange={handleChange}
                    min="0"
                    max="8"
                    className="w-full bg-[#0f1218] text-gray-200 p-3 rounded border border-gray-700 focus:border-red-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">
                    Drive Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-[#0f1218] text-gray-200 p-3 pl-10 rounded border border-gray-700 focus:border-red-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">
                    Eligible Branches
                  </label>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {commonBranches.map((branch) => (
                      <button
                        key={branch}
                        type="button"
                        onClick={() => handleSelectCommonBranch(branch)}
                        className={`text-sm px-3 py-1 rounded ${
                          formData.eligibleBranches.includes(branch)
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {branch}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={branchInput}
                      onChange={(e) => setBranchInput(e.target.value)}
                      placeholder="Add custom branch"
                      className="flex-1 bg-[#0f1218] text-gray-200 p-3 rounded border border-gray-700 focus:border-red-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddBranch}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {formData.eligibleBranches.map((branch) => (
                      <div
                        key={branch}
                        className="flex items-center gap-1 bg-[#2a3042] text-gray-200 px-3 py-1 rounded"
                      >
                        {branch}
                        <button
                          type="button"
                          onClick={() => handleRemoveBranch(branch)}
                          className="text-gray-400 hover:text-red-400 ml-1"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 text-gray-400 hover:text-gray-200 border border-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 flex items-center gap-2"
                >
                  {loading ? (
                    <span className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  ) : (
                    <Briefcase size={18} />
                  )}
                  Save Placement Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPlacementDrive;