import React, { useState } from 'react';
import { Plus, Edit, Trash2, Building2, User } from 'lucide-react';

const PlacementResults = () => {
  const [showAddResult, setShowAddResult] = useState(false);
  const [results, setResults] = useState([
    {
      id: 1,
      companyName: 'TCS Digital',
      studentName: 'John Doe',
      batch: '2025',
      package: '7.5 LPA',
      designation: 'Digital Engineer',
      date: '2025-02-15'
    },
    {
      id: 2,
      companyName: 'Infosys',
      studentName: 'Jane Smith',
      batch: '2025',
      package: '6.8 LPA',
      designation: 'Systems Engineer',
      date: '2025-02-10'
    }
  ]);

  return (
    <div className="p-6 bg-[#0f1218]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-200">Placement Results</h2>
        <button
          onClick={() => setShowAddResult(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <Plus size={20} />
          Add Result
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <div key={result.id} className="bg-[#1a1f2c] rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Building2 className="text-gray-400" size={20} />
                <h3 className="text-xl font-bold text-gray-200">{result.companyName}</h3>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-blue-400">
                  <Edit size={18} />
                </button>
                <button className="text-gray-400 hover:text-red-400">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-400" />
                <span className="text-gray-200">{result.studentName}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Batch</p>
                  <p className="text-gray-200">{result.batch}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Package</p>
                  <p className="text-green-400">{result.package}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Designation</p>
                  <p className="text-gray-200">{result.designation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="text-gray-200">{result.date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddResult && (
        <AddResult onClose={() => setShowAddResult(false)} />
      )}
    </div>
  );
};

const AddResult = ({ onClose }) => {
  const [resultData, setResultData] = useState({
    companyName: '',
    studentName: '',
    batch: '',
    package: '',
    designation: '',
    date: ''
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1f2c] rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-gray-200 mb-4">Add Placement Result</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Company Name</label>
            <input
              type="text"
              className="w-full bg-[#0f1218] text-gray-200 p-2 rounded"
              value={resultData.companyName}
              onChange={(e) => setResultData({...resultData, companyName: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Student Name</label>
            <input
              type="text"
              className="w-full bg-[#0f1218] text-gray-200 p-2 rounded"
              value={resultData.studentName}
              onChange={(e) => setResultData({...resultData, studentName: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Batch</label>
              <input
                type="text"
                className="w-full bg-[#0f1218] text-gray-200 p-2 rounded"
                value={resultData.batch}
                onChange={(e) => setResultData({...resultData, batch: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Package (LPA)</label>
              <input
                type="text"
                className="w-full bg-[#0f1218] text-gray-200 p-2 rounded"
                value={resultData.package}
                onChange={(e) => setResultData({...resultData, package: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Designation</label>
            <input
              type="text"
              className="w-full bg-[#0f1218] text-gray-200 p-2 rounded"
              value={resultData.designation}
              onChange={(e) => setResultData({...resultData, designation: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Date</label>
            <input
              type="date"
              className="w-full bg-[#0f1218] text-gray-200 p-2 rounded"
              value={resultData.date}
              onChange={(e) => setResultData({...resultData, date: e.target.value})}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-gray-200"
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Add Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacementResults;