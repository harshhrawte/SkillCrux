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
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Sidebar />
        <main className="flex-1">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Admin dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage courses and users across the LMS.
              </p>
            </div>
          </header>

          <section className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h2 className="text-sm font-medium text-gray-500">Total users</h2>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {stats.users}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h2 className="text-sm font-medium text-gray-500">
                Total courses
              </h2>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {stats.courses}
              </p>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <Link
              to="/admin/courses"
              className="rounded-lg bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Manage courses
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Create, update, and delete LMS courses.
              </p>
            </Link>
            <Link
              to="/admin/users"
              className="rounded-lg bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Manage users
              </h3>
              <p className="mt-1 text-sm text-gray-600">
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




