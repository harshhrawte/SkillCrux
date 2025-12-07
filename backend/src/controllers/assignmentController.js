const assignmentService = require('../services/assignmentService');
const asyncHandler = require('../utils/asyncHandler');

const createAssignment = asyncHandler(async (req, res) => {
  const assignment = await assignmentService.createAssignment({
    courseId: req.body.courseId,
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    requester: req.user,
  });

  res.status(201).json(assignment);
});

const listByCourse = asyncHandler(async (req, res) => {
  const assignments = await assignmentService.listByCourse(
    req.params.courseId,
    req.user,
  );
  res.status(200).json(assignments);
});

const deleteAssignment = asyncHandler(async (req, res) => {
  await assignmentService.deleteAssignment(req.params.id, req.user);
  res.status(204).send();
});

module.exports = {
  createAssignment,
  listByCourse,
  deleteAssignment,
};



