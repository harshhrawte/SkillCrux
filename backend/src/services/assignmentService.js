const assignmentModel = require('../models/assignmentModel');
const courseService = require('./courseService');

const createAssignment = async ({
  courseId,
  title,
  description,
  dueDate,
  requester,
}) => {
  const course = await courseService.getCourse(courseId);

  if (
    requester.role === 'teacher' &&
    course.teacher_id !== requester.id
  ) {
    const error = new Error('Teachers can only manage their course assignments');
    error.statusCode = 403;
    throw error;
  }

  return assignmentModel.createAssignment({
    courseId,
    title,
    description,
    dueDate,
  });
};

const listByCourse = async (courseId, requester) => {
  const course = await courseService.getCourse(courseId);
  if (
    requester &&
    requester.role === 'teacher' &&
    course.teacher_id !== requester.id
  ) {
    const error = new Error('Teachers can only view assignments for their courses');
    error.statusCode = 403;
    throw error;
  }

  return assignmentModel.getAssignmentsByCourse(courseId);
};

const deleteAssignment = async (assignmentId, requester) => {
  const assignment = await assignmentModel.getAssignmentById(assignmentId);
  if (!assignment) {
    const error = new Error('Assignment not found');
    error.statusCode = 404;
    throw error;
  }

  const course = await courseService.getCourse(assignment.course_id);
  if (
    requester.role === 'teacher' &&
    course.teacher_id !== requester.id
  ) {
    const error = new Error('Teachers can only delete their course assignments');
    error.statusCode = 403;
    throw error;
  }

  return assignmentModel.deleteAssignment(assignmentId);
};

module.exports = {
  createAssignment,
  listByCourse,
  deleteAssignment,
};



