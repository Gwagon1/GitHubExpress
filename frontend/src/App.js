import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import UserDetailsPage from './pages/UserDetailsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/user/:username" element={<UserDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
