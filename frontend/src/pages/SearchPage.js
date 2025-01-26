import React, { useState } from 'react';
import { fetchGitHubUsers } from '../utils/apiHelper';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for handling errors
  const navigate = useNavigate();

  const handleSearch = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const usersData = await fetchGitHubUsers(trimmedQuery);
      setUsers(usersData);
      if (usersData.length === 0) {
        setError('No users found. Please try another search.');
      }
    } catch (error) {
      console.error('Error searching users:', error);
      setError('An error occurred while searching. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  const handleUserClick = (username) => {
    navigate(`/user/${username}`);
  };

  return (
    <div>
      <h1>Search GitHub Users</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress} // Updated to onKeyDown
        placeholder="Search by username"
      />
      <button onClick={handleSearch}>Search</button>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p> // Display error message if any
      ) : (
        <div>
          <h2>Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} onClick={() => handleUserClick(user.login)}>
                <img
                  src={user.avatar_url}
                  alt={`Avatar of ${user.login}`}
                  width="50"
                  height="50"
                  style={{ borderRadius: '50%' }}
                />
                <p>{user.login}</p>
                <p>Repositories: {user.repoCount || 'N/A'}</p> {/* Display repo count if available */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
