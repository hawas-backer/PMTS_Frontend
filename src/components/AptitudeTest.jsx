import React from "react";
import { useNavigate } from "react-router-dom";

const ListTests = () => {
  const navigate = useNavigate();

  // Sample test data
  const testData = [
    { id: 1, name: "Logical Reasoning", duration: "60 minutes" },
    { id: 2, name: "Quantitative Aptitude", duration: "45 minutes" },
  ];

  const handleEdit = (id) => {
    console.log(`Editing test with ID: ${id}`);
    // Logic for editing the test can be implemented here
  };

  const handleDelete = (id) => {
    console.log(`Deleting test with ID: ${id}`);
    // Logic for deleting the test can be implemented here
  };

  const navigateToAddTest = () => {
    navigate("/add-test");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Aptitude Tests</h1>
      <div className="space-y-3">
        {testData.map((test) => (
          <div
            key={test.id}
            className="flex justify-between items-center border border-gray-300 rounded-lg p-4 shadow-sm"
          >
            <div>
              <h2 className="text-lg font-semibold">{test.name}</h2>
              <p className="text-sm text-gray-600">Duration: {test.duration}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(test.id)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(test.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={navigateToAddTest}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Add New Test
        </button>
      </div>
    </div>
  );
};

export default ListTests;