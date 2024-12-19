// backend/utils/apiHelper.js
const axios = require('axios');

const GITHUB_API_URL = 'https://api.github.com';

const fetchGitHubData = async (endpoint) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data from GitHub API');
  }
};

module.exports = { fetchGitHubData };
