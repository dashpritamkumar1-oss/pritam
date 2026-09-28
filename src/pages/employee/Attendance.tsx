import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Filter, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { employees } from '../../data/mockData';

const attendanceHistory = [
  { date: '24 Sep', day: 'Today', shift: 'Shift A', status: 'present', checkIn: '07:05', checkOut: '15:10', hours: '8h 05m', location: true, late: false },
  { date: '23 Sep', day: 'Yesterday', shift: 'Shift A', status: 'present', checkIn: '07:02', checkOut: '15:08', hours: '8h 06m', location: true, late: false },
  { date: '22 Sep', day: 'Monday', shift: 'Shift A', status: 'present', checkIn: '07:18', checkOut: '15:15', hours: '7h 57m', location: true, late: true },
  { date: '21 Sep', day: 'Sunday', shift: 'Shift A', status: 'week_off', checkIn: '', checkOut: '', hours: '', location: false, late: false },
  { date: '20 Sep', day: 'Saturday', shift: 'Shift A', status: 'present', checkIn: '07:00', checkOut: '15:05', hours: '8h 05m', location: true, late: false },
  { date: '19 Sep', day: 'Friday', shift: 'Shift A', status: 'leave', checkIn: '', checkOut: '', hours: '', location: false, late: false },
  { date: '18 Sep', day: 'Thursday', shift: 'Shift A', status: 'missing', checkIn: '', checkOut: '', hours: '', location: false, late: false },
  { date: '17 Sep', day: 'Wednesday', shift: 'Shift A', status: 'present', checkIn: '07:10', checkOut: '15:12', hours: '8h 02m', location: true, late: false },
];

export default function AttendancePage() {
  const { user } = useAuth();
  const employee = employees.find(e => e.employeeId === user?.employeeId);
  const [filter, setFilter] = useState('this_week');

  const summary = {
    present: attendanceHistory.filter(a => a.status === 'present').length,
    leave: attendanceHistory.filter(a => a.status === 'leave').length,
    weekOff: attendanceHistory.filter(a => a.status === 'week_off').length,
    absent: attendanceHistory.filter(a => a.status === 'absent').length,
    missing: attendanceHistory.filter(a => a.status === 'missing').length,
    late: attendanceHistory.filter(a => a.late).length,
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">My Attendance</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">View your attendance records</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-green-700 dark:text-green-400">{summary.present}</p>
          <p className="text-[10px] text-green-600 dark:text-green-500">Present</p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-amber-700 dark:text-amber-400">{summary.leave}</p>
          <p className="text-[10px] text-amber-600 dark:text-amber-500">Leave</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-red-700 dark:text-red-400">{summary.missing}</p>
          <p className="text-[10px] text-red-600 dark:text-red-500">Missing</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['today', 'this_week', 'this_month', 'custom'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              filter === f 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            {f === 'today' ? 'Today' : f === 'this_week' ? 'This Week' : f === 'this_month' ? 'This Month' : 'Custom'}
          </button>
        ))}
      </div>

      {/* Attendance List */}
      <div className="space-y-3">
        {attendanceHistory.map((att, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{att.date}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{att.day} • {att.shift}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                att.status === 'present' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                att.status === 'leave' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                att.status === 'week_off' ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400' :
                att.status === 'missing' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {att.status === 'present' ? 'Present' : att.status === 'leave' ? 'Leave' : att.status === 'week_off' ? 'Week Off' : att.status === 'missing' ? 'Missing' : 'Absent'}
              </span>
            </div>
            
            {att.status === 'present' && (
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{att.checkIn}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{att.checkOut}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className={`w-3 h-3 ${att.location ? 'text-green-500' : 'text-gray-400'}`} />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{att.location ? 'Verified' : 'N/A'}</span>
                </div>
              </div>
            )}

            {att.late && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Late arrival (18 min)
              </p>
            )}

            {att.status === 'missing' && (
              <button className="mt-2 text-xs text-primary-500 font-medium">
                Request Correction →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
