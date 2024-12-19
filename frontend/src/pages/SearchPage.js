import React, { useState } from 'react';
import { fetchGitHubUsers } from '../utils/apiHelper';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const usersData = await fetchGitHubUsers(query);
      setUsers(usersData);
    } catch (error) {
      console.error("Error searching users:", error);
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
        onKeyPress={handleKeyPress}
        placeholder="Search by username"
      />
      <button onClick={handleSearch}>Search</button>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <h2>Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} onClick={() => handleUserClick(user.login)}>
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  width="50"
                  height="50"
                  style={{ borderRadius: '50%' }}
                />
                <p>{user.login}</p>
                <p>Repositories: {user.repoCount}</p> {/* Display repo count */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
