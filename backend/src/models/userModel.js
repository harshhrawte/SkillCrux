const pool = require('./db');

const createUser = async ({ name, email, passwordHash, role }) => {
  const query = `
    INSERT INTO users (name, email, password_hash, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role, created_at
  `;

  const { rows } = await pool.query(query, [name, email, passwordHash, role]);
  return rows[0];
};

const findByEmail = async (email) => {
  const { rows } = await pool.query(
    'SELECT id, name, email, password_hash, role FROM users WHERE email = $1',
    [email],
  );
  return rows[0];
};

const findById = async (id) => {
  const { rows } = await pool.query(
    'SELECT id, name, email, role FROM users WHERE id = $1',
    [id],
  );
  return rows[0];
};

const getAllUsers = async () => {
  const { rows } = await pool.query(
    'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC',
  );
  return rows;
};

const updateUserRole = async (id, role) => {
  const { rows } = await pool.query(
    'UPDATE users SET role = $2, updated_at = NOW() WHERE id = $1 RETURNING id, name, email, role',
    [id, role],
  );
  return rows[0];
};

module.exports = {
  createUser,
  findByEmail,
  findById,
  getAllUsers,
  updateUserRole,
};



