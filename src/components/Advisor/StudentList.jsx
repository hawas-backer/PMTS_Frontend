import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Edit, Upload, Download } from 'lucide-react';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadStatus, setUploadStatus] = useState({ message: '', isError: false });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

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

  const handleEditStudent = (studentId) => {
    navigate(`/Advisor/edit-student/${studentId}`);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.xlsx') && !selectedFile.name.endsWith('.xls')) {
        setUploadStatus({
          message: 'Please select a valid Excel file (.xlsx or .xls)',
          isError: true
        });
        return;
      }
      setFile(selectedFile);
      setUploadStatus({ message: '', isError: false });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus({
        message: 'Please select a file first',
        isError: true
      });
      return;
    }

    const formData = new FormData();
    formData.append('studentFile', file);
    setUploading(true);

    try {
      const response = await axios.post('/api/students/bulk-edit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      setUploadStatus({
        message: `Successfully added ${response.data.successfulStudents.length} students. ${response.data.errors.length > 0 ? `${response.data.errors.length} errors occurred.` : ''}`,
        isError: false
      });
      
      // Refresh the student list
      fetchStudents();
    } catch (err) {
      let errorMessage = 'Failed to upload students';
      
      if (err.response && err.response.data) {
        errorMessage = err.response.data.message || errorMessage;
      }
      
      setUploadStatus({
        message: errorMessage,
        isError: true
      });
    } finally {
      setUploading(false);
      setFile(null);
      // Reset the file input
      document.getElementById('fileUpload').value = '';
    }
  };

  const downloadTemplate = async () => {
    try {
      const response = await axios.get('/api/students/edit-template', {
        responseType: 'blob',
        withCredentials: true
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'student_upload_template.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setUploadStatus({
        message: 'Failed to download template',
        isError: true
      });
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-[#0f1218] p-6">
      <div className="bg-[#1a2233] rounded-lg p-6">
        <h2 className="text-2xl text-white mb-4">Student List</h2>
        
        {/* Excel Upload Section */}
        <div className="mb-6 p-4 bg-[#232d3f] rounded-lg">
          <h3 className="text-xl text-white mb-3">Bulk Upload Students</h3>
          
          <div className="flex flex-col md:flex-row gap-4 items-start mb-3">
            <button 
              onClick={downloadTemplate} 
              className="flex items-center gap-2 bg-[#2c3e50] text-white py-2 px-4 rounded hover:bg-[#34495e]"
            >
              <Download size={18} />
              Download Template
            </button>
            
            <div className="flex-1">
              <input
                id="fileUpload"
                type="file"
                onChange={handleFileChange}
                accept=".xlsx, .xls"
                className="block w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded
                        file:border-0 file:text-sm file:font-semibold
                        file:bg-[#2c3e50] file:text-white
                        hover:file:bg-[#34495e]"
              />
              <p className="text-gray-400 text-sm mt-1">
                Upload Excel file with student details (name, registration number, CGPA, backlogs, semesters completed)
              </p>
            </div>
            
            <button
              onClick={handleUpload}
              disabled={uploading || !file}
              className={`flex items-center gap-2 py-2 px-4 rounded ${
                uploading || !file
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Upload size={18} />
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          
          {uploadStatus.message && (
            <div className={`p-3 rounded ${uploadStatus.isError ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
              {uploadStatus.message}
            </div>
          )}
        </div>
        
        {/* Student Table */}
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
            {students.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-400">
                  No students found. Use the upload feature to add students.
                </td>
              </tr>
            ) : (
              students.map((student) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;