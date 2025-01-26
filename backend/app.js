// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();
const mongoose = require('mongoose');
const githubRoutes = require('./routes/githubRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', githubRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
