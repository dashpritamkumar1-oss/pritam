import React, { useState } from 'react';
import { BarChart3, Users, AlertTriangle, TrendingDown, Filter } from 'lucide-react';
import { manpowerData, departments, shifts } from '../../data/mockData';

export default function AdminManpower() {
  const [deptFilter, setDeptFilter] = useState('');
  const [shiftFilter, setShiftFilter] = useState('');

  const filtered = manpowerData.filter(m => {
    const matchDept = deptFilter === '' || m.department === deptFilter;
    const matchShift = shiftFilter === '' || m.shift === shiftFilter;
    return matchDept && matchShift;
  });

  const totalRequired = filtered.reduce((s, m) => s + m.required, 0);
  const totalPresent = filtered.reduce((s, m) => s + m.present, 0);
  const totalShortage = filtered.reduce((s, m) => s + m.shortage, 0);
  const avgCoverage = filtered.length > 0 ? Math.round(filtered.reduce((s, m) => s + m.coverage, 0) / filtered.length) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Manpower Planning</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Department and shift-wise manpower analysis.</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Required</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalRequired}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Present</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{totalPresent}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Shortage</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{totalShortage}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Coverage</p>
          <p className={`text-2xl font-bold ${avgCoverage >= 95 ? 'text-green-600' : avgCoverage >= 85 ? 'text-amber-600' : 'text-red-600'}`}>{avgCoverage}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
          <option value="">All Departments</option>
          {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
        </select>
        <select value={shiftFilter} onChange={e => setShiftFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
          <option value="">All Shifts</option>
          {shifts.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
        </select>
      </div>

      {/* Manpower Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{item.department}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.shift}</p>
              </div>
              <span className={`text-lg font-bold ${
                item.coverage >= 95 ? 'text-green-600 dark:text-green-400' :
                item.coverage >= 85 ? 'text-amber-600 dark:text-amber-400' :
                'text-red-600 dark:text-red-400'
              }`}>{item.coverage}%</span>
            </div>
            
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mb-4">
              <div className={`h-2 rounded-full transition-all ${
                item.coverage >= 95 ? 'bg-green-500' : item.coverage >= 85 ? 'bg-amber-500' : 'bg-red-500'
              }`} style={{ width: `${item.coverage}%` }} />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Required</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{item.required}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Present</p>
                <p className="text-sm font-bold text-green-600 dark:text-green-400">{item.present}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">On Leave</p>
                <p className="text-sm font-bold text-amber-600 dark:text-amber-400">{item.leave}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Week Off</p>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-400">{item.weekOff}</p>
              </div>
            </div>

            {item.shortage > 0 && (
              <div className="mt-3 flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-xs text-red-600 dark:text-red-400 font-medium">Shortage: {item.shortage} employees needed</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
