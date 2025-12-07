const pool = require('./db');

const createSubmission = async ({
  assignmentId,
  studentId,
  content,
  grade,
}) => {
  const { rows } = await pool.query(
    `INSERT INTO submissions (assignment_id, student_id, content, grade)
     VALUES ($1, $2, $3, $4)
     RETURNING id, assignment_id, student_id, content, grade, created_at`,
    [assignmentId, studentId, content, grade || null],
  );
  return rows[0];
};

const getSubmissionsByAssignment = async (assignmentId) => {
  const { rows } = await pool.query(
    `SELECT s.id, s.assignment_id, s.student_id, s.content, s.grade, s.created_at,
            u.name AS student_name
     FROM submissions s
     LEFT JOIN users u ON s.student_id = u.id
     WHERE assignment_id = $1
     ORDER BY s.created_at DESC`,
    [assignmentId],
  );
  return rows;
};

module.exports = {
  createSubmission,
  getSubmissionsByAssignment,
};




