import React, { useState } from 'react';
import { Upload, FileText, Users, CheckCircle, Clock, Video } from 'lucide-react';
import Header from '../components/Header';

const DataEntryDashboard: React.FC = () => {
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: boolean}>({});

  // Mock meetings data
  const meetings = [
    {
      id: '1',
      title: 'Emergency Medicine Training',
      date: '2025-01-30',
      time: '10:00',
      meetingLink: 'https://zoom.us/j/123456789',
      status: 'upcoming',
      uploads: {
        preTest: false,
        attendance: false,
        postTest: false
      }
    },
    {
      id: '2',
      title: 'Pediatric Care Workshop',
      date: '2025-01-28',
      time: '14:00',
      meetingLink: 'https://meet.google.com/abc-def-ghi',
      status: 'completed',
      uploads: {
        preTest: true,
        attendance: true,
        postTest: false
      }
    },
    {
      id: '3',
      title: 'Mental Health Awareness',
      date: '2025-01-25',
      time: '09:00',
      meetingLink: 'https://webex.com/join/123',
      status: 'completed',
      uploads: {
        preTest: true,
        attendance: true,
        postTest: true
      }
    }
  ];

  const handleFileUpload = (meetingId: string, type: 'preTest' | 'attendance' | 'postTest') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setUploadProgress(prev => ({ ...prev, [`${meetingId}-${type}`]: true }));
        
        // Simulate upload delay
        setTimeout(() => {
          setUploadProgress(prev => ({ ...prev, [`${meetingId}-${type}`]: false }));
          console.log(`Uploaded ${type} file for meeting ${meetingId}:`, file.name);
        }, 2000);
      }
    };
    input.click();
  };

  const getUploadButtonClass = (uploaded: boolean, isUploading: boolean) => {
    if (isUploading) return 'btn btn-outline opacity-50 cursor-not-allowed';
    if (uploaded) return 'btn btn-success';
    return 'btn btn-primary';
  };

  const getUploadButtonText = (uploaded: boolean, isUploading: boolean, type: string) => {
    if (isUploading) return 'Uploading...';
    if (uploaded) return `${type} Uploaded`;
    return `Upload ${type}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Data Entry Dashboard</h1>
          <p className="text-gray-600">Upload meeting data files for pre-test, attendance, and post-test</p>
        </div>

        {/* Meetings List */}
        <div className="space-y-6">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="card">
              {/* Meeting Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className="w-12 h-12 bg-gradient rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{meeting.title}</h2>
                    <p className="text-gray-600">{meeting.date} at {meeting.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    meeting.status === 'upcoming' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {meeting.status === 'upcoming' ? (
                      <>
                        <Clock className="w-4 h-4 inline mr-1" />
                        Upcoming
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                        Completed
                      </>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setSelectedMeeting(selectedMeeting === meeting.id ? null : meeting.id)}
                    className="btn btn-outline text-sm"
                  >
                    {selectedMeeting === meeting.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>

              {/* Meeting Details */}
              {selectedMeeting === meeting.id && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Meeting Link:</h3>
                  <a 
                    href={meeting.meetingLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 break-all"
                  >
                    {meeting.meetingLink}
                  </a>
                </div>
              )}

              {/* Upload Section */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Pre-Test Upload */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-gray-800">Pre-Test Data</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload Excel file containing pre-test scores
                  </p>
                  <button
                    onClick={() => handleFileUpload(meeting.id, 'preTest')}
                    disabled={uploadProgress[`${meeting.id}-preTest`]}
                    className={getUploadButtonClass(
                      meeting.uploads.preTest, 
                      uploadProgress[`${meeting.id}-preTest`]
                    )}
                  >
                    {uploadProgress[`${meeting.id}-preTest`] ? (
                      <>
                        <div className="spinner" />
                        Uploading...
                      </>
                    ) : meeting.uploads.preTest ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Pre-Test Uploaded
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Upload Pre-Test
                      </>
                    )}
                  </button>
                </div>

                {/* Attendance Upload */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Users className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium text-gray-800">Attendance Data</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload Excel file containing attendance records
                  </p>
                  <button
                    onClick={() => handleFileUpload(meeting.id, 'attendance')}
                    disabled={uploadProgress[`${meeting.id}-attendance`]}
                    className={getUploadButtonClass(
                      meeting.uploads.attendance, 
                      uploadProgress[`${meeting.id}-attendance`]
                    )}
                  >
                    {uploadProgress[`${meeting.id}-attendance`] ? (
                      <>
                        <div className="spinner" />
                        Uploading...
                      </>
                    ) : meeting.uploads.attendance ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Attendance Uploaded
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Upload Attendance
                      </>
                    )}
                  </button>
                </div>

                {/* Post-Test Upload */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium text-gray-800">Post-Test Data</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload Excel file containing post-test scores
                  </p>
                  <button
                    onClick={() => handleFileUpload(meeting.id, 'postTest')}
                    disabled={uploadProgress[`${meeting.id}-postTest`]}
                    className={getUploadButtonClass(
                      meeting.uploads.postTest, 
                      uploadProgress[`${meeting.id}-postTest`]
                    )}
                  >
                    {uploadProgress[`${meeting.id}-postTest`] ? (
                      <>
                        <div className="spinner" />
                        Uploading...
                      </>
                    ) : meeting.uploads.postTest ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Post-Test Uploaded
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Upload Post-Test
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Upload Progress Indicator */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Upload Progress:</span>
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-1 ${meeting.uploads.preTest ? 'text-green-600' : 'text-gray-400'}`}>
                      <CheckCircle className="w-4 h-4" />
                      <span>Pre-Test</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${meeting.uploads.attendance ? 'text-green-600' : 'text-gray-400'}`}>
                      <CheckCircle className="w-4 h-4" />
                      <span>Attendance</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${meeting.uploads.postTest ? 'text-green-600' : 'text-gray-400'}`}>
                      <CheckCircle className="w-4 h-4" />
                      <span>Post-Test</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(Object.values(meeting.uploads).filter(Boolean).length / 3) * 100}%` 
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* File Format Guidelines */}
        <div className="mt-8 card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">File Format Guidelines</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Pre-Test Files</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Excel format (.xlsx, .xls)</li>
                <li>• Include participant names</li>
                <li>• Include test scores</li>
                <li>• Date and time columns</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Attendance Files</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Excel format (.xlsx, .xls)</li>
                <li>• Participant names</li>
                <li>• Join/leave timestamps</li>
                <li>• Duration attended</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Post-Test Files</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Excel format (.xlsx, .xls)</li>
                <li>• Include participant names</li>
                <li>• Include test scores</li>
                <li>• Completion timestamps</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataEntryDashboard;
