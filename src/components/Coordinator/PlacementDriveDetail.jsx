import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useParams } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:8080';

const PlacementDriveDetail = () => {
  const { role } = useAuth();
  const { id } = useParams();
  const [drive, setDrive] = useState(null);
  const [phaseName, setPhaseName] = useState('');
  const [requirements, setRequirements] = useState('');
  const [instructions, setInstructions] = useState('');
  const [shortlistFile, setShortlistFile] = useState(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  if (role !== 'Coordinator') {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    fetchDrive();
  }, [id]);

  const fetchDrive = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/placement-drives/${id}`, { withCredentials: true });
      setDrive(response.data);
      setErrors([]);
    } catch (error) {
      setErrors([error.response?.data.message || 'Error fetching placement drive']);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPhase = async (e) => {
    e.preventDefault();
    setErrors([]);
    setMessage('');

    if (drive.phases.length > 0 && !shortlistFile) {
      setErrors(['Shortlist file is required for subsequent phases']);
      return;
    }

    const formData = new FormData();
    formData.append('phaseName', phaseName);
    formData.append('requirements', requirements);
    formData.append('instructions', instructions);
    if (shortlistFile) formData.append('shortlistFile', shortlistFile);

    try {
      const response = await axios.post(`/api/placement-drives/${id}/add-phase`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(response.data.message);
      setPhaseName('');
      setRequirements('');
      setInstructions('');
      setShortlistFile(null);
      fetchDrive();
    } catch (error) {
      setErrors([error.response?.data.message || 'Error adding phase']);
    }
  };

  const handleEndDrive = async (e) => {
    e.preventDefault();
    setErrors([]);
    setMessage('');

    if (!shortlistFile) {
      setErrors(['Final shortlist file is required to end the drive']);
      return;
    }

    const formData = new FormData();
    formData.append('shortlistFile', shortlistFile);
    formData.append('requirements', requirements);
    formData.append('instructions', instructions);

    try {
      const response = await axios.post(`/api/placement-drives/${id}/end`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(response.data.message);
      setRequirements('');
      setInstructions('');
      setShortlistFile(null);
      fetchDrive();
    } catch (error) {
      setErrors([error.response?.data.message || 'Error ending drive']);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await axios.get('/api/placement-drives/shortlist-template', {
        withCredentials: true,
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'shortlist_template.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setErrors(['Error downloading template']);
    }
  };

  if (loading) return <div className="text-white text-center">Loading...</div>;

  return (
    <div className="bg-[#0f1218] min-h-screen p-8 text-white">
      <div className="max-w-6xl mx-auto bg-[#1a2233] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">{drive.companyName} - {drive.role}</h2>
        <p className="text-gray-400 mb-2">Date: {new Date(drive.date).toLocaleDateString()}</p>
        <p className="text-gray-400 mb-2">Eligible Branches: {drive.eligibleBranches.join(', ')}</p>
        <p className="text-gray-400 mb-2">Total Applicants: {drive.applications.length}</p>
        <p className="text-gray-400 mb-4">Status: <span className={drive.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}>{drive.status}</span></p>

        <div className="mb-8">
          <h3 className="text-xl mb-4">Applicants</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#2c3e50]">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Registration No.</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {drive.applications.map(app => (
                  <tr key={app._id} className="border-b border-[#2c3e50]">
                    <td className="p-2">{app.student.name}</td>
                    <td className="p-2">{app.student.email}</td>
                    <td className="p-2">{app.student.registrationNumber}</td>
                    <td className="p-2">{app.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl mb-4">Phases</h3>
          {drive.phases.map((phase, index) => (
            <div key={index} className="mb-4 p-4 bg-[#2c3e50] rounded">
              <h4 className="text-lg font-bold">{phase.name}</h4>
              <p className="text-gray-400">Shortlisted: {phase.shortlistedStudents.length}</p>
              <p className="text-gray-400"><strong>Requirements:</strong> {phase.requirements || 'None'}</p>
              <p className="text-gray-400"><strong>Instructions:</strong> {phase.instructions || 'None'}</p>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#34495e]">
                      <th className="p-2">Name</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Registration No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phase.shortlistedStudents.map(student => (
                      <tr key={student._id} className="border-b border-[#34495e]">
                        <td className="p-2">{student.name}</td>
                        <td className="p-2">{student.email}</td>
                        <td className="p-2">{student.registrationNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {drive.status !== 'Completed' && (
          <>
            <div className="mb-8">
              <h3 className="text-xl mb-4">Add New Phase</h3>
              <button
                onClick={handleDownloadTemplate}
                className="mb-4 bg-gray-600 hover:bg-gray-700 p-2 rounded"
              >
                Download Shortlist Template
              </button>
              <form onSubmit={handleAddPhase} className="space-y-4">
                <select
                  value={phaseName}
                  onChange={e => setPhaseName(e.target.value)}
                  className="bg-[#2c3e50] text-white p-2 rounded w-full"
                  required
                >
                  <option value="">Select Phase</option>
                  <option value="Resume Screening">Resume Screening</option>
                  <option value="Written Test">Written Test</option>
                  <option value="Interview HR">Interview HR</option>
                  <option value="Interview Technical">Interview Technical</option>
                  <option value="Aptitude Test">Aptitude Test</option>
                  <option value="Coding Test">Coding Test</option>
                </select>
                <textarea
                  value={requirements}
                  onChange={e => setRequirements(e.target.value)}
                  placeholder="Phase Requirements (e.g., Bring resume, laptop)"
                  className="bg-[#2c3e50] text-white p-2 rounded w-full"
                />
                <textarea
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  placeholder="Instructions (e.g., Arrive by 9 AM)"
                  className="bg-[#2c3e50] text-white p-2 rounded w-full"
                />
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={e => setShortlistFile(e.target.files[0])}
                  className="bg-[#2c3e50] text-white p-2 rounded w-full"
                  required={drive.phases.length > 0} // Required only for subsequent phases
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded">Add Phase</button>
              </form>
            </div>

            <div>
              <h3 className="text-xl mb-4">End Placement Drive</h3>
              <button
                onClick={handleDownloadTemplate}
                className="mb-4 bg-gray-600 hover:bg-gray-700 p-2 rounded"
              >
                Download Shortlist Template
              </button>
              <form onSubmit={handleEndDrive} className="space-y-4">
                <textarea
                  value={requirements}
                  onChange={e => setRequirements(e.target.value)}
                  placeholder="Final Selection Requirements (e.g., Offer letter acceptance)"
                  className="bg-[#2c3e50] text-white p-2 rounded w-full"
                />
                <textarea
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  placeholder="Instructions (e.g., Submit documents by tomorrow)"
                  className="bg-[#2c3e50] text-white p-2 rounded w-full"
                />
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={e => setShortlistFile(e.target.files[0])}
                  className="bg-[#2c3e50] text-white p-2 rounded w-full"
                  required
                />
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 p-2 rounded">End Drive</button>
              </form>
            </div>
          </>
        )}

        {errors.length > 0 && (
          <div className="mt-6 bg-red-600 bg-opacity-20 p-4 rounded">
            {errors.map((error, index) => <p key={index} className="text-red-400">{error}</p>)}
          </div>
        )}
        {message && (
          <div className="mt-6 bg-green-600 bg-opacity-20 p-4 rounded">
            <p className="text-green-400">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementDriveDetail;