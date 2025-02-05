import React, { useState } from 'react';
import { Brain, Code } from 'lucide-react';
import QuizList from './QuizList';

const Exam = () => {
  const [selectedSection, setSelectedSection] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl pt-8">
      {!selectedSection ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 text-white">
          <div
            className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 cursor-pointer transition-all transform hover:-translate-y-1"
            onClick={() => setSelectedSection('true')}
            role="button"
            tabIndex="0"
            aria-label="Aptitude Test"
          >
            <h2 className="text-xl font-bold mb-2">Aptitude Test</h2>
            <div className="flex items-center">
              <div className="p-3 bg-blue-500 flex items-center justify-center w-24 h-24 rounded-lg">
                <Brain className="w-24 h-24 text-white" />
              </div>
              <p className="text-gray-400 p-3">
                Practice and take scheduled aptitude tests for various companies.
              </p>
            </div>
          </div>

          <div
            className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 cursor-pointer transition-all transform hover:-translate-y-1"
            onClick={() => setSelectedSection('true')}
            role="button"
            tabIndex="0"
            aria-label="Coding Test"
          >
            <h2 className="text-xl font-bold mb-2">Coding Test</h2>
            <div className="flex items-center">
              <div className="p-3 bg-green-500 flex items-center justify-center w-24 h-24 rounded-lg">
                <Code className="w-24 h-24 text-white" />
              </div>
              <p className="text-gray-400 p-3">
                Prepare for coding interviews with practice tests and challenges.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <QuizList  />
        </div>
      )}
    </div>
  );
};

export default Exam;