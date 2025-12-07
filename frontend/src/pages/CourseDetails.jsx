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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <Sidebar />

        <main className="flex-1">
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

          {/* COURSE NOT FOUND */}
          {!loading && !error && !course && (
            <div className="rounded-xl bg-white p-12 text-center shadow-sm">
              <p className="text-gray-500">Course not found.</p>
            </div>
          )}

          {/* COURSE DETAILS */}
          {!loading && !error && course && (
            <>
              <header className="mb-8">
                <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
                  <h1 className="text-3xl font-bold">{course.title}</h1>
                  <p className="mt-2 text-blue-100">
                    {course.description || 'No description provided.'}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-sm text-blue-100">
                      Taught by{' '}
                      <span className="font-semibold">
                        {course.teacher_name || 'Unknown Instructor'}
                      </span>
                    </span>
                  </div>
                </div>
              </header>

              {/* ASSIGNMENTS */}
              <section>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Assignments
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    View and submit your assignments
                  </p>
                </div>

                <div className="space-y-4">
                  {assignments.length > 0 ? (
                    assignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className="flex items-center justify-between rounded-xl bg-white p-5 shadow-md transition hover:shadow-lg"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {assignment.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">
                            {assignment.description || 'No description.'}
                          </p>
                          {assignment.due_date && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span>
                                Due:{' '}
                                {new Date(
                                  assignment.due_date
                                ).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </span>
                            </div>
                          )}
                        </div>

                        <Link
                          to={`/assignments/${assignment.id}/submit`}
                          className="ml-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg"
                        >
                          Submit
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl bg-white p-12 text-center shadow-sm">
                      <p className="text-gray-500">
                        No assignments for this course yet.
                      </p>
                    </div>
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


