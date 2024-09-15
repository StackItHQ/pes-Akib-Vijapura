const studentModel = require('../models/studentModel');
const googleSheetsService = require("../services/googleSheetsService")

const getStudents = async (req, res) => {
    try {
        const students = await studentModel.getStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const createStudent = async (req, res) => {
    const {
        name,
        email,
        course,
        grade
    } = req.body;
    try {
        const newStudent = await studentModel.addStudent(name, email, course, grade);
        // Emit event to clients
        req.io.emit('newStudent', newStudent);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const updateStudent = async (req, res) => {
    const {
        email
    } = req.params;
    const {
        name,
        course,
        grade
    } = req.body;

    try {
        // Check if the student exists
        const existingStudent = await studentModel.getStudentByEmail(email);

        if (!existingStudent) {
            // If the student does not exist, return a 404 error
            return res.status(404).json({
                error: 'Student not found'
            });
        }

        // Update the student record
        const updatedStudent = await studentModel.updateStudentByEmail(email, name, course, grade);

        // Emit event to clients
        req.io.emit('updateStudent', updatedStudent);

        // Send the updated student record in the response
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const deleteStudent = async (req, res) => {
    const { email } = req.params;

    try {
        // Check if the student exists
        const existingStudent = await studentModel.getStudentByEmail(email);

        if (!existingStudent) {
            // If the student does not exist, return a 404 error
            return res.status(404).json({
                error: 'Student not found'
            });
        }

        // Delete the student record
        await studentModel.deleteStudentByEmail(email);

        // Emit event to clients
        req.io.emit('deleteStudent', { email });

        // Send confirmation of deletion in the response
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

// Connect to Google Sheet
const connectToSheet =  async (req, res) => {
  try {
    const { spreadsheetId } = req.body;
    googleSheetsService.setSpreadsheetId(spreadsheetId); // Store the ID
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    connectToSheet
}