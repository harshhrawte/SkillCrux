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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Sidebar />

        <main className="flex-1">
          <header className="mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Manage Users
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              View and update user roles in the LMS.
            </p>
          </header>

          {/* LOADING */}
          {initialLoading && (
            <div className="flex h-40 items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
          )}

          {/* ERROR */}
          {!initialLoading && error && (
            <div className="mb-3 rounded-md bg-red-50 px-4 py-2 text-red-700">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mb-3 rounded-md bg-green-50 px-4 py-2 text-green-700">
              {success}
            </div>
          )}

          {!initialLoading && (
            <section className="rounded-lg bg-white p-4 shadow-sm">
              <div className="overflow-x-auto text-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">
                        ID
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">
                        Name
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">
                        Email
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">
                        Role
                      </th>
                      <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-white">
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-gray-500">
                          {u.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2">
                          {u.name || "-"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-gray-700">
                          {u.email}
                        </td>

                        {/* DISPLAY ROLE */}
                        <td className="whitespace-nowrap px-3 py-2">
                          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 uppercase">
                            {u.role}
                          </span>
                        </td>

                        {/* ROLE BUTTONS */}
                        <td className="whitespace-nowrap px-3 py-2 text-right">
                          <div className="inline-flex gap-2">
                            {["student", "teacher", "admin"].map((role) => (
                              <button
                                key={role}
                                disabled={updatingId === u.id}
                                onClick={() => handleRoleChange(u.id, role)}
                                className={`rounded-md px-2 py-1 text-xs font-medium ${
                                  u.role === role
                                    ? "bg-blue-600 text-white"
                                    : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
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
                          className="px-3 py-4 text-center text-sm text-gray-500"
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

