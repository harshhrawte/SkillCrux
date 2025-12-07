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
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* LOGO + TITLE */}
        <Link to="/" className="flex items-center gap-2">
          <span className="rounded bg-blue-600 px-2 py-1 text-xs font-bold uppercase tracking-wide text-white">
            LMS
          </span>
          <span className="text-lg font-semibold text-gray-900">
            Learning Portal
          </span>
        </Link>

        {/* AUTH AREA */}
        <div className="flex items-center gap-4">

          {isAuthenticated ? (
            <>
              {/* Signed-in user info */}
              <span className="hidden text-sm text-gray-600 sm:inline">
                Hello,{" "}
                <span className="font-semibold text-gray-900">
                  {user?.name || user?.email}
                </span>
                {" "}
                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium uppercase text-gray-700">
                  {user?.role}
                </span>
              </span>

              {/* Dashboard button */}
              <NavLink
                to={dashboardPath}
                className="hidden rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 sm:inline"
              >
                Dashboard
              </NavLink>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
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

