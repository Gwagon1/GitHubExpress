// backend/models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: 'No name available',
  },
  avatar_url: {
    type: String,
    required: true,
  },
  bio: String,
  public_repos: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
