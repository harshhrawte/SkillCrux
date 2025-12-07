const userService = require('../services/userService');
const asyncHandler = require('../utils/asyncHandler');

const listUsers = asyncHandler(async (_req, res) => {
  const users = await userService.listUsers();
  res.status(200).json(users);
});

const updateRole = asyncHandler(async (req, res) => {
  const updated = await userService.changeUserRole(req.params.id, req.body.role);
  res.status(200).json(updated);
});

module.exports = {
  listUsers,
  updateRole,
};



