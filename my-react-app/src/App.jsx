// src/App.jsx

import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from './config/stripe'; // Import the initialized Stripe promise

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
import PaymentSuccess from './pages/PaymentSuccess'; // Import the PaymentSuccess component
import AdminPanel from './pages/AdminPanel';
import Cart from './pages/Cart';         // Import the Cart page
import Checkout from './pages/Checkout'; // Import the Checkout page
import Templates from './pages/Templates';
import Orders from './pages/Orders'; // Import the Orders page
// If you have OrderDetails.jsx, import it as well
import OrderDetails from './pages/OrderDetails'; // Optional

import ProtectedRoute from './components/ProtectedRoute';
import SuperAdminRoute from './components/SuperAdminRoute'; // Import the SuperAdminRoute component
import { verifyToken } from './redux/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // Hook to access the current location
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  // Verify token on initial mount
  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

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
      window.gtag = gtag; // Make gtag available globally
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
  }, [location.pathname]);

  return (
    <HelmetProvider>
      <div id="app">
        <header>
          <NavBar />
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/music" element={<Music />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/services" element={<Services />} />
            <Route path="/chat" element={<ChatGPTInteraction />} />
            <Route path="/auth/success" element={<PaymentSuccess />} /> {/* Existing route */}
            <Route path="/templates" element={<Templates />} />

            {/* Cart Route */}
            <Route path="/cart" element={<Cart />} />

            {/* Checkout Route wrapped with <Elements> for Stripe */}
            <Route
              path="/checkout"
              element={
                <Elements stripe={stripePromise}>
                  <Checkout />
                </Elements>
              }
            />

            {/* Payment Success Route */}
            <Route path="/payment-success" element={<PaymentSuccess />} /> {/* Add this route */}

            {/* Protected Admin Panel Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />

            {/* Protected Orders Route for SuperAdmins */}
            <Route
              path="/orders"
              element={
                <SuperAdminRoute>
                  <Orders />
                </SuperAdminRoute>
              }
            />

            {/* Protected Order Details Route for SuperAdmins */}
            <Route
              path="/orders/:orderId"
              element={
                <SuperAdminRoute>
                  <OrderDetails />
                </SuperAdminRoute>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </HelmetProvider>
  );
};

export default App;
