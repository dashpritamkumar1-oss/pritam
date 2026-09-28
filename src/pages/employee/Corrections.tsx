import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAppData } from '../../contexts/AppDataContext';
import { useToast } from '../../contexts/ToastContext';
import { employees } from '../../data/mockData';
import { AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function EmployeeCorrections() {
  const { user } = useAuth();
  const { corrections, requestCorrection } = useAppData();
  const toast = useToast();
  const employee = employees.find(e => e.employeeId === user?.employeeId);
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState('');
  const [requestedStatus, setRequestedStatus] = useState('Present');
  const [requestedTime, setRequestedTime] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const myCorrections = corrections.filter(c => c.employeeId === user?.employeeId);

  const handleSubmit = async () => {
    if (!date || !reason || !employee) {
      toast.error('Missing fields', 'Please fill all required fields');
      return;
    }
    setSubmitting(true);
    await requestCorrection({
      employeeId: employee.employeeId,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      date,
      currentStatus: 'Missing',
      requestedStatus,
      requestedTime: requestedTime || undefined,
      reason,
    });
    setSubmitting(false);
    setShowForm(false);
    setDate('');
    setRequestedStatus('Present');
    setRequestedTime('');
    setReason('');
    toast.success('Correction Requested', 'Your attendance correction request has been submitted for review.');
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Attendance Corrections</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Request corrections for missed attendance</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium active:scale-95 transition-transform touch-target"
        >
          {showForm ? 'Cancel' : '+ Request'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Requested Status</label>
            <select value={requestedStatus} onChange={e => setRequestedStatus(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
              <option>Present</option>
              <option>Half Day</option>
              <option>Work From Home</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Check-in Time (approx)</label>
            <input type="time" value={requestedTime} onChange={e => setRequestedTime(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Reason</label>
            <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} placeholder="Why was attendance not marked?" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none" />
          </div>
          <button onClick={handleSubmit} disabled={submitting} className="w-full py-3.5 bg-primary-500 text-white font-semibold rounded-xl disabled:opacity-50 touch-target">
            {submitting ? 'Submitting...' : 'Submit Correction Request'}
          </button>
        </div>
      )}

      {/* History */}
      <div className="space-y-3">
        {myCorrections.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No correction requests yet</p>
          </div>
        ) : (
          myCorrections.map(corr => (
            <div key={corr.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{corr.date}</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                  corr.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                  corr.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                  'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                }`}>
                  {corr.status === 'approved' && <CheckCircle className="w-3 h-3" />}
                  {corr.status === 'pending' && <Clock className="w-3 h-3" />}
                  {corr.status === 'rejected' && <XCircle className="w-3 h-3" />}
                  {corr.status.charAt(0).toUpperCase() + corr.status.slice(1)}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {corr.currentStatus} → {corr.requestedStatus} {corr.requestedTime && `at ${corr.requestedTime}`}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{corr.reason}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
