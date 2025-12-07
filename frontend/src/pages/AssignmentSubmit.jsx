import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../api/api";

const AssignmentSubmit = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { data } = await api.post("/submissions", {
        assignment_id: assignmentId, // FIXED FIELD NAME
        content: content,           // If backend expects 'file_url', adjust accordingly
      });

      setSuccess("Submission created successfully.");

      // After success, redirect to previous page or student dashboard
      setTimeout(() => {
        navigate(-1, { replace: true });
      }, 1200);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to submit assignment.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <Sidebar />

        <main className="flex-1">
          <header className="mb-8">
            <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
              <h1 className="text-3xl font-bold">Submit Assignment</h1>
              <p className="mt-2 text-sm text-blue-100">
                Assignment ID:{' '}
                <span className="font-mono font-semibold">{assignmentId}</span>
              </p>
            </div>
          </header>

          <div className="rounded-xl bg-white p-6 shadow-md">
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* CONTENT FIELD */}
              <div>
                <label
                  htmlFor="content"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Submission content
                </label>

                <textarea
                  id="content"
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter your submission content here..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="rounded-lg border-2 border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AssignmentSubmit;


