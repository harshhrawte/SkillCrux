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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-center text-2xl font-semibold text-gray-900">
          Forgot password
        </h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          Enter your email and we&apos;ll send you instructions to reset your password.
        </p>
        {submitted ? (
          <div className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
            If an account exists for
            {' '}
            <span className="font-medium">{email}</span>
            , you&apos;ll receive an email with reset instructions.
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
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Send reset link
            </button>
          </form>
        )}
        <p className="mt-4 text-center text-sm text-gray-500">
          Remembered your password?
          {' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;




