import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import Quiz from './Quiz';

const QuizList = () => {
  const [selectedTest, setSelectedTest] = useState(null);

  const aptitudeTests = [
    {
      id: 1,
      company: "TCS",
      date: "2025-02-10",
      time: "10:00 AM",
      duration: "2 hours",
      topics: "Quantitative, Logical Reasoning, Verbal"
    },
    {
      id: 2,
      company: "Infosys",
      date: "2025-02-15",
      time: "2:00 PM",
      duration: "1.5 hours",
      topics: "Data Interpretation, Reasoning, English"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pt-8">
      {!selectedTest ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Scheduled Aptitude Tests</h2>
          </div>
          <div className="space-y-4">
            {aptitudeTests.map((test) => (
              <div 
                key={test.id} 
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">{test.company}</h3>
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{test.duration}</span>
                    </div>
                    <p className="text-gray-300">Topics: {test.topics}</p>
                    <div className="text-gray-400">
                      <p>Date: {test.date}</p>
                      <p>Time: {test.time}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedTest(test)} // Pass the test object
                    className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-white"
                  >
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full">
         <Quiz/>
        </div>
      )}
    </div>
  );
};

export default QuizList;
