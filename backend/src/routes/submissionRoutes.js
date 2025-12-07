const express = require('express');
const submissionController = require('../controllers/submissionController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  roleMiddleware('student'),
  submissionController.createSubmission,
);

router.get(
  '/assignment/:assignmentId',
  authMiddleware,
  roleMiddleware('teacher', 'admin'),
  submissionController.listByAssignment,
);

module.exports = router;




