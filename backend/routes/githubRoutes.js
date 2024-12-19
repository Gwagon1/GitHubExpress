// githubRoutes.js
const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubController');

// Route to get user details 
router.get('/users/:username', githubController.getUserDetails);

// Route to get user repositories
router.get('/users/:username/repos', githubController.getUserRepos);

// Route to get commits for a specific repository
router.get('/repos/:username/:repoName/commits', githubController.getRepoCommits);

module.exports = router;
