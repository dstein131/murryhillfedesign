import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider
import api from './api/api';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import Music from './pages/Music';
import Blog from './pages/Blog';
import Services from './pages/Services';
import ChatGPTInteraction from './pages/ChatGPTInteraction';
import Success from './pages/Success';

const App = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await api.get('api/users/me');
          setUser(response.data.user);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <HelmetProvider>
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
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/music" element={<Music />} />
            <Route path="/blog" element={<Blog user={user} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/chat" element={<ChatGPTInteraction />} />
            <Route path="/auth/success" element={<Success />} />
          </Routes>
        </main>
      </div>
    </HelmetProvider>
  );
};

export default App;
