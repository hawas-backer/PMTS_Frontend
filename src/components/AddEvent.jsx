import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AddEvent = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const isEdit = state?.edit || false;
  const eventId = state?.eventId || null;

  // Initial State
  const [eventDetails, setEventDetails] = useState({
    name: '',
    date: '',
    description: '',
    tag: '',
    company: '',
  });

  useEffect(() => {
    if (isEdit && eventId) {
      // Fetch event data by eventId and populate form fields
      // This is a placeholder for API call logic
      const fetchedEvent = {
        name: 'Mock Interview',
        date: '2025-02-15',
        description: 'A preparation event for interviews.',
        tag: 'Placement Training Event',
        company: '',
      };
      setEventDetails(fetchedEvent);
    }
  }, [isEdit, eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      // Update the existing event (API call)
      console.log('Updating Event:', eventDetails);
    } else {
      // Add a new event (API call)
      console.log('Adding Event:', eventDetails);
    }
    navigate('/events'); // Navigate back to the Event list
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Event' : 'Add Event'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Event Name</label>
          <input
            type="text"
            name="name"
            value={eventDetails.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Event Date</label>
          <input
            type="date"
            name="date"
            value={eventDetails.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={eventDetails.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Tag</label>
          <select
            name="tag"
            value={eventDetails.tag}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select a tag</option>
            <option value="Placement Drive">Placement Drive</option>
            <option value="Placement Training Event">Placement Training Event</option>
          </select>
        </div>
        {eventDetails.tag === 'Placement Drive' && (
          <div>
            <label className="block font-medium mb-1">Company Name</label>
            <input
              type="text"
              name="company"
              value={eventDetails.company}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
        )}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            {isEdit ? 'Update Event' : 'Add Event'}
          </button>
          <button
            type="button"
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
            onClick={() => navigate('/events')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;