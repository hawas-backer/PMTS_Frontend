import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { ArrowLeft, Layers, TrendingUp, Award, Calendar } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalAttempts: 0,
    highestScore: 0,
    averageScore: 0
  });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found in localStorage. Please log in again.');
        }
        const response = await axios.get(`/api/aptitude-tests/result/${userId}`, {
          withCredentials: true
        });
        setResults(response.data.results);
        setAnalytics(response.data.analytics);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError(err.message || 'Failed to load analytics data. Please try again later.');
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const prepareLineChartData = () => {
    const sortedResults = [...results].sort((a, b) => 
      new Date(a.submittedAt) - new Date(b.submittedAt)
    );

    return {
      labels: sortedResults.map(result => 
        new Date(result.submittedAt).toLocaleDateString()
      ),
      datasets: [
        {
          label: 'Score Percentage',
          data: sortedResults.map(result => 
            ((result.score / result.totalMarks) * 100).toFixed(2)
          ),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.2
        }
      ]
    };
  };

  const prepareBarChartData = () => {
    return {
      labels: results.map(result => result.test.title),
      datasets: [
        {
          label: 'Score Percentage',
          data: results.map(result => 
            ((result.score / result.totalMarks) * 100).toFixed(2)
          ),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          borderColor: 'rgb(53, 162, 235)',
          borderWidth: 1
        }
      ]
    };
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e2e8f0'
        }
      },
      title: {
        display: true,
        text: 'Performance Over Time',
        color: '#e2e8f0'
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          color: '#e2e8f0'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: '#e2e8f0'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e2e8f0'
        }
      },
      title: {
        display: true,
        text: 'Performance by Test',
        color: '#e2e8f0'
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          color: '#e2e8f0'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: '#e2e8f0'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1218] p-6 flex justify-center items-center">
        <div className="text-gray-200">Loading analytics data...</div>
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

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f1218] p-6 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-[#1a1f2c] rounded-lg p-6 text-gray-200">
          <h2 className="text-2xl font-semibold mb-6">Analytics Dashboard</h2>
          <div className="bg-[#0f1218] rounded-lg p-6 flex flex-col items-center justify-center h-60">
            <p className="text-gray-400 mb-4 text-center">You haven't attempted any quizzes yet.</p>
            <button 
              onClick={() => navigate('/student/aptitude-tests')}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center"
            >
              Take a Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1218] p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="bg-[#1a1f2c] rounded-lg p-6 text-gray-200 mb-6">
          <h2 className="text-2xl font-semibold mb-6">Performance Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#0f1218] rounded-lg p-4 flex items-center">
              <Layers className="text-blue-400 mr-4" size={32} />
              <div>
                <p className="text-gray-400 text-sm">Total Quizzes</p>
                <p className="text-2xl font-semibold">{analytics.totalAttempts}</p>
              </div>
            </div>
            <div className="bg-[#0f1218] rounded-lg p-4 flex items-center">
              <Award className="text-yellow-400 mr-4" size={32} />
              <div>
                <p className="text-gray-400 text-sm">Highest Score</p>
                <p className="text-2xl font-semibold">{analytics.highestScore}%</p>
              </div>
            </div>
            <div className="bg-[#0f1218] rounded-lg p-4 flex items-center">
              <TrendingUp className="text-green-400 mr-4" size={32} />
              <div>
                <p className="text-gray-400 text-sm">Average Score</p>
                <p className="text-2xl font-semibold">{analytics.averageScore.toFixed(2)}%</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#0f1218] p-4 rounded-lg">
              {results.length > 1 ? (
                <Line data={prepareLineChartData()} options={lineChartOptions} />
              ) : (
                <div className="flex flex-col h-60 justify-center items-center text-gray-400">
                  <Calendar size={32} className="mb-2" />
                  <p>Need more quiz attempts to display trend data</p>
                </div>
              )}
            </div>
            <div className="bg-[#0f1218] p-4 rounded-lg">
              <Bar data={prepareBarChartData()} options={barChartOptions} />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Recent Results</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0f1218]">
                    <th className="p-2 text-left">Quiz</th>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-right">Score</th>
                    <th className="p-2 text-right">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {results.slice(0, 5).map((result, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td className="p-2 text-left">{result.test.title}</td>
                      <td className="p-2 text-left">{new Date(result.submittedAt).toLocaleDateString()}</td>
                      <td className="p-2 text-right">{result.score} / {result.totalMarks}</td>
                      <td className="p-2 text-right">
                        <span className={
                          (result.score / result.totalMarks) * 100 >= 60 
                            ? 'text-green-400' 
                            : 'text-red-400'
                        }>
                          {((result.score / result.totalMarks) * 100).toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button 
            onClick={() => navigate('/student/aptitude-tests')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Tests
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;