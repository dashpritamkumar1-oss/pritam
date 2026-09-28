import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const weekSchedule = [
  { day: 'Monday', isOff: false, shift: 'Shift A', time: '07:00 - 15:00' },
  { day: 'Tuesday', isOff: false, shift: 'Shift A', time: '07:00 - 15:00' },
  { day: 'Wednesday', isOff: false, shift: 'Shift A', time: '07:00 - 15:00' },
  { day: 'Thursday', isOff: false, shift: 'Shift A', time: '07:00 - 15:00' },
  { day: 'Friday', isOff: false, shift: 'Shift A', time: '07:00 - 15:00' },
  { day: 'Saturday', isOff: false, shift: 'Shift A', time: '07:00 - 15:00' },
  { day: 'Sunday', isOff: true, shift: 'Week Off', time: '' },
];

const upcomingWeekOffs = [
  { date: '2026-09-28', day: 'Sunday' },
  { date: '2026-10-05', day: 'Sunday' },
  { date: '2026-10-12', day: 'Sunday (Dussehra Holiday)' },
  { date: '2026-10-19', day: 'Sunday' },
  { date: '2026-10-26', day: 'Sunday' },
];

export default function EmployeeWeekOff() {
  const today = new Date();
  const todayDay = today.getDay(); // 0=Sunday

  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Week-Off Schedule</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Your weekly off pattern</p>
      </div>

      {/* Today's Status */}
      <div className={`rounded-2xl p-5 border ${
        todayDay === 0 
          ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
          : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      }`}>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Today</p>
        <h2 className={`text-lg font-bold ${todayDay === 0 ? 'text-amber-700 dark:text-amber-400' : 'text-green-700 dark:text-green-400'}`}>
          {todayDay === 0 ? '😴 Week Off — Sunday' : '🏢 Working Day — ' + weekSchedule[todayDay === 0 ? 6 : todayDay - 1]?.day}
        </h2>
        {todayDay !== 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Shift A • 07:00 AM - 03:00 PM
          </p>
        )}
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Weekly Schedule</h3>
        <div className="space-y-2">
          {weekSchedule.map((item, i) => (
            <div key={i} className={`flex items-center justify-between py-2.5 px-3 rounded-lg ${
              i === (todayDay === 0 ? 6 : todayDay - 1) ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800' : ''
            }`}>
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  item.isOff ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {item.day.slice(0, 2)}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{item.day}</span>
              </div>
              <div className="text-right">
                {item.isOff ? (
                  <span className="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full font-medium">Week Off</span>
                ) : (
                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.time}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Week Offs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Upcoming Week-Offs</h3>
        <div className="space-y-2">
          {upcomingWeekOffs.map((off, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <Calendar className="w-4 h-4 text-amber-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">
                  {new Date(off.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{off.day}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
