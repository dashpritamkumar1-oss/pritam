import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Clock, Calendar, Filter, ChevronRight, Eye } from 'lucide-react';
import { leaveRequests, departments } from '../../data/mockData';

export default function AdminLeave() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const filtered = leaveRequests.filter(lr => {
    const matchesSearch = search === '' || 
      lr.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      lr.employeeId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === '' || lr.status === statusFilter;
    const matchesType = typeFilter === '' || lr.leaveType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const summary = {
    pending: leaveRequests.filter(l => l.status === 'pending').length,
    approved: leaveRequests.filter(l => l.status === 'approved').length,
    rejected: leaveRequests.filter(l => l.status === 'rejected').length,
    total: leaveRequests.length,
  };

  const selectedLeave = leaveRequests.find(l => l.id === selectedRequest);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Leave Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Review and manage employee leave requests.</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Pending</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.pending}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Approved</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.approved}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Rejected</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.rejected}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-primary-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.total}</p>
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
            placeholder="Search employee..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
          <option value="">All Types</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Earned Leave">Earned Leave</option>
        </select>
      </div>

      {/* Table + Drawer */}
      <div className="flex gap-6">
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Employee</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">From → To</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Days</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Reason</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map(lr => (
                  <tr key={lr.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer ${selectedRequest === lr.id ? 'bg-primary-50 dark:bg-primary-900/10' : ''}`}
                    onClick={() => setSelectedRequest(lr.id)}>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{lr.employeeName}</p>
                      <p className="text-xs text-gray-500">{lr.employeeId} • {lr.department}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{lr.leaveType}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {lr.fromDate} → {lr.toDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{lr.days}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 max-w-[200px] truncate">{lr.reason}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        lr.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                        lr.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                        lr.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                        'bg-gray-100 dark:bg-gray-700 text-gray-600'
                      }`}>
                        {lr.status.charAt(0).toUpperCase() + lr.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {lr.status === 'pending' && (
                        <div className="flex items-center justify-end gap-1">
                          <button className="px-2.5 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-xs font-medium hover:bg-green-200 dark:hover:bg-green-900/50">
                            Approve
                          </button>
                          <button className="px-2.5 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-xs font-medium hover:bg-red-200 dark:hover:bg-red-900/50">
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Drawer */}
        {selectedLeave && (
          <div className="w-80 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 h-fit sticky top-[80px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Leave Details</h3>
              <button onClick={() => setSelectedRequest(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Employee</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedLeave.employeeName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Department</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedLeave.department}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Leave Type</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedLeave.leaveType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedLeave.fromDate} → {selectedLeave.toDate} ({selectedLeave.days} day{selectedLeave.days > 1 ? 's' : ''})</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Reason</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedLeave.reason}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Applied On</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedLeave.appliedDate}</p>
              </div>
              {selectedLeave.status === 'pending' && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <button className="w-full py-2.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600">
                    ✓ Approve Leave
                  </button>
                  <button className="w-full py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">
                    ✕ Reject Leave
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
