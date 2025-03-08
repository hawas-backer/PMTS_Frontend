import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Clock, FileText } from 'lucide-react';

const StudentAptitudeTests = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAvailableTests();
  }, []);

  useEffect(() => {
    if (dateFilter) {
      const filtered = tests.filter(test => {
        const testDate = new Date(test.createdAt).toISOString().split('T')[0];
        return testDate === dateFilter;
      });
      setFilteredTests(filtered);
    } else {
      setFilteredTests(tests);
    }
  }, [dateFilter, tests]);

  const fetchAvailableTests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/aptitude-tests/available', { withCredentials: true });
      setTests(response.data.tests); // Access the tests property
      setFilteredTests(response.data.tests); // Access the tests property
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch available tests');
      setLoading(false);
    }
  };

  const handleAttemptQuiz = (id) => {
    navigate(`/student/take-quiz/${id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f1218]">
        <div className="text-gray-200">Loading available tests...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1218] text-gray-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Available Aptitude Tests</h1>
        
        {error && (
          <div className="bg-red-900 text-red-200 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="mb-6">
          <label className="block text-gray-400 mb-2">Filter by Date</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-[#0f1218] text-gray-200 p-2 rounded border border-gray-700"
          />
          {dateFilter && (
            <button
              onClick={() => setDateFilter('')}
              className="ml-2 text-gray-400 hover:text-gray-200"
            >
              Clear
            </button>
          )}
        </div>
        
        {filteredTests.length === 0 ? (
          <div className="bg-[#1a1f2c] rounded-lg p-6 text-center">
            <p className="text-gray-400">
              {dateFilter 
                ? 'No tests available for the selected date' 
                : 'No tests available to attempt'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <div key={test._id} className="bg-[#1a1f2c] rounded-lg p-6 hover:shadow-lg transition">
                <h2 className="text-xl font-semibold mb-3">{test.title}</h2>
                {test.description && (
                  <p className="text-gray-400 mb-4 line-clamp-2">{test.description}</p>
                )}
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-400">
                    <Calendar size={16} className="mr-2" />
                    <span>Created: {formatDate(test.createdAt)}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock size={16} className="mr-2" />
                    <span>Duration: {test.duration} minutes</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FileText size={16} className="mr-2" />
                    <span>Questions: {test.questions.length}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleAttemptQuiz(test._id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition flex items-center justify-center"
                >
                  Attempt Quiz
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAptitudeTests;