import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import api from '../api/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, courses: 0 });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [usersRes, coursesRes] = await Promise.all([
          api.get('/users'),
          api.get('/courses'),
        ]);
        setStats({
          users: usersRes.data?.length || 0,
          courses: coursesRes.data?.length || 0,
        });
      } catch (err) {
        console.error('Failed to load admin stats', err);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <Sidebar />
        <main className="flex-1">
          <header className="mb-8">
            <div className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white shadow-lg">
              <h1 className="text-3xl font-bold">Admin dashboard</h1>
              <p className="mt-2 text-purple-100">
                Manage courses and users across the LMS.
              </p>
            </div>
          </header>

          <section className="mb-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-sm font-medium text-gray-500">
                  Total users
                </h2>
              </div>
              <p className="mt-2 text-4xl font-bold text-gray-900">
                {stats.users}
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h2 className="text-sm font-medium text-gray-500">
                  Total courses
                </h2>
              </div>
              <p className="mt-2 text-4xl font-bold text-gray-900">
                {stats.courses}
              </p>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <Link
              to="/admin/courses"
              className="group rounded-xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Manage courses
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Create, update, and delete LMS courses.
              </p>
            </Link>
            <Link
              to="/admin/users"
              className="group rounded-xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 group-hover:bg-purple-200 transition">
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Manage users</h3>
              <p className="mt-2 text-sm text-gray-600">
                View user accounts and adjust their roles.
              </p>
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;





