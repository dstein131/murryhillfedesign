import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import api from './api/api';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About'; // Import the About component

const App = () => {
  const [user, setUser] = useState(null); // Global user state
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await api.get('api/users/me');
          setUser(response.data.user); // Set global user data
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      } finally {
        setLoadingUser(false); // Mark user data as loaded
      }
    };

    fetchUserData();
  }, []);

  return (
    <div id="app">
      <header>
        <NavBar user={user} loading={loadingUser} setUser={setUser} />
      </header>
      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={<LandingPage user={user} loading={loadingUser} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} /> {/* Add About route */}
          <Route path="/projects" element={<Projects />} /> {/* Add Projects route */}
          <Route path="/resume" element={<Resume />} /> {/* Add Resume route */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
