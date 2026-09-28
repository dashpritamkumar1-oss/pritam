import React from 'react';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { useAppData } from '../../contexts/AppDataContext';

export default function EmployeeHolidays() {
  const { holidays } = useAppData();
  const today = new Date();

  const upcoming = holidays
    .filter(h => new Date(h.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = holidays
    .filter(h => new Date(h.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'national': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'company': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'optional': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
      case 'regional': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Holiday Calendar</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Upcoming holidays and events</p>
      </div>

      {/* Next Holiday Highlight */}
      {upcoming.length > 0 && (
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-5 text-white shadow-lg">
          <p className="text-xs uppercase tracking-wide opacity-80 mb-1">Next Holiday</p>
          <h2 className="text-xl font-bold">{upcoming[0].name}</h2>
          <p className="text-sm opacity-90 mt-1">
            {new Date(upcoming[0].date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
              {upcoming[0].type.charAt(0).toUpperCase() + upcoming[0].type.slice(1)}
            </span>
            <span className="text-xs opacity-80">
              {Math.ceil((new Date(upcoming[0].date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))} days away
            </span>
          </div>
        </div>
      )}

      {/* Upcoming */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Upcoming Holidays</h3>
        <div className="space-y-2">
          {upcoming.map(h => (
            <div key={h.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                  {new Date(h.date).toLocaleDateString('en-US', { month: 'short' })}
                </span>
                <span className="text-lg font-bold text-primary-700 dark:text-primary-300 leading-none">
                  {new Date(h.date).getDate()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{h.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(h.date).toLocaleDateString('en-IN', { weekday: 'long' })}
                </p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getTypeColor(h.type)}`}>
                {h.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Past */}
      {past.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Past Holidays</h3>
          <div className="space-y-2">
            {past.map(h => (
              <div key={h.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-100 dark:border-gray-700/50 flex items-center gap-3 opacity-60">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-gray-500">
                    {new Date(h.date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                  <span className="text-sm font-bold text-gray-600 leading-none">
                    {new Date(h.date).getDate()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{h.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
