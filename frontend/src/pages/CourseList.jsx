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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <Sidebar />

        <main className="flex-1">
          <header className="mb-8">
            <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
              <h1 className="text-3xl font-bold">Courses</h1>
              <p className="mt-2 text-blue-100">
                Browse all available courses in the LMS.
              </p>
            </div>
          </header>

          {/* Loading */}
          {loading && (
            <div className="flex h-64 items-center justify-center rounded-xl bg-white p-8 shadow-sm">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 shadow-sm">
              {error}
            </div>
          )}

          {/* Courses */}
          {!loading && !error && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))
              ) : (
                <div className="col-span-full rounded-xl bg-white p-12 text-center shadow-sm">
                  <p className="text-gray-500">
                    No courses are available right now. Check back soon!
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseList;


