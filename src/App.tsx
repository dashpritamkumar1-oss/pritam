import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Employee Pages
import EmployeeLogin from './pages/employee/Login';
import EmployeeLayout from './pages/employee/EmployeeLayout';
import EmployeeDashboard from './pages/employee/Dashboard';
import EmployeeAttendance from './pages/employee/Attendance';
import EmployeeLeave from './pages/employee/Leave';
import EmployeeNotifications from './pages/employee/Notifications';
import EmployeeProfile from './pages/employee/Profile';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminEmployees from './pages/admin/Employees';
import AdminAttendance from './pages/admin/Attendance';
import AdminLeave from './pages/admin/Leave';
import { ShiftsPage, ReportsPage, ApprovalsPage, AuditLogsPage, SettingsPage } from './pages/admin/OtherPages';

// Route Guards
function EmployeeRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, portal } = useAuth();
  if (!isAuthenticated) return <Navigate to="/employee-login" replace />;
  if (portal !== 'employee') return <Navigate to="/employee-login" replace />;
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, portal } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin-login" replace />;
  if (portal !== 'admin') return <Navigate to="/admin-login" replace />;
  return <>{children}</>;
}

function PublicRoute({ children, redirectTo }: { children: React.ReactNode; redirectTo: string }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to={redirectTo} replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/employee-login" replace />} />
      <Route path="/employee-login" element={
        <PublicRoute redirectTo="/employee"><EmployeeLogin /></PublicRoute>
      } />
      <Route path="/admin-login" element={
        <PublicRoute redirectTo="/admin"><AdminLogin /></PublicRoute>
      } />

      {/* Employee Portal */}
      <Route path="/employee" element={
        <EmployeeRoute><EmployeeLayout /></EmployeeRoute>
      }>
        <Route index element={<EmployeeDashboard />} />
        <Route path="attendance" element={<EmployeeAttendance />} />
        <Route path="leave" element={<EmployeeLeave />} />
        <Route path="notifications" element={<EmployeeNotifications />} />
        <Route path="profile" element={<EmployeeProfile />} />
        <Route path="documents" element={<div className="p-4"><h1 className="text-xl font-bold text-gray-900 dark:text-white">Documents</h1><p className="text-sm text-gray-500 mt-2">View and download your documents.</p></div>} />
        <Route path="holidays" element={<div className="p-4"><h1 className="text-xl font-bold text-gray-900 dark:text-white">Holiday Calendar</h1><p className="text-sm text-gray-500 mt-2">Upcoming holidays and events.</p></div>} />
        <Route path="corrections" element={<div className="p-4"><h1 className="text-xl font-bold text-gray-900 dark:text-white">Attendance Corrections</h1><p className="text-sm text-gray-500 mt-2">Request corrections for missed attendance.</p></div>} />
        <Route path="weekoff" element={<div className="p-4"><h1 className="text-xl font-bold text-gray-900 dark:text-white">Week-Off Schedule</h1><p className="text-sm text-gray-500 mt-2">Your weekly off schedule.</p></div>} />
      </Route>

      {/* Admin Portal */}
      <Route path="/admin" element={
        <AdminRoute><AdminLayout /></AdminRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="employees" element={<AdminEmployees />} />
        <Route path="attendance" element={<AdminAttendance />} />
        <Route path="attendance/history" element={<AdminAttendance />} />
        <Route path="attendance/corrections" element={<ApprovalsPage />} />
        <Route path="leave" element={<AdminLeave />} />
        <Route path="leave/balances" element={<AdminLeave />} />
        <Route path="leave/policies" element={<AdminLeave />} />
        <Route path="workforce/shifts" element={<ShiftsPage />} />
        <Route path="workforce/assignments" element={<ShiftsPage />} />
        <Route path="workforce/weekoff" element={<ShiftsPage />} />
        <Route path="workforce/holidays" element={<ShiftsPage />} />
        <Route path="workforce/manpower" element={<AdminDashboard />} />
        <Route path="payroll" element={<ReportsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="approvals" element={<ApprovalsPage />} />
        <Route path="notifications" element={<div className="space-y-4"><h1 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h1><p className="text-sm text-gray-500">Send and manage notifications.</p></div>} />
        <Route path="audit-logs" element={<AuditLogsPage />} />
        <Route path="users" element={<AdminEmployees />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
