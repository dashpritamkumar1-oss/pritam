import { Employee, Attendance, LeaveRequest, Shift, Holiday, Notification, Department, ManpowerData, LeaveBalance, AttendanceCorrection, AuditLog, Company } from '../types';

export const company: Company = {
  id: 'comp_001',
  name: 'GLITZ CORP',
  code: 'GLITZ',
  address: '123 Business Park, Mumbai, India',
  settings: {
    checkInOnly: false,
    gpsEnabled: true,
    geofenceEnabled: true,
    geofenceRadius: 200,
    workLocations: [
      { id: 'loc_1', name: 'Head Office', latitude: 19.076, longitude: 72.8777, radius: 200 },
      { id: 'loc_2', name: 'Factory Unit', latitude: 19.085, longitude: 72.8900, radius: 500 },
    ],
    approvalLevels: ['supervisor', 'hr_manager'],
    attendanceReminderTime: '08:00',
  },
};

export const departments: Department[] = [
  { id: 'dept_1', name: 'Cell Production', head: 'Rajesh Kumar', employeeCount: 120 },
  { id: 'dept_2', name: 'Quality Assurance', head: 'Priya Sharma', employeeCount: 45 },
  { id: 'dept_3', name: 'Packaging', head: 'Amit Patel', employeeCount: 80 },
  { id: 'dept_4', name: 'Warehouse', head: 'Suresh Nair', employeeCount: 60 },
  { id: 'dept_5', name: 'Human Resources', head: 'Meera Joshi', employeeCount: 25 },
  { id: 'dept_6', name: 'Finance', head: 'Vikram Singh', employeeCount: 30 },
  { id: 'dept_7', name: 'IT & Systems', head: 'Anita Desai', employeeCount: 35 },
  { id: 'dept_8', name: 'Administration', head: 'Karan Mehta', employeeCount: 40 },
  { id: 'dept_9', name: 'Maintenance', head: 'Ravi Shankar', employeeCount: 35 },
  { id: 'dept_10', name: 'R&D', head: 'Deepa Iyer', employeeCount: 16 },
];

export const employees: Employee[] = [
  { id: 'emp_001', employeeId: 'GC001', firstName: 'Arjun', lastName: 'Sharma', email: 'arjun.sharma@glitzcorp.com', phone: '+91 98765 43210', department: 'Cell Production', designation: 'Senior Operator', shift: 'Shift A', status: 'active', joiningDate: '2022-03-15', employmentType: 'full_time', location: 'Factory Unit', manager: 'Rajesh Kumar' },
  { id: 'emp_002', employeeId: 'GC002', firstName: 'Priya', lastName: 'Patel', email: 'priya.patel@glitzcorp.com', phone: '+91 98765 43211', department: 'Quality Assurance', designation: 'QA Inspector', shift: 'Shift A', status: 'active', joiningDate: '2021-07-20', employmentType: 'full_time', location: 'Factory Unit', manager: 'Priya Sharma' },
  { id: 'emp_003', employeeId: 'GC003', firstName: 'Rahul', lastName: 'Verma', email: 'rahul.verma@glitzcorp.com', phone: '+91 98765 43212', department: 'Packaging', designation: 'Packaging Lead', shift: 'Shift B', status: 'active', joiningDate: '2020-11-05', employmentType: 'full_time', location: 'Factory Unit', manager: 'Amit Patel' },
  { id: 'emp_004', employeeId: 'GC004', firstName: 'Sneha', lastName: 'Gupta', email: 'sneha.gupta@glitzcorp.com', phone: '+91 98765 43213', department: 'Human Resources', designation: 'HR Executive', shift: 'General', status: 'active', joiningDate: '2023-01-10', employmentType: 'full_time', location: 'Head Office', manager: 'Meera Joshi' },
  { id: 'emp_005', employeeId: 'GC005', firstName: 'Vikram', lastName: 'Singh', email: 'vikram.singh@glitzcorp.com', phone: '+91 98765 43214', department: 'Warehouse', designation: 'Warehouse Supervisor', shift: 'Shift A', status: 'active', joiningDate: '2019-06-12', employmentType: 'full_time', location: 'Factory Unit', manager: 'Suresh Nair' },
  { id: 'emp_006', employeeId: 'GC006', firstName: 'Anita', lastName: 'Reddy', email: 'anita.reddy@glitzcorp.com', phone: '+91 98765 43215', department: 'IT & Systems', designation: 'Software Engineer', shift: 'General', status: 'active', joiningDate: '2022-09-01', employmentType: 'full_time', location: 'Head Office', manager: 'Anita Desai' },
  { id: 'emp_007', employeeId: 'GC007', firstName: 'Karan', lastName: 'Mehta', email: 'karan.mehta@glitzcorp.com', phone: '+91 98765 43216', department: 'Cell Production', designation: 'Machine Operator', shift: 'Shift C', status: 'active', joiningDate: '2023-04-18', employmentType: 'full_time', location: 'Factory Unit', manager: 'Rajesh Kumar' },
  { id: 'emp_008', employeeId: 'GC008', firstName: 'Deepa', lastName: 'Nair', email: 'deepa.nair@glitzcorp.com', phone: '+91 98765 43217', department: 'Finance', designation: 'Accountant', shift: 'General', status: 'active', joiningDate: '2021-02-28', employmentType: 'full_time', location: 'Head Office', manager: 'Vikram Singh' },
  { id: 'emp_009', employeeId: 'GC009', firstName: 'Ravi', lastName: 'Kumar', email: 'ravi.kumar@glitzcorp.com', phone: '+91 98765 43218', department: 'Maintenance', designation: 'Technician', shift: 'Shift B', status: 'active', joiningDate: '2020-08-15', employmentType: 'full_time', location: 'Factory Unit', manager: 'Ravi Shankar' },
  { id: 'emp_010', employeeId: 'GC010', firstName: 'Meera', lastName: 'Iyer', email: 'meera.iyer@glitzcorp.com', phone: '+91 98765 43219', department: 'R&D', designation: 'Research Analyst', shift: 'General', status: 'active', joiningDate: '2022-11-20', employmentType: 'full_time', location: 'Head Office', manager: 'Deepa Iyer' },
  { id: 'emp_011', employeeId: 'GC011', firstName: 'Suresh', lastName: 'Joshi', email: 'suresh.joshi@glitzcorp.com', phone: '+91 98765 43220', department: 'Cell Production', designation: 'Operator', shift: 'Shift A', status: 'active', joiningDate: '2023-06-01', employmentType: 'full_time', location: 'Factory Unit', manager: 'Rajesh Kumar' },
  { id: 'emp_012', employeeId: 'GC012', firstName: 'Pooja', lastName: 'Deshmukh', email: 'pooja.d@glitzcorp.com', phone: '+91 98765 43221', department: 'Quality Assurance', designation: 'Senior QA', shift: 'Shift A', status: 'on_leave', joiningDate: '2020-03-10', employmentType: 'full_time', location: 'Factory Unit', manager: 'Priya Sharma' },
  { id: 'emp_013', employeeId: 'GC013', firstName: 'Amit', lastName: 'Yadav', email: 'amit.yadav@glitzcorp.com', phone: '+91 98765 43222', department: 'Packaging', designation: 'Packer', shift: 'Shift B', status: 'active', joiningDate: '2024-01-15', employmentType: 'full_time', location: 'Factory Unit', manager: 'Amit Patel' },
  { id: 'emp_014', employeeId: 'GC014', firstName: 'Neha', lastName: 'Chauhan', email: 'neha.c@glitzcorp.com', phone: '+91 98765 43223', department: 'Administration', designation: 'Admin Executive', shift: 'General', status: 'active', joiningDate: '2022-05-20', employmentType: 'full_time', location: 'Head Office', manager: 'Karan Mehta' },
  { id: 'emp_015', employeeId: 'GC015', firstName: 'Rohit', lastName: 'Pandey', email: 'rohit.p@glitzcorp.com', phone: '+91 98765 43224', department: 'Cell Production', designation: 'Senior Operator', shift: 'Shift C', status: 'active', joiningDate: '2021-09-12', employmentType: 'full_time', location: 'Factory Unit', manager: 'Rajesh Kumar' },
];

export const shifts: Shift[] = [
  { id: 'shift_1', name: 'General', startTime: '09:00', endTime: '18:00', gracePeriod: 15, breakMinutes: 60, minHours: 8, isNightShift: false, overtimeRule: 'after_9hrs' },
  { id: 'shift_2', name: 'Shift A', startTime: '07:00', endTime: '15:00', gracePeriod: 10, breakMinutes: 30, minHours: 7.5, isNightShift: false, overtimeRule: 'after_8hrs' },
  { id: 'shift_3', name: 'Shift B', startTime: '15:00', endTime: '23:00', gracePeriod: 10, breakMinutes: 30, minHours: 7.5, isNightShift: false, overtimeRule: 'after_8hrs' },
  { id: 'shift_4', name: 'Shift C', startTime: '23:00', endTime: '07:00', gracePeriod: 10, breakMinutes: 30, minHours: 7.5, isNightShift: true, overtimeRule: 'after_8hrs' },
];

export const todayAttendance: Attendance[] = [
  { id: 'att_001', employeeId: 'GC001', date: '2026-09-24', shift: 'Shift A', checkIn: '07:05', checkOut: '', status: 'present', isLate: false, isEarly: false, overtime: 0, location: { latitude: 19.076, longitude: 72.878, accuracy: 12, verified: true }, createdAt: '2026-09-24T07:05:00', updatedAt: '2026-09-24T07:05:00' },
  { id: 'att_002', employeeId: 'GC002', date: '2026-09-24', shift: 'Shift A', checkIn: '07:12', checkOut: '', status: 'present', isLate: false, isEarly: false, overtime: 0, location: { latitude: 19.077, longitude: 72.879, accuracy: 8, verified: true }, createdAt: '2026-09-24T07:12:00', updatedAt: '2026-09-24T07:12:00' },
  { id: 'att_003', employeeId: 'GC003', date: '2026-09-24', shift: 'Shift B', checkIn: '', checkOut: '', status: 'missing', isLate: false, isEarly: false, overtime: 0, createdAt: '2026-09-24T00:00:00', updatedAt: '2026-09-24T00:00:00' },
  { id: 'att_004', employeeId: 'GC004', date: '2026-09-24', shift: 'General', checkIn: '09:02', checkOut: '', status: 'present', isLate: false, isEarly: false, overtime: 0, location: { latitude: 19.076, longitude: 72.877, accuracy: 15, verified: true }, createdAt: '2026-09-24T09:02:00', updatedAt: '2026-09-24T09:02:00' },
  { id: 'att_005', employeeId: 'GC005', date: '2026-09-24', shift: 'Shift A', checkIn: '07:22', checkOut: '', status: 'present', isLate: true, isEarly: false, overtime: 0, location: { latitude: 19.085, longitude: 72.890, accuracy: 20, verified: true }, createdAt: '2026-09-24T07:22:00', updatedAt: '2026-09-24T07:22:00' },
  { id: 'att_006', employeeId: 'GC006', date: '2026-09-24', shift: 'General', checkIn: '09:18', checkOut: '', status: 'present', isLate: true, isEarly: false, overtime: 0, location: { latitude: 19.076, longitude: 72.877, accuracy: 10, verified: true }, createdAt: '2026-09-24T09:18:00', updatedAt: '2026-09-24T09:18:00' },
  { id: 'att_007', employeeId: 'GC007', date: '2026-09-24', shift: 'Shift C', checkIn: '23:05', checkOut: '', status: 'present', isLate: false, isEarly: false, overtime: 0, location: { latitude: 19.085, longitude: 72.890, accuracy: 14, verified: true }, createdAt: '2026-09-23T23:05:00', updatedAt: '2026-09-23T23:05:00' },
  { id: 'att_008', employeeId: 'GC008', date: '2026-09-24', shift: 'General', checkIn: '08:55', checkOut: '', status: 'present', isLate: false, isEarly: false, overtime: 0, location: { latitude: 19.076, longitude: 72.877, accuracy: 9, verified: true }, createdAt: '2026-09-24T08:55:00', updatedAt: '2026-09-24T08:55:00' },
  { id: 'att_009', employeeId: 'GC009', date: '2026-09-24', shift: 'Shift B', checkIn: '', checkOut: '', status: 'missing', isLate: false, isEarly: false, overtime: 0, createdAt: '2026-09-24T00:00:00', updatedAt: '2026-09-24T00:00:00' },
  { id: 'att_010', employeeId: 'GC010', date: '2026-09-24', shift: 'General', checkIn: '09:00', checkOut: '', status: 'present', isLate: false, isEarly: false, overtime: 0, location: { latitude: 19.076, longitude: 72.877, accuracy: 11, verified: true }, createdAt: '2026-09-24T09:00:00', updatedAt: '2026-09-24T09:00:00' },
  { id: 'att_011', employeeId: 'GC011', date: '2026-09-24', shift: 'Shift A', checkIn: '07:08', checkOut: '', status: 'present', isLate: false, isEarly: false, overtime: 0, location: { latitude: 19.085, longitude: 72.890, accuracy: 16, verified: true }, createdAt: '2026-09-24T07:08:00', updatedAt: '2026-09-24T07:08:00' },
  { id: 'att_012', employeeId: 'GC012', date: '2026-09-24', shift: 'Shift A', checkIn: '', checkOut: '', status: 'leave', isLate: false, isEarly: false, overtime: 0, createdAt: '2026-09-24T00:00:00', updatedAt: '2026-09-24T00:00:00' },
  { id: 'att_013', employeeId: 'GC013', date: '2026-09-24', shift: 'Shift B', checkIn: '', checkOut: '', status: 'missing', isLate: false, isEarly: false, overtime: 0, createdAt: '2026-09-24T00:00:00', updatedAt: '2026-09-24T00:00:00' },
  { id: 'att_014', employeeId: 'GC014', date: '2026-09-24', shift: 'General', checkIn: '09:05', checkOut: '', status: 'present', isLate: false, isEarly: false, overtime: 0, location: { latitude: 19.076, longitude: 72.877, accuracy: 13, verified: true }, createdAt: '2026-09-24T09:05:00', updatedAt: '2026-09-24T09:05:00' },
  { id: 'att_015', employeeId: 'GC015', date: '2026-09-24', shift: 'Shift C', checkIn: '', checkOut: '', status: 'missing', isLate: false, isEarly: false, overtime: 0, createdAt: '2026-09-24T00:00:00', updatedAt: '2026-09-24T00:00:00' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'lv_001', employeeId: 'GC012', employeeName: 'Pooja Deshmukh', department: 'Quality Assurance', leaveType: 'Sick Leave', fromDate: '2026-09-24', toDate: '2026-09-26', days: 3, reason: 'Medical appointment and recovery', isHalfDay: false, status: 'approved', appliedDate: '2026-09-22', approver: 'Priya Sharma', approvalDate: '2026-09-22' },
  { id: 'lv_002', employeeId: 'GC003', employeeName: 'Rahul Verma', department: 'Packaging', leaveType: 'Casual Leave', fromDate: '2026-09-28', toDate: '2026-09-28', days: 1, reason: 'Personal work', isHalfDay: false, status: 'pending', appliedDate: '2026-09-23' },
  { id: 'lv_003', employeeId: 'GC007', employeeName: 'Karan Mehta', department: 'Cell Production', leaveType: 'Earned Leave', fromDate: '2026-10-01', toDate: '2026-10-05', days: 5, reason: 'Family function', isHalfDay: false, status: 'pending', appliedDate: '2026-09-20' },
  { id: 'lv_004', employeeId: 'GC009', employeeName: 'Ravi Kumar', department: 'Maintenance', leaveType: 'Casual Leave', fromDate: '2026-09-25', toDate: '2026-09-25', days: 1, reason: 'Bank work', isHalfDay: true, status: 'pending', appliedDate: '2026-09-24' },
  { id: 'lv_005', employeeId: 'GC011', employeeName: 'Suresh Joshi', department: 'Cell Production', leaveType: 'Sick Leave', fromDate: '2026-09-20', toDate: '2026-09-21', days: 2, reason: 'Fever', isHalfDay: false, status: 'approved', appliedDate: '2026-09-19', approver: 'Rajesh Kumar', approvalDate: '2026-09-19' },
  { id: 'lv_006', employeeId: 'GC001', employeeName: 'Arjun Sharma', department: 'Cell Production', leaveType: 'Casual Leave', fromDate: '2026-10-10', toDate: '2026-10-11', days: 2, reason: 'Wedding attendance', isHalfDay: false, status: 'pending', appliedDate: '2026-09-24' },
  { id: 'lv_007', employeeId: 'GC005', employeeName: 'Vikram Singh', department: 'Warehouse', leaveType: 'Earned Leave', fromDate: '2026-09-15', toDate: '2026-09-17', days: 3, reason: 'Personal travel', isHalfDay: false, status: 'rejected', appliedDate: '2026-09-10', approver: 'Suresh Nair', approvalDate: '2026-09-11' },
];

export const leaveBalances: LeaveBalance[] = [
  { leaveTypeId: 'lt_1', leaveTypeName: 'Casual Leave', totalDays: 12, usedDays: 4, remainingDays: 8 },
  { leaveTypeId: 'lt_2', leaveTypeName: 'Sick Leave', totalDays: 12, usedDays: 2, remainingDays: 10 },
  { leaveTypeId: 'lt_3', leaveTypeName: 'Earned Leave', totalDays: 15, usedDays: 5, remainingDays: 10 },
];

export const holidays: Holiday[] = [
  { id: 'hol_1', name: 'Gandhi Jayanti', date: '2026-10-02', type: 'national' },
  { id: 'hol_2', name: 'Dussehra', date: '2026-10-12', type: 'national' },
  { id: 'hol_3', name: 'Diwali', date: '2026-10-29', type: 'national' },
  { id: 'hol_4', name: 'Company Foundation Day', date: '2026-11-15', type: 'company' },
  { id: 'hol_5', name: 'Christmas', date: '2026-12-25', type: 'national' },
  { id: 'hol_6', name: 'Republic Day', date: '2027-01-26', type: 'national' },
  { id: 'hol_7', name: 'Holi', date: '2027-03-10', type: 'national' },
];

export const notifications: Notification[] = [
  { id: 'notif_1', userId: 'emp_001', title: 'Attendance Reminder', message: 'Your attendance has not been marked today. Please mark your attendance.', type: 'attendance', isRead: false, createdAt: '2026-09-24T08:00:00' },
  { id: 'notif_2', userId: 'emp_001', title: 'Leave Approved', message: 'Your leave from 10 Oct to 11 Oct is being reviewed by your manager.', type: 'leave', isRead: false, createdAt: '2026-09-24T09:30:00' },
  { id: 'notif_3', userId: 'emp_001', title: 'Shift Update', message: 'Your shift for 26 Sep has been changed to Shift B.', type: 'shift', isRead: true, createdAt: '2026-09-23T16:00:00' },
  { id: 'notif_4', userId: 'emp_001', title: 'Holiday Reminder', message: 'Gandhi Jayanti holiday on 2 Oct. Plan accordingly.', type: 'holiday', isRead: true, createdAt: '2026-09-22T10:00:00' },
  { id: 'notif_5', userId: 'emp_001', title: 'Correction Approved', message: 'Your attendance correction for 18 Sep has been approved.', type: 'correction', isRead: true, createdAt: '2026-09-21T11:00:00' },
];

export const manpowerData: ManpowerData[] = [
  { department: 'Cell Production', shift: 'Shift A', required: 40, present: 37, leave: 2, weekOff: 1, shortage: 3, coverage: 93 },
  { department: 'Cell Production', shift: 'Shift B', required: 40, present: 35, leave: 3, weekOff: 2, shortage: 5, coverage: 88 },
  { department: 'Cell Production', shift: 'Shift C', required: 30, present: 28, leave: 1, weekOff: 1, shortage: 2, coverage: 93 },
  { department: 'Quality Assurance', shift: 'Shift A', required: 20, present: 18, leave: 1, weekOff: 1, shortage: 2, coverage: 90 },
  { department: 'Packaging', shift: 'Shift A', required: 25, present: 23, leave: 1, weekOff: 1, shortage: 2, coverage: 92 },
  { department: 'Packaging', shift: 'Shift B', required: 25, present: 22, leave: 2, weekOff: 1, shortage: 3, coverage: 88 },
  { department: 'Warehouse', shift: 'Shift A', required: 30, present: 27, leave: 2, weekOff: 1, shortage: 3, coverage: 90 },
  { department: 'Maintenance', shift: 'Shift B', required: 15, present: 13, leave: 1, weekOff: 1, shortage: 2, coverage: 87 },
];

export const attendanceCorrections: AttendanceCorrection[] = [
  { id: 'corr_1', employeeId: 'GC003', employeeName: 'Rahul Verma', date: '2026-09-18', currentStatus: 'Missing', requestedStatus: 'Present', requestedTime: '15:05', reason: 'Forgot to mark attendance - GPS issue', status: 'pending', appliedDate: '2026-09-19' },
  { id: 'corr_2', employeeId: 'GC007', employeeName: 'Karan Mehta', date: '2026-09-15', currentStatus: 'Absent', requestedStatus: 'Present', requestedTime: '23:10', reason: 'Was present but system error', status: 'pending', appliedDate: '2026-09-16' },
  { id: 'corr_3', employeeId: 'GC009', employeeName: 'Ravi Kumar', date: '2026-09-12', currentStatus: 'Missing', requestedStatus: 'Present', requestedTime: '15:02', reason: 'Network issue during check-in', status: 'approved', appliedDate: '2026-09-13', approver: 'Ravi Shankar' },
];

export const auditLogs: AuditLog[] = [
  { id: 'log_1', userId: 'admin_001', userName: 'Meera Joshi', role: 'HR Manager', action: 'LEAVE_APPROVED', entityType: 'leave_request', entityId: 'lv_001', oldValue: 'pending', newValue: 'approved', ipAddress: '192.168.1.100', userAgent: 'Chrome/Windows', timestamp: '2026-09-22T10:30:00' },
  { id: 'log_2', userId: 'admin_001', userName: 'Meera Joshi', role: 'HR Manager', action: 'EMPLOYEE_CREATED', entityType: 'employee', entityId: 'emp_013', newValue: 'Amit Yadav', ipAddress: '192.168.1.100', userAgent: 'Chrome/Windows', timestamp: '2026-09-20T14:00:00' },
  { id: 'log_3', userId: 'admin_002', userName: 'System Admin', role: 'Super Admin', action: 'SHIFT_ASSIGNED', entityType: 'shift_assignment', entityId: 'sa_005', newValue: 'GC007 → Shift C', ipAddress: '192.168.1.101', userAgent: 'Chrome/Mac', timestamp: '2026-09-19T09:15:00' },
  { id: 'log_4', userId: 'emp_001', userName: 'Arjun Sharma', role: 'Employee', action: 'ATTENDANCE_MARKED', entityType: 'attendance', entityId: 'att_001', newValue: 'Present - 07:05', ipAddress: '10.0.0.50', userAgent: 'Mobile/Android', timestamp: '2026-09-24T07:05:00' },
  { id: 'log_5', userId: 'admin_001', userName: 'Meera Joshi', role: 'HR Manager', action: 'CORRECTION_APPROVED', entityType: 'correction', entityId: 'corr_3', oldValue: 'Missing', newValue: 'Present', ipAddress: '192.168.1.100', userAgent: 'Chrome/Windows', timestamp: '2026-09-13T16:00:00' },
];

export const attendanceTrend = [
  { date: '18 Sep', present: 445, absent: 12, leave: 22, weekOff: 33 },
  { date: '19 Sep', present: 450, absent: 10, leave: 18, weekOff: 33 },
  { date: '20 Sep', present: 438, absent: 15, leave: 25, weekOff: 33 },
  { date: '21 Sep', present: 420, absent: 18, leave: 30, weekOff: 43 },
  { date: '22 Sep', present: 442, absent: 11, leave: 20, weekOff: 33 },
  { date: '23 Sep', present: 448, absent: 9, leave: 21, weekOff: 33 },
  { date: '24 Sep', present: 421, absent: 18, leave: 32, weekOff: 33 },
];

export const departmentCoverage = [
  { department: 'Cell Prod.', required: 120, present: 112, coverage: 94 },
  { department: 'QA', required: 45, present: 42, coverage: 93 },
  { department: 'Packaging', required: 80, present: 73, coverage: 91 },
  { department: 'Warehouse', required: 60, present: 55, coverage: 92 },
  { department: 'HR', required: 25, present: 24, coverage: 96 },
  { department: 'Finance', required: 30, present: 29, coverage: 97 },
  { department: 'IT', required: 35, present: 34, coverage: 97 },
  { department: 'Admin', required: 40, present: 38, coverage: 95 },
  { department: 'Maint.', required: 35, present: 30, coverage: 86 },
  { department: 'R&D', required: 16, present: 15, coverage: 94 },
];

export const lateTrend = [
  { date: '18 Sep', late: 8 },
  { date: '19 Sep', late: 12 },
  { date: '20 Sep', late: 6 },
  { date: '21 Sep', late: 15 },
  { date: '22 Sep', late: 9 },
  { date: '23 Sep', late: 11 },
  { date: '24 Sep', late: 14 },
];

// Users for authentication
export const users = [
  { id: 'admin_001', email: 'admin@glitzcorp.com', password: 'admin123', role: 'hr_manager' as const, employeeId: undefined, companyId: 'comp_001', isActive: true, loginAttempts: 0 },
  { id: 'admin_002', email: 'superadmin@glitzcorp.com', password: 'super123', role: 'super_admin' as const, employeeId: undefined, companyId: 'comp_001', isActive: true, loginAttempts: 0 },
  { id: 'emp_user_001', email: 'arjun.sharma@glitzcorp.com', password: 'emp123', role: 'employee' as const, employeeId: 'GC001', companyId: 'comp_001', isActive: true, loginAttempts: 0 },
  { id: 'emp_user_002', email: 'priya.patel@glitzcorp.com', password: 'emp123', role: 'employee' as const, employeeId: 'GC002', companyId: 'comp_001', isActive: true, loginAttempts: 0 },
];
