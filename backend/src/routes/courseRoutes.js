const express = require('express');
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', courseController.listCourses);
router.get('/:id', courseController.getCourse);

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'teacher'),
  courseController.createCourse,
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'teacher'),
  courseController.updateCourse,
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'teacher'),
  courseController.deleteCourse,
);

module.exports = router;



