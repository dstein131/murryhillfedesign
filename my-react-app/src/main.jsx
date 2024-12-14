import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import About from './pages/About'; // Import the About component

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} /> {/* Add About route */}
      {/* Add additional routes here */}
    </Routes>
  );
};

export default App;
