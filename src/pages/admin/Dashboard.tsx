import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, UserCheck, UserX, Calendar, CalendarOff, Clock, AlertTriangle, 
  CheckSquare, TrendingUp, TrendingDown, ArrowRight, Plus, Download,
  BarChart3, Activity
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { attendanceTrend, departmentCoverage, lateTrend, manpowerData, leaveRequests } from '../../data/mockData';

const COLORS = ['#22c55e', '#ef4444', '#f59e0b', '#6b7280'];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const today = new Date();
  const greeting = today.getHours() < 12 ? 'Good morning' : today.getHours() < 17 ? 'Good afternoon' : 'Good evening';

  const kpis = [
    { label: 'Total Employees', value: 486, icon: Users, color: 'bg-blue-500', change: '+12', trend: 'up', path: '/admin/employees' },
    { label: 'Present Today', value: 421, icon: UserCheck, color: 'bg-green-500', change: '86.6%', trend: 'up', path: '/admin/attendance' },
    { label: 'Absent', value: 18, icon: UserX, color: 'bg-red-500', change: '3.7%', trend: 'down', path: '/admin/attendance' },
    { label: 'On Leave', value: 32, icon: Calendar, color: 'bg-amber-500', change: '6.6%', trend: 'neutral', path: '/admin/leave' },
    { label: 'Week Off', value: 33, icon: CalendarOff, color: 'bg-gray-500', change: '6.8%', trend: 'neutral', path: '/admin/workforce/weekoff' },
    { label: 'Late Today', value: 14, icon: Clock, color: 'bg-orange-500', change: '2.9%', trend: 'up', path: '/admin/attendance' },
    { label: 'Missing', value: 18, icon: AlertTriangle, color: 'bg-rose-500', change: '3.7%', trend: 'down', path: '/admin/attendance' },
    { label: 'Pending Requests', value: 9, icon: CheckSquare, color: 'bg-purple-500', change: '', trend: 'neutral', path: '/admin/approvals' },
  ];

  const pendingLeaves = leaveRequests.filter(l => l.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {greeting}, HR Team 👋
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            GLITZ CORP • {today.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600">
            <Plus className="w-4 h-4" /> Add Employee
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <button
            key={i}
            onClick={() => navigate(kpi.path)}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-left hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${kpi.color} rounded-lg flex items-center justify-center`}>
                <kpi.icon className="w-5 h-5 text-white" />
              </div>
              {kpi.change && (
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  kpi.trend === 'up' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                  kpi.trend === 'down' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                  'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {kpi.change}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{kpi.label}</p>
            <div className="flex items-center gap-1 mt-2 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-medium">View details</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Attendance Trend</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Last 7 days overview</p>
            </div>
            <select className="text-xs border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This month</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="present" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} name="Present" />
                <Area type="monotone" dataKey="leave" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} name="Leave" />
                <Area type="monotone" dataKey="absent" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="Absent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Late Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Late Arrivals</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Daily late count trend</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Avg: 10.7/day</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lateTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                <Bar dataKey="late" fill="#f97316" radius={[4, 4, 0, 0]} name="Late" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Manpower Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Live Manpower Status</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Department-wise coverage for today</p>
          </div>
          <button 
            onClick={() => navigate('/admin/workforce/manpower')}
            className="text-xs text-primary-500 font-medium flex items-center gap-1 hover:text-primary-600"
          >
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {manpowerData.slice(0, 6).map((item, i) => (
            <div key={i} className="border border-gray-100 dark:border-gray-700 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-900 dark:text-white">{item.department}</span>
                <span className={`text-xs font-bold ${
                  item.coverage >= 95 ? 'text-green-600' : item.coverage >= 85 ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {item.coverage}%
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 mb-2">
                <span>{item.shift}</span>
                <span>•</span>
                <span>Req: {item.required}</span>
                <span>•</span>
                <span>Present: {item.present}</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all ${
                    item.coverage >= 95 ? 'bg-green-500' : item.coverage >= 85 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${item.coverage}%` }}
                />
              </div>
              {item.shortage > 0 && (
                <p className="text-[10px] text-red-500 mt-1">⚠ Shortage: {item.shortage}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Coverage */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Department Coverage</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentCoverage} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} stroke="#9ca3af" />
                <YAxis dataKey="department" type="category" tick={{ fontSize: 10 }} stroke="#9ca3af" width={60} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '11px' }} />
                <Bar dataKey="coverage" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Coverage %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Leave Requests */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Pending Leave Requests</h3>
            <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full font-medium">
              {pendingLeaves.length} pending
            </span>
          </div>
          <div className="space-y-3">
            {pendingLeaves.slice(0, 4).map(lr => (
              <div key={lr.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{lr.employeeName}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    {lr.leaveType} • {lr.fromDate} → {lr.toDate}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-md bg-green-100 dark:bg-green-900/30 text-green-600 hover:bg-green-200 dark:hover:bg-green-900/50">
                    <CheckSquare className="w-3 h-3" />
                  </button>
                  <button className="p-1.5 rounded-md bg-red-100 dark:bg-red-900/30 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/50">
                    <UserX className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/admin/leave')}
            className="w-full mt-3 py-2 text-xs text-primary-500 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/10 rounded-lg"
          >
            View All Requests →
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Plus, label: 'Add Employee', path: '/admin/employees' },
              { icon: CheckSquare, label: 'Approve Leave', path: '/admin/approvals' },
              { icon: Clock, label: 'Correct Attendance', path: '/admin/attendance/corrections' },
              { icon: Users, label: 'Assign Shift', path: '/admin/workforce/assignments' },
              { icon: Calendar, label: 'Add Holiday', path: '/admin/workforce/holidays' },
              { icon: BarChart3, label: 'Generate Report', path: '/admin/reports' },
            ].map((action, i) => (
              <button
                key={i}
                onClick={() => navigate(action.path)}
                className="flex items-center gap-2 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
              >
                <action.icon className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
