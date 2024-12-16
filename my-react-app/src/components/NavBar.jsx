import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, logoutUser } from '../redux/userSlice';
import Login from '../pages/Login';
import Register from '../pages/Register';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access user state and authentication state from Redux store
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Verify token on initial mount
  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser()); // Logout user
    navigate('/'); // Navigate to the homepage after logout
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-full">
        <div className="container-fluid">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src="/images/mhwd_logo_no_text.svg"
              alt="Murray Hill Web Development Logo"
              style={{ height: '40px', width: 'auto' }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              {loading ? (
                <Nav.Link className="fw-bold text-light">Loading...</Nav.Link>
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
                  <Nav.Link className="fw-bold text-subtle-white">
                    {user ? `Welcome, ${user.username}` : 'Welcome!'}
                    </Nav.Link>

                  <Button
                    className="custom-button ms-2"
                    onClick={handleLogout}
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
        onSuccess={() => {
          setShowLogin(false);
          dispatch(verifyToken()); // Verify token immediately after successful login
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
