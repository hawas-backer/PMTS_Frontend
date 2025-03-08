import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';

const CreateTest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEditMode = !!id;
  const testData = location.state?.test || null;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 60,
    questions: [
      {
        question: '',
        options: ['', '', '', ''],
        correctOption: 0,
        marks: 1
      }
    ]
  });
  
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [totalMarks, setTotalMarks] = useState(1);

  useEffect(() => {
    if (isEditMode && testData) {
      setFormData(testData);
      calculateTotalMarks(testData.questions);
    } else if (isEditMode && !testData) {
      fetchTestData();
    }
  }, [isEditMode, testData]);

  useEffect(() => {
    calculateTotalMarks(formData.questions);
  }, [formData.questions]);

  const fetchTestData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/aptitude-tests/${id}`, { withCredentials: true });
      setFormData(prev => ({
        ...prev,
        ...response.data,
        questions: response.data.questions || prev.questions // Ensure questions is an array
      }));
      calculateTotalMarks(response.data.questions || []);
      setLoading(false);
    } catch (error) {
      setErrorMessage('Failed to fetch test data');
      setLoading(false);
    }
  };

  const calculateTotalMarks = (questions = []) => {
    const sum = questions.reduce((total, q) => total + Number(q.marks || 0), 0);
    setTotalMarks(sum || 1); // Default to 1 if no questions
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][field] = value;
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  const handleCorrectOptionChange = (questionIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].correctOption = Number(value);
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  const handleMarksChange = (questionIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].marks = Number(value) || 1;
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          question: '',
          options: ['', '', '', ''],
          correctOption: 0,
          marks: 1
        }
      ]
    });
  };

  const removeQuestion = (index) => {
    if (formData.questions.length === 1) {
      setErrorMessage('Test must have at least one question');
      return;
    }
    
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setErrorMessage('Test title is required');
      return false;
    }
    
    if (formData.duration <= 0) {
      setErrorMessage('Duration must be a positive number');
      return false;
    }

    for (let i = 0; i < formData.questions.length; i++) {
      const q = formData.questions[i];
      
      if (!q.question.trim()) {
        setErrorMessage(`Question ${i + 1} text is required`);
        return false;
      }
      
      for (let j = 0; j < 4; j++) {
        if (!q.options[j].trim()) {
          setErrorMessage(`Option ${j + 1} for Question ${i + 1} is required`);
          return false;
        }
      }
      
      if (q.correctOption < 0 || q.correctOption > 3) {
        setErrorMessage(`Correct option for Question ${i + 1} must be between 0-3`);
        return false;
      }
      
      if (q.marks <= 0) {
        setErrorMessage(`Marks for Question ${i + 1} must be positive`);
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      
      if (isEditMode) {
        await axios.put(`/api/aptitude-tests/${id}`, formData, { withCredentials: true });
        setSuccessMessage('Test updated successfully');
      } else {
        await axios.post('/api/aptitude-tests/create', formData, { withCredentials: true });
        setSuccessMessage('Test created successfully');
      }
      
      setLoading(false);
      
      setTimeout(() => {
        navigate('/coordinator/aptitude-tests');
      }, 1500);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to save test');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/coordinator/aptitude-tests');
  };

  if (loading && isEditMode) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f1218]">
        <div className="text-gray-200">Loading test data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1218] text-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleCancel}
            className="flex items-center text-gray-400 hover:text-gray-200 mr-4"
          >
            <ArrowLeft size={20} className="mr-1" />
            Back
          </button>
          <h1 className="text-2xl font-bold">
            {isEditMode ? 'Edit Aptitude Test' : 'Create Aptitude Test'}
          </h1>
        </div>

        {successMessage && (
          <div className="bg-green-900 text-green-200 p-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-900 text-red-200 p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-[#1a1f2c] rounded-lg p-6">
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Test Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-[#0f1218] rounded p-2 text-gray-200"
              placeholder="Enter test title"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-[#0f1218] rounded p-2 text-gray-200 h-24"
              placeholder="Enter test description"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full bg-[#0f1218] rounded p-2 text-gray-200"
              min="1"
            />
          </div>

          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Questions</h2>
            <div className="text-gray-400">Total Marks: {totalMarks}</div>
          </div>

          {formData.questions && formData.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-8 p-4 bg-[#252c3b] rounded-lg">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Question {questionIndex + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeQuestion(questionIndex)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Question Text</label>
                <textarea
                  value={question.question}
                  onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                  className="w-full bg-[#0f1218] rounded p-2 text-gray-200"
                  placeholder="Enter question text"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Options</label>
                {[0, 1, 2, 3].map((optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    <div className="w-8 text-center">{String.fromCharCode(65 + optionIndex)}.</div>
                    <input
                      type="text"
                      value={question.options[optionIndex]}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                      className="flex-1 bg-[#0f1218] rounded p-2 text-gray-200"
                      placeholder={`Option ${optionIndex + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Correct Option</label>
                  <select
                    value={question.correctOption}
                    onChange={(e) => handleCorrectOptionChange(questionIndex, e.target.value)}
                    className="w-full bg-[#0f1218] rounded p-2 text-gray-200"
                  >
                    <option value={0}>A</option>
                    <option value={1}>B</option>
                    <option value={2}>C</option>
                    <option value={3}>D</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Marks</label>
                  <input
                    type="number"
                    value={question.marks}
                    onChange={(e) => handleMarksChange(questionIndex, e.target.value)}
                    className="w-full bg-[#0f1218] rounded p-2 text-gray-200"
                    min="1"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center justify-center w-full py-3 mb-6 bg-[#252c3b] rounded-lg hover:bg-[#2a3241] transition"
          >
            <Plus size={18} className="mr-2" />
            Add Question
          </button>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEditMode ? 'Update Test' : 'Save Test')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTest;