import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Notifications = () => {
  const { user, notifications, setNotifications } = useAuth();
  const navigate = useNavigate();

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.post(
        'http://localhost:8080/notifications/mark-read',
        { notificationId },
        { withCredentials: true }
      );
      setNotifications(notifications.map(n =>
        n._id === notificationId ? { ...n, read: true } : n
      ));
      console.log('[NOTIFICATIONS] Marked as read:', notificationId);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleClear = async (notificationId) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/notifications/clear',
        { notificationId },
        { withCredentials: true }
      );
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
    <div className="p-6 bg-[#1a1f2c] text-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className={`p-4 rounded-lg cursor-pointer ${
                notification.read ? 'bg-gray-700' : 'bg-gray-600'
              }`}
              onClick={() => handleClick(notification)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear(notification._id);
                  }}
                  className="text-red-400 hover:text-red-300"
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