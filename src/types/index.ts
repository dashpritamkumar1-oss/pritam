export type UserRole = 'employee' | 'supervisor' | 'department_hos' | 'hr_executive' | 'hr_manager' | 'admin' | 'super_admin';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  employeeId?: string;
  companyId: string;
  isActive: boolean;
  lastLogin?: string;
  loginAttempts: number;
  lockedUntil?: Date;
}

export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  department: string;
  designation: string;
  shift: string;
  status: 'active' | 'inactive' | 'on_leave' | 'terminated';
  joiningDate: string;
  employmentType: 'full_time' | 'part_time' | 'contract';
  location: string;
  manager?: string;
  emergencyContact?: { name: string; phone: string; relation: string };
  documents?: Document[];
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  shift: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'leave' | 'week_off' | 'holiday' | 'missing';
  isLate: boolean;
  isEarly: boolean;
  overtime: number;
  location?: { latitude: number; longitude: number; accuracy: number; verified: boolean };
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveType {
  id: string;
  name: string;
  code: string;
  totalDays: number;
  isPaid: boolean;
}

export interface LeaveBalance {
  leaveTypeId: string;
  leaveTypeName: string;
  totalDays: number;
  usedDays: number;
  remainingDays: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  isHalfDay: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  appliedDate: string;
  approver?: string;
  approvalDate?: string;
  attachment?: string;
}

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  gracePeriod: number;
  breakMinutes: number;
  minHours: number;
  isNightShift: boolean;
  overtimeRule: string;
}

export interface ShiftAssignment {
  id: string;
  employeeId: string;
  shiftId: string;
  startDate: string;
  endDate?: string;
  isRecurring: boolean;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'national' | 'company' | 'optional' | 'regional';
  location?: string;
  department?: string;
}

export interface WeekOff {
  id: string;
  employeeId?: string;
  department?: string;
  dayOfWeek: number;
  isRotational: boolean;
  rotationPattern?: string;
}

export interface AttendanceCorrection {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  currentStatus: string;
  requestedStatus: string;
  requestedTime?: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  approver?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'attendance' | 'leave' | 'shift' | 'correction' | 'holiday' | 'announcement' | 'system';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  role: string;
  action: string;
  entityType: string;
  entityId: string;
  oldValue?: string;
  newValue?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

export interface Company {
  id: string;
  name: string;
  code: string;
  logo?: string;
  address: string;
  settings: CompanySettings;
}

export interface CompanySettings {
  checkInOnly: boolean;
  gpsEnabled: boolean;
  geofenceEnabled: boolean;
  geofenceRadius: number;
  workLocations: WorkLocation[];
  approvalLevels: string[];
  attendanceReminderTime: string;
}

export interface WorkLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
}

export interface Department {
  id: string;
  name: string;
  head?: string;
  employeeCount: number;
}

export interface ManpowerData {
  department: string;
  shift: string;
  required: number;
  present: number;
  leave: number;
  weekOff: number;
  shortage: number;
  coverage: number;
}

export interface Permission {
  id: string;
  code: string;
  name: string;
  module: string;
}
