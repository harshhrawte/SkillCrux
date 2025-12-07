const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const { user, tokens } = await authService.register({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({ user, ...tokens });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, tokens } = await authService.login({ email, password });
  res.status(200).json({ user, ...tokens });
});

const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const { user, tokens } = await authService.refresh(refreshToken);
  res.status(200).json({ user, ...tokens });
});

module.exports = {
  register,
  login,
  refresh,
};



