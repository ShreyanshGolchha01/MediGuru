// User types
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'data-entry-operator';
  name: string;
}

// Meeting types
export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  meetingLink: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

// Statistics types
export interface MeetingStats {
  meetingId: string;
  totalAttendees: number;
  preTestUploaded: boolean;
  attendanceUploaded: boolean;
  postTestUploaded: boolean;
  averagePreTestScore?: number;
  averagePostTestScore?: number;
}

// File upload types
export interface FileUpload {
  id: string;
  meetingId: string;
  type: 'pre-test' | 'attendance' | 'post-test';
  fileName: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'uploaded' | 'processing' | 'processed' | 'error';
}

// Dashboard data
export interface DashboardData {
  totalMeetings: number;
  upcomingMeetings: number;
  completedMeetings: number;
  totalAttendees: number;
  averageAttendance: number;
  recentMeetings: Meeting[];
}
