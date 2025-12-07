const submissionModel = require('../models/submissionModel');
const assignmentModel = require('../models/assignmentModel');
const courseService = require('./courseService');

const createSubmission = async ({
  assignmentId,
  studentId,
  content,
  grade,
}) => {
  const assignment = await assignmentModel.getAssignmentById(assignmentId);
  if (!assignment) {
    const error = new Error('Assignment not found');
    error.statusCode = 404;
    throw error;
  }

  return submissionModel.createSubmission({
    assignmentId,
    studentId,
    content,
    grade,
  });
};

const listByAssignment = async (assignmentId, requester) => {
  const assignment = await assignmentModel.getAssignmentById(assignmentId);
  if (!assignment) {
    const error = new Error('Assignment not found');
    error.statusCode = 404;
    throw error;
  }

  if (requester.role === 'student') {
    const error = new Error('Students cannot view all submissions');
    error.statusCode = 403;
    throw error;
  }

  const course = await courseService.getCourse(assignment.course_id);
  if (
    requester.role === 'teacher' &&
    course.teacher_id !== requester.id
  ) {
    const error = new Error('Teachers can only view submissions for their courses');
    error.statusCode = 403;
    throw error;
  }

  return submissionModel.getSubmissionsByAssignment(assignmentId);
};

module.exports = {
  createSubmission,
  listByAssignment,
};



