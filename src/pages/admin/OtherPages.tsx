import React, { useState } from 'react';
import { Plus, Clock, Edit, Trash2, Sun, Moon, Settings as SettingsIcon, Download, FileText, BarChart3, Calendar, Users, CheckSquare, AlertTriangle, Search } from 'lucide-react';
import { useAppData } from '../../contexts/AppDataContext';
import { useToast } from '../../contexts/ToastContext';
import { shifts, holidays, auditLogs, departments } from '../../data/mockData';

// =================== SHIFTS PAGE ===================
export function ShiftsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Shift Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Configure and manage work shifts.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600">
          <Plus className="w-4 h-4" /> Create Shift
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shifts.map(shift => (
          <div key={shift.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${shift.isNightShift ? 'bg-indigo-100 dark:bg-indigo-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                  {shift.isNightShift ? <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> : <Sun className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{shift.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{shift.isNightShift ? 'Night Shift' : 'Day Shift'}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"><Edit className="w-4 h-4" /></button>
                <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Start Time</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{shift.startTime}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
                <p className="text-[10px] text-gray-500 dark:text-gray-400">End Time</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{shift.endTime}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Grace Period</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{shift.gracePeriod} min</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Break</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{shift.breakMinutes} min</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Min: {shift.minHours}h</span>
              <span>•</span>
              <span>OT: {shift.overtimeRule}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== REPORTS PAGE ===================
export function ReportsPage() {
  const reports = [
    { name: 'Daily Attendance Report', description: 'Day-wise attendance for all employees', icon: Calendar, category: 'Attendance' },
    { name: 'Monthly Attendance Sheet', description: 'Complete monthly attendance register', icon: FileText, category: 'Attendance' },
    { name: 'Department Attendance', description: 'Department-wise attendance analysis', icon: Users, category: 'Attendance' },
    { name: 'Late/Early Report', description: 'Employees with late arrivals or early departures', icon: Clock, category: 'Attendance' },
    { name: 'Missing Attendance', description: 'Employees with unmarked attendance', icon: AlertTriangle, category: 'Attendance' },
    { name: 'Leave Report', description: 'Leave taken by employees', icon: Calendar, category: 'Leave' },
    { name: 'Leave Balance Report', description: 'Current leave balances for all employees', icon: BarChart3, category: 'Leave' },
    { name: 'Overtime Report', description: 'Overtime hours by employee and department', icon: Clock, category: 'Payroll' },
    { name: 'Payroll Input', description: 'Monthly payroll-ready attendance data', icon: FileText, category: 'Payroll' },
    { name: 'Manpower Report', description: 'Department-wise manpower analysis', icon: Users, category: 'Workforce' },
    { name: 'Attendance Corrections', description: 'All attendance correction requests', icon: CheckSquare, category: 'Attendance' },
    { name: 'Headcount Report', description: 'Employee count by department and status', icon: BarChart3, category: 'HR' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Generate and export workforce reports.</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search reports..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none" />
        </div>
        <select className="px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
          <option>All Categories</option>
          <option>Attendance</option>
          <option>Leave</option>
          <option>Payroll</option>
          <option>Workforce</option>
          <option>HR</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                <report.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                {report.category}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{report.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{report.description}</p>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-md text-xs font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30">
                <Download className="w-3 h-3" /> Generate
              </button>
              <span className="text-[10px] text-gray-400">Excel, CSV, PDF</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== APPROVAL CENTER ===================
export function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState<'leave' | 'corrections' | 'requests'>('leave');
  const { leaveRequests, corrections, approveLeave, rejectLeave, approveCorrection, rejectCorrection } = useAppData();
  const toast = useToast();
  
  const pendingLeaves = leaveRequests.filter((l: any) => l.status === 'pending');
  const pendingCorrections = corrections.filter((c: any) => c.status === 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Approval Center</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Review and process pending approvals.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-fit">
        <button onClick={() => setActiveTab('leave')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'leave' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}>
          Leave Requests <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs px-1.5 py-0.5 rounded-full">{pendingLeaves.length}</span>
        </button>
        <button onClick={() => setActiveTab('corrections')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'corrections' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}>
          Corrections <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs px-1.5 py-0.5 rounded-full">{pendingCorrections.length}</span>
        </button>
        <button onClick={() => setActiveTab('requests')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'requests' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}>
          Other Requests <span className="bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 text-xs px-1.5 py-0.5 rounded-full">0</span>
        </button>
      </div>

      {activeTab === 'leave' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Duration</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Reason</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {pendingLeaves.map(lr => (
                <tr key={lr.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{lr.employeeName}</p>
                    <p className="text-xs text-gray-500">{lr.department}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{lr.leaveType}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{lr.fromDate} → {lr.toDate} ({lr.days}d)</td>
                  <td className="px-4 py-3 text-sm text-gray-500 max-w-[200px] truncate">{lr.reason}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { approveLeave(lr.id); toast.success('Approved', `${lr.employeeName}'s leave approved.`); }} className="px-3 py-1.5 bg-green-500 text-white rounded-md text-xs font-medium hover:bg-green-600">Approve</button>
                      <button onClick={() => { rejectLeave(lr.id); toast.warning('Rejected', `${lr.employeeName}'s leave rejected.`); }} className="px-3 py-1.5 bg-red-500 text-white rounded-md text-xs font-medium hover:bg-red-600">Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'corrections' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Current</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Requested</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Reason</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {pendingCorrections.map(corr => (
                <tr key={corr.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{corr.employeeName}</p>
                    <p className="text-xs text-gray-500">{corr.employeeId}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{corr.date}</td>
                  <td className="px-4 py-3"><span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded">{corr.currentStatus}</span></td>
                  <td className="px-4 py-3"><span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">{corr.requestedStatus}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-500 max-w-[200px] truncate">{corr.reason}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { approveCorrection(corr.id); toast.success('Correction Approved', `${corr.employeeName}'s correction approved.`); }} className="px-3 py-1.5 bg-green-500 text-white rounded-md text-xs font-medium hover:bg-green-600">Approve</button>
                      <button onClick={() => { rejectCorrection(corr.id); toast.warning('Correction Rejected', `${corr.employeeName}'s correction rejected.`); }} className="px-3 py-1.5 bg-red-500 text-white rounded-md text-xs font-medium hover:bg-red-600">Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
          <CheckSquare className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400">No pending requests at this time.</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">All requests have been processed.</p>
        </div>
      )}
    </div>
  );
}

// =================== AUDIT LOGS ===================
export function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Audit Logs</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">System activity and change history.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Timestamp</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">User</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Entity</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Details</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">IP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {auditLogs.map(log => (
              <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                  {new Date(log.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{log.userName}</td>
                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">{log.role}</span></td>
                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded font-mono">{log.action}</span></td>
                <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">{log.entityType}</td>
                <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                  {log.oldValue && <span className="text-red-500">{log.oldValue}</span>}
                  {log.oldValue && log.newValue && <span className="mx-1">→</span>}
                  {log.newValue && <span className="text-green-500">{log.newValue}</span>}
                </td>
                <td className="px-4 py-3 text-xs text-gray-400 font-mono">{log.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =================== SETTINGS PAGE ===================
export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Company Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Configure ATTENDEX for GLITZ CORP.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <SettingsIcon className="w-4 h-4 text-primary-500" /> General Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
              <input type="text" defaultValue="GLITZ CORP" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Company Code</label>
              <input type="text" defaultValue="GLITZ" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
              <textarea defaultValue="123 Business Park, Mumbai, India" rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white resize-none" />
            </div>
          </div>
        </div>

        {/* Attendance Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-500" /> Attendance Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 dark:text-white">GPS Verification</p>
                <p className="text-xs text-gray-500">Require GPS for attendance</p>
              </div>
              <div className="w-10 h-6 bg-green-500 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 dark:text-white">Geofencing</p>
                <p className="text-xs text-gray-500">Restrict to work locations</p>
              </div>
              <div className="w-10 h-6 bg-green-500 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 dark:text-white">Check-out Required</p>
                <p className="text-xs text-gray-500">Require check-out at end of shift</p>
              </div>
              <div className="w-10 h-6 bg-green-500 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Geofence Radius (meters)</label>
              <input type="number" defaultValue={200} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Attendance Reminder Time</label>
              <input type="time" defaultValue="08:00" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white" />
            </div>
          </div>
        </div>

        {/* Work Locations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Work Locations</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Head Office</p>
                <p className="text-xs text-gray-500">19.076°N, 72.877°E • 200m radius</p>
              </div>
              <button className="text-xs text-primary-500 font-medium">Edit</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Factory Unit</p>
                <p className="text-xs text-gray-500">19.085°N, 72.890°E • 500m radius</p>
              </div>
              <button className="text-xs text-primary-500 font-medium">Edit</button>
            </div>
            <button className="w-full py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-xs text-gray-500 hover:border-primary-500 hover:text-primary-500 transition-colors">
              + Add Location
            </button>
          </div>
        </div>

        {/* Approval Workflow */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Approval Workflow</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Supervisor</p>
                <p className="text-xs text-gray-500">First level approval</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">HR Manager</p>
                <p className="text-xs text-gray-500">Final approval</p>
              </div>
            </div>
            <button className="w-full py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-xs text-gray-500 hover:border-primary-500 hover:text-primary-500 transition-colors">
              + Add Approval Level
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
        <button className="px-4 py-2.5 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600">Save Changes</button>
      </div>
    </div>
  );
}
