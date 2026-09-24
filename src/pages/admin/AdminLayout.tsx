import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Clock, Calendar, Briefcase, FileText, Bell, 
  Shield, Settings, LogOut, ChevronLeft, ChevronRight, Search, Moon, Sun,
  ChevronDown, CheckSquare, BarChart3, FolderOpen, UserCog, Building2,
  DollarSign, ClipboardList
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const sidebarItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/employees', icon: Users, label: 'Employees' },
  { 
    path: '/admin/attendance', icon: Clock, label: 'Attendance',
    children: [
      { path: '/admin/attendance', label: 'Live Attendance' },
      { path: '/admin/attendance/history', label: 'History' },
      { path: '/admin/attendance/corrections', label: 'Corrections' },
    ]
  },
  { 
    path: '/admin/leave', icon: Calendar, label: 'Leave',
    children: [
      { path: '/admin/leave', label: 'Requests' },
      { path: '/admin/leave/balances', label: 'Balances' },
      { path: '/admin/leave/policies', label: 'Policies' },
    ]
  },
  { 
    path: '/admin/workforce', icon: Briefcase, label: 'Workforce',
    children: [
      { path: '/admin/workforce/shifts', label: 'Shifts' },
      { path: '/admin/workforce/assignments', label: 'Assignments' },
      { path: '/admin/workforce/weekoff', label: 'Week-Off' },
      { path: '/admin/workforce/holidays', label: 'Holidays' },
      { path: '/admin/workforce/manpower', label: 'Manpower' },
    ]
  },
  { path: '/admin/payroll', icon: DollarSign, label: 'Payroll' },
  { path: '/admin/reports', icon: BarChart3, label: 'Reports' },
  { path: '/admin/approvals', icon: CheckSquare, label: 'Approval Center' },
  { path: '/admin/notifications', icon: Bell, label: 'Notifications' },
  { path: '/admin/audit-logs', icon: ClipboardList, label: 'Audit Logs' },
  { path: '/admin/users', icon: UserCog, label: 'User Management' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const toggleMenu = (path: string) => {
    setExpandedMenus(prev => 
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (item: typeof sidebarItems[0]) => 
    item.children?.some(c => location.pathname.startsWith(c.path));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 z-50 ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}>
        {/* Logo */}
        <div className="h-[60px] flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="w-9 h-9 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">AX</span>
          </div>
          {!collapsed && (
            <div className="ml-3">
              <h1 className="text-sm font-bold text-gray-900 dark:text-white">ATTENDEX</h1>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">GLITZ CORP</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar py-3 px-2">
          {sidebarItems.map(item => (
            <div key={item.path} className="mb-0.5">
              <button
                onClick={() => {
                  if (item.children) {
                    toggleMenu(item.path);
                  } else {
                    navigate(item.path);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive(item.path) || isParentActive(item)
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.children && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedMenus.includes(item.path) || isParentActive(item) ? 'rotate-180' : ''}`} />
                    )}
                  </>
                )}
              </button>
              
              {/* Submenu */}
              {!collapsed && item.children && (expandedMenus.includes(item.path) || isParentActive(item)) && (
                <div className="ml-5 mt-0.5 space-y-0.5 border-l border-gray-200 dark:border-gray-700 pl-3">
                  {item.children.map(child => (
                    <button
                      key={child.path}
                      onClick={() => navigate(child.path)}
                      className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors ${
                        isActive(child.path)
                          ? 'text-primary-600 dark:text-primary-400 font-medium bg-primary-50 dark:bg-primary-900/10'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-2 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-[72px]' : 'ml-[260px]'}`}>
        {/* Top Header */}
        <header className="h-[60px] bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-gray-400 dark:text-gray-500">Home</span>
              {location.pathname !== '/admin' && (
                <>
                  <span className="mx-2 text-gray-300 dark:text-gray-600">/</span>
                  <span className="text-gray-900 dark:text-white font-medium capitalize">
                    {location.pathname.split('/').filter(Boolean).pop()?.replace('-', ' ')}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 w-80">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search employees, departments... (Ctrl+K)"
              className="bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none w-full"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">HR</span>
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-medium text-gray-900 dark:text-white">HR Manager</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">admin@glitzcorp.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
