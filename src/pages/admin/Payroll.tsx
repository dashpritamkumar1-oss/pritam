import React, { useState } from 'react';
import { DollarSign, Download, Lock, Unlock, FileText, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import { departments } from '../../data/mockData';

const payrollMonths = [
  { month: 'September 2026', status: 'processing', workingDays: 26, totalEmployees: 486, present: 11200, leave: 120, lop: 15, late: 45, overtime: 320 },
  { month: 'August 2026', status: 'finalized', workingDays: 27, totalEmployees: 480, present: 11500, leave: 95, lop: 8, late: 38, overtime: 280 },
  { month: 'July 2026', status: 'finalized', workingDays: 26, totalEmployees: 478, present: 11100, leave: 110, lop: 12, late: 42, overtime: 310 },
  { month: 'June 2026', status: 'finalized', workingDays: 25, totalEmployees: 475, present: 10800, leave: 100, lop: 10, late: 35, overtime: 250 },
];

export default function AdminPayroll() {
  const toast = useToast();
  const [selectedMonth, setSelectedMonth] = useState(0);
  const current = payrollMonths[selectedMonth];

  const handleFinalize = () => {
    toast.success('Payroll Finalized', `${current.month} payroll has been finalized and locked.`);
  };

  const handleExport = () => {
    toast.info('Export Started', `Generating payroll report for ${current.month}...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Payroll</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Payroll-ready attendance inputs and monthly finalization.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExport} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export
          </button>
          {current.status === 'processing' && (
            <button onClick={handleFinalize} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600">
              <Lock className="w-4 h-4" /> Finalize
            </button>
          )}
        </div>
      </div>

      {/* Month Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {payrollMonths.map((m, i) => (
          <button
            key={i}
            onClick={() => setSelectedMonth(i)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedMonth === i ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {m.month}
            {m.status === 'finalized' && ' ✓'}
          </button>
        ))}
      </div>

      {/* Current Month Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{current.month}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Working Days: {current.workingDays} | Employees: {current.totalEmployees}</p>
          </div>
          <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
            current.status === 'finalized' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
          }`}>
            {current.status === 'finalized' ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
            {current.status === 'finalized' ? 'Finalized' : 'Processing'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-green-700 dark:text-green-400">{current.present.toLocaleString()}</p>
            <p className="text-[10px] text-green-600 dark:text-green-500">Present Days</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-amber-700 dark:text-amber-400">{current.leave}</p>
            <p className="text-[10px] text-amber-600 dark:text-amber-500">Leave Days</p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-red-700 dark:text-red-400">{current.lop}</p>
            <p className="text-[10px] text-red-600 dark:text-red-500">LOP Days</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-orange-700 dark:text-orange-400">{current.late}</p>
            <p className="text-[10px] text-orange-600 dark:text-orange-500">Late Arrivals</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-blue-700 dark:text-blue-400">{current.overtime}</p>
            <p className="text-[10px] text-blue-600 dark:text-blue-500">OT Hours</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-gray-700 dark:text-gray-300">{current.workingDays}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Working Days</p>
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Department-wise Payroll Input</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Employees</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Present</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Leave</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">LOP</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Late</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">OT Hours</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Paid Days</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {departments.map((dept, i) => {
                const empCount = dept.employeeCount;
                const present = Math.round(empCount * 0.92);
                const leave = Math.round(empCount * 0.05);
                const lop = Math.round(empCount * 0.02);
                const late = Math.round(empCount * 0.04);
                const ot = Math.round(empCount * 0.5);
                return (
                  <tr key={dept.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{dept.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{empCount}</td>
                    <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">{present}</td>
                    <td className="px-4 py-3 text-sm text-amber-600 dark:text-amber-400">{leave}</td>
                    <td className="px-4 py-3 text-sm text-red-600 dark:text-red-400">{lop}</td>
                    <td className="px-4 py-3 text-sm text-orange-600 dark:text-orange-400">{late}</td>
                    <td className="px-4 py-3 text-sm text-blue-600 dark:text-blue-400">{ot}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{present + leave}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
