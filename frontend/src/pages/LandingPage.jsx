import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();

  const dashboardPath = user?.role === 'admin' ? '/admin' : '/student';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          {/* Logo/Brand */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-3 rounded-2xl bg-blue-600 px-6 py-3 shadow-lg">
              <span className="text-2xl font-bold text-white">LMS</span>
              <span className="text-lg font-semibold text-blue-100">
                Learning Portal
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Learn, Grow, Succeed
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 sm:text-2xl">
            Your comprehensive learning management system for courses,
            assignments, and academic excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {isAuthenticated ? (
              <>
                <Link
                  to={dashboardPath}
                  className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
                >
                  Go to Dashboard
                </Link>
                <Link
                  to="/courses"
                  className="rounded-lg border-2 border-blue-600 px-8 py-3 text-lg font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Browse Courses
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="rounded-lg border-2 border-blue-600 px-8 py-3 text-lg font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Comprehensive Courses
            </h3>
            <p className="text-sm text-gray-600">
              Access a wide range of courses designed to enhance your learning
              journey.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
              <svg
                className="h-6 w-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Easy Assignments
            </h3>
            <p className="text-sm text-gray-600">
              Submit assignments seamlessly and track your progress with ease.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Role-Based Access
            </h3>
            <p className="text-sm text-gray-600">
              Tailored experiences for students, teachers, and administrators.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

