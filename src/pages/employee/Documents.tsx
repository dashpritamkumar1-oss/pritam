import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';

const documents = [
  { id: 'doc_1', name: 'Offer Letter', type: 'PDF', size: '245 KB', date: '2022-03-15', category: 'Employment' },
  { id: 'doc_2', name: 'Joining Letter', type: 'PDF', size: '180 KB', date: '2022-03-20', category: 'Employment' },
  { id: 'doc_3', name: 'ID Card Copy', type: 'PDF', size: '520 KB', date: '2022-04-01', category: 'Identity' },
  { id: 'doc_4', name: 'Appointment Letter', type: 'PDF', size: '310 KB', date: '2022-03-15', category: 'Employment' },
  { id: 'doc_5', name: 'Payslip - August 2026', type: 'PDF', size: '120 KB', date: '2026-09-01', category: 'Payroll' },
  { id: 'doc_6', name: 'Payslip - July 2026', type: 'PDF', size: '118 KB', date: '2026-08-01', category: 'Payroll' },
  { id: 'doc_7', name: 'Experience Certificate', type: 'PDF', size: '95 KB', date: '2023-03-15', category: 'Certificates' },
  { id: 'doc_8', name: 'PF Statement', type: 'PDF', size: '200 KB', date: '2026-04-01', category: 'Payroll' },
];

export default function EmployeeDocuments() {
  const categories = [...new Set(documents.map(d => d.category))];

  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">My Documents</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">View and download your documents</p>
      </div>

      {categories.map(cat => (
        <div key={cat}>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">{cat}</h3>
          <div className="space-y-2">
            {documents.filter(d => d.category === cat).map(doc => (
              <div key={doc.id} className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{doc.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{doc.type} • {doc.size} • {new Date(doc.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-primary-500">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
