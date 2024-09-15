const http = require('http');
const socketIo = require('socket.io');
const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routers/studentRoutes');
const studentModel = require('./models/studentModel');
const schedule = require('node-schedule');
const { syncGoogleSheetToDB } = require('./services/syncService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware to attach io to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(bodyParser.json());

// Initialize the database
(async () => {
  await studentModel.createTable();
})();

// Use student routes
app.use('/students', studentRoutes);

// Manually call sync when needed (e.g., a button press, page load, etc.)
app.get('/sync', async (req, res) => {
  try {
    await syncGoogleSheetToDB();
    res.status(200).json({ message: 'Sync completed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Sync failed', error: error.message });
  }
});

// Schedule the sync every hour (example: minute sync)
schedule.scheduleJob('*/1 * * * *', async () => {
  console.log('Running scheduled sync...');
  await syncGoogleSheetToDB();
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Serve static files
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
