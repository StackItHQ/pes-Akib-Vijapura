const express = require('express');
const router = express.Router();
const studentModel = require('../models/studentModel');

// Route to get all students
router.get('/', async (req, res) => {
  try {
    const students = await studentModel.getStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to add a new student
router.post('/', async (req, res) => {
  const { name, email, course, grade } = req.body;
  try {
    const newStudent = await studentModel.addStudent(name, email, course, grade);
    // Emit event to clients
    req.io.emit('newStudent', newStudent);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update an existing student by email
router.put('/:email', async (req, res) => {
  const { email } = req.params;
  const { name, course, grade } = req.body;

  try {
    // Check if the student exists
    const existingStudent = await studentModel.getStudentByEmail(email);

    if (!existingStudent) {
      // If the student does not exist, return a 404 error
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update the student record
    const updatedStudent = await studentModel.updateStudentByEmail(email, name, course, grade);

    // Emit event to clients
    req.io.emit('updateStudent', updatedStudent);

    // Send the updated student record in the response
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
