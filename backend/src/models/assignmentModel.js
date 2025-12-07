const pool = require('./db');

const createAssignment = async ({ courseId, title, description, dueDate }) => {
  const { rows } = await pool.query(
    `INSERT INTO assignments (course_id, title, description, due_date)
     VALUES ($1, $2, $3, $4)
     RETURNING id, course_id, title, description, due_date, created_at`,
    [courseId, title, description, dueDate],
  );
  return rows[0];
};

const getAssignmentsByCourse = async (courseId) => {
  const { rows } = await pool.query(
    `SELECT id, course_id, title, description, due_date, created_at
     FROM assignments
     WHERE course_id = $1
     ORDER BY created_at DESC`,
    [courseId],
  );
  return rows;
};

const getAssignmentById = async (id) => {
  const { rows } = await pool.query(
    `SELECT id, course_id, title, description, due_date, created_at
     FROM assignments WHERE id = $1`,
    [id],
  );
  return rows[0];
};

const deleteAssignment = async (id) => {
  const { rows } = await pool.query(
    'DELETE FROM assignments WHERE id = $1 RETURNING id',
    [id],
  );
  return rows[0];
};

module.exports = {
  createAssignment,
  getAssignmentsByCourse,
  getAssignmentById,
  deleteAssignment,
};




