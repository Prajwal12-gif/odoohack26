/**
 * Dayflow HRMS - Frontend Safe Constants
 * Pure presentational constants, status maps, and badge variants.
 * ZERO backend or API dependency.
 */

export const LEAVE_TYPES = {
  SICK: 'Sick Leave',
  CASUAL: 'Casual Leave',
  ANNUAL: 'Annual Leave',
  MATERNITY: 'Maternity Leave',
  PATERNITY: 'Paternity Leave',
  UNPAID: 'Unpaid Leave',
};

export const ATTENDANCE_STATUS = {
  PRESENT: 'Present',
  ABSENT: 'Absent',
  HALF_DAY: 'Half-Day',
  LEAVE: 'On Leave',
  HOLIDAY: 'Holiday',
  WEEKEND: 'Weekend',
};

export const REQUEST_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  CANCELLED: 'Cancelled',
};

export const USER_ROLES = {
  EMPLOYEE: 'Employee',
  ADMIN: 'Admin',
  MANAGER: 'Manager',
};

/**
 * UI Badge variant mapping to semantic color schemes
 */
export const STATUS_BADGE_VARIANTS = {
  // Attendance
  [ATTENDANCE_STATUS.PRESENT]: 'success',
  [ATTENDANCE_STATUS.ABSENT]: 'danger',
  [ATTENDANCE_STATUS.HALF_DAY]: 'warning',
  [ATTENDANCE_STATUS.LEAVE]: 'info',
  [ATTENDANCE_STATUS.HOLIDAY]: 'primary',
  [ATTENDANCE_STATUS.WEEKEND]: 'neutral',

  // Request statuses
  [REQUEST_STATUS.APPROVED]: 'success',
  [REQUEST_STATUS.PENDING]: 'warning',
  [REQUEST_STATUS.REJECTED]: 'danger',
  [REQUEST_STATUS.CANCELLED]: 'neutral',
};

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
  { id: 'profile', label: 'My Profile', icon: 'User', href: '/profile' },
  { id: 'attendance', label: 'Attendance', icon: 'CalendarCheck', href: '/attendance' },
  { id: 'leave', label: 'Leave Requests', icon: 'Clock', href: '/leave' },
  { id: 'payroll', label: 'Payroll & Payslips', icon: 'Receipt', href: '/payroll' },
  { id: 'documents', label: 'Documents', icon: 'FolderKanban', href: '/documents' },
];
