# 🎓 Learning Management System (LMS)
<div align="center">

### A Production-Grade Full-Stack Learning Management System

**Modern • Scalable • Secure**

[Features](#-features) • [Tech Stack](#️-tech-stack) • [Architecture](#-system-architecture) • [Getting Started](#-quick-start) • [API Docs](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Authentication Flow](#-authentication-flow)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [User Roles & Permissions](#-user-roles--permissions)
- [Screenshots](#-screenshots)
- [Environment Setup](#-environment-setup)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

A comprehensive **Learning Management System** built from the ground up using cutting-edge technologies. This platform enables educational institutions to manage courses, assignments, submissions, and user roles with enterprise-level security and scalability.

### 🎯 Key Highlights

- ✅ **20+ Backend Modules** - Fully modularized MVC architecture
- ✅ **15+ React Components** - Modern, responsive UI/UX
- ✅ **Production-Ready** - JWT auth, role-based access, error handling
- ✅ **Cloud-Native** - Supabase PostgreSQL integration
- ✅ **Type-Safe** - Structured validation and error handling
- ✅ **Scalable** - Designed for enterprise-level usage

---

## ✨ Features

### 🔐 Authentication & Security

```
┌─────────────────────────────────────┐
│  Login → JWT Generation             │
│  ↓                                   │
│  Access Token (15min) ✓             │
│  Refresh Token (7days) ✓            │
│  ↓                                   │
│  Auto Token Refresh ✓               │
│  Protected Routes ✓                 │
└─────────────────────────────────────┘
```

- 🔑 JWT-based authentication with Access + Refresh Token flow
- 🛡️ Password hashing with bcrypt (10 rounds)
- 🔄 Automatic token refresh with Axios interceptors
- 🚪 Protected routes with middleware validation
- 🔒 Role-based authorization (Admin/Teacher/Student)
- 📧 Forgot password & email verification

### 👥 User Management System

- **Multi-Role Architecture**: Admin, Teacher, Student
- **Admin Dashboard**: Complete user CRUD operations
- **Role Management**: Dynamic role assignment & updates
- **Profile System**: User profile with editable fields
- **Access Control**: Granular permission management

### 📚 Course Management

- ➕ **Create Courses** - Teachers can create new courses
- 📝 **Edit/Update** - Full CRUD operations on courses
- 🗑️ **Delete Courses** - Admin-level course removal
- 👥 **Enrollment System** - Students can enroll in courses
- 📊 **Course Analytics** - Track enrollments and engagement
- 🎯 **Assignment Integration** - Courses linked to assignments

### 📝 Assignment & Submission System

- 📤 **Assignment Upload** - Teachers create assignments with deadlines
- 📥 **Student Submissions** - File upload with Multer
- ⏰ **Deadline Tracking** - Automatic deadline enforcement
- ✅ **Grading System** - Teacher/Admin grading interface
- 📊 **Submission History** - Complete audit trail
- 🔔 **Notifications** - Assignment reminders (future feature)

### 🎨 Modern UI/UX

- 📱 **Fully Responsive** - Mobile, tablet, and desktop optimized
- 🎨 **Tailwind CSS** - Utility-first styling
- 🌙 **Dark Mode Ready** - Easy theme switching
- ⚡ **Fast Loading** - Optimized with Vite
- 🔄 **Real-time Updates** - Context API state management
- 🎯 **Intuitive Navigation** - Sidebar + Navbar layout

---

## 🛠️ Tech Stack

### Frontend Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Library | ^18.2.0 |
| **Vite** | Build Tool | ^5.0.0 |
| **Tailwind CSS** | Styling Framework | ^3.4.0 |
| **React Router** | Client-side Routing | ^6.20.0 |
| **Axios** | HTTP Client | ^1.6.0 |
| **Context API** | State Management | Built-in |

### Backend Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | JavaScript Runtime | ^18.0.0 |
| **Express.js** | Web Framework | ^4.18.0 |
| **JWT** | Authentication | ^9.0.0 |
| **bcrypt** | Password Hashing | ^5.1.0 |
| **Multer** | File Upload | ^1.4.5 |
| **pg** | PostgreSQL Client | ^8.11.0 |

### Database & Cloud

| Service | Purpose |
|---------|---------|
| **Supabase PostgreSQL** | Primary Database |
| **Supabase Storage** | File Storage |
| **Environment Variables** | Configuration Management |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Login   │  │Dashboard │  │ Courses  │  │Assignments│   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │              │              │          │
│       └─────────────┴──────────────┴──────────────┘          │
│                         ↓ HTTP/HTTPS                         │
└─────────────────────────┼───────────────────────────────────┘
                          │
┌─────────────────────────┼───────────────────────────────────┐
│                    API GATEWAY LAYER                         │
│                   ┌─────┴─────┐                              │
│                   │  Express  │                              │
│                   │  Server   │                              │
│                   └─────┬─────┘                              │
│                         │                                     │
│    ┌────────────────────┼────────────────────┐              │
│    │                    │                    │               │
│    ↓                    ↓                    ↓               │
│ ┌──────┐          ┌──────────┐         ┌────────┐          │
│ │ Auth │          │   RBAC   │         │ Error  │          │
│ │ MW   │    →     │Middleware│    →    │Handler │          │
│ └──────┘          └──────────┘         └────────┘          │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────────┐
│                   BUSINESS LOGIC LAYER                       │
│                          │                                    │
│    ┌─────────────────────┼─────────────────────┐            │
│    │         │           │           │          │            │
│    ↓         ↓           ↓           ↓          ↓            │
│ ┌──────┐ ┌────────┐ ┌────────┐ ┌──────────┐ ┌──────┐      │
│ │ Auth │ │ Course │ │Assignmt│ │Submission│ │ User │      │
│ │ Ctrl │ │  Ctrl  │ │  Ctrl  │ │   Ctrl   │ │ Ctrl │      │
│ └───┬──┘ └────┬───┘ └────┬───┘ └─────┬────┘ └───┬──┘      │
│     │         │           │           │          │           │
│     └─────────┴───────────┴───────────┴──────────┘           │
│                           ↓                                   │
│                   ┌──────────────┐                           │
│                   │   Services   │                           │
│                   └───────┬──────┘                           │
└───────────────────────────┼──────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────┐
│                    DATA ACCESS LAYER                         │
│                           │                                   │
│                   ┌───────┴────────┐                         │
│                   │     Models     │                         │
│                   │  User | Course │                         │
│                   │ Assign | Submit│                         │
│                   └───────┬────────┘                         │
└───────────────────────────┼──────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────┐
│                      DATABASE LAYER                          │
│                   ┌───────┴────────┐                         │
│                   │    Supabase    │                         │
│                   │   PostgreSQL   │                         │
│                   └────────────────┘                         │
└──────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

### 🔙 Backend Architecture (20+ Files)

```
backend/
├── 📂 config/
│   ├── database.js              # Supabase connection pool
│   └── env.js                   # Environment variables config
│
├── 📂 routes/
│   ├── authRoutes.js            # POST /login, /signup, /refresh
│   ├── courseRoutes.js          # GET, POST, PUT, DELETE /courses
│   ├── assignmentRoutes.js      # CRUD for assignments
│   ├── submissionRoutes.js      # Handle submissions & grading
│   └── userRoutes.js            # User management endpoints
│
├── 📂 controllers/
│   ├── authController.js        # Authentication logic
│   ├── courseController.js      # Course business logic
│   ├── assignmentController.js  # Assignment operations
│   ├── submissionController.js  # Submission handling
│   └── userController.js        # User CRUD operations
│
├── 📂 services/
│   ├── authService.js           # Token generation/validation
│   ├── emailService.js          # Email notifications
│   └── fileService.js           # File upload handling
│
├── 📂 models/
│   ├── userModel.js             # User database queries
│   ├── courseModel.js           # Course database queries
│   ├── assignmentModel.js       # Assignment database queries
│   └── submissionModel.js       # Submission database queries
│
├── 📂 middlewares/
│   ├── authMiddleware.js        # JWT verification
│   ├── roleMiddleware.js        # Role-based access control
│   ├── errorHandler.js          # Global error handler
│   ├── validation.js            # Request validation
│   └── upload.js                # Multer configuration
│
├── 📂 utils/
│   ├── responseHandler.js       # Standardized API responses
│   └── logger.js                # Logging utility
│
├── server.js                    # Express app entry point
├── .env                         # Environment variables
└── package.json                 # Dependencies
```

### 🎨 Frontend Architecture (15+ Components)

```
frontend/
├── 📂 src/
│   ├── 📂 pages/
│   │   ├── Login.jsx                # User authentication
│   │   ├── Signup.jsx               # User registration
│   │   ├── ForgotPassword.jsx       # Password reset flow
│   │   ├── StudentDashboard.jsx     # Student home view
│   │   ├── TeacherDashboard.jsx     # Teacher home view
│   │   ├── AdminDashboard.jsx       # Admin control panel
│   │   ├── CourseList.jsx           # Browse all courses
│   │   ├── CourseDetails.jsx        # Single course view
│   │   ├── AssignmentSubmit.jsx     # Submit assignment form
│   │   ├── AdminCourseManager.jsx   # Course CRUD interface
│   │   ├── AdminUserManager.jsx     # User management panel
│   │   └── Profile.jsx              # User profile page
│   │
│   ├── 📂 components/
│   │   ├── Navbar.jsx               # Top navigation bar
│   │   ├── Sidebar.jsx              # Side navigation menu
│   │   ├── CourseCard.jsx           # Reusable course card
│   │   ├── AssignmentCard.jsx       # Reusable assignment card
│   │   ├── ProtectedRoute.jsx       # Route guard component
│   │   ├── LoadingSpinner.jsx       # Loading indicator
│   │   ├── ErrorBoundary.jsx        # Error boundary wrapper
│   │   └── Modal.jsx                # Reusable modal component
│   │
│   ├── 📂 context/
│   │   ├── AuthContext.jsx          # Global auth state
│   │   └── ThemeContext.jsx         # Theme management
│   │
│   ├── 📂 api/
│   │   ├── axios.js                 # Configured Axios instance
│   │   ├── authApi.js               # Auth API calls
│   │   ├── courseApi.js             # Course API calls
│   │   └── assignmentApi.js         # Assignment API calls
│   │
│   ├── 📂 hooks/
│   │   ├── useAuth.js               # Custom auth hook
│   │   └── useFetch.js              # Custom fetch hook
│   │
│   ├── 📂 utils/
│   │   ├── constants.js             # App constants
│   │   └── helpers.js               # Helper functions
│   │
│   ├── App.jsx                      # Root component
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Global styles
│
├── public/                          # Static assets
├── index.html                       # HTML template
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind configuration
└── package.json                     # Dependencies
```

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```
┌─────────────────┐         ┌─────────────────┐
│     USERS       │         │    COURSES      │
├─────────────────┤         ├─────────────────┤
│ PK id           │────┐    │ PK id           │
│    email        │    │    │    title        │
│    password     │    │    │    description  │
│    role         │    │    │ FK teacher_id   │──┐
│    name         │    │    │    created_at   │  │
│    created_at   │    │    └─────────────────┘  │
└─────────────────┘    │              │          │
                       │              │          │
                       │    ┌─────────┘          │
                       │    │                    │
                       │    ↓                    │
                       │ ┌─────────────────┐    │
                       │ │  ASSIGNMENTS    │    │
                       │ ├─────────────────┤    │
                       │ │ PK id           │    │
                       │ │ FK course_id    │────┘
                       │ │    title        │
                       │ │    description  │
                       │ │    deadline     │
                       │ │    created_at   │
                       │ └─────────────────┘
                       │          │
                       │          │
                       │    ┌─────┘
                       │    │
                       │    ↓
                       │ ┌─────────────────┐
                       │ │  SUBMISSIONS    │
                       │ ├─────────────────┤
                       │ │ PK id           │
                       └─│ FK student_id   │
                         │ FK assignment_id│
                         │    file_url     │
                         │    submitted_at │
                         │    grade        │
                         └─────────────────┘
```

### 📊 Table Specifications

#### **Users Table**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) CHECK (role IN ('admin', 'teacher', 'student')),
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Courses Table**
```sql
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  teacher_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Assignments Table**
```sql
CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  deadline TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Submissions Table**
```sql
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  assignment_id INTEGER REFERENCES assignments(id) ON DELETE CASCADE,
  student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  file_url VARCHAR(500),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  grade INTEGER CHECK (grade >= 0 AND grade <= 100)
);
```

---

## 🔐 Authentication Flow

### JWT Token Flow Diagram

```
┌─────────────┐                                    ┌─────────────┐
│   CLIENT    │                                    │   SERVER    │
└──────┬──────┘                                    └──────┬──────┘
       │                                                  │
       │  1. POST /api/auth/login                        │
       │     { email, password }                         │
       │─────────────────────────────────────────────────>│
       │                                                  │
       │                                2. Validate       │
       │                                   Credentials    │
       │                                                  │
       │  3. Return Tokens                               │
       │     { accessToken, refreshToken }               │
       │<─────────────────────────────────────────────────│
       │                                                  │
       │  4. Store Tokens                                │
       │     - Access in Memory                          │
       │     - Refresh in httpOnly Cookie                │
       │                                                  │
       │  5. GET /api/courses                            │
       │     Headers: Authorization: Bearer <accessToken>│
       │─────────────────────────────────────────────────>│
       │                                                  │
       │                                6. Verify JWT     │
       │                                   & Role         │
       │                                                  │
       │  7. Return Data                                 │
       │     { courses: [...] }                          │
       │<─────────────────────────────────────────────────│
       │                                                  │
       │  8. (After 15min) GET /api/assignments          │
       │     Headers: Authorization: Bearer <expired>    │
       │─────────────────────────────────────────────────>│
       │                                                  │
       │  9. 401 Unauthorized                            │
       │<─────────────────────────────────────────────────│
       │                                                  │
       │  10. POST /api/auth/refresh                     │
       │      Cookie: refreshToken                       │
       │─────────────────────────────────────────────────>│
       │                                                  │
       │                               11. Verify Refresh │
       │                                    Token         │
       │                                                  │
       │  12. New Access Token                           │
       │      { accessToken }                            │
       │<─────────────────────────────────────────────────│
       │                                                  │
       │  13. Retry Original Request                     │
       │─────────────────────────────────────────────────>│
       │                                                  │
       │  14. Success Response                           │
       │<─────────────────────────────────────────────────│
       │                                                  │
```

### 🔑 Token Configuration

| Token Type | Expiry | Storage | Purpose |
|------------|--------|---------|---------|
| **Access Token** | 15 minutes | Memory | API authentication |
| **Refresh Token** | 7 days | httpOnly Cookie | Token renewal |

---

## 🚀 Quick Start

### Prerequisites Checklist

- [ ] Node.js v16.0.0 or higher
- [ ] npm v8.0.0 or higher (or yarn)
- [ ] Supabase account
- [ ] Git installed

### Installation Steps

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/lms-system.git
cd lms-system
```

#### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
nano .env

# Run database migrations (if applicable)
npm run migrate

# Start development server
npm run dev
```

**Backend will run on:** `http://localhost:5000`

#### 3️⃣ Frontend Setup

```bash
# Open new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with backend URL
nano .env

# Start development server
npm run dev
```

**Frontend will run on:** `http://localhost:5173`

#### 4️⃣ Access the Application

1. Open browser and navigate to `http://localhost:5173`
2. Create an admin account or use default credentials
3. Start exploring the LMS!

---

## 🔧 Environment Setup

### Backend `.env` Configuration

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://user:password@host:port/database
DB_POOL_MAX=20
DB_POOL_IDLE_TIMEOUT=30000

# JWT Configuration
JWT_ACCESS_SECRET=your_super_secret_access_key_min_32_chars
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_32_chars
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# File Upload Configuration
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=pdf,doc,docx,txt

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### Frontend `.env` Configuration

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_TIMEOUT=30000

# Application Configuration
VITE_APP_NAME=Learning Management System
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DARK_MODE=true
```

---

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register new user | ❌ |
| POST | `/auth/login` | User login | ❌ |
| POST | `/auth/refresh` | Refresh access token | ✅ (Refresh) |
| POST | `/auth/logout` | Logout user | ✅ |
| POST | `/auth/forgot-password` | Request password reset | ❌ |
| POST | `/auth/reset-password` | Reset password with token | ❌ |

#### Example: User Login

```javascript
// Request
POST /api/auth/login
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "SecurePass123!"
}

// Response (200 OK)
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "student@example.com",
      "name": "John Doe",
      "role": "student"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Course Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/courses` | Get all courses | All |
| GET | `/courses/:id` | Get course by ID | All |
| POST | `/courses` | Create new course | Teacher, Admin |
| PUT | `/courses/:id` | Update course | Teacher, Admin |
| DELETE | `/courses/:id` | Delete course | Admin |
| POST | `/courses/:id/enroll` | Enroll in course | Student |

#### Example: Create Course

```javascript
// Request
POST /api/courses
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Introduction to React",
  "description": "Learn React from scratch"
}

// Response (201 Created)
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "id": 5,
    "title": "Introduction to React",
    "description": "Learn React from scratch",
    "teacher_id": 2,
    "created_at": "2024-12-07T10:30:00Z"
  }
}
```
