const pool = require('../config/dbConfig');

// Create table with course and grade
const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      course VARCHAR(100) NOT NULL,
      grade CHAR(2) NOT NULL
    )
  `);
};

// Add student with course and grade
const addStudent = async (name, email, course, grade) => {
  const result = await pool.query(
    'INSERT INTO students (name, email, course, grade) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, course, grade]
  );
  return result.rows[0];
};

// Get a student by email
const getStudentByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
  return result.rows[0];
};

// Update a student by email
const updateStudentByEmail = async (email, name, course, grade) => {
  const result = await pool.query(
    'UPDATE students SET name = $1, course = $2, grade = $3 WHERE email = $4 RETURNING *',
    [name, course, grade, email]
  );
  return result.rows[0];
};

// Delete a student by email
const deleteStudentByEmail = async (email) => {
  const result = await pool.query('DELETE FROM students WHERE email = $1 RETURNING *', [email]);
  return result.rows[0];
};

// Get all students
const getStudents = async () => {
  const result = await pool.query('SELECT * FROM students');
  return result.rows;
};

module.exports = { createTable, addStudent, getStudents, getStudentByEmail, updateStudentByEmail, deleteStudentByEmail };