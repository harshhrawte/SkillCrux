import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // determine dashboard path
  const dashboardPath =
    user?.role === "admin" ? "/admin" : "/student";

  return (
    <nav className="border-b border-gray-200 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* LOGO + TITLE */}
        <Link
          to="/"
          className="flex items-center gap-3 transition hover:opacity-80"
        >
          <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 shadow-md">
            <span className="text-sm font-bold uppercase tracking-wide text-white">
              LMS
            </span>
          </div>
          <span className="text-xl font-bold text-gray-900">
            Learning Portal
          </span>
        </Link>

        {/* AUTH AREA */}
        <div className="flex items-center gap-4">

          {isAuthenticated ? (
            <>
              {/* Signed-in user info */}
              <div className="hidden items-center gap-3 sm:flex">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.name || user?.email}
                  </p>
                  <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold uppercase text-blue-700">
                    {user?.role}
                  </span>
                </div>
              </div>

              {/* Dashboard button */}
              <NavLink
                to={dashboardPath}
                className="hidden rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:border-gray-400 sm:inline-block"
              >
                Dashboard
              </NavLink>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-red-600 hover:shadow-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg"
              >
                Sign Up
              </NavLink>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;


