import React, { useState } from 'react';

const AddTest = () => {
  const [testName, setTestName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [maxMarks, setMaxMarks] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: '' }
  ]);

  const handleChangeTestName = (e) => setTestName(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);
  const handleChangeDuration = (e) => setDuration(e.target.value);
  const handleChangeMaxMarks = (e) => setMaxMarks(e.target.value);

  const handleChangeQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: ['', '', '', ''], correctAnswer: '' }
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for max marks and duration
    if (isNaN(maxMarks) || maxMarks <= 0) {
      alert('Max Marks must be a valid number greater than 0');
      return;
    }
    if (isNaN(duration) || duration <= 0) {
      alert('Duration must be a valid number greater than 0');
      return;
    }

    // Validation for questions
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (!question.questionText || !question.correctAnswer || question.options.length !== 4 || !question.options.includes(question.correctAnswer)) {
        alert(`Question ${i + 1} is invalid. Ensure all fields are filled correctly.`);
        return;
      }
    }

    // If all validations pass, submit the test data (simulated here)
    alert('Aptitude test added successfully!');
    // You can now call an API to save the test
  };

  return (
    <div className="container px-4 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Aptitude Test</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg">
        {/* Test Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Test Name</label>
          <input
            type="text"
            value={testName}
            onChange={handleChangeTestName}
            className="mt-2 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={handleChangeDescription}
            className="mt-2 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label className="block text-gray-700">Duration (min)</label>
          <input
            type="number"
            value={duration}
            onChange={handleChangeDuration}
            className="mt-2 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Max Marks */}
        <div className="mb-4">
          <label className="block text-gray-700">Max Marks</label>
          <input
            type="number"
            value={maxMarks}
            onChange={handleChangeMaxMarks}
            className="mt-2 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Questions */}
        <div>
          <h3 className="text-xl font-bold mb-2">Questions</h3>
          {questions.map((question, index) => (
            <div key={index} className="mb-6">
              <div className="mb-4">
                <label className="block text-gray-700">Question {index + 1}</label>
                <input
                  type="text"
                  value={question.questionText}
                  onChange={(e) => handleChangeQuestion(index, 'questionText', e.target.value)}
                  className="mt-2 p-2 w-full border rounded-md"
                  required
                />
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {question.options.map((option, i) => (
                  <div key={i} className="mb-4">
                    <label className="block text-gray-700">Option {i + 1}</label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleChangeQuestion(index, 'options', e.target.value.split(', '))}
                      className="mt-2 p-2 w-full border rounded-md"
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Correct Answer */}
              <div className="mb-4">
                <label className="block text-gray-700">Correct Answer</label>
                <select
                  value={question.correctAnswer}
                  onChange={(e) => handleChangeQuestion(index, 'correctAnswer', e.target.value)}
                  className="mt-2 p-2 w-full border rounded-md"
                  required
                >
                  <option value="">Select Correct Answer</option>
                  {question.options.map((option, i) => (
                    <option key={i} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Remove Question */}
              <button
                type="button"
                onClick={() => handleRemoveQuestion(index)}
                className="text-red-500 hover:underline"
              >
                Remove Question
              </button>
            </div>
          ))}

          {/* Add Question */}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="text-blue-500 hover:underline"
          >
            Add Question
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Add Aptitude Test
        </button>
      </form>
    </div>
  );
};

export default AddTest;