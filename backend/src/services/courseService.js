const courseModel = require('../models/courseModel');
const userService = require('./userService');

const listCourses = () => courseModel.getAllCourses();

const getCourse = async (id) => {
  const course = await courseModel.getCourseById(id);
  if (!course) {
    const error = new Error('Course not found');
    error.statusCode = 404;
    throw error;
  }
  return course;
};

const createCourse = async ({ title, description, teacherId, requester }) => {
  const assignedTeacherId = teacherId || requester.id;

  if (requester.role === 'teacher' && requester.id !== assignedTeacherId) {
    const error = new Error('Teachers can only create courses for themselves');
    error.statusCode = 403;
    throw error;
  }

  const teacher = await userService.getUserById(assignedTeacherId);
  if (!teacher || !['teacher', 'admin'].includes(teacher.role)) {
    const error = new Error('Teacher record not found');
    error.statusCode = 400;
    throw error;
  }

  return courseModel.createCourse({ title, description, teacherId: assignedTeacherId });
};

const updateCourse = async (id, data, requester) => {
  const course = await getCourse(id);

  if (
    requester.role === 'teacher' &&
    course.teacher_id !== requester.id
  ) {
    const error = new Error('Teachers can only modify their courses');
    error.statusCode = 403;
    throw error;
  }

  return courseModel.updateCourse(id, data);
};

const removeCourse = async (id, requester) => {
  const course = await getCourse(id);
  if (
    requester.role === 'teacher' &&
    course.teacher_id !== requester.id
  ) {
    const error = new Error('Teachers can only delete their courses');
    error.statusCode = 403;
    throw error;
  }

  const deleted = await courseModel.deleteCourse(id);
  if (!deleted) {
    const error = new Error('Course not found');
    error.statusCode = 404;
    throw error;
  }

  return deleted;
};

module.exports = {
  listCourses,
  getCourse,
  createCourse,
  updateCourse,
  removeCourse,
};



