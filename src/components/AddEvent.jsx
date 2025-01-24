import React, { useState } from 'react';

const AddEvent = () => {
  // State to store event data
  const [eventData, setEventData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    description: '',
    tag: '',
    companyName: '',
  });

  // Error state for validation messages
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!eventData.name) newErrors.name = 'Event name is required';
    if (!eventData.startDate) newErrors.startDate = 'Start date is required';
    if (!eventData.endDate) newErrors.endDate = 'End date is required';
    if (new Date(eventData.startDate) > new Date(eventData.endDate)) {
      newErrors.dateRange = 'Start date cannot be later than end date';
    }
    if (!eventData.startTime) newErrors.startTime = 'Start time is required';
    if (!eventData.endTime) newErrors.endTime = 'End time is required';
    if (new Date(`1970-01-01T${eventData.startTime}:00`) > new Date(`1970-01-01T${eventData.endTime}:00`)) {
      newErrors.timeRange = 'Start time cannot be later than end time';
    }
    if (!eventData.description) newErrors.description = 'Description is required';
    if (!eventData.tag) newErrors.tag = 'Please select a tag (Placement Drive or Training Event)';
    if (eventData.tag === 'Placement Drive' && !eventData.companyName) {
      newErrors.companyName = 'Company name is required for Placement Drive';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Process the data (e.g., send it to the backend)
      console.log('Event added:', eventData);
      // Reset form (optional)
      setEventData({
        name: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        description: '',
        tag: '',
        companyName: '',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Add Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Event Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleInputChange}
            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Event Name"
            required
          />
          {errors.name && <p className="text-red-600 mt-1 text-sm">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startDate" className="block text-lg font-semibold text-gray-700">Start Date</label>
            <input
              id="startDate"
              type="date"
              name="startDate"
              value={eventData.startDate}
              onChange={handleInputChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            {errors.startDate && <p className="text-red-600 mt-1 text-sm">{errors.startDate}</p>}
          </div>

          <div>
            <label htmlFor="endDate" className="block text-lg font-semibold text-gray-700">End Date</label>
            <input
              id="endDate"
              type="date"
              name="endDate"
              value={eventData.endDate}
              onChange={handleInputChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            {errors.endDate && <p className="text-red-600 mt-1 text-sm">{errors.endDate}</p>}
            {errors.dateRange && <p className="text-red-600 mt-1 text-sm">{errors.dateRange}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startTime" className="block text-lg font-semibold text-gray-700">Start Time</label>
            <input
              id="startTime"
              type="time"
              name="startTime"
              value={eventData.startTime}
              onChange={handleInputChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            {errors.startTime && <p className="text-red-600 mt-1 text-sm">{errors.startTime}</p>}
          </div>

          <div>
            <label htmlFor="endTime" className="block text-lg font-semibold text-gray-700">End Time</label>
            <input
              id="endTime"
              type="time"
              name="endTime"
              value={eventData.endTime}
              onChange={handleInputChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            {errors.endTime && <p className="text-red-600 mt-1 text-sm">{errors.endTime}</p>}
            {errors.timeRange && <p className="text-red-600 mt-1 text-sm">{errors.timeRange}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-semibold text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Event Description"
            required
          />
          {errors.description && <p className="text-red-600 mt-1 text-sm">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="tag" className="block text-lg font-semibold text-gray-700">Tag</label>
          <select
            id="tag"
            name="tag"
            value={eventData.tag}
            onChange={handleInputChange}
            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select Tag</option>
            <option value="Placement Drive">Placement Drive</option>
            <option value="Placement Training Event">Placement Training Event</option>
          </select>
          {errors.tag && <p className="text-red-600 mt-1 text-sm">{errors.tag}</p>}
        </div>

        {eventData.tag === 'Placement Drive' && (
          <div>
            <label htmlFor="companyName" className="block text-lg font-semibold text-gray-700">Company Name</label>
            <input
              id="companyName"
              type="text"
              name="companyName"
              value={eventData.companyName}
              onChange={handleInputChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Company Name"
            />
            {errors.companyName && <p className="text-red-600 mt-1 text-sm">{errors.companyName}</p>}
          </div>
        )}

        <button type="submit" className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;