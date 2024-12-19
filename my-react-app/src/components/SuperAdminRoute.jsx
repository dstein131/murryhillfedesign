// src/components/SuperAdminRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * SuperAdminRoute is a higher-order component that wraps around routes/components
 * and renders them only if the user is authenticated and is a superadmin.
 * Otherwise, it redirects the user to an unauthorized page or another route.
 */
const SuperAdminRoute = ({ children }) => {
  const { isAuthenticated, is_superadmin, loading } = useSelector((state) => state.user);

  if (loading) {
    // Optionally, render a loading spinner or placeholder while checking auth status
    return <div>Loading...</div>;
  }

  if (isAuthenticated && is_superadmin) {
    return children;
  }

  // Optionally, you can create an Unauthorized.jsx component to inform the user
  // For simplicity, we'll redirect to the home page with a message
  return <Navigate to="/" replace />;
};

export default SuperAdminRoute;
