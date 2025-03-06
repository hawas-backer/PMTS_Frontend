import React, { useState } from 'react';

const Events = () => {
  const [events, setEvents] = useState([
    { id: 1, name: 'React Workshop', date: '2025-03-10', time: '10:00', location: 'Online', description: 'Learn React.' },
    { id: 2, name: 'AI Webinar', date: '2025-02-01', time: '14:00', location: 'Zoom', description: 'AI trends.' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', time: '', location: '', description: '' });
  const [view, setView] = useState('upcoming');

  const handleEventSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, { id: events.length + 1, ...newEvent }]);
    setNewEvent({ name: '', date: '', time: '', location: '', description: '' });
    setShowForm(false);
  };

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.date) < new Date());

  return (
    <div className="bg-gray-900 min-h-screen text-gray-300 p-2"> {/* Reduced padding */}
      <h1 className="text-lg font-semibold mb-4">Events</h1>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-blue-500 hover:text-blue-400 text-sm"
        >
          {showForm ? 'Close' : 'New'}
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setView('upcoming')}
            className={`text-sm ${view === 'upcoming' ? 'text-blue-500' : 'text-gray-500 hover:text-gray-400'}`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setView('past')}
            className={`text-sm ${view === 'past' ? 'text-blue-500' : 'text-gray-500 hover:text-gray-400'}`}
          >
            Past
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleEventSubmit} className="mb-4 bg-gray-800 p-4 rounded">
          <input
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            placeholder="Name"
            className="w-full p-2 bg-gray-900 rounded text-sm mb-2"
            required
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="w-full p-2 bg-gray-900 rounded text-sm mb-2"
            required
          />
          <input
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            placeholder="Time"
            className="w-full p-2 bg-gray-900 rounded text-sm mb-2"
            required
          />
          <input
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            placeholder="Location"
            className="w-full p-2 bg-gray-900 rounded text-sm mb-2"
            required
          />
          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            placeholder="Description"
            className="w-full p-2 bg-gray-900 rounded text-sm mb-2"
            rows="2"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded">
            Add
          </button>
        </form>
      )}

      <ul className="space-y-2">
        {(view === 'upcoming' ? upcomingEvents : pastEvents).map((event) => (
          <li key={event.id} className="p-3 bg-gray-800 rounded hover:bg-gray-700 transition">
            <h3 className="text-sm font-semibold">{event.name}</h3>
            <p className="text-xs text-gray-500">
              {new Date(event.date).toLocaleDateString()} {event.time} - {event.location}
            </p>
            <p className="text-xs">{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;