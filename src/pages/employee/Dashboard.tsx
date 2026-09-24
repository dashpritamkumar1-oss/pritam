import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, AlertCircle, Calendar, TrendingUp, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { employees, shifts, leaveBalances, holidays, todayAttendance } from '../../data/mockData';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const employee = employees.find(e => e.employeeId === user?.employeeId);
  const [attendanceMarked, setAttendanceMarked] = useState(() => {
    const att = todayAttendance.find(a => a.employeeId === user?.employeeId);
    return att?.status === 'present';
  });
  const [isMarking, setIsMarking] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMarkAttendance = async () => {
    setIsMarking(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setAttendanceMarked(true);
    setIsMarking(false);
  };

  const shift = shifts.find(s => s.name === employee?.shift);
  const upcomingHoliday = holidays[0];
  const recentAttendance = ['present', 'present', 'leave', 'present', 'present', 'week_off', 'present'];

  return (
    <div className="p-4 space-y-4">
      {/* Greeting */}
      <div className="pt-2">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Good {currentTime.getHours() < 12 ? 'morning' : currentTime.getHours() < 17 ? 'afternoon' : 'evening'}, {employee?.firstName} 👋
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          {employee?.employeeId} • {employee?.designation}
        </p>
      </div>

      {/* Main Attendance Card */}
      <div className={`rounded-2xl p-5 shadow-sm border ${
        attendanceMarked 
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800' 
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Today's Attendance
          </h2>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {currentTime.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
          </span>
        </div>

        {attendanceMarked ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-lg font-bold text-green-700 dark:text-green-400">Present</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">Check-in</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                </p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Verified
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">Current Shift</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{employee?.shift || 'General'}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">Current Time</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                </p>
              </div>
            </div>

            {shift && (
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Shift: {shift.startTime} - {shift.endTime}</span>
              </div>
            )}

            <button
              onClick={handleMarkAttendance}
              disabled={isMarking}
              className="w-full py-4 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 text-base shadow-lg shadow-primary-500/25 touch-target"
            >
              {isMarking ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying Location...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Mark Attendance
                </span>
              )}
            </button>

            <p className="text-xs text-center text-gray-400 dark:text-gray-500">
              GPS location will be captured for verification
            </p>
          </div>
        )}
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Leave Balance */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Leave Balance</h3>
          </div>
          <div className="space-y-2">
            {leaveBalances.slice(0, 3).map(lb => (
              <div key={lb.leaveTypeId} className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400">{lb.leaveTypeName}</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{lb.remainingDays} days</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Upcoming</h3>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Week-Off</p>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">Sunday, 28 Sep</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Holiday</p>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">{upcomingHoliday?.name}</p>
              <p className="text-[10px] text-gray-400">{upcomingHoliday?.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Attendance */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">This Week</h3>
          <button className="text-xs text-primary-500 font-medium flex items-center gap-0.5">
            View All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-2">
          {recentAttendance.map((status, i) => (
            <div key={i} className="flex-1 text-center">
              <div className={`w-full aspect-square rounded-xl flex items-center justify-center text-lg mb-1 ${
                status === 'present' ? 'bg-green-100 dark:bg-green-900/30' :
                status === 'leave' ? 'bg-amber-100 dark:bg-amber-900/30' :
                status === 'week_off' ? 'bg-gray-100 dark:bg-gray-700' :
                'bg-red-100 dark:bg-red-900/30'
              }`}>
                {status === 'present' ? '✅' : status === 'leave' ? '🏖️' : status === 'week_off' ? '😴' : '❌'}
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-4 text-white shadow-lg">
        <h3 className="text-sm font-semibold mb-3 opacity-90">September Summary</h3>
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center">
            <p className="text-xl font-bold">18</p>
            <p className="text-[10px] opacity-75">Present</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">2</p>
            <p className="text-[10px] opacity-75">Leave</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">3</p>
            <p className="text-[10px] opacity-75">Week Off</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">0</p>
            <p className="text-[10px] opacity-75">Late</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <button className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-2 active:scale-95 transition-transform touch-target">
          <span className="text-2xl">📝</span>
          <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300">Apply Leave</span>
        </button>
        <button className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-2 active:scale-95 transition-transform touch-target">
          <span className="text-2xl">📋</span>
          <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300">My Attendance</span>
        </button>
        <button className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-2 active:scale-95 transition-transform touch-target">
          <span className="text-2xl">✏️</span>
          <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300">Correction</span>
        </button>
      </div>
    </div>
  );
}
