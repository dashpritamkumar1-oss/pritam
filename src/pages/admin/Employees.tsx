import React, { useState } from 'react';
import { Search, Filter, Plus, Download, Upload, MoreVertical, Eye, Edit, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { employees, departments } from '../../data/mockData';

export default function EmployeesPage() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = search === '' || 
      emp.firstName.toLowerCase().includes(search.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(search.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === '' || emp.department === deptFilter;
    const matchesStatus = statusFilter === '' || emp.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map(e => e.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedEmployees(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Employees</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage employees and workforce information.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50">
            <Upload className="w-4 h-4" /> Import
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600">
            <Plus className="w-4 h-4" /> Add Employee
          </button>
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
            placeholder="Search by name, ID, department..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
        <select
          value={deptFilter}
          onChange={e => setDeptFilter(e.target.value)}
          className="px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300"
        >
          <option value="">All Departments</option>
          {departments.map(d => (
            <option key={d.id} value={d.name}>{d.name}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="on_leave">On Leave</option>
          <option value="inactive">Inactive</option>
        </select>
        {(search || deptFilter || statusFilter) && (
          <button
            onClick={() => { setSearch(''); setDeptFilter(''); setStatusFilter(''); }}
            className="text-xs text-primary-500 font-medium hover:text-primary-600"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm">
        <span className="text-gray-500 dark:text-gray-400">
          Showing <span className="font-medium text-gray-900 dark:text-white">{filteredEmployees.length}</span> of {employees.length} employees
        </span>
        {selectedEmployees.length > 0 && (
          <span className="text-primary-500 font-medium">
            {selectedEmployees.length} selected
          </span>
        )}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Designation</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Shift</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joining Date</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredEmployees.map(emp => (
                <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(emp.id)}
                      onChange={() => toggleSelect(emp.id)}
                      className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{emp.firstName[0]}{emp.lastName[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{emp.firstName} {emp.lastName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{emp.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{emp.department}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{emp.designation}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md">
                      {emp.shift}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      emp.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      emp.status === 'on_leave' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {emp.status === 'active' ? '● Active' : emp.status === 'on_leave' ? '● On Leave' : '● Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(emp.joiningDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500" title="More">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Page 1 of {Math.ceil(filteredEmployees.length / 10)}
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 rounded-md bg-primary-500 text-white text-sm font-medium">1</button>
            <button className="px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm">2</button>
            <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
