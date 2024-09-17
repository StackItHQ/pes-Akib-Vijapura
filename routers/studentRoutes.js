const express = require('express');
const router = express.Router();
const {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  connectToSheet
} = require('../controller/sheetController');

// Route to get all students
router.route("/").get(getStudents);

// Route to add a new student
router.route("/").post(createStudent);

// Route to update an existing student by email
router.route("/:email").put(updateStudent);

//Route to delete an existing student by email
router.route("/:email").delete(deleteStudent);

//Route to connect to google sheet
router.route("/connect").post(connectToSheet);

module.exports = router;