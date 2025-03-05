import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    cgpa: '',
    numberOfBacklogs: '',
    semestersCompleted: ''
  });
  const [originalStudent, setOriginalStudent] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch student details
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`/api/students/students/${id}`, {
          withCredentials: true
        });
        // Only set academic-related fields
        setStudent({
          cgpa: response.data.cgpa || '',
          numberOfBacklogs: response.data.numberOfBacklogs || '',
          semestersCompleted: response.data.semestersCompleted || ''
        });
        // Store original student data for reference
        setOriginalStudent(response.data);
      } catch (err) {
        setError('Failed to fetch student details');
      }
    };
    fetchStudentDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate inputs
    if (isNaN(parseFloat(student.cgpa)) || parseFloat(student.cgpa) < 0 || parseFloat(student.cgpa) > 10) {
      setError('CGPA must be a number between 0 and 10');
      return;
    }

    if (isNaN(parseInt(student.numberOfBacklogs)) || parseInt(student.numberOfBacklogs) < 0) {
      setError('Number of backlogs must be a non-negative number');
      return;
    }

    if (isNaN(parseInt(student.semestersCompleted)) || parseInt(student.semestersCompleted) < 0) {
      setError('Semesters completed must be a non-negative number');
      return;
    }

    try {
      const response = await axios.put(`/api/students/edit/${id}`, {
        cgpa: student.cgpa,
        numberOfBacklogs: student.numberOfBacklogs,
        semestersCompleted: student.semestersCompleted
      }, {
        withCredentials: true
      });

      setSuccess(response.data.message || 'Student academic details updated successfully');
      
      // Redirect after success
      setTimeout(() => {
        navigate('/Advisor/student-list');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update student');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1218] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1a2233] rounded-lg p-6">
        <h2 className="text-2xl text-white mb-6 text-center">Edit Student Academic Details</h2>
        <div className="mb-4 text-white">
          <p>Student: {originalStudent.name}</p>
          <p>Registration Number: {originalStudent.registrationNumber}</p>
        </div>
        
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">CGPA</label>
            <input
              type="text"
              name="cgpa"
              value={student.cgpa}
              onChange={handleChange}
              placeholder="Enter CGPA"
              className="w-full bg-[#2c3e50] text-white p-2 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-white mb-2">Number of Backlogs</label>
            <input
              type="text"
              name="numberOfBacklogs"
              value={student.numberOfBacklogs}
              onChange={handleChange}
              placeholder="Enter Number of Backlogs"
              className="w-full bg-[#2c3e50] text-white p-2 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-white mb-2">Semesters Completed</label>
            <input
              type="text"
              name="semestersCompleted"
              value={student.semestersCompleted}
              onChange={handleChange}
              placeholder="Enter Semesters Completed"
              className="w-full bg-[#2c3e50] text-white p-2 rounded"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Update Academic Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;