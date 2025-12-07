import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../api/api";

const CourseDetails = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [courseRes, assignmentsRes] = await Promise.all([
          api.get(`/courses/${id}`),
          api.get(`/assignments/course/${id}`),
        ]);

        setCourse(courseRes.data || null);
        setAssignments(assignmentsRes.data || []);
      } catch (err) {
        console.error("Failed to load course details", err);
        setError(
          err.response?.data?.message ||
            "Unable to load course details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Sidebar />

        <main className="flex-1">
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

          {/* COURSE NOT FOUND */}
          {!loading && !error && !course && (
            <p className="text-sm text-gray-500">Course not found.</p>
          )}

          {/* COURSE DETAILS */}
          {!loading && !error && course && (
            <>
              <header className="mb-4">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {course.title}
                </h1>

                <p className="mt-1 text-sm text-gray-600">
                  {course.description || "No description provided."}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Taught by{" "}
                  <span className="font-medium text-gray-700">
                    {course.teacher_name || "Unknown Instructor"}
                  </span>
                </p>
              </header>

              {/* ASSIGNMENTS */}
              <section>
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Assignments
                  </h2>
                </div>

                <div className="space-y-3">
                  {assignments.length > 0 ? (
                    assignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
                      >
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">
                            {assignment.title}
                          </h3>

                          <p className="mt-1 text-xs text-gray-600">
                            {assignment.description || "No description."}
                          </p>

                          {assignment.due_date && (
                            <p className="mt-1 text-xs text-gray-500">
                              Due:{" "}
                              {new Date(assignment.due_date).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          )}
                        </div>

                        <Link
                          to={`/assignments/${assignment.id}/submit`}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700"
                        >
                          Submit
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No assignments for this course yet.
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

export default CourseDetails;

