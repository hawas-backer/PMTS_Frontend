import React, { useState } from 'react';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';

const Events = () => {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'TCS Placement Drive',
      date: '2025-03-15',
      description: 'Campus recruitment drive for 2025 batch',
    },
    {
      id: 2,
      name: 'Interview Preparation',
      date: '2025-03-10',
      description: 'Training session for technical interviews',
    }
  ]);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, { id: events.length + 1, ...newEvent }]);
    setShowAddEvent(false);
  };

  return (
    <div className="p-6 bg-[#0f1218] h-screen w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-200">Events</h2>
        <button
          onClick={() => setShowAddEvent(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <Plus size={20} />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-[#1a1f2c] rounded-lg p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-gray-200">{event.name}</h3>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-blue-400">
                  <Edit size={18} />
                </button>
                <button className="text-gray-400 hover:text-red-400">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-gray-300">
                <Calendar size={16} className="mr-2" />
                {event.date}
              </div>
              <p className="text-gray-400">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {showAddEvent && (
        <AddEvent onClose={() => setShowAddEvent(false)} onAdd={handleAddEvent} />
      )}
    </div>
  );
};

const AddEvent = ({ onClose, onAdd }) => {
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    description: '',
  });

  const handleSubmit = () => {
    onAdd(eventData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1f2c] rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-gray-200 mb-4">Add New Event</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Event Name</label>
            <input
              type="text"
              className="w-full bg-[#0f1218] text-gray-200 p-2 rounded"
              value={eventData.name}
              onChange={(e) => setEventData({...eventData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Date</label>
            <input
              type="date"
              className="w-full bg-[#0f1218] text-gray-200 p-2 rounded"
              value={eventData.date}
              onChange={(e) => setEventData({...eventData, date: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              className="w-full bg-[#0f1218] text-gray-200 p-2 rounded"
              value={eventData.description}
              onChange={(e) => setEventData({...eventData, description: e.target.value})}
              rows="3"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;