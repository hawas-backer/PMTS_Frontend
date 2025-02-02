import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AptitudeTest = () => {
  const navigate = useNavigate();
  const [tests] = useState([
    {
      id: 1,
      title: 'Technical Aptitude 2025',
      date: '2025-03-15',
      duration: '60 minutes',
      totalQuestions: 50,
      status: 'Upcoming'
    },
    {
      id: 2,
      title: 'Verbal Reasoning Test',
      date: '2025-03-20',
      duration: '45 minutes',
      totalQuestions: 30,
      status: 'Draft'
    }
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-200">Aptitude Tests</h2>
        <button onClick={() => navigate('/create-test')} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          <Plus size={20} />
          Create New Test
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <div key={test.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-200">{test.title}</h3>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-red-500">
                  <Edit size={18} />
                </button>
                <button className="text-gray-400 hover:text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Date:</span>
                <span className="text-gray-200">{test.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Duration:</span>
                <span className="text-gray-200">{test.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Questions:</span>
                <span className="text-gray-200">{test.totalQuestions}</span>
              </div>
              <div className="pt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${test.status === 'Upcoming' ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'}`}>
                  {test.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AptitudeTest;