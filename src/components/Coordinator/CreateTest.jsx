import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const CreateTest = () => {
  const [questions, setQuestions] = useState([{
    question: '',
    options: ['', '', '', ''],
    correctOption: 0,
    marks: 1
  }]);
  const [description, setDescription] = useState('');
  const [totalMarks, setTotalMarks] = useState(0);

  const addQuestion = () => {
    setQuestions([...questions, {
      question: '',
      options: ['', '', '', ''],
      correctOption: 0,
      marks: 1
    }]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index, field, value, optionIndex = null) => {
    const newQuestions = [...questions];
    if (optionIndex !== null) {
      newQuestions[index].options[optionIndex] = value;
    } else {
      newQuestions[index][field] = value;
    }
    setQuestions(newQuestions);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-screen bg-[#0f1218]"> {/* Subtract header height */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-200 mb-6">Create New Test</h2>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Test Description</label>
            <textarea 
              className="w-full bg-[#1a1f2c] text-gray-200 p-3 rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              placeholder="Enter test description"
            />
          </div>

          <div className="space-y-6">
            {questions.map((q, index) => (
              <div key={index} className="bg-[#1a1f2c] p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-200">Question {index + 1}</h3>
                  <button
                    onClick={() => removeQuestion(index)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Minus size={20} />
                  </button>
                </div>

                <textarea
                  className="w-full bg-[#0f1218] text-gray-200 p-3 rounded-lg mb-4"
                  value={q.question}
                  onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                  placeholder="Enter your question"
                  rows="3"
                />

                <div className="space-y-4">
                  {q.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={q.correctOption === optIndex}
                        onChange={() => updateQuestion(index, 'correctOption', optIndex)}
                        className="w-4 h-4 bg-[#1a1f2c] border-gray-600"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateQuestion(index, 'options', e.target.value, optIndex)}
                        className="flex-1 bg-[#0f1218] text-gray-200 p-3 rounded"
                        placeholder={`Option ${optIndex + 1}`}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="text-gray-300 mr-2">Marks:</label>
                  <input
                    type="number"
                    value={q.marks}
                    onChange={(e) => updateQuestion(index, 'marks', parseInt(e.target.value) || 0)}
                    className="bg-[#0f1218] text-gray-200 p-2 rounded w-24"
                    min="1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed bottom action bar */}
      <div className="bg-[#1a1f2c] border-t border-gray-700 p-4">
        <div className="max-w-5xl mx-auto flex justify-between">
          <button
            onClick={addQuestion}
            className="flex items-center gap-2 bg-gray-700 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            <Plus size={20} />
            Add Question
          </button>
          
          <div className="flex gap-4">
            <button
              className="px-6 py-2 text-gray-300 hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Save Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;