// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * ProtectedRoute Component
 * @param {React.Component} Component - The component to render if access is granted.
 * @returns {React.Component} - The rendered component or a redirect to the login page.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, is_superadmin, loading } = useSelector((state) => state.user);

  if (loading) {
    // Optionally, render a loading spinner or placeholder
    return <div className="loading-spinner">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated users to the login page
    return <Navigate to="/login" replace />;
  }

  if (!is_superadmin) {
    // Redirect users without superadmin privileges to the home page or an unauthorized page
    return <Navigate to="/" replace />;
  }

  // If authenticated and is_superadmin, render the children components
  return children;
};

export default ProtectedRoute;
