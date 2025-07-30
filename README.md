# Medi Guru - Virtual Medical Training Portal

A modern web application for managing virtual medical training sessions and monitoring progress. Built for District Administration, Raipur | Health & Family Welfare Department.

## 🏥 Features

### Admin Dashboard
- **Create Meetings**: Set up virtual training sessions with Zoom/Google Meet/Webex links
- **View Statistics**: Monitor attendance, test scores, and overall performance
- **Dashboard Overview**: Complete overview of all meetings and metrics

### Data Entry Dashboard
- **Meeting Details**: View all meeting information and links
- **File Uploads**: Upload Excel files for:
  - Pre-test data
  - Attendance records
  - Post-test data
- **Progress Tracking**: Visual indicators for upload completion

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Pure CSS with Gradient Themes
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **State Management**: React Hooks

## 🎨 Design Features

- **Beautiful Gradient UI**: Modern gradient-based design system
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Role-based Authentication**: Secure login with role selection
- **Interactive Components**: Smooth animations and transitions
- **Glass-morphism Effects**: Modern backdrop blur effects

## 📋 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 👥 User Roles

### Admin Access
- **Email**: admin@raipur.gov.in
- **Capabilities**:
  - Create new meetings
  - View meeting statistics
  - Access dashboard analytics
  - Monitor overall progress

### Data Entry Operator Access
- **Email**: dataentry@raipur.gov.in
- **Capabilities**:
  - View meeting details
  - Upload pre-test Excel files
  - Upload attendance Excel files
  - Upload post-test Excel files

## 📁 File Upload Guidelines

### Pre-Test Files
- Excel format (.xlsx, .xls)
- Must include participant names
- Include test scores
- Date and time columns required

### Attendance Files
- Excel format (.xlsx, .xls)
- Participant names
- Join/leave timestamps
- Duration attended

### Post-Test Files
- Excel format (.xlsx, .xls)
- Participant names
- Test scores
- Completion timestamps

## 🔐 Security Features

- Role-based access control
- JWT token authentication (ready for backend integration)
- Protected routes
- Secure file upload handling

## 🎯 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Application header
│   ├── Login.tsx       # Login page with role selection
│   └── ProtectedRoute.tsx # Route protection
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── pages/              # Main application pages
│   ├── AdminDashboard.tsx
│   └── DataEntryDashboard.tsx
├── services/           # API and service layers
│   └── authService.ts  # Authentication service
├── types/              # TypeScript type definitions
│   └── index.ts        # Application types
├── App.tsx             # Main app component
├── main.tsx            # Application entry point
└── index.css           # Global styles and utilities
```

## 🌟 Key Features

### Beautiful UI Components
- Gradient-themed design system
- Glass-morphism effects
- Smooth animations
- Responsive grid layouts
- Interactive buttons and forms

### Dashboard Analytics
- Meeting statistics
- Attendance tracking
- Test score monitoring
- Progress visualization

### File Management
- Drag & drop upload support
- Progress indicators
- File validation
- Upload status tracking

## 🔧 Customization

The application uses a CSS-based design system that can be easily customized:

- **Colors**: Modify gradient colors in `index.css`
- **Typography**: Adjust font settings
- **Spacing**: Update margin and padding utilities
- **Components**: Customize component styles

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Deployment Ready

The application is ready for deployment with:
- Optimized production builds
- Environment variable support
- Static asset optimization
- Modern browser compatibility

## 📞 Support

For support and questions regarding the Medi Guru portal, please contact:
- **CMHO Office, Raipur**
- **District Administration, Raipur**
- **Health & Family Welfare Department, CG**

---

**© 2025 CMHO Office, Raipur. All rights reserved.**
