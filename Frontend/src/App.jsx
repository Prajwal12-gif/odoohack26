import React, { useState } from 'react';
import {
  Search,
  Plus,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  UserCheck,
  Clock,
  Briefcase,
  FileText,
  Sparkles,
  Inbox,
  Filter,
  Download,
  Mail,
  ShieldCheck,
} from 'lucide-react';

import Button from './components/ui/Button';
import Input from './components/ui/Input';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/Card';
import Modal from './components/ui/Modal';
import Badge from './components/ui/Badge';
import Table from './components/ui/Table';
import Dropdown from './components/ui/Dropdown';
import Calendar from './components/ui/Calendar';
import Tabs from './components/ui/Tabs';
import Toast from './components/ui/Toast';
import Skeleton, { SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTableRow } from './components/ui/Skeleton';

import { LEAVE_TYPES, ATTENDANCE_STATUS, REQUEST_STATUS } from './utils/constants';
import { formatCurrency, getInitials } from './utils/formatters';

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState('sick');
  const [selectedDepartment, setSelectedDepartment] = useState('eng');
  const [activeTab, setActiveTab] = useState('overview');
  const [toastType, setToastType] = useState('success');
  const [showToastDemo, setShowToastDemo] = useState(true);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date(2026, 7, 22));

  // Table data with realistic employee records
  const tableColumns = [
    {
      key: 'employee',
      label: 'Employee',
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-xs flex items-center justify-center border border-indigo-200/60">
            {getInitials(row.name)}
          </div>
          <div>
            <div className="font-semibold text-slate-900">{row.name}</div>
            <div className="text-xs text-slate-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'type', label: 'Leave Type', sortable: true },
    { key: 'dates', label: 'Date Range' },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (val) => {
        const variantMap = {
          Approved: 'success',
          Pending: 'warning',
          Rejected: 'danger',
        };
        return (
          <Badge variant={variantMap[val] || 'neutral'} dot>
            {val}
          </Badge>
        );
      },
    },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: () => (
        <Button variant="ghost" size="sm">
          Details
        </Button>
      ),
    },
  ];

  const tableData = [
    {
      id: '1',
      name: 'Alexandra Chen',
      email: 'alexandra.chen@dayflow.com',
      department: 'Engineering',
      type: LEAVE_TYPES.ANNUAL,
      dates: 'Oct 24 - Oct 28, 2026',
      status: REQUEST_STATUS.APPROVED,
    },
    {
      id: '2',
      name: 'Marcus Vance',
      email: 'marcus.vance@dayflow.com',
      department: 'Product Design',
      type: LEAVE_TYPES.CASUAL,
      dates: 'Nov 02 - Nov 03, 2026',
      status: REQUEST_STATUS.PENDING,
    },
    {
      id: '3',
      name: 'Sophia Rodriguez',
      email: 'sophia.r@dayflow.com',
      department: 'Human Resources',
      type: LEAVE_TYPES.SICK,
      dates: 'Oct 18, 2026',
      status: REQUEST_STATUS.APPROVED,
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@dayflow.com',
      department: 'Finance',
      type: LEAVE_TYPES.UNPAID,
      dates: 'Dec 10 - Dec 15, 2026',
      status: REQUEST_STATUS.REJECTED,
    },
  ];

  // Calendar markers
  const calendarEvents = [
    { dateKey: '2026-08-04', status: 'present', label: 'Present' },
    { dateKey: '2026-08-05', status: 'present', label: 'Present' },
    { dateKey: '2026-08-11', status: 'half-day', label: 'Half-Day' },
    { dateKey: '2026-08-14', status: 'leave', label: 'On Leave' },
    { dateKey: '2026-08-22', status: 'present', label: 'Present' },
    { dateKey: '2026-08-27', status: 'leave', label: 'On Leave' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white pb-20">
      {/* Premium Gradient Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-900 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        {/* Subtle decorative background glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Top Bar with Brand Logo */}
          <div className="flex items-center justify-between pb-8 mb-8 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              {/* Dayflow Logo Mark */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <div className="w-5 h-5 rounded-md bg-indigo-500 flex items-center justify-center text-white font-black text-xs tracking-tighter">
                    D
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white">Dayflow</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                  HRMS
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700/80">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Design System Showcase
              </span>
            </div>
          </div>

          {/* Hero Titles */}
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Human-centered HR management,{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
                beautifully designed.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Explore the core UI components powering employee profiles, attendance tracking, leave requests, payroll breakdown, and everyday HR operations.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Showcase Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-12">
        {/* Toast Demo Container */}
        {showToastDemo && (
          <div className="animate-in fade-in slide-in-from-top-3 duration-300">
            <Toast
              variant={toastType}
              title={
                toastType === 'success'
                  ? 'Leave request submitted successfully'
                  : toastType === 'warning'
                  ? 'Pending approval from department head'
                  : toastType === 'error'
                  ? 'Unable to save profile changes'
                  : 'System maintenance scheduled'
              }
              message="Notification components provide clear status updates to employees and HR managers."
              actionLabel="View details"
              onAction={() => alert('View action clicked')}
              onDismiss={() => setShowToastDemo(false)}
              className="w-full max-w-none bg-white shadow-lg border-slate-200"
            />
          </div>
        )}

        {/* SECTION 1: FOUNDATIONS (ACTIONS, FORMS, SELECTION) */}
        <section className="space-y-6">
          <div className="border-b border-slate-200/80 pb-4">
            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
              FOUNDATIONS
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Interactive Controls
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Buttons, input fields, and selection dropdowns built for accessibility and fast HR operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Actions Card */}
            <Card hoverable className="lg:col-span-1 flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>
                  Clear, consistent actions for everyday HR workflows.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-col gap-2.5">
                  <Button variant="primary" leftIcon={Plus} fullWidth>
                    Submit time-off request
                  </Button>
                  <Button variant="secondary" leftIcon={Download} fullWidth>
                    Download payslip PDF
                  </Button>
                  <div className="grid grid-cols-2 gap-2.5">
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                    <Button variant="ghost" size="sm">
                      View details
                    </Button>
                  </div>
                  <Button variant="danger" size="sm" fullWidth>
                    Revoke request
                  </Button>
                  <Button variant="primary" isLoading fullWidth>
                    Processing request...
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-slate-500 justify-between">
                <span>5 visual variants</span>
                <span>3 scale sizes</span>
              </CardFooter>
            </Card>

            {/* Form Fields Card */}
            <Card hoverable className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Form Fields</CardTitle>
                <CardDescription>
                  Accessible inputs with validation messaging, helper text, and integrated icons.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-5">
                <Input
                  label="Search Employees"
                  placeholder="Filter by name, ID or role..."
                  startIcon={Search}
                  helperText="Press Enter to execute search"
                />
                <Input
                  label="Work Email"
                  type="email"
                  value="alexandra.chen@dayflow.com"
                  startIcon={Mail}
                  required
                />
                <Input
                  label="Employee Identifier"
                  value="EMP-2026-8941"
                  disabled
                  helperText="Managed by system administrator"
                />
                <Input
                  label="Emergency Contact Phone"
                  placeholder="+1 (555) 019-2834"
                  error="Invalid phone number format"
                />
              </CardContent>
              <CardFooter className="justify-between text-xs text-slate-500">
                <span>Includes focus rings & ARIA descriptors</span>
                <span className="text-indigo-600 font-medium">Real-time error states</span>
              </CardFooter>
            </Card>
          </div>

          {/* Selection Controls Row */}
          <Card hoverable>
            <CardHeader>
              <CardTitle>Selection Controls</CardTitle>
              <CardDescription>
                Custom accessible dropdown menus for category filters and form choices.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-3 gap-5">
              <Dropdown
                label="Leave Category"
                options={[
                  { value: 'annual', label: LEAVE_TYPES.ANNUAL },
                  { value: 'sick', label: LEAVE_TYPES.SICK },
                  { value: 'casual', label: LEAVE_TYPES.CASUAL },
                  { value: 'unpaid', label: LEAVE_TYPES.UNPAID },
                ]}
                value={selectedLeaveType}
                onChange={setSelectedLeaveType}
              />
              <Dropdown
                label="Department"
                options={[
                  { value: 'eng', label: 'Engineering & Technology' },
                  { value: 'design', label: 'Product Design' },
                  { value: 'hr', label: 'Human Resources' },
                  { value: 'finance', label: 'Finance & Accounting' },
                ]}
                value={selectedDepartment}
                onChange={setSelectedDepartment}
              />
              <Dropdown
                label="Employment Status"
                options={[
                  { value: 'ft', label: 'Full-Time Permanent' },
                  { value: 'pt', label: 'Part-Time' },
                  { value: 'contract', label: 'Contractor' },
                ]}
                value="ft"
                onChange={() => {}}
              />
            </CardContent>
          </Card>
        </section>

        {/* SECTION 2: EMPLOYEE EXPERIENCE (STATUS BADGES & CALENDAR) */}
        <section className="space-y-6">
          <div className="border-b border-slate-200/80 pb-4">
            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
              EMPLOYEE EXPERIENCE
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Status Indicators & Calendar Visualizer
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Semantic badges, tab navigation, and attendance tracking grids designed for clarity.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Side: Status System & Navigation Tabs */}
            <div className="lg:col-span-5 space-y-6">
              {/* Status Badges Card */}
              <Card hoverable>
                <CardHeader>
                  <CardTitle>Status System</CardTitle>
                  <CardDescription>
                    Color-coded badges for attendance types and approval request states.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                      Attendance States
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="success" dot>
                        {ATTENDANCE_STATUS.PRESENT}
                      </Badge>
                      <Badge variant="warning" dot>
                        {ATTENDANCE_STATUS.HALF_DAY}
                      </Badge>
                      <Badge variant="danger" dot>
                        {ATTENDANCE_STATUS.ABSENT}
                      </Badge>
                      <Badge variant="info" dot>
                        {ATTENDANCE_STATUS.LEAVE}
                      </Badge>
                      <Badge variant="neutral">{ATTENDANCE_STATUS.WEEKEND}</Badge>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                      Approval Request States
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="success" dot>
                        {REQUEST_STATUS.APPROVED}
                      </Badge>
                      <Badge variant="warning" dot>
                        {REQUEST_STATUS.PENDING}
                      </Badge>
                      <Badge variant="danger" dot>
                        {REQUEST_STATUS.REJECTED}
                      </Badge>
                      <Badge variant="neutral">{REQUEST_STATUS.CANCELLED}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Tabs Card */}
              <Card hoverable>
                <CardHeader>
                  <CardTitle>Navigation Tabs</CardTitle>
                  <CardDescription>
                    Switch between employee views with pill or underline indicators.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs
                    variant="pill"
                    tabs={[
                      { id: 'overview', label: 'Overview', icon: UserCheck },
                      { id: 'attendance', label: 'Attendance', icon: Clock },
                      { id: 'leave', label: 'Leave', badge: 2 },
                      { id: 'payroll', label: 'Payroll', icon: Briefcase },
                    ]}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                  />

                  <div className="pt-3 border-t border-slate-100">
                    <Tabs
                      variant="underline"
                      tabs={[
                        { id: 'overview', label: 'Summary' },
                        { id: 'attendance', label: 'Log Records' },
                        { id: 'leave', label: 'Balance' },
                      ]}
                      activeTab={activeTab}
                      onChange={setActiveTab}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side: Attendance Calendar */}
            <div className="lg:col-span-7">
              <Card hoverable className="h-full flex flex-col justify-between">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Attendance Calendar</CardTitle>
                    <CardDescription>
                      Monthly grid displaying attendance logs and leave schedules.
                    </CardDescription>
                  </div>
                  <Badge variant="primary" size="sm">
                    Interactive Grid
                  </Badge>
                </CardHeader>
                <CardContent>
                  <Calendar
                    currentMonth={new Date(2026, 7, 1)}
                    selectedDate={selectedCalendarDate}
                    events={calendarEvents}
                    onDateSelect={setSelectedCalendarDate}
                    onPrevMonth={() => alert('Previous month navigation')}
                    onNextMonth={() => alert('Next month navigation')}
                  />
                </CardContent>
                <CardFooter className="justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Present
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500" /> Half-Day
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-sky-500" /> Leave
                    </span>
                  </div>
                  <span>Click cell to inspect date</span>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 3: HR OPERATIONS (DATA TABLES) */}
        <section className="space-y-6">
          <div className="border-b border-slate-200/80 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
                HR OPERATIONS
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                Data Tables
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Structured tabular display supporting column sorting, badge indicators, and row actions.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" leftIcon={Filter}>
                Filter
              </Button>
              <Button variant="outline" size="sm" leftIcon={Download}>
                Export CSV
              </Button>
            </div>
          </div>

          <Table
            columns={tableColumns}
            data={tableData}
            sortKey="employee"
            sortDirection="asc"
            onSort={(key, dir) => alert(`Sort requested for: ${key} (${dir})`)}
          />
        </section>

        {/* SECTION 4: WORKFLOWS (DIALOGS & NOTIFICATIONS) */}
        <section className="space-y-6">
          <div className="border-b border-slate-200/80 pb-4">
            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
              WORKFLOWS
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Dialogs & System Notifications
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Modal dialogs for HR actions and contextual toast notifications for system feedback.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Modal Trigger Showcase Card */}
            <Card hoverable className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Dialog Overlays</CardTitle>
                <CardDescription>
                  Accessible modal dialogs with backdrop blur, title, scroll locking, and actions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Time-Off Application</h4>
                      <p className="text-xs text-slate-500">Interactive leave request workflow form</p>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
                    Trigger Modal
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-slate-500 justify-between">
                <span>Handles ESC key & outside click</span>
                <span className="text-indigo-600 font-medium">Accessible focus trap</span>
              </CardFooter>
            </Card>

            {/* Notification Toast Trigger Cards */}
            <Card hoverable className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>System Toast Messages</CardTitle>
                <CardDescription>
                  Test different alert banners (Success, Warning, Error, Info).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setToastType('success');
                      setShowToastDemo(true);
                    }}
                  >
                    Success Banner
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setToastType('warning');
                      setShowToastDemo(true);
                    }}
                  >
                    Warning Banner
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setToastType('error');
                      setShowToastDemo(true);
                    }}
                  >
                    Error Banner
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setToastType('info');
                      setShowToastDemo(true);
                    }}
                  >
                    Info Banner
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-slate-500 justify-between">
                <span>Smooth slide + fade entrance</span>
                <span>Dismissable action slot</span>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* SECTION 5: STATES & FEEDBACK (SKELETONS & EMPTY STATES) */}
        <section className="space-y-6">
          <div className="border-b border-slate-200/80 pb-4">
            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
              STATES & FEEDBACK
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Loading Skeletons & Zero Data States
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Designed loading placeholders and empty state fallbacks for seamless user feedback.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Loading Skeletons */}
            <Card hoverable>
              <CardHeader>
                <CardTitle>Skeleton Placeholders</CardTitle>
                <CardDescription>
                  Subtle animated shimmers for asynchronous content rendering.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <SkeletonCard />
                <div className="p-4 border border-slate-100 rounded-xl space-y-2">
                  <div className="flex items-center gap-3">
                    <SkeletonAvatar size="sm" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <SkeletonText lines={2} />
                </div>
              </CardContent>
            </Card>

            {/* Empty State Component */}
            <Card hoverable className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Empty State Fallback</CardTitle>
                <CardDescription>
                  Friendly guidance displayed when queries or records yield no results.
                </CardDescription>
              </CardHeader>
              <CardContent className="py-8">
                <div className="flex flex-col items-center justify-center text-center p-6 bg-slate-50/70 border border-dashed border-slate-200 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                    <Inbox className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">No leave requests found</h3>
                  <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
                    Your approved, pending, and past time-off history will automatically appear here once submitted.
                  </p>
                  <Button variant="primary" size="sm" leftIcon={Plus} onClick={() => setIsModalOpen(true)}>
                    Request time off
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-slate-500 justify-between">
                <span>Centered icon + friendly copy</span>
                <span>Includes action CTA</span>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      {/* Modal Workflow Demo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request Time Off"
        description="Submit a formal leave request for approval by your department manager."
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsModalOpen(false);
                setToastType('success');
                setShowToastDemo(true);
              }}
            >
              Submit request
            </Button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Dropdown
            label="Leave Type"
            options={[
              { value: 'annual', label: LEAVE_TYPES.ANNUAL },
              { value: 'sick', label: LEAVE_TYPES.SICK },
              { value: 'casual', label: LEAVE_TYPES.CASUAL },
            ]}
            value={selectedLeaveType}
            onChange={setSelectedLeaveType}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" value="2026-10-24" required />
            <Input label="End Date" type="date" value="2026-10-28" required />
          </div>
          <div>
            <label className="text-xs font-semibold tracking-wide text-slate-700 uppercase block mb-1.5">
              Reason / Remarks
            </label>
            <textarea
              rows={3}
              className="w-full bg-white text-slate-900 text-sm rounded-lg border border-slate-300 p-3 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-slate-400"
              placeholder="Provide context regarding your absence..."
              defaultValue="Annual family vacation scheduled."
            />
          </div>
        </form>
      </Modal>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center">
            D
          </div>
          <span className="font-semibold text-slate-700">Dayflow HRMS</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
        <p className="italic text-slate-400">"Designed for better employee experiences."</p>
      </footer>
    </div>
  );
}

export default App;
