import React, { useState } from 'react';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback:', feedback);
    setFeedback('');
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-300 p-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-lg font-semibold mb-4">Feedback</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your thoughts..."
            className="w-full p-2 bg-gray-900 rounded text-sm mb-2"
            rows="4"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;