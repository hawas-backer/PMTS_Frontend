import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
const Notifications = ({ notifications, markAsRead, clearAllNotifications }) => {
  return (
    <div className="max-w-4xl mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-md ">
      <h1 className="text-3xl font-bold mb-8 text-center">Notifications and Alerts</h1>
      <div className="mb-4 flex justify-end">
        <button
          onClick={clearAllNotifications}
          className="bg-red-500 text-white p-2 rounded"
        >
          Clear All Notifications
        </button>
      </div>
      {notifications && notifications.length === 0 ? (
        <p className="text-center text-gray-400">No notifications yet</p>
      ) : notifications && notifications.length > 0 ? (
        <ul className="space-y-4" aria-label="Notifications list">
          {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`p-4 border border-gray-300 rounded-lg shadow-sm ${
              notification.read ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{notification.type}</h3>
                <p className="text-gray-600">{notification.message}</p>
                <p className="text-gray-500 text-sm">{notification.timestamp}</p>
              </div>
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Mark as Read
                </button>
              )}
            </div>
          </li>
        ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">Loading notifications...</p>
      )}
    </div>
  );
};

// ... (PropTypes remain the same)

export default Notifications;