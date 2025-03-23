import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const Notifications = () => {
  const { user, notifications, setNotifications } = useAuth();
  const navigate = useNavigate();

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.post(`${API_BASE_URL}/notifications/mark-read`, { notificationId }, { withCredentials: true });
      setNotifications(notifications.map(n => n._id === notificationId ? { ...n, read: true } : n));
      console.log('[NOTIFICATIONS] Marked as read:', notificationId);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleClear = async (notificationId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/notifications/clear`, { notificationId }, { withCredentials: true });
      setNotifications(response.data.notifications);
      console.log('[NOTIFICATIONS] Cleared:', notificationId);
    } catch (error) {
      console.error('Error clearing notification:', error);
    }
  };

  const handleClick = (notification) => {
    if (!notification.read) handleMarkAsRead(notification._id);
    if (notification.link) navigate(notification.link);
  };

  return (
    <div className="p-4 sm:p-6 bg-primary-bg text-text-primary min-h-screen font-sans">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 animate-fade-in">Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-text-secondary text-center py-12">No notifications available.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className={`p-4 rounded-xl cursor-pointer shadow-glass transition-all duration-300 ${
                notification.read ? 'bg-secondary-bg' : 'bg-highlight/20 hover:bg-highlight/30'
              }`}
              onClick={() => handleClick(notification)}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-text-secondary mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear(notification._id);
                  }}
                  className="text-error hover:text-error/80 transition-all duration-300"
                >
                  Clear
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;