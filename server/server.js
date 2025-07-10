const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/channels', require('./routes/channelRoutes'));

const PORT = process.env.PORT || 5000;
app.get('/api/health', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`✅ Backend running at http://127.0.0.1:${PORT}`);
});
