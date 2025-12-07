import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  // Safe fallbacks
  const title = course.title || "Untitled Course";
  const description =
    course.description || "No description provided.";
  const teacher =
    course.teacher_name ||
    course.teacher_id ||
    "Unassigned";

  return (
    <div className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      <div>
        {/* Title */}
        <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-2">
          {title}
        </h3>

        {/* Description (truncated for long text) */}
        <p className="mb-3 text-sm text-gray-600 line-clamp-3">
          {description}
        </p>

        {/* Teacher info */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span>
            Teacher:{' '}
            <span className="font-semibold text-gray-700">{teacher}</span>
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <Link
          to={`/courses/${course.id}`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
        >
          View details
        </Link>

        <span className="text-xs font-mono text-gray-400">
          #{course.id}
        </span>
      </div>
    </div>
  );
};

export default CourseCard;


