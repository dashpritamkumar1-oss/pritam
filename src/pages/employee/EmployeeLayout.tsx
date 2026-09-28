import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Clock, CalendarDays, Bell, User, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAppData } from '../../contexts/AppDataContext';
import { employees } from '../../data/mockData';

export default function EmployeeLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const { notifications } = useAppData();
  const employee = employees.find(e => e.employeeId === user?.employeeId);
  const unreadCount = notifications.filter((n: any) => !n.isRead).length;

  const navItems = [
    { path: '/employee', icon: Home, label: 'Home' },
    { path: '/employee/attendance', icon: Clock, label: 'Attendance' },
    { path: '/employee/leave', icon: CalendarDays, label: 'Leave' },
    { path: '/employee/notifications', icon: Bell, label: 'Alerts', badge: unreadCount },
    { path: '/employee/profile', icon: User, label: 'Profile' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/employee-login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col max-w-lg mx-auto">
      {/* Mobile Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">AX</span>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Good morning</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{employee?.firstName || 'Employee'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/employee/notifications')}
            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 touch-target"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 touch-target"
          >
            {showMenu ? <X className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
          </button>
        </div>
      </header>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute top-14 right-4 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 w-56">
          <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{employee?.firstName} {employee?.lastName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{employee?.employeeId}</p>
          </div>
          <button onClick={() => { navigate('/employee/documents'); setShowMenu(false); }} className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            📄 Documents
          </button>
          <button onClick={() => { navigate('/employee/holidays'); setShowMenu(false); }} className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            🎉 Holidays
          </button>
          <button onClick={() => { navigate('/employee/corrections'); setShowMenu(false); }} className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            ✏️ Corrections
          </button>
          <button onClick={() => { navigate('/employee/weekoff'); setShowMenu(false); }} className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            📅 Week-Off
          </button>
          <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
            <button onClick={handleLogout} className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
              🚪 Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 safe-bottom z-40">
        <div className="flex items-center justify-around py-2">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors touch-target ${
                  isActive ? 'text-primary-500' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <div className="relative">
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-500' : ''}`} />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive && <div className="w-5 h-0.5 bg-primary-500 rounded-full mt-0.5" />}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
