import React, { useState, useEffect } from 'react';
import { Building2, Users, X, Download } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

axios.defaults.baseURL = 'http://localhost:8080';

const PlacementResults = () => {
  const { role } = useAuth();
  const [showDetails, setShowDetails] = useState(null);
  const [placements, setPlacements] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [availableYears, setAvailableYears] = useState([]);

  if (role !== 'Coordinator') {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    fetchCompletedDrives();
  }, []);

  const fetchCompletedDrives = async (year = null) => {
    try {
      const url = year ? `/api/placement-drives/all?year=${year}` : '/api/placement-drives/all';
      const response = await axios.get(url, { withCredentials: true });
      const completedDrives = response.data.filter(drive => drive.status === 'Completed');
      
      // Extract unique years from all drives (only on initial fetch)
      if (!year) {
        const years = [...new Set(response.data.map(drive => new Date(drive.date).getFullYear()))].sort((a, b) => b - a);
        setAvailableYears(years);
      }

      // Transform data into the required format
      const placementData = completedDrives.reduce((acc, drive) => {
        const finalPhase = drive.phases.find(phase => phase.name === 'Final Selection');
        if (finalPhase && finalPhase.shortlistedStudents.length > 0) {
          const companyKey = `${drive.companyName} (${drive.role})`;
          acc[companyKey] = {
            date: drive.date,
            students: finalPhase.shortlistedStudents.map((student, index) => ({
              id: student._id,
              name: student.name,
              email: student.email,
              registrationNumber: student.registrationNumber,
              package: 'N/A' // Placeholder; update if package data is added to backend
            }))
          };
        }
        return acc;
      }, {});

      setPlacements(placementData);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data.message || 'Error fetching placement results');
      setLoading(false);
    }
  };

  const downloadCompanyExcel = (company, students) => {
    const excelData = students.map(student => ({
      'Company Name': company,
      'Student Name': student.name,
      'Email': student.email,
      'Registration Number': student.registrationNumber,
      'Package': student.package
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');
    XLSX.writeFile(workbook, `${company}_placement_results.xlsx`);
  };

  const downloadYearExcel = () => {
    fetchCompletedDrives(selectedYear).then(() => {
      const excelData = [];
      Object.entries(placements).forEach(([company, data]) => {
        data.students.forEach(student => {
          excelData.push({
            'Company Name': company,
            'Student Name': student.name,
            'Email': student.email,
            'Registration Number': student.registrationNumber,
            'Package': student.package,
            'Date': new Date(data.date).toLocaleDateString()
          });
        });
      });

      if (excelData.length === 0) {
        alert(`No placement results found for ${selectedYear}`);
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Placement Results');
      XLSX.writeFile(workbook, `placement_results_${selectedYear}.xlsx`);
    });
  };

  if (loading) return <div className="text-white text-center p-6">Loading...</div>;
  if (error) return <div className="text-red-400 text-center p-6">{error}</div>;

  return (
    <div className="p-6 bg-[#0f1218] min-h-screen w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-200">Placement Results</h2>
        <div className="flex items-center gap-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-[#1a1f2c] text-gray-200 p-2 rounded"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <button
            onClick={downloadYearExcel}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <Download size={20} />
            Download {selectedYear} Results
          </button>
        </div>
      </div>

      {Object.keys(placements).length === 0 ? (
        <div className="text-gray-400 text-center p-6">
          No placement results available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(placements).map(([company, data]) => (
            <div key={company} className="bg-[#1a1f2c] rounded-lg p-6">
              <div className="flex items-center gap-4">
                <Building2 className="text-gray-400" size={24} />
                <div>
                  <h3 className="text-xl font-bold text-gray-200">{company}</h3>
                  <div className="flex items-center gap-2 text-gray-400 mt-1">
                    <Users size={16} />
                    <span>{data.students.length} students placed</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowDetails(company)}
                  className="flex-1 bg-[#0f1218] text-gray-200 py-2 rounded hover:bg-[#161b22]"
                >
                  View Details
                </button>
                <button
                  onClick={() => downloadCompanyExcel(company, data.students)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDetails && (
        <DetailView
          company={showDetails}
          students={placements[showDetails].students}
          onClose={() => setShowDetails(null)}
        />
      )}
    </div>
  );
};

const DetailView = ({ company, students, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1f2c] rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-200">{company}</h3>
            <p className="text-gray-400 mt-1">{students.length} students placed</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student) => (
            <div key={student.id} className="bg-[#0f1218] p-4 rounded-lg">
              <p className="text-gray-200 font-medium">{student.name}</p>
              <p className="text-gray-400 text-sm mt-1">Email: {student.email}</p>
              <p className="text-gray-400 text-sm mt-1">Reg No: {student.registrationNumber}</p>
              <p className="text-green-400 text-sm mt-1">Package: {student.package}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacementResults;