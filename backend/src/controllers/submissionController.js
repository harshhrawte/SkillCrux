const submissionService = require('../services/submissionService');
const asyncHandler = require('../utils/asyncHandler');

const createSubmission = asyncHandler(async (req, res) => {
  const submission = await submissionService.createSubmission({
    assignmentId: req.body.assignmentId,
    studentId: req.user.id,
    content: req.body.content,
    grade: req.body.grade,
  });
  res.status(201).json(submission);
});

const listByAssignment = asyncHandler(async (req, res) => {
  const submissions = await submissionService.listByAssignment(
    req.params.assignmentId,
    req.user,
  );
  res.status(200).json(submissions);
});

module.exports = {
  createSubmission,
  listByAssignment,
};



