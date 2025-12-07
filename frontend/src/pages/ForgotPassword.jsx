import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // This frontend-only implementation just shows a success message.
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2">
              <span className="text-sm font-bold text-white">LMS</span>
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Forgot password
          </h1>
          <p className="text-sm text-gray-600">
            Enter your email and we&apos;ll send you instructions to reset your
            password.
          </p>
        </div>
        {submitted ? (
          <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
            If an account exists for{' '}
            <span className="font-semibold">{email}</span>, you&apos;ll receive
            an email with reset instructions.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg"
            >
              Send reset link
            </button>
          </form>
        )}
        <p className="mt-6 text-center text-sm text-gray-600">
          Remembered your password?{' '}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;





