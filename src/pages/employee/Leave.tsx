import React, { useState } from 'react';
import { Calendar, Plus, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAppData } from '../../contexts/AppDataContext';
import { useToast } from '../../contexts/ToastContext';
import { employees, leaveBalances } from '../../data/mockData';

export default function LeavePage() {
  const { user } = useAuth();
  const { leaveRequests, applyLeave } = useAppData();
  const toast = useToast();
  const employee = employees.find(e => e.employeeId === user?.employeeId);
  const [showApply, setShowApply] = useState(false);
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [tab, setTab] = useState<'balance' | 'history' | 'apply'>('balance');

  const myLeaves = leaveRequests.filter(l => l.employeeId === user?.employeeId || true).slice(0, 7);

  const [submitting, setSubmitting] = useState(false);

  const handleApply = async () => {
    if (!leaveType || !fromDate || !reason || !employee) {
      toast.error('Missing fields', 'Please fill all required fields');
      return;
    }
    setSubmitting(true);
    const toDateValue = toDate || fromDate;
    const from = new Date(fromDate);
    const to = new Date(toDateValue);
    const days = Math.max(1, Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1);
    
    await applyLeave({
      employeeId: employee.employeeId,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      department: employee.department,
      leaveType,
      fromDate,
      toDate: toDateValue,
      days: isHalfDay ? 0.5 : days,
      reason,
      isHalfDay,
    });
    
    setSubmitting(false);
    setShowApply(false);
    setLeaveType('');
    setFromDate('');
    setToDate('');
    setReason('');
    setTab('history');
    toast.success('Leave Applied', 'Your leave request has been submitted for approval.');
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Leave</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your leaves</p>
        </div>
        <button
          onClick={() => setShowApply(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium active:scale-95 transition-transform touch-target"
        >
          <Plus className="w-4 h-4" /> Apply
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
        {(['balance', 'history', 'apply'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              tab === t ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {t === 'balance' ? 'Balance' : t === 'history' ? 'History' : 'Apply'}
          </button>
        ))}
      </div>

      {tab === 'balance' && (
        <div className="space-y-3">
          {leaveBalances.map(lb => (
            <div key={lb.leaveTypeId} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{lb.leaveTypeName}</h3>
                <span className="text-lg font-bold text-primary-500">{lb.remainingDays}</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full transition-all"
                  style={{ width: `${(lb.usedDays / lb.totalDays) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">{lb.usedDays} used</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{lb.totalDays} total</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'history' && (
        <div className="space-y-3">
          {myLeaves.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No leave records yet</p>
            </div>
          ) : (
            myLeaves.map(lr => (
              <div key={lr.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{lr.leaveType}</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    lr.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                    lr.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                    lr.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                    'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {lr.status.charAt(0).toUpperCase() + lr.status.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {lr.fromDate} → {lr.toDate} ({lr.days} day{lr.days > 1 ? 's' : ''})
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{lr.reason}</p>
                {lr.status === 'pending' && (
                  <button className="mt-2 text-xs text-red-500 font-medium">Cancel Request</button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'apply' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Leave Type</label>
            <select
              value={leaveType}
              onChange={e => setLeaveType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="">Select leave type</option>
              {leaveBalances.map(lb => (
                <option key={lb.leaveTypeId} value={lb.leaveTypeName}>{lb.leaveTypeName} ({lb.remainingDays} left)</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={e => setToDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={!isHalfDay}
                onChange={() => setIsHalfDay(false)}
                className="w-4 h-4 text-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Full Day</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={isHalfDay}
                onChange={() => setIsHalfDay(true)}
                className="w-4 h-4 text-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Half Day</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Reason</label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={3}
              placeholder="Enter reason for leave..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none"
            />
          </div>

          <button
            onClick={handleApply}
            disabled={!leaveType || !fromDate || !reason || submitting}
            className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-target"
          >
            {submitting ? 'Submitting...' : 'Submit Leave Request'}
          </button>
        </div>
      )}

      {/* Apply Modal */}
      {showApply && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white dark:bg-gray-800 w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Apply for Leave</h2>
              <button onClick={() => setShowApply(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Fill in the details below to submit your leave request.</p>
            <button
              onClick={() => { setShowApply(false); setTab('apply'); }}
              className="w-full py-3.5 bg-primary-500 text-white font-semibold rounded-xl touch-target"
            >
              Continue to Form
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
