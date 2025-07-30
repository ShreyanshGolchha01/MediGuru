import React, { useState } from 'react';
import { Plus, Calendar, Clock, Video, Users, TrendingUp, BarChart3 } from 'lucide-react';
import Header from '../components/Header';

const AdminDashboard: React.FC = () => {
  const [showCreateMeeting, setShowCreateMeeting] = useState(false);
  const [meetingForm, setMeetingForm] = useState({
    title: '',
    date: '',
    time: '',
    meetingLink: '',
    description: ''
  });

  // Mock data
  const dashboardStats = {
    totalMeetings: 24,
    upcomingMeetings: 3,
    completedMeetings: 21,
    totalAttendees: 456,
    averageAttendance: 85
  };

  const recentMeetings = [
    {
      id: '1',
      title: 'Emergency Medicine Training',
      date: '2025-01-30',
      time: '10:00',
      status: 'upcoming',
      attendees: 25
    },
    {
      id: '2',
      title: 'Pediatric Care Workshop',
      date: '2025-01-28',
      time: '14:00',
      status: 'completed',
      attendees: 32
    },
    {
      id: '3',
      title: 'Mental Health Awareness',
      date: '2025-01-25',
      time: '09:00',
      status: 'completed',
      attendees: 18
    }
  ];

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle meeting creation logic here
    console.log('Creating meeting:', meetingForm);
    setShowCreateMeeting(false);
    setMeetingForm({ title: '', date: '', time: '', meetingLink: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage virtual medical training sessions and monitor progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Meetings</p>
                <p className="text-2xl font-bold text-gray-800">{dashboardStats.totalMeetings}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-green-600">{dashboardStats.upcomingMeetings}</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-purple-600">{dashboardStats.completedMeetings}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Attendees</p>
                <p className="text-2xl font-bold text-orange-600">{dashboardStats.totalAttendees}</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Attendance</p>
                <p className="text-2xl font-bold text-pink-600">{dashboardStats.averageAttendance}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-pink-600" />
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={() => setShowCreateMeeting(true)}
            className="btn btn-primary"
          >
            <Plus className="w-5 h-5" />
            Create New Meeting
          </button>
          
          <button className="btn btn-outline">
            <BarChart3 className="w-5 h-5" />
            View All Statistics
          </button>
        </div>

        {/* Recent Meetings */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Meetings</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{meeting.title}</h3>
                    <p className="text-sm text-gray-600">
                      {meeting.date} at {meeting.time}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">
                      {meeting.attendees} attendees
                    </div>
                    <div className={`text-xs font-medium ${
                      meeting.status === 'upcoming' ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {meeting.status}
                    </div>
                  </div>
                  
                  <button className="btn btn-outline text-sm px-3 py-1">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Meeting Modal */}
        {showCreateMeeting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="card max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Create New Meeting</h2>
                <button
                  onClick={() => setShowCreateMeeting(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateMeeting} className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Meeting Title</label>
                  <input
                    type="text"
                    value={meetingForm.title}
                    onChange={(e) => setMeetingForm({...meetingForm, title: e.target.value})}
                    className="form-input"
                    placeholder="e.g., Emergency Medicine Training"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      value={meetingForm.date}
                      onChange={(e) => setMeetingForm({...meetingForm, date: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Time</label>
                    <input
                      type="time"
                      value={meetingForm.time}
                      onChange={(e) => setMeetingForm({...meetingForm, time: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Meeting Link</label>
                  <input
                    type="url"
                    value={meetingForm.meetingLink}
                    onChange={(e) => setMeetingForm({...meetingForm, meetingLink: e.target.value})}
                    className="form-input"
                    placeholder="https://zoom.us/j/..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description (Optional)</label>
                  <textarea
                    value={meetingForm.description}
                    onChange={(e) => setMeetingForm({...meetingForm, description: e.target.value})}
                    className="form-input resize-none"
                    rows={3}
                    placeholder="Meeting description..."
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateMeeting(false)}
                    className="btn btn-outline flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex-1"
                  >
                    Create Meeting
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
