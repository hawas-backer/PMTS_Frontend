// EditAdvisorForm.jsx

import React, { useState } from 'react';

const EditAdvisorForm = ({ advisor, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      name: advisor.name || '',
      branch: advisor.branch || '',
      phoneNumber: advisor.phoneNumber || ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  
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
      if (!formData.branch.trim()) newErrors.branch = 'Branch is required';
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
          // Close modal after successful update
          setTimeout(() => {
            onCancel();
          }, 1500);
        } else {
          setSubmitMessage({ type: 'error', text: result.message });
        }
      } catch (error) {
        setSubmitMessage({ 
          type: 'error', 
          text: error.message || 'An error occurred while updating the advisor' 
        });
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#1a1f2c] rounded-lg p-8 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Edit Advisor</h2>
          
          {submitMessage.text && (
            <div className={`mb-4 p-3 rounded ${
              submitMessage.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}>
              {submitMessage.text}
            </div>
          )}
          
          <div className="mb-4 bg-gray-700 p-3 rounded">
            <p className="text-gray-300">Email: <span className="text-white">{advisor.email}</span></p>
          </div>
          
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
              <label className="block text-gray-300 mb-2">Branch</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-[#0f1218] border rounded ${
                  errors.branch ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Phone Number (Optional)</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#0f1218] border border-gray-600 rounded"
              />
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
                {isSubmitting ? 'Updating...' : 'Update Advisor'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default EditAdvisorForm;