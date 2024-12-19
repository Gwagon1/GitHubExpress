// src/components/UserCard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setError('Failed to fetch user data');
    }
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-card">
      <img 
        src={user.avatar_url || 'default-avatar.png'} 
        alt={user.login} 
        className="user-avatar" 
      />
      <div className="user-info">
        <h3>{user.login}</h3>
        <p>{user.name || 'No name available'}</p>
        <Link to={`/user/${user.login}`} className="view-profile">
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
