import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserDetails, fetchRepoCommits, fetchUserRepos } from '../utils/apiHelper';
import LoadingSpinner from '../components/LoadingSpinner';

const UserDetailsPage = () => {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for handling errors

  // Fetch user details, repositories, and commits
  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);

        const userData = await fetchUserDetails(username);
        setUserDetails(userData);

        const userRepos = await fetchUserRepos(username);
        setRepos(userRepos);

        // Fetch commits for each repo
        const allCommits = await Promise.all(
          userRepos.map(async (repo) => {
            const repoCommits = await fetchRepoCommits(username, repo.name);
            return { repoName: repo.name, commits: repoCommits };
          })
        );
        setCommits(allCommits);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [username]); // Dependency array ensures effect runs only when `username` changes

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error}</p>; // Display error message if any
  }

  return (
    <div>
      <h1>{userDetails?.name || 'Unknown User'}</h1>

      {/* Display the user's bio */}
      {userDetails?.bio && <p><strong>Bio:</strong> {userDetails.bio}</p>}

      {/* Display the GitHub profile link */}
      <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
        View GitHub Profile
      </a>

      <h2>Repositories</h2>
      {repos.length === 0 ? (
        <p>This user has no repositories.</p>
      ) : (
        <ul>
          {repos.map((repo) => (
            <li key={repo.name}>
              <h3>{repo.name}</h3>
              <h4>Commits:</h4>
              {commits.find((commit) => commit.repoName === repo.name)?.commits.length === 0 ? (
                <p>No commits available.</p>
              ) : (
                <ul>
                  {commits
                    .find((commit) => commit.repoName === repo.name)
                    ?.commits.slice(0, 5) // Show only the latest 5 commits
                    .map((commit, index) => (
                      <li key={index}>
                        <p>
                          {commit.commit.author.name}: {commit.commit.message}
                        </p>
                        <p>
                          {new Date(commit.commit.author.date).toLocaleDateString('en-US')}
                        </p>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDetailsPage;
