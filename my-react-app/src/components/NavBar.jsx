// src/components/NavBar.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, performLogoutUser } from '../redux/userSlice'; 
import Login from '../pages/Login';
import Register from '../pages/Register';
import '../components/NavBar.css';

// Import cart icon from react-icons
import { FaShoppingCart } from 'react-icons/fa';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, is_superadmin, applications, roles, isAuthenticated, loading, error } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);
  const cartItemCount = items ? items.length : 0;

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Verify token on initial mount
  useEffect(() => {
    console.log('NavBar mounted. Dispatching verifyToken.');
    dispatch(verifyToken())
      .unwrap()
      .then(() => {
        console.log('Token verified successfully.');
      })
      .catch((err) => {
        console.log('Token verification failed:', err);
      });
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      console.log('Dispatching performLogoutUser.');
      await dispatch(performLogoutUser()).unwrap();
      console.log('Logout successful. Navigating to home.');
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  console.log('NavBar rendered with isAuthenticated:', isAuthenticated);

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
                    onClick={() => {
                      console.log('Showing Login modal.');
                      setShowLogin(true);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    className="custom-button"
                    onClick={() => {
                      console.log('Showing Register modal.');
                      setShowRegister(true);
                    }}
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
                  {applications.length > 0 && (
                    <Nav.Link as={Link} to="/applications" className="navbar-link-custom">
                      Applications ({applications.length})
                    </Nav.Link>
                  )}
                  {roles.length > 0 && (
                    <Nav.Link as={Link} to="/roles" className="navbar-link-custom">
                      Roles ({roles.length})
                    </Nav.Link>
                  )}

                  {/* Cart Icon with Item Count */}
                  <Nav.Link as={Link} to="/cart" className="navbar-link-custom d-flex align-items-center">
                    <FaShoppingCart style={{ width: '24px', height: '24px', marginRight: '5px' }} />
                    {cartItemCount > 0 && (
                      <span style={{ fontWeight: 'bold', color: 'var(--text-color)' }}>
                        {cartItemCount}
                      </span>
                    )}
                  </Nav.Link>

                  <Button
                    className="custom-button ms-2"
                    onClick={() => {
                      console.log('Logout button clicked.');
                      handleLogout();
                    }}
                  >
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
        handleClose={() => {
          console.log('Closing Login modal.');
          setShowLogin(false);
        }}
        onSuccess={() => {
          console.log('Login successful. Closing modal.');
          setShowLogin(false);
        }}
      />

      {/* Register Modal */}
      <Register
        show={showRegister}
        handleClose={() => {
          console.log('Closing Register modal.');
          setShowRegister(false);
        }}
      />
    </>
  );
};

export default NavBar;
