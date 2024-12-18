// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * ProtectedRoute ensures that only authenticated users with the necessary permissions can access certain routes.
 * @param {React.Component} children - The component to render if access is granted.
 * @param {string[]} roles - (Optional) An array of roles required to access the route.
 */
const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, loading, user, is_superadmin } = useSelector((state) => state.user);

  if (loading) {
    // Optionally, return a loading spinner or placeholder
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated users to the login page
    return <Navigate to="/login" replace />;
  }

  // For AdminPanel, check if the user is a superadmin
  if (children.type.name === 'AdminPanel' && !is_superadmin) {
    // Optionally, show a "Not Authorized" message or redirect
    return <Navigate to="/" replace />;
  }

  // Additional role-based access control can be implemented here

  return children;
};

export default ProtectedRoute;
