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
    <div className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div>
        {/* Title */}
        <h3 className="mb-1 text-lg font-semibold text-gray-900 truncate">
          {title}
        </h3>

        {/* Description (truncated for long text) */}
        <p className="mb-2 text-sm text-gray-600 line-clamp-2">
          {description}
        </p>

        {/* Teacher info */}
        <p className="text-xs text-gray-500">
          Teacher:{" "}
          <span className="font-medium text-gray-700">
            {teacher}
          </span>
        </p>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <Link
          to={`/courses/${course.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View details
        </Link>

        <span className="text-xs text-gray-400">
          ID: {course.id}
        </span>
      </div>
    </div>
  );
};

export default CourseCard;

