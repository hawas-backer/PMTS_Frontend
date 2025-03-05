import React, { useState } from 'react';
import { Upload, File, Plus } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; 
import { Navigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:8080';
const StudentAddForm = () => {
  const { hasRole } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    batch: '',
    registrationNumber: '',
    branch: '', // This should ideally be pre-filled from the advisor's branch
    semestersCompleted: '',
    numberOfBacklogs: '',
    phoneNumber: '',
    cgpa: ''
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  // If user is not an Advisor, redirect

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const downloadTemplate = async () => {
    try {
      const response = await axios.get('api/students/upload-template', {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'student_upload_template.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Template download failed', error);
      setErrors(['Failed to download template']);
    }
  };

  const submitSingleStudent = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage('');

    try {
      const response = await axios.post('api/students/add', formData);
      setSuccessMessage('Student added successfully');
      // Reset form
      setFormData({
        name: '', 
        email: '', 
        batch: '', 
        registrationNumber: '', 
        branch: '', 
        semestersCompleted: '', 
        numberOfBacklogs: '', 
        phoneNumber: '', 
        cgpa: ''
      });
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(['An unexpected error occurred']);
      }
    }
  };

  const submitBulkStudents = async () => {
    if (!file) {
      setErrors(['Please select a file']);
      return;
    }

    const formData = new FormData();
    formData.append('studentFile', file);

    try {
      const response = await axios.post('api/students/bulk-add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setSuccessMessage(`Processed ${response.data.processedStudents} students`);
      if (response.data.errors && response.data.errors.length > 0) {
        setErrors(response.data.errors.map(err => 
          `Error with student: ${JSON.stringify(err.student)} - ${err.errors.join(', ')}`
        ));
      }
      setFile(null);
    } catch (error) {
      setErrors(['Bulk upload failed']);
    }
  };

  return (
    <div className="bg-[#0f1218] min-h-screen p-8 text-white">
      <div className="max-w-2xl mx-auto bg-[#1a2233] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Student Details</h2>
        
        {/* Single Student Form */}
        <form onSubmit={submitSingleStudent} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Student Name"
              className="bg-[#2c3e50] text-white p-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="bg-[#2c3e50] text-white p-2 rounded"
              required
            />
            <input
              type="number"
              name="batch"
              value={formData.batch}
              onChange={handleInputChange}
              placeholder="Batch Year"
              className="bg-[#2c3e50] text-white p-2 rounded"
              required
            />
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              placeholder="Registration Number"
              className="bg-[#2c3e50] text-white p-2 rounded"
              required
            />
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              placeholder="Branch"
              className="bg-[#2c3e50] text-white p-2 rounded"
              required
            />
            <input
              type="number"
              name="semestersCompleted"
              value={formData.semestersCompleted}
              onChange={handleInputChange}
              placeholder="Semesters Completed"
              className="bg-[#2c3e50] text-white p-2 rounded"
            />
            <input
              type="number"
              name="numberOfBacklogs"
              value={formData.numberOfBacklogs}
              onChange={handleInputChange}
              placeholder="Number of Backlogs"
              className="bg-[#2c3e50] text-white p-2 rounded"
            />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="bg-[#2c3e50] text-white p-2 rounded"
            />
            <input
              type="number"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleInputChange}
              placeholder="CGPA (Optional)"
              step="0.01"
              className="bg-[#2c3e50] text-white p-2 rounded"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded flex items-center justify-center"
          >
            <Plus className="mr-2" /> Add Student
          </button>
        </form>

        {/* Bulk Upload Section */}
        <div className="mt-8 border-t border-[#2c3e50] pt-6">
          <h3 className="text-xl mb-4 text-center">Bulk Student Upload</h3>
          <div className="flex items-center space-x-4">
            <input 
              type="file" 
              accept=".xlsx"
              onChange={handleFileUpload}
              className="flex-grow bg-[#2c3e50] text-white p-2 rounded"
            />
            <button 
              type="button"
              onClick={downloadTemplate}
              className="bg-green-600 hover:bg-green-700 p-2 rounded flex items-center"
            >
              <File className="mr-2" /> Download Template
            </button>
            <button 
              type="button"
              onClick={submitBulkStudents}
              disabled={!file}
              className="bg-blue-600 hover:bg-blue-700 p-2 rounded flex items-center disabled:opacity-50"
            >
              <Upload className="mr-2" /> Upload
            </button>
          </div>
        </div>

        {/* Error and Success Messages */}
        {errors.length > 0 && (
          <div className="mt-4 bg-red-600 bg-opacity-20 p-4 rounded">
            {errors.map((error, index) => (
              <p key={index} className="text-red-400">{error}</p>
            ))}
          </div>
        )}
        {successMessage && (
          <div className="mt-4 bg-green-600 bg-opacity-20 p-4 rounded">
            <p className="text-green-400">{successMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAddForm;