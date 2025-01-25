import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Event = () => {
  const [events, setEvents] = useState([
    // Example data; replace with actual data from API or state
    { id: 1, name: 'Placement Drive', date: '2025-02-01' },
    { id: 2, name: 'Mock Interview', date: '2025-02-15' },
  ]);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    // Confirmation dialog before deleting
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const handleEdit = (id) => {
    // Navigate to AddEvent with edit mode and pass the event ID
    navigate(`/add-event`, { state: { edit: true, eventId: id } });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <div className="space-y-4">
        {events.map(event => (
          <div
            key={event.id}
            className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
          >
            <div>
              <p className="font-semibold text-lg">{event.name}</p>
              <p className="text-gray-600">{event.date}</p>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600"
                onClick={() => handleEdit(event.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600"
                onClick={() => handleDelete(event.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
          onClick={() => navigate('/add-event')}
        >
          Add Event
        </button>
      </div>
    </div>
  );
};

export default Event;