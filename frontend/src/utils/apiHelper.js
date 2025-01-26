import axios from 'axios';

// Base URL for backend API
const API_BASE_URL = 'http://localhost:5000/api';

// Create an Axios instance for API requests
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Fetch GitHub users based on search query
export const fetchGitHubUsers = async (query) => {
  if (!query) {
    throw new Error("Search query is required.");
  }

  try {
    const response = await axiosInstance.get(`/users/search`, {
      params: { q: query }, // Pass query as a parameter
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub users:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch detailed information about a GitHub user
export const fetchUserDetails = async (username) => {
  if (!username) {
    throw new Error("Username is required.");
  }

  try {
    const response = await axiosInstance.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch a GitHub user's repositories
export const fetchUserRepos = async (username) => {
  if (!username) {
    throw new Error("Username is required.");
  }

  try {
    const response = await axiosInstance.get(`/users/${username}/repos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching repositories:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch commit history for a specific repository of a user
export const fetchRepoCommits = async (username, repoName) => {
  if (!username || !repoName) {
    throw new Error("Username and repository name are required.");
  }

  try {
    const response = await axiosInstance.get(`/repos/${username}/${repoName}/commits`);
    return response.data;
  } catch (error) {
    console.error("Error fetching commits:", error.response?.data || error.message);
    throw error;
  }
};
