const axios = require('axios');

// Fetch user details 
const getUserDetails = async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user details:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error fetching user details' });
  }
};

// Fetch user repositories
const getUserRepos = async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user repositories:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error fetching user repositories' });
  }
};

// Fetch commits for a specific repository
const getRepoCommits = async (req, res) => {
  const { username, repoName } = req.params;

  try {
    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/commits`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching repository commits:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error fetching repository commits' });
  }
};

module.exports = {
  getUserDetails,
  getUserRepos,
  getRepoCommits,
};
