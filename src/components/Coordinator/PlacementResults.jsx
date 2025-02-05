import React, { useState } from 'react';
import { Plus, Building2, Users, X } from 'lucide-react';

const PlacementResults = () => {
  const [showAddResult, setShowAddResult] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [placements, setPlacements] = useState({
    'TCS Digital': {
      students: [
        { id: 1, name: 'John Doe', package: '7.5 LPA' },
        { id: 2, name: 'Jane Smith', package: '7.5 LPA' },
        { id: 6, name: 'Mike Brown', package: '7.5 LPA' },
        { id: 7, name: 'Sarah Wilson', package: '7.5 LPA' },
      ]
    },
    'Infosys': {
      students: [
        { id: 3, name: 'Alice Johnson', package: '6.8 LPA' },
        { id: 4, name: 'Bob Wilson', package: '6.8 LPA' },
        { id: 5, name: 'Carol Brown', package: '6.8 LPA' },
        { id: 8, name: 'David Miller', package: '6.8 LPA' },
        { id: 9, name: 'Eva Davis', package: '6.8 LPA' },
      ]
    }
  });

  return (
    <div className="p-6 bg-[#0f1218] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-200">Placement Results</h2>
        <button
          onClick={() => setShowAddResult(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <Plus size={20} />
          Add Placement Results
        </button>
      </div>

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
            <button
              onClick={() => setShowDetails(company)}
              className="w-full mt-4 bg-[#0f1218] text-gray-200 py-2 rounded hover:bg-[#161b22]"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {showDetails && (
        <DetailView
          company={showDetails}
          students={placements[showDetails].students}
          onClose={() => setShowDetails(null)}
        />
      )}

      {showAddResult && (
        <AddBulkPlacement onClose={() => setShowAddResult(false)} />
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
              <p className="text-green-400 text-sm mt-1">{student.package}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AddBulkPlacement = ({ onClose }) => {
  const [companyName, setCompanyName] = useState('');
  const [students, setStudents] = useState([
    { name: '', package: '' }
  ]);

  const addStudentField = () => {
    setStudents([...students, { name: '', package: '' }]);
  };

  const removeStudentField = (index) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  const updateStudent = (index, field, value) => {
    const newStudents = [...students];
    newStudents[index][field] = value;
    setStudents(newStudents);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1f2c] rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-auto">
        <h3 className="text-xl font-bold text-gray-200 mb-4">Add Placement Results</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Company Name</label>
            <input
              type="text"
              className="w-full bg-[#0f1218] text-gray-200 p-2 rounded"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-gray-200 font-medium">Students</h4>
              <button
                onClick={addStudentField}
                className="text-sm bg-[#0f1218] text-gray-200 px-3 py-1 rounded hover:bg-[#161b22]"
              >
                Add Student
              </button>
            </div>

            {students.map((student, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Student Name"
                    className="w-full bg-[#0f1218] text-gray-200 p-2 rounded mb-2"
                    value={student.name}
                    onChange={(e) => updateStudent(index, 'name', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Package (LPA)"
                    className="w-full bg-[#0f1218] text-gray-200 p-2 rounded"
                    value={student.package}
                    onChange={(e) => updateStudent(index, 'package', e.target.value)}
                  />
                </div>
                {students.length > 1 && (
                  <button
                    onClick={() => removeStudentField(index)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
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
            Add Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacementResults;