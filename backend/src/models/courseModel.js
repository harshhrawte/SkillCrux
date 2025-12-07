const pool = require('./db');

const getAllCourses = async () => {
  const { rows } = await pool.query(
    `SELECT c.id, c.title, c.description, c.teacher_id, c.created_at, u.name AS teacher_name
     FROM courses c
     LEFT JOIN users u ON c.teacher_id = u.id
     ORDER BY c.created_at DESC`,
  );
  return rows;
};

const getCourseById = async (id) => {
  const { rows } = await pool.query(
    `SELECT c.id, c.title, c.description, c.teacher_id, c.created_at, u.name AS teacher_name
     FROM courses c
     LEFT JOIN users u ON c.teacher_id = u.id
     WHERE c.id = $1`,
    [id],
  );
  return rows[0];
};

const createCourse = async ({ title, description, teacherId }) => {
  const { rows } = await pool.query(
    `INSERT INTO courses (title, description, teacher_id)
     VALUES ($1, $2, $3)
     RETURNING id, title, description, teacher_id, created_at`,
    [title, description, teacherId],
  );
  return rows[0];
};

const updateCourse = async (id, { title, description, teacherId }) => {
  const { rows } = await pool.query(
    `UPDATE courses
     SET title = COALESCE($2, title),
         description = COALESCE($3, description),
         teacher_id = COALESCE($4, teacher_id),
         updated_at = NOW()
     WHERE id = $1
     RETURNING id, title, description, teacher_id, updated_at`,
    [id, title, description, teacherId],
  );
  return rows[0];
};

const deleteCourse = async (id) => {
  const { rows } = await pool.query(
    'DELETE FROM courses WHERE id = $1 RETURNING id',
    [id],
  );
  return rows[0];
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};



