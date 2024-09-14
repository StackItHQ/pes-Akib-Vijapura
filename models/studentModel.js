const pool = require('../config/dbConfig'); // Import the configured pool

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

// Get all students
const getStudents = async () => {
  const result = await pool.query('SELECT * FROM students');
  return result.rows;
};

module.exports = { createTable, addStudent, getStudents };
