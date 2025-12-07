const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware, roleMiddleware('admin'));

router.get('/', userController.listUsers);
router.patch('/role/:id', userController.updateRole);

module.exports = router;



