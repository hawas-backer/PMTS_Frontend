import React from 'react';
import PropTypes from 'prop-types';

const Notifications = ({ notifications = [], markAsRead, clearAllNotifications }) => {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-300 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-lg font-semibold mb-4">Notifications</h1>
        {notifications.length > 0 && (
          <button
            onClick={clearAllNotifications}
            className="text-red-500 hover:text-red-400 text-sm mb-4"
          >
            Clear
          </button>
        )}
        <ul className="space-y-2">
          {notifications.length === 0 ? (
            <p className="text-xs text-gray-500">None</p>
          ) : (
            notifications.map((n) => (
              <li
                key={n.id}
                className={`p-3 rounded ${n.read ? 'bg-gray-800' : 'bg-gray-700'} hover:bg-gray-600 transition flex justify-between items-center`}
              >
                <div>
                  <h3 className="text-sm font-semibold">{n.type}</h3>
                  <p className="text-xs">{n.message}</p>
                  <p className="text-xs text-gray-500">{n.timestamp}</p>
                </div>
                {!n.read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="text-blue-500 hover:text-blue-400 text-xs"
                  >
                    Read
                  </button>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      read: PropTypes.bool.isRequired,
    })
  ),
  markAsRead: PropTypes.func.isRequired,
  clearAllNotifications: PropTypes.func.isRequired,
};

export default Notifications;