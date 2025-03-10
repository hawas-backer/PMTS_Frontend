import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchQuiz();
    
    // Clear timer when component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Separate useEffect for timer management that depends on quiz
  useEffect(() => {
    // Only start the timer when quiz data is loaded
    if (quiz && timeLeft > 0) {
      startTimer();
      
      // Cleanup function to prevent multiple timers
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [quiz]); // Only run when quiz changes

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/aptitude-tests/take/${id}`, { withCredentials: true });
      const quizData = response.data.test; // Response is { test: {...} }
      setQuiz(quizData);
      setAnswers(Array(quizData.questions.length).fill(null));
      setTimeLeft(quizData.duration * 60); // Convert minutes to seconds
      setLoading(false);
      // Don't start timer here - it will be started by the useEffect that depends on quiz
    } catch (error) {
      console.error('Fetch quiz error:', error.response?.data || error.message);
      setError(
        error.response?.data?.message ||
        'Failed to fetch quiz. It may not be available or you have already attempted it.'
      );
      setLoading(false);
    }
  };

  const startTimer = () => {
    // Clear any existing timer to avoid multiple timers running
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Create a new timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          submitQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Exactly 1000ms for accurate timing
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [
      hours > 0 ? hours : null,
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].filter(Boolean).join(':');
  };

  const handleAnswerSelect = (questionIndex, selectedOption) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedOption;
    setAnswers(newAnswers);
    // Calculate progress (percentage of questions answered)
    const answeredQuestions = newAnswers.filter(answer => answer !== null).length;
    const totalQuestions = quiz.questions.length;
    setProgress((answeredQuestions / totalQuestions) * 100);
  };

  const handleSubmitClick = () => {
    const unansweredCount = answers.filter(a => a === null).length;
    if (unansweredCount > 0) {
      setConfirmSubmit(true);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    if (isSubmitting) return;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    try {
      setIsSubmitting(true);
      const response = await axios.post(`/api/aptitude-tests/${id}/submit`, { answers }, { withCredentials: true });
      const resultId = response.data.result._id;
      navigate(`/student/quiz-results/${resultId}`, {
        state: {
          submissionResult: response.data.result, // Now contains the full QuizResult document
          answers,
          quiz
        }
      });
    } catch (error) {
      setError('Failed to submit quiz. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f1218]">
        <div className="text-gray-200">Loading quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f1218] text-gray-200 p-6">
        <div className="max-w-3xl mx-auto bg-[#1a1f2c] rounded-lg p-6">
          <div className="flex items-center text-red-400 mb-4">
            <AlertTriangle size={24} className="mr-2" />
            <h2 className="text-xl font-semibold">Error</h2>
          </div>
          <p className="mb-6">{error}</p>
          <button
            onClick={() => navigate('/student/aptitude-tests')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Back to Available Tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1218] text-gray-200 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Quiz Header */}
        <div className="bg-[#1a1f2c] rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-3">{quiz.title}</h1>
          {quiz.description && <p className="text-gray-400 mb-4">{quiz.description}</p>}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center text-yellow-500 mb-4 sm:mb-0">
              <Clock size={20} className="mr-2" />
              <span className="font-semibold">{formatTime(timeLeft)}</span>
              <span className="text-gray-400 ml-2">remaining</span>
            </div>
            <div className="w-full sm:w-60">
              <div className="text-xs text-gray-400 mb-1">
                Progress: {Math.round(progress)}%
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        {/* Quiz Questions */}
        <div className="space-y-6 mb-8">
          {quiz.questions.map((question, index) => (
            <div key={index} className="bg-[#1a1f2c] rounded-lg p-6">
              <div className="flex items-start mb-4">
                <span className="bg-gray-700 text-gray-200 px-2 py-1 rounded-full text-sm mr-3">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-medium">{question.question}</h3>
                  <div className="text-gray-400 text-sm mt-1">
                    {question.marks} {question.marks === 1 ? 'mark' : 'marks'}
                  </div>
                </div>
              </div>
              <div className="space-y-3 pl-10">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`
                      flex items-center p-3 rounded cursor-pointer transition
                      ${answers[index] === optionIndex ? 'bg-red-900 bg-opacity-30' : 'hover:bg-[#252c3b]'}
                    `}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      checked={answers[index] === optionIndex}
                      onChange={() => handleAnswerSelect(index, optionIndex)}
                      className="sr-only"
                    />
                    <div className={`
                      w-5 h-5 rounded-full border flex items-center justify-center mr-3
                      ${answers[index] === optionIndex
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-500'}
                    `}>
                      {answers[index] === optionIndex && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span>{String.fromCharCode(65 + optionIndex)}. {option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Submit Section */}
        <div className="flex justify-between items-center bg-[#1a1f2c] rounded-lg p-6">
          <div>
            <div className="text-sm text-gray-400">
              {answers.filter(a => a !== null).length} of {quiz.questions.length} questions answered
            </div>
          </div>
          <button
            onClick={handleSubmitClick}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded flex items-center transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            <CheckCircle size={18} className="ml-2" />
          </button>
        </div>
        {/* Confirmation Modal */}
        {confirmSubmit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1f2c] rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">Confirm Submission</h2>
              <p className="mb-6">
                You have {answers.filter(a => a === null).length} unanswered questions.
                Are you sure you want to submit the quiz?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setConfirmSubmit(false)}
                  className="px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600"
                >
                  Continue Quiz
                </button>
                <button
                  onClick={submitQuiz}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Submit Anyway
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeQuiz;