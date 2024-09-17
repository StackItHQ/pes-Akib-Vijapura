const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routers/studentRoutes');
const studentModel = require('./models/studentModel');
const schedule = require('node-schedule');
const { syncGoogleSheetToDB, syncDBToGoogleSheet } = require('./services/syncService');
const cors = require("cors");

const app = express();


app.use(bodyParser.json());
app.use(cors());

// Initialize the database
(async () => {
  await studentModel.createTable();
})();

// Use student routes
app.use('/students', studentRoutes);

// Sync routes
app.get('/sync', async (req, res) => {
  try {
    await syncGoogleSheetToDB();
    res.status(200).json({ message: 'Sync completed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Sync failed', error: error.message });
  }
});

//Sync db to google sheet
app.get('/sync-db', async (req, res) => {
  try {
    await syncDBToGoogleSheet();
    res.status(200).json({ message: 'Database to Google Sheets sync completed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Sync failed', error: error.message });
  }
});

// Schedule the sync every hour (example: minute sync)
schedule.scheduleJob('*/1 * * * *', async () => {
  console.log('Running scheduled sync...');
  await syncGoogleSheetToDB();
  await syncDBToGoogleSheet();
});


// Serve static files
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
