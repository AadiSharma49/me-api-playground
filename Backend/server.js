require('dotenv').config({ path: '.env.production' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const path = require('path');

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// Serve frontend static files from /frontend/build
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// For any other routes, serve index.html from frontend build (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
});
