import React, { useState } from 'react';
import { Calendar, Video, Users } from 'lucide-react';
import RegisterEvent from './RegisterEvent';

const EventAdd = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      title: 'Career Guidance Webinar',
      description: 'Industry experts share insights about career opportunities',
      icon: <Video className="w-6 h-6 text-blue-500" />,
      type: 'Webinar',
      date: '15th March 2025',
      time: '9-12 pm',
      conductor: 'Placement Coordinator'
    },
    {
      title: 'Mock Technical Interview',
      description: 'Practice interview session with experienced alumni',
      icon: <Users className="w-6 h-6 text-green-500" />,
      type: 'Interview',
      date: '18th March 2025',
      time: '9-12 pm',
      conductor: 'Alumni'
    },
    {
      title: 'Resume Building Workshop',
      description: 'Learn how to create an impactful resume.',
      icon: <Calendar className="w-6 h-6 text-purple-500" />,
      type: 'Workshop',
      date: '20th March 2025',
      time: '9-12 pm',
      conductor: 'Placement Coordinator'
    }
  ];

  const handleRegister = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div>
      <div className="min-h-screen bg-[#0B0F1A] p-6">
        <div className="max-w-6xl">
          <h1 className="text-2xl font-bold text-white mb-6">Events</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 transition-all transform hover:-translate-y-1 flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  {event.icon}
                  <h3 className="text-lg font-semibold text-white">
                    {event.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4 flex-grow">
                  {event.description}
                </p>
                <div className="text-xs text-gray-400 mb-4">
                  <div>{event.time}</div>
                  <div>{event.date}</div>
                  <div>By: {event.conductor}</div>
                </div>
                <button
                  onClick={() => handleRegister(event)}
                  className="w-full bg-violet-800 hover:bg-violet-700 text-white py-2 rounded text-sm mt-auto"
                >
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedEvent && <RegisterEvent event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  );
};

export default EventAdd;