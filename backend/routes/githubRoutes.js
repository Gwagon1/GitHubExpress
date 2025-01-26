const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubController');
const axios = require('axios'); 
require('dotenv').config(); // Load environment variables

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});


// Search users by query
router.get('/users/search', async (req, res) => {
  const { q } = req.query; // Extract the search query

  if (!q) {
    return res.status(400).json({ message: 'Search query (q) is required' });
  }

  try {
    const response = await axiosInstance.get('/search/users', {
      params: { q }, // Pass the query to GitHub's search endpoint
    });
    res.json(response.data.items); // Return the list of users
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message || 'An unexpected error occurred.' });
  }
});

// Route to get user details
router.get('/users/:username', githubController.getUserDetails);

// Route to get user repositories
router.get('/users/:username/repos', githubController.getUserRepos);

// Route to get commits for a specific repository
router.get('/repos/:username/:repoName/commits', githubController.getRepoCommits);

module.exports = router;
