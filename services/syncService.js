const studentModel = require('../models/studentModel');
const googleSheetsService = require('./googleSheetsService');

const syncGoogleSheetToDB = async () => {
  try {
    // Fetch data from Google Sheets (adjust range as needed)
    const sheetData = await googleSheetsService.readSheet('Sheet1!A2:D100');
    
    for (let row of sheetData) {
      const [name, email, course, grade] = row;

      // Check if the student already exists in the database
      const existingStudents = await studentModel.getStudents();
      const studentExists = existingStudents.some(student => student.email === email);

      if (!studentExists) {
        // If the student does not exist, add them to the database
        await studentModel.addStudent(name, email, course, grade);
        console.log(`Added student ${name} to the database`);
      } else {
        console.log(`Student with email ${email} already exists`);
      }
    }
  } catch (error) {
    console.error('Error syncing Google Sheets with DB:', error);
  }
};

module.exports = { syncGoogleSheetToDB };