const googleSheetsService = require('./services/googleSheetsService');

(async () => {
  try {
    // Read data from the Google Sheet
    const data = await googleSheetsService.readSheet('Sheet1!A1:D10');
    console.log('Read data from Google Sheets:', data);

    // Write data to the Google Sheet
    await googleSheetsService.writeSheet('Sheet1!A1:D1', [['Name', 'Email', 'Course', 'Grade']]);
    console.log('Data written to Google Sheets');
  } catch (error) {
    console.error('Error interacting with Google Sheets:', error);
  }
})();
