import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../api/api";

const AdminCourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  // Load courses
  const loadCourses = async () => {
    try {
      const { data } = await api.get("/courses");
      setCourses(data || []);
    } catch (err) {
      console.error("Failed to load courses", err);
      setError("Failed to load courses.");
    }
  };

  // Load teachers (role = teacher)
  const loadTeachers = async () => {
    try {
      const { data } = await api.get("/users");
      const teacherList = (data || []).filter(
        (u) => u.role === "teacher" || u.role === "admin"
      );
      setTeachers(teacherList);
    } catch (err) {
      console.error("Failed to load teachers", err);
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      await Promise.all([loadCourses(), loadTeachers()]);
      setInitialLoading(false);
    };
    loadAll();
  }, []);

  // Create course
  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/courses", {
        title,
        description,
        created_by: teacherId || undefined, // FIXED FIELD NAME
      });

      setTitle("");
      setDescription("");
      setTeacherId("");

      await loadCourses();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to create course.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Delete course
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await api.delete(`/courses/${id}`);
      await loadCourses();
    } catch (err) {
      console.error("Failed to delete course", err);
      alert("Failed to delete course.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Sidebar />

        <main className="flex-1 space-y-6">
          <header>
            <h1 className="text-2xl font-semibold text-gray-900">
              Manage Courses
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Create, update, and delete LMS courses.
            </p>
          </header>

          {/* LOADING */}
          {initialLoading && (
            <div className="flex h-40 items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
          )}

          {!initialLoading && (
            <>
              {/* CREATE COURSE */}
              <section className="rounded-lg bg-white p-4 shadow-sm">
                <h2 className="mb-3 text-sm font-semibold text-gray-900">
                  Create new course
                </h2>

                {error && (
                  <div className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <form
                  onSubmit={handleCreate}
                  className="grid gap-3 md:grid-cols-3"
                >
                  <input
                    type="text"
                    placeholder="Title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />

                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />

                  <div className="flex gap-2">
                    {/* Teacher Dropdown */}
                    <select
                      value={teacherId}
                      onChange={(e) => setTeacherId(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Assign Teacher (optional)</option>
                      {teachers.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.role})
                        </option>
                      ))}
                    </select>

                    <button
                      type="submit"
                      disabled={loading}
                      className="whitespace-nowrap rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? "Saving..." : "Create"}
                    </button>
                  </div>
                </form>
              </section>

              {/* EXISTING COURSES */}
              <section className="rounded-lg bg-white p-4 shadow-sm">
                <h2 className="mb-3 text-sm font-semibold text-gray-900">
                  Existing Courses
                </h2>

                <div className="space-y-2 text-sm">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {course.title}
                        </p>

                        <p className="text-xs text-gray-500">
                          ID: {course.id} • Teacher:{" "}
                          {course.teacher_name ||
                            course.teacher_id ||
                            "Unassigned"}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDelete(course.id)}
                        className="rounded-md bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  ))}

                  {courses.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No courses created yet.
                    </p>
                  )}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminCourseManager;

