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

module.exports = router;
