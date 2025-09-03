require('dotenv').config({ path: '.env.production' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Replace with your deployed frontend URL or * for all origins (not recommended for prod)
const FRONTEND_URL = process.env.FRONTEND_URL || '*';

app.use(cors({
  origin: 'https://me-api-playground-1-ab3c.onrender.com',
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/health', (req, res) => {
  res.status(200).send('API is healthy');
});

const profileRoutes = require('./routes');
const authRoutes = require('./routes/auth');
app.use('/api', profileRoutes);
app.use('/api/auth', authRoutes);

// Serve frontend static files from /frontend/build
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// Fix catch-all route to exclude /api paths
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
