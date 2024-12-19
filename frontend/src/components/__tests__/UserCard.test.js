// src/components/__tests__/UserCard.test.js
import { render, screen, waitFor } from '@testing-library/react';
import UserCard from '../UserCard';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

describe('UserCard Component', () => {
  const user = {
    login: 'johndoe',
    avatar_url: 'http://example.com/avatar.jpg',
    name: 'John Doe'
  };

  test('renders user card with user data', async () => {
    render(
      <Router>
        <UserCard user={user} />
      </Router>
    );

    // Check if the "Loading..." text is not present (since data is available)
    expect(screen.queryByText('Loading...')).toBeNull();

    // Wait for the user data to be rendered
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('johndoe')).toBeInTheDocument(); // Check for login
      expect(screen.getByRole('img')).toHaveAttribute('src', user.avatar_url); // Check for image
    });
  });

  
  test('displays error message when fetching user data fails', async () => {
    // Simulate passing a missing user prop or an error scenario
    render(<UserCard user={null} />);
  
    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch user data')).toBeInTheDocument();
    });
  });


  test('matches snapshot', async () => {
    const { asFragment } = render(
      <Router>
        <UserCard user={user} />
      </Router>
    );

    // Wait for the user data to be rendered before taking the snapshot
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Take snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
