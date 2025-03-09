import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Users, Edit } from 'lucide-react';


const Events = () => {
  const [events, setEvents] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showRegistrations, setShowRegistrations] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEditEvent, setShowEditEvent] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/events', {
        withCredentials: true, // Ensure cookies are sent
      });
      const eventsWithSafeData = res.data.map(event => ({
        ...event,
        registeredStudents: event.registeredStudents || []
      }));
      setEvents(eventsWithSafeData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleAddEvent = async (newEvent) => {
    try {
      console.log('Event to be sent:', newEvent); // Debugging step
  
      const eventToAdd = { ...newEvent, registeredStudents: [] };
  
      const response = await axios.post('http://localhost:8080/api/events', eventToAdd, {
        withCredentials: true, // Important for session-based auth
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Event added successfully:', response.data); // Debugging step
      fetchEvents();
      setShowAddEvent(false);
    } catch (error) {
      console.error('Error adding event:', error.response?.data || error.message);
    }
  };
  
  const handleEditEvent = async (updatedEvent) => {
    try {
      await axios.put(`http://localhost:8080/api/events/${updatedEvent._id}`, updatedEvent);
      fetchEvents();
      setShowEditEvent(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const viewRegistrations = (event) => {
    setSelectedEvent(event);
    setShowRegistrations(true);
  };

  const editEvent = (event) => {
    setSelectedEvent(event);
    setShowEditEvent(true);
  };

  return (
    <div className="p-6 bg-[#0f1218] min-h-screen text-gray-200">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Admin Events</h2>
        <button
          onClick={() => setShowAddEvent(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <Plus size={20} /> Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-[#1a1f2c] p-6 rounded-lg">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{event.title}</h3>
              <div className="flex space-x-2">
                <button onClick={() => editEvent(event)} className="text-blue-400 hover:text-blue-600">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDeleteEvent(event._id)} className="text-red-400 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <p className="mt-2 text-gray-400">{event.description}</p>
            <div className="mt-3 space-y-1">
              <p className="text-sm"><span className="text-gray-400">Mentor:</span> {event.mentor}</p>
              <p className="text-sm"><span className="text-gray-400">Time:</span> {event.time}</p>
              <p className="text-sm"><span className="text-gray-400">Date:</span> {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-sm"><span className="text-gray-400">Venue:</span> {event.venue}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium">
                <span className="text-gray-400">Registered:</span> {(event.registeredStudents || []).length}
              </p>
              <button
                onClick={() => viewRegistrations(event)}
                className="flex items-center gap-1 text-purple-400 hover:text-purple-300"
              >
                <Users size={16} /> View
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddEvent && (
        <EventFormModal 
          onClose={() => setShowAddEvent(false)} 
          onSubmit={handleAddEvent} 
          title="Add New Event"
          buttonText="Add Event"
        />
      )}

      {showEditEvent && (
        <EventFormModal 
          onClose={() => setShowEditEvent(false)} 
          onSubmit={handleEditEvent} 
          title="Edit Event"
          buttonText="Update Event"
          eventData={selectedEvent}
        />
      )}

      {showRegistrations && (
        <RegistrationsModal 
          eventId={selectedEvent._id} 
          eventTitle={selectedEvent.title}
          onClose={() => setShowRegistrations(false)}
        />
      )}
    </div>
  );
};

const EventFormModal = ({ onClose, onSubmit, title, buttonText, eventData = null }) => {
  const [formData, setFormData] = useState(
    eventData || {
      title: '', 
      description: '', 
      mentor: '',
      time: '', 
      date: '', 
      venue: '', 
      registeredStudents: []
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#1a1f2c] p-6 rounded-lg w-full max-w-md text-gray-200">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <div className="space-y-4">
          {[
            { name: 'title', label: 'Event Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'mentor', label: 'Mentor', type: 'text' },
            { name: 'time', label: 'Time', type: 'time' },
            { name: 'date', label: 'Date', type: 'date' },
            { name: 'venue', label: 'Venue', type: 'text' }
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-2">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  className="w-full bg-[#0f1218] p-2 rounded resize-none h-24"
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  className="w-full bg-[#0f1218] p-2 rounded"
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-200 px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

const RegistrationsModal = ({ eventId, eventTitle, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState([]);
  const [eventDetails, setEventDetails] = useState({});

  useEffect(() => {
    fetchRegistrations();
  }, [eventId]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8080/api/events/${eventId}/registrations`, {
        withCredentials: true, // Ensure cookies are sent for authentication
      });
      setRegistrations(res.data.students || []);
      setEventDetails(res.data.event || {});
      setLoading(false);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setLoading(false);
    }
  };
  
  

  const handleUnregister = async (studentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/events/${eventId}/registrations/${studentId}`);
      fetchRegistrations();
    } catch (error) {
      console.error('Error unregistering student:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#1a1f2c] p-6 rounded-lg w-full max-w-3xl text-gray-200 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Registrations: {eventTitle}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            ✕
          </button>
        </div>
        
        <div className="mb-4 bg-[#0f1218] p-3 rounded">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="text-gray-400">Date:</span> {new Date(eventDetails.date).toLocaleDateString() || 'N/A'}</div>
            <div><span className="text-gray-400">Time:</span> {eventDetails.time || 'N/A'}</div>
            <div><span className="text-gray-400">Venue:</span> {eventDetails.venue || 'N/A'}</div>
            <div><span className="text-gray-400">Mentor:</span> {eventDetails.mentor || 'N/A'}</div>
            <div><span className="text-gray-400">Registered:</span> {registrations.length} students</div>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : registrations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0f1218]">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Registration No.</th>
                  <th className="p-3 text-left">Department</th>
                  <th className="p-3 text-left">Batch</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((student) => (
                  <tr key={student._id} className="border-b border-gray-800">
                    <td className="p-3">{student.name || 'N/A'}</td>
                    <td className="p-3">{student.registrationNumber || 'N/A'}</td>
                    <td className="p-3">{student.branch || 'N/A'}</td>
                    <td className="p-3">{student.batch || 'N/A'}</td>
                    <td className="p-3">{student.email || 'N/A'}</td>
                    <td className="p-3">{student.phoneNumber || '-'}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleUnregister(student._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Unregister
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            No students registered for this event yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;