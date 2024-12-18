// src/pages/AdminPanel.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, fetchAllRoles } from '../redux/adminSlice'; // Assuming you have admin-related thunks
import '../styles/AdminPanel.css'; // Optional: Create specific styles for AdminPanel

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { users, roles, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    // Fetch all users and roles when the component mounts
    dispatch(fetchAllUsers());
    dispatch(fetchAllRoles());
  }, [dispatch]);

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {loading && <p>Loading data...</p>}
      {error && <p className="error-message">{error}</p>}

      <section className="admin-section">
        <h2>Users</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Superadmin</th>
              <th>Roles</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.is_superadmin ? 'Yes' : 'No'}</td>
                  <td>
                    {user.roles.map((role) => role.role_name).join(', ')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="admin-section">
        <h2>Roles</h2>
        <ul className="roles-list">
          {roles && roles.length > 0 ? (
            roles.map((role) => <li key={role.role_id}>{role.role_name}</li>)
          ) : (
            <li>No roles found.</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;
