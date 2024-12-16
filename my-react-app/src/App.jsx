import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Include useLocation for route tracking
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
  const location = useLocation(); // Hook to track route changes

  // Fetch user data
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

  // Google Analytics Integration
  useEffect(() => {
    const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID; // Fetch GA ID from environment variable

    if (gaId) {
      // Add Google Analytics script dynamically
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      // Initialize Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', gaId);
    } else {
      console.warn('Google Analytics ID is missing!');
    }
  }, []);

  // Track page views on route changes
  useEffect(() => {
    const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
    if (window.gtag && gaId) {
      window.gtag('config', gaId, {
        page_path: location.pathname,
      });
    }
  }, [location]);

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
