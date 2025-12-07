const courseService = require('../services/courseService');
const asyncHandler = require('../utils/asyncHandler');

const listCourses = asyncHandler(async (_req, res) => {
  const courses = await courseService.listCourses();
  res.status(200).json(courses);
});

const getCourse = asyncHandler(async (req, res) => {
  const course = await courseService.getCourse(req.params.id);
  res.status(200).json(course);
});

const createCourse = asyncHandler(async (req, res) => {
  const course = await courseService.createCourse({
    title: req.body.title,
    description: req.body.description,
    teacherId: req.body.teacherId,
    requester: req.user,
  });
  res.status(201).json(course);
});

const updateCourse = asyncHandler(async (req, res) => {
  const updated = await courseService.updateCourse(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      teacherId: req.body.teacherId,
    },
    req.user,
  );
  res.status(200).json(updated);
});

const deleteCourse = asyncHandler(async (req, res) => {
  await courseService.removeCourse(req.params.id, req.user);
  res.status(204).send();
});

module.exports = {
  listCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};




