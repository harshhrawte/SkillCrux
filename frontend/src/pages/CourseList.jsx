import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../api/api";
import CourseCard from "../components/CourseCard";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get("/courses");
        setCourses(data || []);
      } catch (err) {
        console.error("Failed to fetch courses", err);
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
          <header className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Courses</h1>
            <p className="mt-1 text-sm text-gray-600">
              Browse all available courses in the LMS.
            </p>
          </header>

          {/* Loading */}
          {loading && (
            <div className="flex h-40 items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-md bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          {/* Courses */}
          {!loading && !error && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No courses are available right now.
                </p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseList;

