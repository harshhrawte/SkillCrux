const express = require('express');
const assignmentController = require('../controllers/assignmentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Create assignment (admin or teacher)
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin', 'teacher']),
  assignmentController.createAssignment
);

// Get assignments for a course
router.get(
  '/course/:courseId',
  authMiddleware,
  assignmentController.listByCourse
);

// Delete assignment
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin', 'teacher']),
  assignmentController.deleteAssignment
);

module.exports = router;
