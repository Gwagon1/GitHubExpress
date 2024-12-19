import axios from 'axios';

const GITHUB_BASE_URL = 'https://api.github.com';
const GITHUB_TOKEN = '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';

const axiosInstance = axios.create({
  baseURL: GITHUB_BASE_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});

// Fetch GitHub users based on search query
export const fetchGitHubUsers = async (query) => {
  try {
    const response = await axiosInstance.get(`/search/users?q=${query}`);
    const usersWithRepos = await Promise.all(
      response.data.items.map(async (user) => {
        const userDetails = await axiosInstance.get(`/users/${user.login}`);
        return {
          ...user,
          repoCount: userDetails.data.public_repos,
        };
      })
    );
    return usersWithRepos;
  } catch (error) {
    console.error("Error fetching GitHub users:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch detailed information about a GitHub user
export const fetchUserDetails = async (username) => {
  try {
    const response = await axiosInstance.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error.response?.data || error.message);
    throw error;
  }
};

// Fetch a GitHub user's repositories
export const fetchUserRepos = async (username) => {
  try {
    const response = await axiosInstance.get(`/users/${username}/repos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching repositories:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch commit history for a specific repository of a user
export const fetchRepoCommits = async (username, repo) => {
  try {
    const response = await axiosInstance.get(`/repos/${username}/${repo}/commits`);
    return response.data.length ? response.data : [];
  } catch (error) {
    console.error('Error fetching commits:', error.response?.data || error.message);
    throw error;
  }
};
