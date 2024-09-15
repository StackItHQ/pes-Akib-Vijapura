// services/syncService.js
const studentModel = require('../models/studentModel');
const googleSheetsService = require('./googleSheetsService');

const syncGoogleSheetToDB = async () => {
  try {
    // Fetch data from Google Sheets (adjust range as needed)
    const sheetData = await googleSheetsService.readSheet('Sheet1!A2:D100');
    
    for (let row of sheetData) {
      const [name, email, course, grade] = row;

      // Check if the student already exists in the database based on email
      const existingStudent = await studentModel.getStudentByEmail(email);

      if (existingStudent) {
        // If the student exists, update the record
        await studentModel.updateStudentByEmail(email, name, course, grade);
        console.log(`Updated student ${name} with email ${email}`);
      } else {
        // If the student doesn't exist, add them to the database
        await studentModel.addStudent(name, email, course, grade);
        console.log(`Added new student ${name} with email ${email}`);
      }
    }
  } catch (error) {
    console.error('Error syncing Google Sheets with DB:', error);
  }
};

module.exports = { syncGoogleSheetToDB };