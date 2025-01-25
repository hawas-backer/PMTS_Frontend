import React, { useState } from "react";

const AddAptitudeTest = () => {
  const [testName, setTestName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [maxMarks, setMaxMarks] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswerIndex: 0 },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswerIndex: 0 },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, value, field) => {
    const updatedQuestions = [...questions];
    if (field === "question") {
      updatedQuestions[index].question = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (index, selectedIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswerIndex = selectedIndex;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation here before submitting
    console.log({
      testName,
      description,
      duration,
      maxMarks,
      questions,
    });
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Add Aptitude Test</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="testName" className="block text-lg font-semibold">
            Test Name
          </label>
          <input
            type="text"
            id="testName"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-semibold">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-lg font-semibold">
            Duration (in minutes)
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div>
          <label htmlFor="maxMarks" className="block text-lg font-semibold">
            Max Marks
          </label>
          <input
            type="number"
            id="maxMarks"
            value={maxMarks}
            onChange={(e) => setMaxMarks(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Questions</h3>
          {questions.map((question, index) => (
            <div key={index} className="border p-4 rounded shadow-sm">
              <div>
                <label htmlFor={`question-${index}`} className="block text-lg font-semibold">
                  Question {index + 1}
                </label>
                <input
                  type="text"
                  id={`question-${index}`}
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, e.target.value, "question")}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>

              <div className="mt-3">
                <label className="block text-lg font-semibold">Options</label>
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} className="mt-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, optIndex, e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                      placeholder={`Option ${optIndex + 1}`}
                      required
                    />
                  </div>
                ))}
              </div>

              <div>
                <label htmlFor={`correctAnswer-${index}`} className="block text-lg font-semibold">
                  Correct Answer
                </label>
                <select
                  id={`correctAnswer-${index}`}
                  value={question.correctAnswerIndex}
                  onChange={(e) =>
                    handleCorrectAnswerChange(index, parseInt(e.target.value))
                  }
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                >
                  {question.options.map((option, optIndex) => (
                    <option key={optIndex} value={optIndex}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveQuestion(index)}
                className="mt-3 text-red-500 hover:text-red-700"
              >
                Remove Question
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddQuestion}
            className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Add Another Question
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAptitudeTest;