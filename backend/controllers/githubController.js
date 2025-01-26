const axios = require('axios');

const GITHUB_BASE_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Stored token in environment variables

const axiosInstance = axios.create({
  baseURL: GITHUB_BASE_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});

// Fetch detailed user information
const getUserDetails = async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axiosInstance.get(`/users/${username}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

// Fetch user repositories
const getUserRepos = async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axiosInstance.get(`/users/${username}/repos`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

// Fetch commit history for a repository
const getRepoCommits = async (req, res) => {
  const { username, repoName } = req.params;

  try {
    const response = await axiosInstance.get(`/repos/${username}/${repoName}/commits`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

module.exports = {
  getUserDetails,
  getUserRepos,
  getRepoCommits,
};
