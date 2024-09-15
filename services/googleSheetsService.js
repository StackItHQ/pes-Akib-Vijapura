// services/googleSheetsService.js
const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../credentials.json'), // Path to your credentials JSON file
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const spreadsheetId = '1n1g1SuQsImvDBnFEY5C6XMyxgY7Jviea2Ww2Uy8YQ-8'; // Replace with your Google Sheet ID

const googleSheetsService = {
  async readSheet(range) {
    const client = await auth.getClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
      auth: client
    });
    return response.data.values;
  },

  async writeSheet(range, values) {
    const client = await auth.getClient();
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values
      },
      auth: client
    });
  },

  // Update a row in Google Sheets
  async updateRow(range, values) {
    const client = await auth.getClient();
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values: [values]
      },
      auth: client
    });
  },

  // Append a row to Google Sheets
  async appendRow(range, values) {
    const client = await auth.getClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values: [values]
      },
      auth: client
    });
  },

  // Delete a row from Google Sheets (requires range information)
  async deleteRow (rowNumber){
  const client = await auth.getClient();
  const request = {
    spreadsheetId: spreadsheetId,
    resource: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: 0,  // The sheetId, adjust based on your sheet's ID
              dimension: 'ROWS',
              startIndex: rowNumber - 1,  // Zero-based index, rowNumber is 1-based
              endIndex: rowNumber
            }
          }
        }
      ]
    },
    auth: client
  };

  try {
    await sheets.spreadsheets.batchUpdate(request);
    console.log(`Deleted row ${rowNumber} successfully.`);
  } catch (error) {
    console.error('Error deleting row:', error);
  }
},


  // Get Sheet ID from the spreadsheet
  async getSheetId() {
    const client = await auth.getClient();
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
      auth: client
    });
    const sheet = response.data.sheets.find(s => s.properties.title === 'Sheet1'); // Adjust sheet name if needed
    return sheet.properties.sheetId;
  }
};

module.exports = googleSheetsService;
