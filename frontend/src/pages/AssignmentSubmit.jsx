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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Sidebar />

        <main className="flex-1">
          <header className="mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Submit Assignment
            </h1>

            <p className="mt-1 text-sm text-gray-600">
              Assignment ID:{" "}
              <span className="font-mono text-gray-800">{assignmentId}</span>
            </p>
          </header>

          <div className="rounded-lg bg-white p-4 shadow-sm">
            {error && (
              <div className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-3 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
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
                  rows={6}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
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

