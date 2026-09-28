import React, { useState } from 'react';
import { User, Mail, Phone, Building, Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Shield, FileText, Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { employees, leaveBalances } from '../../data/mockData';

export default function ProfilePage() {
  const { user } = useAuth();
  const employee = employees.find(e => e.employeeId === user?.employeeId);
  const [expandedSection, setExpandedSection] = useState<string | null>('personal');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (!employee) return null;

  const sections = [
    {
      id: 'personal',
      title: 'Personal Details',
      icon: User,
      items: [
        { label: 'Full Name', value: `${employee.firstName} ${employee.lastName}` },
        { label: 'Email', value: employee.email },
        { label: 'Phone', value: employee.phone },
        { label: 'Location', value: employee.location },
      ],
    },
    {
      id: 'employment',
      title: 'Employment Details',
      icon: Briefcase,
      items: [
        { label: 'Employee ID', value: employee.employeeId },
        { label: 'Department', value: employee.department },
        { label: 'Designation', value: employee.designation },
        { label: 'Shift', value: employee.shift },
        { label: 'Employment Type', value: employee.employmentType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) },
        { label: 'Joining Date', value: new Date(employee.joiningDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
        { label: 'Manager', value: employee.manager || 'N/A' },
      ],
    },
    {
      id: 'attendance',
      title: 'Attendance Summary',
      icon: Calendar,
      items: [
        { label: 'This Month Present', value: '18 days' },
        { label: 'This Month Leave', value: '2 days' },
        { label: 'Late Arrivals', value: '1' },
        { label: 'Average Check-in', value: '07:08 AM' },
      ],
    },
    {
      id: 'emergency',
      title: 'Emergency Contact',
      icon: Heart,
      items: [
        { label: 'Name', value: 'Sunita Sharma' },
        { label: 'Relation', value: 'Spouse' },
        { label: 'Phone', value: '+91 98765 43299' },
      ],
    },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
          <span className="text-2xl font-bold text-white">
            {employee.firstName[0]}{employee.lastName[0]}
          </span>
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {employee.firstName} {employee.lastName}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{employee.designation}</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
            {employee.status === 'active' ? '● Active' : employee.status}
          </span>
          <span className="text-xs text-gray-400">{employee.employeeId}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-lg font-bold text-primary-500">18</p>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">Present</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-lg font-bold text-amber-500">8</p>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">CL Left</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-lg font-bold text-green-500">10</p>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">SL Left</p>
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-2">
        {sections.map(section => (
          <div key={section.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <section.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{section.title}</span>
              </div>
              {expandedSection === section.id ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
            {expandedSection === section.id && (
              <div className="px-4 pb-4 space-y-2 border-t border-gray-100 dark:border-gray-700 pt-3">
                {section.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.label}</span>
                    <span className="text-xs font-medium text-gray-900 dark:text-white text-right max-w-[60%]">{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Documents Quick Link */}
      <button className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
          <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">My Documents</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">View and download documents</p>
        </div>
      </button>
    </div>
  );
}
