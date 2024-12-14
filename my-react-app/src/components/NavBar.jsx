import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, logout } from '../redux/userSlice';
import Login from '../pages/Login';
import Register from '../pages/Register';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access user state and authentication state from Redux store
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    dispatch(verifyToken()); // Verify token on component mount
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate('/'); // Navigate to the homepage on logout
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-full">
        <div className="container-fluid">
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            MHWD
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              {loading ? (
                <Nav.Link className="fw-bold text-light">Loading...</Nav.Link>
              ) : !isAuthenticated ? (
                <>
                  <Button
                    variant="outline-light"
                    className="me-2 fw-bold"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </Button>
                  <Button
                    variant="light"
                    className="fw-bold"
                    onClick={() => setShowRegister(true)}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link className="fw-bold text-light">
                    {user ? `Welcome, ${user.username}` : 'Welcome!'}
                  </Nav.Link>
                  <Button
                    variant="outline-light"
                    onClick={handleLogout}
                    className="ms-2 fw-bold"
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
        handleClose={() => setShowLogin(false)}
        onSuccess={() => setShowLogin(false)} // Close modal on successful login
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
