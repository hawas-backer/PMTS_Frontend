// client/src/components/QuizResults.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Award, Check, X } from 'lucide-react';

const QuizResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if we have direct result data from the submission
  const submissionResult = location.state?.submissionResult;

  useEffect(() => {
    // If we already have submission results from state, use them
    if (submissionResult) {
      setResult(submissionResult);
      setLoading(false);
      return;
    }

    // Otherwise fetch the result from the API
    const fetchResult = async () => {
      try {
        const response = await axios.get(`/api/aptitude-tests/result/${id}`, { withCredentials: true });
        console.log('API Response:', response.data);
        console.log('Does result.test exist?', !!response.data.test);
        setResult(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching quiz result:', err.response?.data || err.message);
        if (err.response?.status === 403) {
          setError('You do not have permission to view this result.');
        } else if (err.response?.status === 404) {
          setError('Quiz result not found.');
        } else {
          setError(err.response?.data?.message || 'Failed to fetch quiz result. Please try again later.');
        }
        setLoading(false);
      }
    };

    fetchResult();
  }, [id, submissionResult]);

  const calculatePercentage = (score, totalMarks) => {
    return ((score / totalMarks) * 100).toFixed(2);
  };

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90) return 'Outstanding performance!';
    if (percentage >= 75) return 'Excellent work!';
    if (percentage >= 60) return 'Good job!';
    if (percentage >= 50) return 'Satisfactory result.';
    return 'Keep practicing to improve.';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1218] p-6 flex justify-center items-center">
        <div className="text-gray-200">Loading results...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f1218] p-6 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-[#1a1f2c] rounded-lg p-6 text-gray-200">
          <h2 className="text-xl font-semibold text-red-500 mb-4">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => navigate('/student/aptitude-tests')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-4 flex items-center"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  // Ensure we have valid result data
  if (!result || !result.test) {
    return (
      <div className="min-h-screen bg-[#0f1218] p-6 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-[#1a1f2c] rounded-lg p-6 text-gray-200">
          <h2 className="text-xl font-semibold text-red-500 mb-4">No Result Found</h2>
          <p>The requested quiz result could not be found.</p>
          <button 
            onClick={() => navigate('/student/aptitude-tests')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-4 flex items-center"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  const percentage = calculatePercentage(result.score, result.totalMarks);
  const performanceMessage = getPerformanceMessage(percentage);
  
  // Determine if we have detailed answer data (might not be available for security reasons)
  const hasDetailedAnswers = result.answers && 
    result.test.questions && 
    result.test.questions[0].correctOption !== undefined;

  return (
    <div className="min-h-screen bg-[#0f1218] p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-[#1a1f2c] rounded-lg p-6 text-gray-200">
        <h2 className="text-2xl font-semibold mb-2">{result.test.title} - Results</h2>
        <p className="text-gray-400 mb-6">Submitted on {new Date(result.submittedAt).toLocaleString()}</p>

        {/* Score summary */}
        <div className="bg-[#0f1218] rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Award className="text-yellow-500 mr-3" size={36} />
              <div>
                <h3 className="text-xl font-semibold">Your Score</h3>
                <p className="text-3xl font-bold text-red-500">
                  {result.score} / {result.totalMarks}
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold">{percentage}%</div>
              <div className={`text-sm ${parseInt(percentage) >= 60 ? 'text-green-400' : 'text-yellow-400'}`}>
                {performanceMessage}
              </div>
            </div>
          </div>
        </div>

        {/* Answers breakdown if available */}
        {hasDetailedAnswers && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Question Breakdown</h3>
            <div className="space-y-4">
              {result.test.questions.map((question, idx) => (
                <div key={idx} className="bg-[#0f1218] rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      {result.answers[idx] === question.correctOption ? (
                        <Check className="text-green-500" size={20} />
                      ) : (
                        <X className="text-red-500" size={20} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{question.question}</p>
                      <div className="mt-2 text-sm">
                        <p className="text-gray-400">Your answer: <span className={
                          result.answers[idx] === question.correctOption ? 'text-green-400' : 'text-red-400'
                        }>{question.options[result.answers[idx]]}</span></p>
                        
                        {result.answers[idx] !== question.correctOption && (
                          <p className="text-gray-400">Correct answer: <span className="text-green-400">
                            {question.options[question.correctOption]}
                          </span></p>
                        )}
                      </div>
                    </div>
                    <div className="ml-auto text-right">
                      <span className={`text-sm ${
                        result.answers[idx] === question.correctOption ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {result.answers[idx] === question.correctOption ? 
                          `+${question.marks}` : '0'} / {question.marks}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button 
            onClick={() => navigate('/student/aptitude-tests')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center justify-center"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Tests
          </button>
          <button 
            onClick={() => navigate('/student/analytics')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center justify-center"
          >
            View All Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;