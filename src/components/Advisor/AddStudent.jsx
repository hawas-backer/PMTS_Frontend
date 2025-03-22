import React, { useState } from 'react';
import { Upload, File, Plus } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:8080';

const StudentAddForm = () => {
  const { user, role } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    batch: '',
    registrationNumber: '',
    branch: user?.branch || '',
    semestersCompleted: '',
    numberOfBacklogs: '',
    phoneNumber: '',
    cgpa: '',
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const branchOptions = [
    'MECH',
    'EEE',
    'ECE',
    'CSE',
    'CIVIL',
  ];

  // Redirect if not Advisor
  if (role !== 'Advisor') {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => setFile(e.target.files[0]);

  const downloadTemplate = async () => {
    try {
      const response = await axios.get('/api/students/upload-template', {
        responseType: 'blob',
        withCredentials: true,
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'student_upload_template.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setErrors(['Failed to download template']);
    }
  };

  const submitSingleStudent = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage('');
    try {
      const response = await axios.post('/api/students/add', formData, { withCredentials: true });
      setSuccessMessage('Student added successfully');
      setFormData({
        name: '',
        email: '',
        batch: '',
        registrationNumber: '',
        branch: user?.branch || '',
        semestersCompleted: '',
        numberOfBacklogs: '',
        phoneNumber: '',
        cgpa: '',
      });
    } catch (error) {
      setErrors(error.response?.data.errors || [error.response?.data.message || 'An error occurred']);
    }
  };

  const submitBulkStudents = async () => {
    if (!file) return setErrors(['Please select a file']);
    const uploadData = new FormData();
    uploadData.append('studentFile', file);
    try {
      const response = await axios.post('/api/students/bulk-add', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setSuccessMessage(`Processed ${response.data.processedStudents} students`);
      if (response.data.errors?.length) {
        setErrors(response.data.errors.map((err) => `Error with ${err.student.email || 'unknown'}: ${err.errors.join(', ')}`));
      }
      setFile(null);
    } catch (error) {
      setErrors([error.response?.data.message || 'Bulk upload failed']);
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg p-4 sm:p-6 lg:p-8 flex justify-center">
      <div className="w-full max-w-4xl bg-secondary-bg rounded-xl shadow-glass p-6 transition-all duration-300">
        <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-6 text-center">
          Add Student Details
        </h2>

        {/* Single Student Form */}
        <form onSubmit={submitSingleStudent} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'name', placeholder: 'Student Name', type: 'text', required: true },
              { name: 'email', placeholder: 'Email', type: 'email', required: true },
              { name: 'batch', placeholder: 'Batch Year', type: 'number', required: true },
              { name: 'registrationNumber', placeholder: 'Registration Number', type: 'text', required: true },
              { name: 'branch', placeholder: 'Branch', type: 'text', required: true },
              { name: 'semestersCompleted', placeholder: 'Semesters Completed', type: 'number' },
              { name: 'numberOfBacklogs', placeholder: 'Number of Backlogs', type: 'number' },
              { name: 'phoneNumber', placeholder: 'Phone Number', type: 'tel' },
              { name: 'cgpa', placeholder: 'CGPA (Optional)', type: 'number', step: '0.01' },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                step={field.step}
                required={field.required}
                className="bg-[#2c3e50] text-text-primary p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-highlight transition-all duration-200 placeholder:text-text-secondary"
                aria-label={field.placeholder}
              />
            ))}
    <div className="bg-[#0f1218] min-h-screen p-8 text-white">
      <div className="max-w-2xl mx-auto bg-[#1a2233] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Student Details</h2>
        
        <form onSubmit={submitSingleStudent} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Student Name" className="bg-[#2c3e50] text-white p-2 rounded" required />
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="bg-[#2c3e50] text-white p-2 rounded" required />
            <input type="number" name="batch" value={formData.batch} onChange={handleInputChange} placeholder="Batch Year" className="bg-[#2c3e50] text-white p-2 rounded" required />
            <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleInputChange} placeholder="Registration Number" className="bg-[#2c3e50] text-white p-2 rounded" required />
            <select
                    id="branch"
                    name="branch"
                    required
                    value={formData.branch}
                    onChange={handleInputChange}
                    className={`bg-[#2c3e50] text-white p-2 rounded ${
                      errors.branch ? 'border-red-500' : 'border-gray-600'
                    }`}                  >
                    <option value="">Select your branch</option>
                    {branchOptions.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>            <input type="number" name="semestersCompleted" value={formData.semestersCompleted} onChange={handleInputChange} placeholder="Semesters Completed" className="bg-[#2c3e50] text-white p-2 rounded" />
            <input type="number" name="numberOfBacklogs" value={formData.numberOfBacklogs} onChange={handleInputChange} placeholder="Number of Backlogs" className="bg-[#2c3e50] text-white p-2 rounded" />
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" className="bg-[#2c3e50] text-white p-2 rounded" />
            <input type="number" name="cgpa" value={formData.cgpa} onChange={handleInputChange} placeholder="CGPA (Optional)" step="0.01" className="bg-[#2c3e50] text-white p-2 rounded" />
          </div>
          <button
            type="submit"
            className="w-full bg-highlight hover:bg-blue-500 text-text-primary p-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-accent"
            aria-label="Add Student"
          >
            <Plus size={20} /> Add Student
          </button>
        </form>

        {/* Bulk Upload Section */}
        <div className="mt-8 border-t border-gray-700 pt-6">
          <h3 className="text-xl md:text-2xl text-text-primary mb-4 text-center">Bulk Student Upload</h3>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileUpload}
              className="flex-1 bg-[#2c3e50] text-text-primary p-2 rounded-lg border border-gray-700 file:mr-2 file:p-2 file:bg-accent file:text-text-primary file:border-0 file:rounded hover:file:bg-green-600 transition-all duration-200"
              aria-label="Upload student file"
            />
            <button
              onClick={downloadTemplate}
              className="bg-accent hover:bg-green-600 text-text-primary p-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-highlight"
              aria-label="Download Template"
            >
              <File size={20} /> Download Template
            </button>
            <button
              onClick={submitBulkStudents}
              disabled={!file}
              className="bg-highlight hover:bg-blue-500 text-text-primary p-2 rounded-lg flex items-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg focus:ring-2 focus:ring-accent"
              aria-label="Upload Bulk Students"
            >
              <Upload size={20} /> Upload
            </button>
          </div>
        </div>

        {/* Feedback Messages */}
        {errors.length > 0 && (
          <div className="mt-6 bg-error bg-opacity-20 p-4 rounded-lg" role="alert">
            {errors.map((error, index) => (
              <p key={index} className="text-error">{error}</p>
            ))}
          </div>
        )}
        {successMessage && (
          <div className="mt-6 bg-accent bg-opacity-20 p-4 rounded-lg" role="alert">
            <p className="text-accent">{successMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAddForm;