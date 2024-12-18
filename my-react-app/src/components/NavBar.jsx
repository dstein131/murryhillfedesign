// src/components/NavBar.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, performLogoutUser } from '../redux/userSlice'; // Import thunks directly from userSlice
import Login from '../pages/Login';
import Register from '../pages/Register';
import '../components/NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, is_superadmin, applications, roles, isAuthenticated, loading, error } = useSelector((state) => state.user);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Verify token on initial mount
  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(performLogoutUser()).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      // Optionally, handle logout errors
    }
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-custom fixed-top">
        <div className="container-fluid">
          <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
            <img
              src="/images/DEVLOGONOTEXT.svg"
              alt="Murray Hill Web Development Logo"
              className="navbar-logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" className="navbar-toggler-custom" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              {loading ? (
                <Nav.Link className="navbar-link-custom">Loading...</Nav.Link>
              ) : !isAuthenticated ? (
                <>
                  <Button
                    className="custom-button me-2"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </Button>
                  <Button
                    className="custom-button"
                    onClick={() => setShowRegister(true)}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link className="navbar-link-custom">
                    {user ? `Welcome, ${user.username}` : 'Welcome!'}
                  </Nav.Link>
                  {is_superadmin && (
                    <Nav.Link as={Link} to="/admin" className="navbar-link-custom">
                      Admin Panel
                    </Nav.Link>
                  )}
                  {/* Example: Display applications */}
                  {applications.length > 0 && (
                    <Nav.Link as={Link} to="/applications" className="navbar-link-custom">
                      Applications ({applications.length})
                    </Nav.Link>
                  )}
                  {/* Example: Display roles */}
                  {roles.length > 0 && (
                    <Nav.Link as={Link} to="/roles" className="navbar-link-custom">
                      Roles ({roles.length})
                    </Nav.Link>
                  )}
                  <Button className="custom-button ms-2" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      {/* Login Modal */}
      <Login
        show={showLogin}
        handleClose={() => setShowLogin(false)}
        onSuccess={() => {
          setShowLogin(false);
          // Optionally, navigate or perform other actions upon successful login
        }}
      />

      {/* Register Modal */}
      <Register
        show={showRegister}
        handleClose={() => setShowRegister(false)}
      />
    </>
  );
};

export default NavBar;
