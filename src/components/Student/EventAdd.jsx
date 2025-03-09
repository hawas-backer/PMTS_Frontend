import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, MapPin, User, UserCheck, Info } from 'lucide-react';

const EventAdd = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState({});
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get('http://localhost:8080/auth/me', {
          withCredentials: true,
        });
  
        if (res.data && res.data.user) {
          console.log('Fetched current user:', res.data.user);
          setCurrentUser(res.data.user);
        } else {
          console.error('No user data returned from API:', res.data);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };
  
    fetchCurrentUser();
  }, []);
  

  useEffect(() => {
    if (currentUser) {
      fetchEvents();
    }
  }, [currentUser]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/api/events', {
        withCredentials: true, // Ensure cookies are sent
      });
      const eventsWithSafeData = res.data.map((event) => ({
        ...event,
        registeredStudents: event.registeredStudents || [],
      }));
      setEvents(eventsWithSafeData);

      const status = {};
      eventsWithSafeData.forEach((event) => {
        status[event._id] = event.registeredStudents.some(
          (studentId) => studentId.toString() === currentUser._id.toString()
        );
      });
      setRegistrationStatus(status);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    if (!currentUser || !currentUser._id) {
      console.error('No current user or user ID available', currentUser);
      return;
    }
  
    if (registrationStatus[eventId]) return;
  
    try {
      setLoading(true);
      console.log('Sending registration request with studentId:', currentUser._id);
      
      const res = await axios.put(
        `http://localhost:8080/api/events/register/${eventId}`,
        { studentId: currentUser._id },
        { withCredentials: true }
      );
  
      setRegistrationStatus((prev) => ({
        ...prev,
        [eventId]: true,
      }));
  
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId
            ? { ...event, registeredStudents: res.data.event.registeredStudents }
            : event
        )
      );
  
      setLoading(false);
    } catch (error) {
      console.error('Error registering for event:', error.response?.data?.message || error.message);
      setLoading(false);
    }
  };
  
  const viewEventDetails = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const isRegistered = (event) => registrationStatus[event._id] || false;

  if (loading && events.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] p-6 text-gray-200 flex items-center justify-center">
        <div className="text-xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] p-6 text-gray-200">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>

      {events.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-xl">No upcoming events available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-purple-500" />
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                  </div>
                  <button
                    onClick={() => viewEventDetails(event)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Info size={18} />
                  </button>
                </div>

                <p className="text-gray-400 text-sm mb-6 line-clamp-2">{event.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>Mentor: {event.mentor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm">
                    <UserCheck className="w-4 h-4 text-purple-400" />
                    <span>{event.registeredStudents.length} registered</span>
                  </div>

                  <button
                    onClick={() => handleRegister(event._id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isRegistered(event)
                        ? 'bg-purple-900 text-purple-200 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-500 text-white'
                    }`}
                    disabled={isRegistered(event)}
                  >
                    {isRegistered(event) ? 'Registered' : 'Register'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showEventDetails && selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isRegistered={isRegistered(selectedEvent)}
          onRegister={() => handleRegister(selectedEvent._id)}
          onClose={() => setShowEventDetails(false)}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

const EventDetailsModal = ({ event, isRegistered, onRegister, onClose, currentUser }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#1a1f2c] p-6 rounded-lg w-full max-w-lg text-gray-200 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">{event.title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            ✕
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-[#0f1218] p-4 rounded">
            <h4 className="text-sm text-gray-400 mb-2">Description</h4>
            <p>{event.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0f1218] p-4 rounded">
              <h4 className="text-sm text-gray-400 mb-2">Mentor</h4>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-purple-500" />
                <span>{event.mentor}</span>
              </div>
            </div>

            <div className="bg-[#0f1218] p-4 rounded">
              <h4 className="text-sm text-gray-400 mb-2">Time</h4>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-500" />
                <span>{event.time}</span>
              </div>
            </div>

            <div className="bg-[#0f1218] p-4 rounded">
              <h4 className="text-sm text-gray-400 mb-2">Date</h4>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="bg-[#0f1218] p-4 rounded">
              <h4 className="text-sm text-gray-400 mb-2">Venue</h4>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-500" />
                <span>{event.venue}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0f1218] p-4 rounded">
            <h4 className="text-sm text-gray-400 mb-2">Registered Students</h4>
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-purple-500" />
              <span>{event.registeredStudents.length} students registered</span>
            </div>
          </div>

          {isRegistered && currentUser && (
            <div className="bg-[#0f1218] p-4 rounded">
              <h4 className="text-sm text-gray-400 mb-2">Your Registration Details</h4>
              <div className="space-y-2">
                <p><span className="text-gray-400">Name:</span> {currentUser.name}</p>
                <p><span className="text-gray-400">Email:</span> {currentUser.email}</p>
                <p><span className="text-gray-400">Registration Number:</span> {currentUser.registrationNumber}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onRegister}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isRegistered
                ? 'bg-purple-900 text-purple-200 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-500 text-white'
            }`}
            disabled={isRegistered}
          >
            {isRegistered ? 'Already Registered' : 'Register for Event'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventAdd;