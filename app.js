const http = require('http');
const socketIo = require('socket.io');
const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routers/studentRoutes');
const studentModel = require('./models/studentModel');

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
