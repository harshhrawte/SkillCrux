import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import CourseCard from "../components/CourseCard";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get("/courses");
        setCourses(data || []);
      } catch (err) {
        console.error("Failed to load courses", err);
        setError("Unable to load courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <Sidebar />

        <main className="flex-1">
          <header className="mb-8">
            <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
              <h1 className="text-3xl font-bold">
                Welcome back, {user?.name || user?.email}
              </h1>
              <p className="mt-2 text-blue-100">
                View your courses and submit assignments.
              </p>
            </div>
          </header>

          {/* LOADING */}
          {loading && (
            <div className="flex h-64 items-center justify-center rounded-xl bg-white p-8 shadow-sm">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 shadow-sm">
              {error}
            </div>
          )}

          {/* COURSES */}
          {!loading && !error && (
            <section className="mb-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Available courses
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Explore courses and start learning
                  </p>
                </div>

                <Link
                  to="/courses"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg"
                >
                  View all
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses.length > 0 ? (
                  courses.slice(0, 6).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))
                ) : (
                  <div className="col-span-full rounded-xl bg-white p-12 text-center shadow-sm">
                    <p className="text-gray-500">
                      No courses available yet. Check back soon!
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;


