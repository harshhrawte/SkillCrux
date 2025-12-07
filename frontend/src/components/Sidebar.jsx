import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-gray-200 bg-gray-50 p-4 md:block">
      <div className="mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Navigation
        </h2>
      </div>
      <nav className="space-y-1 text-sm">
        {user?.role === 'student' && (
          <>
            <NavLink
              to="/student"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`
              }
            >
              Student Dashboard
            </NavLink>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`
              }
            >
              Courses
            </NavLink>
          </>
        )}

        {user?.role === 'admin' && (
          <>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`
              }
            >
              Admin Dashboard
            </NavLink>
            <NavLink
              to="/admin/courses"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`
              }
            >
              Manage Courses
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`
              }
            >
              Manage Users
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;




