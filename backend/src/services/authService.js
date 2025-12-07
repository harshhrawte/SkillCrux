const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('./userService');

// Load secrets correctly from .env
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const buildTokens = (user) => {
  const payload = {
    sub: user.id,
    role: user.role,
    email: user.email,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const register = async ({ name, email, password, role }) => {
  const user = await userService.createUser({ name, email, password, role });
  const tokens = buildTokens(user);
  return { user, tokens };
};

const login = async ({ email, password }) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const tokens = buildTokens(safeUser);
  return { user: safeUser, tokens };
};

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error("Refresh token missing");
    error.statusCode = 400;
    throw error;
  }

  const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
  const user = await userService.getUserById(decoded.sub);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const tokens = buildTokens(user);
  return { user, tokens };
};

module.exports = {
  register,
  login,
  refresh,
};

