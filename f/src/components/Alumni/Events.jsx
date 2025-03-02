import React, { useState } from 'react';

const Events = () => {
  const [events, setEvents] = useState([
    // Your event data here
  ]);

  const [registration, setRegistration] = useState({
    name: '', email: '', eventId: '',
  });

  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [view, setView] = useState('upcoming');
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '', date: '', time: '', location: '', description: '',
  });

  // ... (Your event handlers: handleRegisterChange, handleRegisterSubmit, etc.)

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.date) < new Date());

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Events & Webinars</h1>

        <div className="mb-8 flex justify-between">
  <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    {showForm ? 'Hide Form' : 'Add New Event'}
  </button>

  <div className="flex space-x-2">
    <button onClick={() => setView('upcoming')} className={`py-2 px-4 rounded ${view === 'upcoming' ? 'bg-blue-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}>
      Upcoming
    </button>
    <button onClick={() => setView('past')} className={`py-2 px-4 rounded ${view === 'past' ? 'bg-blue-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}>
      Past
    </button>
  </div>
</div>

{showForm && (
  <form onSubmit={handleEventSubmit} className="mb-8 p-6 bg-gray-800 rounded-lg shadow-md">
    {/* ... (Your form fields - name, date, time, location, description) */}
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
      Add Event
    </button>
  </form>
)}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div> {/* Events List */}
          {view === 'upcoming' && (
  <div>
    <h2 className="text-3xl font-semibold mb-4">Upcoming Events</h2>
    <ul className="space-y-6">
      {upcomingEvents.map((event) => (
        <li key={event.id} className="p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
          <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
          <p className="text-gray-400">{event.date} at {event.time} - {event.location}</p>
          <p className="mt-2">{event.description}</p>
        </li>
      ))}
    </ul>
  </div>
)}

{view === 'past' && (
  <div>
    <h2 className="text-3xl font-semibold mb-4">Past Events</h2>
    <ul className="space-y-6">
      {pastEvents.map((event) => (
        <li key={event.id} className="p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
          <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
          <p className="text-gray-400">{event.date} at {event.time} - {event.location}</p>
          <p className="mt-2">{event.description}</p>
        </li>
      ))}
    </ul>
  </div>
)}
          </div>
          <div> {/* Right Sidebar */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;