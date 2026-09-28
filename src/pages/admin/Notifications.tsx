import React, { useState } from 'react';
import { Bell, Send, Plus, Mail, Smartphone, Megaphone, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const sentNotifications = [
  { id: 'n1', title: 'Attendance Reminder', message: 'Please mark your attendance for today.', recipients: 'All Employees', channel: 'In-App + Email', sentAt: '2026-09-24 08:00', status: 'delivered', count: 486 },
  { id: 'n2', title: 'Holiday Announcement', message: 'Office will remain closed on 2 Oct for Gandhi Jayanti.', recipients: 'All Employees', channel: 'In-App + Email', sentAt: '2026-09-22 10:00', status: 'delivered', count: 486 },
  { id: 'n3', title: 'Shift Change Notice', message: 'Shift C timings updated effective 1 Oct.', recipients: 'Cell Production', channel: 'In-App', sentAt: '2026-09-20 14:30', status: 'delivered', count: 120 },
  { id: 'n4', title: 'Policy Update', message: 'New leave policy effective from October.', recipients: 'All Employees', channel: 'Email', sentAt: '2026-09-18 09:00', status: 'delivered', count: 486 },
];

export default function AdminNotifications() {
  const toast = useToast();
  const [showCompose, setShowCompose] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState('all');
  const [channel, setChannel] = useState('in-app');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!title || !message) {
      toast.error('Missing fields', 'Please fill title and message');
      return;
    }
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    setSending(false);
    setShowCompose(false);
    setTitle('');
    setMessage('');
    toast.success('Notification Sent', `Successfully sent to ${recipients === 'all' ? 'all employees' : recipients}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Send and manage employee notifications.</p>
        </div>
        <button onClick={() => setShowCompose(!showCompose)} className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600">
          <Plus className="w-4 h-4" /> Compose
        </button>
      </div>

      {showCompose && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Send Notification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Notification title" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Recipients</label>
              <select value={recipients} onChange={e => setRecipients(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white">
                <option value="all">All Employees</option>
                <option value="Cell Production">Cell Production</option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="Packaging">Packaging</option>
                <option value="Warehouse">Warehouse</option>
                <option value="HR">Human Resources</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} placeholder="Enter notification message..." className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white resize-none" />
          </div>
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Channel</label>
              <div className="flex gap-2">
                {['in-app', 'email', 'both'].map(ch => (
                  <button key={ch} onClick={() => setChannel(ch)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${channel === ch ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                    {ch === 'in-app' ? 'In-App' : ch === 'email' ? 'Email' : 'Both'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowCompose(false)} className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300">Cancel</button>
            <button onClick={handleSend} disabled={sending} className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 disabled:opacity-50">
              <Send className="w-4 h-4" /> {sending ? 'Sending...' : 'Send Notification'}
            </button>
          </div>
        </div>
      )}

      {/* Sent History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Sent Notifications</h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {sentNotifications.map(n => (
            <div key={n.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bell className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{n.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{n.message}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-gray-400">👥 {n.recipients} ({n.count})</span>
                      <span className="text-[10px] text-gray-400">📡 {n.channel}</span>
                      <span className="text-[10px] text-gray-400">🕐 {n.sentAt}</span>
                    </div>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                  <CheckCircle className="w-3 h-3" /> Delivered
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
