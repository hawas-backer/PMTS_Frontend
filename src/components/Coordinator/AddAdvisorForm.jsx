// AddAdvisorForm.jsx

import React, { useState, useEffect } from 'react';

const branchOptions = [
  'MECH',
  'EEE',
  'ECE',
  'CSE',
  'CIVIL',
];

const AddAdvisorForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
    phoneNumber: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  // Generate a random password
  useEffect(() => {
    const generatePassword = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
      let password = '';
      for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return password;
    };
    
    setFormData(prev => ({ ...prev, password: generatePassword() }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.branch.trim()) newErrors.branch = 'Branch is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });
    
    try {
      const result = await onSubmit(formData);
      if (result.success) {
        setSubmitMessage({ type: 'success', text: result.message });
        // Reset form after successful submission
        setTimeout(() => {
          onCancel();
        }, 1500);
      } else {
        setSubmitMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setSubmitMessage({ 
        type: 'error', 
        text: error.message || 'An error occurred while adding the advisor' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1f2c] rounded-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Advisor</h2>
        
        {submitMessage.text && (
          <div className={`mb-4 p-3 rounded ${
            submitMessage.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}>
            {submitMessage.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-[#0f1218] border rounded ${
                errors.name ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-[#0f1218] border rounded ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Branch</label>

                <div className="mt-1">
                  <select
                    id="branch"
                    name="branch"
                    required
                    value={formData.branch}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 bg-[#0f1218] border rounded ${
                      errors.branch ? 'border-red-500' : 'border-gray-600'
                    }`}                  >
                    <option value="">Select your branch</option>
                    {branchOptions.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>
            {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Phone Number (Optional)</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#0f1218] border border-gray-600 rounded"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Default Password</label>
            <div className="flex">
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-[#0f1218] border rounded ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                }`}
              />
            </div>
            <p className="text-gray-400 text-sm mt-1">
              This password will be sent to the advisor's email.
            </p>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-500 rounded hover:bg-gray-700"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Advisor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdvisorForm;