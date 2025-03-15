import React, { useState, useEffect } from 'react';
import { Building2, Users, X, Download, Search, Filter, ChevronDown, ChevronUp, Badge } from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('companyName');
  const [sortDirection, setSortDirection] = useState('asc');

  if (role !== 'Coordinator') {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    fetchCompletedDrives();
  }, []);

  const fetchCompletedDrives = async (year = null) => {
    try {
      setLoading(true);
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
              package: drive.package || 'N/A' // Use drive package if available
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

  const handleYearChange = (year) => {
    setSelectedYear(year);
    fetchCompletedDrives(year);
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
  };

  const toggleSort = (key) => {
    if (sortBy === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDirection('asc');
    }
  };

  const sortedPlacements = () => {
    const entries = Object.entries(placements);
    
    if (sortBy === 'companyName') {
      return entries.sort((a, b) => {
        return sortDirection === 'asc' 
          ? a[0].localeCompare(b[0]) 
          : b[0].localeCompare(a[0]);
      });
    } else if (sortBy === 'studentCount') {
      return entries.sort((a, b) => {
        return sortDirection === 'asc' 
          ? a[1].students.length - b[1].students.length 
          : b[1].students.length - a[1].students.length;
      });
    } else if (sortBy === 'date') {
      return entries.sort((a, b) => {
        const dateA = new Date(a[1].date);
        const dateB = new Date(b[1].date);
        return sortDirection === 'asc' 
          ? dateA - dateB 
          : dateB - dateA;
      });
    }
    
    return entries;
  };

  const filteredPlacements = () => {
    if (!searchTerm.trim()) return sortedPlacements();
    
    return sortedPlacements().filter(([company]) => 
      company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f1218]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-xl text-gray-200">Loading placement results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f1218]">
        <div className="bg-red-500 bg-opacity-20 border border-red-500 p-6 rounded-lg max-w-lg">
          <h3 className="text-xl font-bold text-red-400 mb-2">Error</h3>
          <p className="text-gray-200">{error}</p>
          <button 
            onClick={() => fetchCompletedDrives()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#0f1218] min-h-screen w-full">
      {/* Header with Stats */}
      <div className="bg-[#1a1f2c] rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-200">Placement Results</h2>
            <p className="text-gray-400 mt-1">
              {Object.keys(placements).length} companies | {
                Object.values(placements).reduce((total, company) => total + company.students.length, 0)
              } students placed
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4 md:mt-0">
            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
              className="bg-[#0f1218] text-gray-200 p-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <button
              onClick={downloadYearExcel}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
            >
              <Download size={18} />
              Download {selectedYear} Results
            </button>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0f1218] text-gray-200 pl-10 pr-4 py-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => toggleSort('companyName')}
              className={`flex items-center gap-1 px-3 py-2 rounded border ${sortBy === 'companyName' ? 'border-blue-500 text-blue-400' : 'border-gray-700 text-gray-400'} hover:border-blue-500 hover:text-blue-400`}
            >
              Company
              {sortBy === 'companyName' && (
                sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
              )}
            </button>
            <button 
              onClick={() => toggleSort('studentCount')}
              className={`flex items-center gap-1 px-3 py-2 rounded border ${sortBy === 'studentCount' ? 'border-blue-500 text-blue-400' : 'border-gray-700 text-gray-400'} hover:border-blue-500 hover:text-blue-400`}
            >
              Students
              {sortBy === 'studentCount' && (
                sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
              )}
            </button>
            <button 
              onClick={() => toggleSort('date')}
              className={`flex items-center gap-1 px-3 py-2 rounded border ${sortBy === 'date' ? 'border-blue-500 text-blue-400' : 'border-gray-700 text-gray-400'} hover:border-blue-500 hover:text-blue-400`}
            >
              Date
              {sortBy === 'date' && (
                sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Placement Cards */}
      {filteredPlacements().length === 0 ? (
        <div className="bg-[#1a1f2c] rounded-lg p-10 text-center">
          <Filter size={40} className="mx-auto text-gray-500 mb-4" />
          <p className="text-xl text-gray-300 mb-2">No placement results found</p>
          <p className="text-gray-400 mb-4">
            {searchTerm ? `No companies match "${searchTerm}"` : `No placement data available for ${selectedYear}`}
          </p>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlacements().map(([company, data]) => (
            <div key={company} className="bg-[#1a1f2c] rounded-lg p-6 hover:shadow-lg hover:shadow-blue-900/10 transition duration-200 border border-transparent hover:border-blue-900/30">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 bg-opacity-20 p-3 rounded-lg">
                  <Building2 className="text-blue-400" size={24} />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-200">{company}</h3>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <div className="flex items-center gap-1.5 text-gray-400 bg-[#0f1218] px-2 py-1 rounded-full">
                      <Users size={14} />
                      <span className="text-sm">{data.students.length} students</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 bg-[#0f1218] px-2 py-1 rounded-full">
                      <Badge size={14} />
                      <span className="text-sm">{new Date(data.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowDetails(company)}
                  className="flex-1 bg-[#0f1218] text-gray-200 py-2.5 rounded hover:bg-[#161b22] transition duration-200"
                >
                  View Details
                </button>
                <button
                  onClick={() => downloadCompanyExcel(company, data.students)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
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
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a1f2c] rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <div>
            <h3 className="text-2xl font-bold text-gray-200">{company}</h3>
            <p className="text-gray-400 mt-1">{students.length} students placed</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 bg-[#0f1218] p-2 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search students by name, email, or registration number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0f1218] text-gray-200 pl-10 pr-4 py-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        
        <div className="overflow-auto p-6 flex-grow">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400">No students match your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map((student) => (
                <div key={student.id} className="bg-[#0f1218] p-5 rounded-lg hover:shadow-md hover:bg-[#11141d] transition duration-200 border border-gray-800">
                  <div className="flex flex-col gap-2">
                    <p className="text-gray-200 font-medium text-lg">{student.name}</p>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                      <span className="bg-blue-900 bg-opacity-30 text-blue-400 text-xs px-2 py-0.5 rounded">
                        {student.registrationNumber}
                      </span>
                    </p>
                    <p className="text-gray-400 text-sm mt-1">{student.email}</p>
                    <p className="text-green-400 text-sm mt-2 font-medium">
                      Package: {student.package}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-700 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 mr-3"
          >
            Close
          </button>
          <button
            onClick={() => downloadCompanyExcel(company, students)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Download size={16} />
            Download List
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacementResults;