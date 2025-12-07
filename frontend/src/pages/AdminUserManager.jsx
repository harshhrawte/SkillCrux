import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const AdminUserManager = () => {
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data || []);
    } catch (err) {
      console.error("Failed to load users", err);
      setError("Unable to load users. Please try again.");
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    setError("");
    setSuccess("");

    // Prevent admin from demoting themselves
    if (id === currentUser?.id && role !== "admin") {
      setError("You cannot change your own role to a non-admin role.");
      return;
    }

    // Confirm action
    if (
      !window.confirm(
        `Are you sure you want to set user ${id} to role "${role}"?`
      )
    ) {
      return;
    }

    setUpdatingId(id);

    try {
      await api.patch(`/users/role/${id}`, { role });
      setSuccess("Role updated successfully.");

      await loadUsers();
    } catch (err) {
      console.error("Failed to update user role", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to update user role.";
      setError(msg);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <Sidebar />

        <main className="flex-1">
          <header className="mb-8">
            <div className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white shadow-lg">
              <h1 className="text-3xl font-bold">Manage Users</h1>
              <p className="mt-2 text-purple-100">
                View and update user roles in the LMS.
              </p>
            </div>
          </header>

          {/* LOADING */}
          {initialLoading && (
            <div className="flex h-64 items-center justify-center rounded-xl bg-white p-8 shadow-sm">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
          )}

          {/* ERROR */}
          {!initialLoading && error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 shadow-sm">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700 shadow-sm">
              {success}
            </div>
          )}

          {!initialLoading && (
            <section className="rounded-xl bg-white p-6 shadow-md">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                        Role
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-white">
                    {users.map((u) => (
                      <tr
                        key={u.id}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-gray-600">
                          {u.id}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                          {u.name || '-'}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                          {u.email}
                        </td>

                        {/* DISPLAY ROLE */}
                        <td className="whitespace-nowrap px-4 py-3">
                          <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase text-gray-700">
                            {u.role}
                          </span>
                        </td>

                        {/* ROLE BUTTONS */}
                        <td className="whitespace-nowrap px-4 py-3 text-right">
                          <div className="inline-flex gap-2">
                            {['student', 'teacher', 'admin'].map((role) => (
                              <button
                                key={role}
                                disabled={updatingId === u.id}
                                onClick={() => handleRoleChange(u.id, role)}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                                  u.role === role
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                              >
                                {role}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}

                    {users.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-12 text-center text-sm text-gray-500"
                        >
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminUserManager;


