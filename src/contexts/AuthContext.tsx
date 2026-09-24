import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, UserRole } from '../types';
import { users } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  portal: 'employee' | 'admin' | null;
  login: (email: string, password: string, portal: 'employee' | 'admin') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [portal, setPortal] = useState<'employee' | 'admin' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('attendex_session');
    if (stored) {
      try {
        const session = JSON.parse(stored);
        setUser(session.user);
        setPortal(session.portal);
      } catch { /* ignore */ }
    }
  }, []);

  const login = useCallback(async (email: string, password: string, loginPortal: 'employee' | 'admin'): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!foundUser) {
      setIsLoading(false);
      return false;
    }

    // Validate portal access
    if (loginPortal === 'admin' && foundUser.role === 'employee') {
      setIsLoading(false);
      return false;
    }
    if (loginPortal === 'employee' && foundUser.role !== 'employee') {
      setIsLoading(false);
      return false;
    }

    const userData: User = { ...foundUser };
    setUser(userData);
    setPortal(loginPortal);
    localStorage.setItem('attendex_session', JSON.stringify({ user: userData, portal: loginPortal }));
    setIsLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setPortal(null);
    localStorage.removeItem('attendex_session');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, portal, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export function hasPermission(role: UserRole, permission: string): boolean {
  const permissionMap: Record<UserRole, string[]> = {
    employee: ['employee.attendance.mark', 'employee.attendance.view_self', 'employee.leave.apply', 'employee.leave.view_self', 'employee.profile.view'],
    supervisor: ['employee.attendance.mark', 'employee.attendance.view_self', 'employee.leave.apply', 'employee.leave.view_self', 'employee.profile.view', 'hr.attendance.view_department'],
    department_hos: ['employee.attendance.mark', 'employee.attendance.view_self', 'employee.leave.apply', 'employee.leave.view_self', 'employee.profile.view', 'hr.attendance.view_department', 'hr.leave.approve_department'],
    hr_executive: ['employee.attendance.mark', 'employee.attendance.view_self', 'employee.leave.apply', 'employee.leave.view_self', 'employee.profile.view', 'hr.attendance.view', 'hr.leave.approve', 'hr.report.view'],
    hr_manager: ['employee.attendance.mark', 'employee.attendance.view_self', 'employee.leave.apply', 'employee.leave.view_self', 'employee.profile.view', 'hr.attendance.view', 'hr.attendance.modify', 'hr.leave.approve', 'hr.shift.manage', 'hr.report.export', 'hr.employee.view', 'hr.employee.edit'],
    admin: ['*'],
    super_admin: ['*'],
  };

  const perms = permissionMap[role] || [];
  return perms.includes('*') || perms.includes(permission);
}
