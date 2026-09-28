import React from 'react';
import { Bell, Check, Clock, Calendar, MapPin, AlertCircle, Megaphone } from 'lucide-react';
import { useAppData } from '../../contexts/AppDataContext';

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppData();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markRead = (id: string) => {
    markNotificationRead(id);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'attendance': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'leave': return <Calendar className="w-4 h-4 text-green-500" />;
      case 'shift': return <MapPin className="w-4 h-4 text-purple-500" />;
      case 'correction': return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'holiday': return <Calendar className="w-4 h-4 text-red-500" />;
      case 'announcement': return <Megaphone className="w-4 h-4 text-indigo-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'attendance': return 'bg-blue-100 dark:bg-blue-900/30';
      case 'leave': return 'bg-green-100 dark:bg-green-900/30';
      case 'shift': return 'bg-purple-100 dark:bg-purple-900/30';
      case 'correction': return 'bg-amber-100 dark:bg-amber-900/30';
      case 'holiday': return 'bg-red-100 dark:bg-red-900/30';
      case 'announcement': return 'bg-indigo-100 dark:bg-indigo-900/30';
      default: return 'bg-gray-100 dark:bg-gray-700';
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="text-xs text-primary-500 font-medium px-3 py-1.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map(notif => (
          <button
            key={notif.id}
            onClick={() => markRead(notif.id)}
            className={`w-full text-left p-4 rounded-xl border transition-colors ${
              notif.isRead
                ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                : 'bg-primary-50/50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800'
            }`}
          >
            <div className="flex gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${getBgColor(notif.type)}`}>
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm ${notif.isRead ? 'text-gray-700 dark:text-gray-300' : 'font-semibold text-gray-900 dark:text-white'}`}>
                    {notif.title}
                  </p>
                  {!notif.isRead && (
                    <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                  {notif.message}
                </p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5">
                  {new Date(notif.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
