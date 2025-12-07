const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

const createUser = async ({ name, email, password, role = 'student' }) => {
  const existing = await userModel.findByEmail(email);
  if (existing) {
    const error = new Error('Email already registered');
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  return userModel.createUser({ name, email, passwordHash, role });
};

const getUserByEmail = async (email) => userModel.findByEmail(email);

const getUserById = async (id) => userModel.findById(id);

const listUsers = async () => userModel.getAllUsers();

const changeUserRole = async (id, role) => {
  const validRoles = ['student', 'teacher', 'admin'];
  if (!validRoles.includes(role)) {
    const error = new Error('Invalid role value');
    error.statusCode = 400;
    throw error;
  }

  const updated = await userModel.updateUserRole(id, role);
  if (!updated) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return updated;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  listUsers,
  changeUserRole,
};



