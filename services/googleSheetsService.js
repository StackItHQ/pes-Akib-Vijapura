// services/googleSheetsService.js
const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../credentials.json'), // Path to your credentials JSON file
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const spreadsheetId = '1RJ9AHDTZid-IG1PYnf-dgGlnKGtCyTveV38Uhq6WQIA'; // Replace with your Google Sheet ID

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
  async deleteRow(range) {
    const client = await auth.getClient();
    const sheetId = await googleSheetsService.getSheetId();
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId,
                dimension: 'ROWS',
                startIndex: range.startIndex,
                endIndex: range.endIndex,
              }
            }
          }
        ]
      },
      auth: client
    });
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
