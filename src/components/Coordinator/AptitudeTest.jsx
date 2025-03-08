import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AptitudeTest = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/aptitude-tests', { withCredentials: true });
        setTests(response.data.tests || []);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch tests');
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/aptitude-tests/${id}`, { withCredentials: true });
      setTests(tests.filter(test => test._id !== id));
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete test');
    }
  };

  if (loading) {
    return <div className="text-gray-200 text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-200 text-center mt-10">{error}</div>;
  }

  return (
    <div className="p-6 space-y-6 h-screen bg-[#0f1218] w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Aptitude Tests</h2>
        <button
          onClick={() => navigate('/coordinator/create-test')}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <Plus size={20} />
          Create New Test
        </button>
      </div>

      {tests.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">No tests available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div key={test._id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-200">{test.title}</h3>
                <div className="flex gap-2">
                  <button
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => navigate(`/coordinator/edit-test/${test._id}`, { state: { test } })}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => handleDelete(test._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-gray-200">{new Date(test.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-gray-200">{test.duration} minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Questions:</span>
                  <span className="text-gray-200">{test.questions.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AptitudeTest;