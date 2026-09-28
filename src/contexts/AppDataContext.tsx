import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Employee, Attendance, LeaveRequest, AttendanceCorrection, Notification, Holiday } from '../types';
import { employees as initialEmployees, todayAttendance as initialAttendance, leaveRequests as initialLeaves, attendanceCorrections as initialCorrections, notifications as initialNotifications, holidays as initialHolidays } from '../data/mockData';

interface AppData {
  employees: Employee[];
  attendance: Attendance[];
  leaveRequests: LeaveRequest[];
  corrections: AttendanceCorrection[];
  notifications: Notification[];
  holidays: Holiday[];
  // Actions
  markAttendance: (employeeId: string, shift: string) => Promise<void>;
  applyLeave: (leave: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate'>) => Promise<void>;
  approveLeave: (id: string) => void;
  rejectLeave: (id: string) => void;
  requestCorrection: (correction: Omit<AttendanceCorrection, 'id' | 'status' | 'appliedDate'>) => Promise<void>;
  approveCorrection: (id: string) => void;
  rejectCorrection: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addEmployee: (emp: Omit<Employee, 'id'>) => void;
  addHoliday: (holiday: Omit<Holiday, 'id'>) => void;
}

const AppDataContext = createContext<AppData | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [attendance, setAttendance] = useState<Attendance[]>(initialAttendance);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaves);
  const [corrections, setCorrections] = useState<AttendanceCorrection[]>(initialCorrections);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);

  const markAttendance = async (employeeId: string, shift: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const dateStr = now.toISOString().split('T')[0];
    
    const existingIdx = attendance.findIndex(a => a.employeeId === employeeId && a.date === dateStr);
    if (existingIdx >= 0) {
      setAttendance(prev => prev.map((a, i) => i === existingIdx ? { ...a, checkIn: timeStr, status: 'present', location: { latitude: 19.076, longitude: 72.878, accuracy: 12, verified: true }, updatedAt: now.toISOString() } : a));
    } else {
      const newAtt: Attendance = {
        id: `att_${Date.now()}`,
        employeeId,
        date: dateStr,
        shift,
        checkIn: timeStr,
        status: 'present',
        isLate: false,
        isEarly: false,
        overtime: 0,
        location: { latitude: 19.076, longitude: 72.878, accuracy: 12, verified: true },
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      };
      setAttendance(prev => [...prev, newAtt]);
    }
  };

  const applyLeave = async (leave: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate'>) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newLeave: LeaveRequest = {
      ...leave,
      id: `lv_${Date.now()}`,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
    };
    setLeaveRequests(prev => [newLeave, ...prev]);
  };

  const approveLeave = (id: string) => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status: 'approved' as const, approver: 'HR Manager', approvalDate: new Date().toISOString().split('T')[0] } : l));
  };

  const rejectLeave = (id: string) => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status: 'rejected' as const, approver: 'HR Manager', approvalDate: new Date().toISOString().split('T')[0] } : l));
  };

  const requestCorrection = async (correction: Omit<AttendanceCorrection, 'id' | 'status' | 'appliedDate'>) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newCorr: AttendanceCorrection = {
      ...correction,
      id: `corr_${Date.now()}`,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
    };
    setCorrections(prev => [newCorr, ...prev]);
  };

  const approveCorrection = (id: string) => {
    setCorrections(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' as const, approver: 'HR Manager' } : c));
  };

  const rejectCorrection = (id: string) => {
    setCorrections(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected' as const, approver: 'HR Manager' } : c));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const addEmployee = (emp: Omit<Employee, 'id'>) => {
    const newEmp: Employee = { ...emp, id: `emp_${Date.now()}` };
    setEmployees(prev => [...prev, newEmp]);
  };

  const addHoliday = (holiday: Omit<Holiday, 'id'>) => {
    const newHol: Holiday = { ...holiday, id: `hol_${Date.now()}` };
    setHolidays(prev => [...prev, newHol]);
  };

  return (
    <AppDataContext.Provider value={{
      employees, attendance, leaveRequests, corrections, notifications, holidays,
      markAttendance, applyLeave, approveLeave, rejectLeave,
      requestCorrection, approveCorrection, rejectCorrection,
      markNotificationRead, markAllNotificationsRead, addEmployee, addHoliday,
    }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) throw new Error('useAppData must be used within AppDataProvider');
  return context;
}
