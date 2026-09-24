import React, { useState } from 'react';
import { Search, Filter, Download, MapPin, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { todayAttendance, employees, departments, shifts } from '../../data/mockData';

export default function AdminAttendance() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('');

  const enrichedAttendance = todayAttendance.map(att => {
    const emp = employees.find(e => e.employeeId === att.employeeId);
    return { ...att, employee: emp };
  });

  const filtered = enrichedAttendance.filter(att => {
    const matchesSearch = search === '' || 
      att.employee?.firstName.toLowerCase().includes(search.toLowerCase()) ||
      att.employee?.lastName.toLowerCase().includes(search.toLowerCase()) ||
      att.employeeId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === '' || att.status === statusFilter;
    const matchesDept = deptFilter === '' || att.employee?.department === deptFilter;
    return matchesSearch && matchesStatus && matchesDept;
  });

  const summary = {
    present: todayAttendance.filter(a => a.status === 'present').length,
    absent: todayAttendance.filter(a => a.status === 'absent').length,
    leave: todayAttendance.filter(a => a.status === 'leave').length,
    missing: todayAttendance.filter(a => a.status === 'missing').length,
    late: todayAttendance.filter(a => a.isLate).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Live Attendance</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Today's attendance overview • 24 September 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-green-700 dark:text-green-400">{summary.present}</p>
          <p className="text-xs text-green-600 dark:text-green-500">Present</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-red-700 dark:text-red-400">{summary.absent}</p>
          <p className="text-xs text-red-600 dark:text-red-500">Absent</p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-amber-700 dark:text-amber-400">{summary.leave}</p>
          <p className="text-xs text-amber-600 dark:text-amber-500">On Leave</p>
        </div>
        <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-rose-700 dark:text-rose-400">{summary.missing}</p>
          <p className="text-xs text-rose-600 dark:text-rose-500">Missing</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-orange-700 dark:text-orange-400">{summary.late}</p>
          <p className="text-xs text-orange-600 dark:text-orange-500">Late</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search employee name or ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
          <option value="">All Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="leave">Leave</option>
          <option value="missing">Missing</option>
        </select>
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
          <option value="">All Departments</option>
          {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Department</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Shift</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Check-In</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Check-Out</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filtered.map(att => (
                <tr key={att.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">{att.employee?.firstName[0]}{att.employee?.lastName[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{att.employee?.firstName} {att.employee?.lastName}</p>
                        <p className="text-xs text-gray-500">{att.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{att.employee?.department}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">{att.shift}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{att.checkIn || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{att.checkOut || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${
                      att.status === 'present' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      att.status === 'leave' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                      att.status === 'missing' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-600'
                    }`}>
                      {att.status === 'present' && <CheckCircle className="w-3 h-3" />}
                      {att.status === 'missing' && <AlertTriangle className="w-3 h-3" />}
                      {att.status.charAt(0).toUpperCase() + att.status.slice(1)}
                      {att.isLate && <span className="text-orange-500 ml-1">(Late)</span>}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {att.location?.verified ? (
                      <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                        <MapPin className="w-3 h-3" /> Verified
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{att.remarks || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
