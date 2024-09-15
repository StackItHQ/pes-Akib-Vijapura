// services/syncService.js
const studentModel = require('../models/studentModel');
const googleSheetsService = require('./googleSheetsService');

const syncGoogleSheetToDB = async () => {
  try {
    // Fetch data from Google Sheets (adjust range as needed)
    const sheetData = await googleSheetsService.readSheet('Sheet1!A2:D100');
    
    // Create a set of emails from the sheet data
    const sheetEmails = new Set(sheetData.map(row => row[1])); // Assuming row[1] is email
    
    // Fetch all students from the database
    const existingStudents = await studentModel.getStudents();

    // Compare and delete any students in the DB but not in Google Sheets
    for (let student of existingStudents) {
      if (!sheetEmails.has(student.email)) {
        // If the student email is not in the Google Sheets data, delete from DB
        await studentModel.deleteStudentByEmail(student.email);
        console.log(`Deleted student with email ${student.email} from the database`);
      }
    }

    // Sync the remaining or new rows (existing code for updating/adding)
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