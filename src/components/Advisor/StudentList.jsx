import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/students/list', {
          withCredentials: true
        });
        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch students');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleEditStudent = (studentId) => {
    navigate(`/Advisor/edit-student/${studentId}`);
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-[#0f1218] p-6">
      <div className="bg-[#1a2233] rounded-lg p-6">
        <h2 className="text-2xl text-white mb-4">Student List</h2>
        <table className="w-full text-white">
          <thead>
            <tr className="bg-[#2c3e50]">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Registration Number</th>
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-b border-gray-700">
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.registrationNumber}</td>
                <td className="p-3">{student.branch}</td>
                <td className="p-3 text-center">
                  <button 
                    onClick={() => handleEditStudent(student._id)}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <Edit size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;