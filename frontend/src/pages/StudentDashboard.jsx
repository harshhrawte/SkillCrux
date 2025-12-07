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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Sidebar />

        <main className="flex-1">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Welcome back {user?.name || user?.email}
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                View your courses and submit assignments.
              </p>
            </div>
          </header>

          {/* LOADING */}
          {loading && (
            <div className="flex h-40 items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="rounded-md bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          {/* COURSES */}
          {!loading && !error && (
            <section className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Available courses
                </h2>

                <Link
                  to="/courses"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  View all
                </Link>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {courses.length > 0 ? (
                  courses.slice(0, 6).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No courses available yet.
                  </p>
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

