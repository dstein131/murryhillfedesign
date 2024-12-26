import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FaShoppingCart, FaHome } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, performLogoutUser } from '../redux/userSlice';
import { fetchCart } from '../redux/cartSlice';
import Login from '../pages/Login';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    user,
    is_superadmin,
    isAuthenticated,
    loading,
  } = useSelector((state) => state.user);

  const { items } = useSelector((state) => state.cart);

  // Calculate total quantity of items in the cart
  const cartItemCount = items ? items.reduce((acc, item) => acc + (item.quantity || 1), 0) : 0;

  const [showLogin, setShowLogin] = useState(false);

  // Keep track of initial path
  const initialPathRef = useRef(location.pathname);

  // Decide if we show the "Home" button (only if not on '/')
  const showHomeButton = location.pathname !== '/';

  // Verify token on mount
  useEffect(() => {
    dispatch(verifyToken())
      .unwrap()
      .then(() => {
        console.log('Token verified successfully.');
      })
      .catch((err) => {
        console.log('Token verification failed:', err);
      });
  }, [dispatch]);

  // Fetch the cart if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [isAuthenticated, dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(performLogoutUser()).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-custom fixed-top">
        <div className="container-fluid">
          {/* Logo / Brand (also clickable to home) */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="navbar-brand-custom d-flex align-items-center"
          >
            <img
              src="/images/DEVLOGONOTEXT.svg"
              alt="Murray Hill Web Development Logo"
              className="navbar-logo"
            />
          </Navbar.Brand>

          {/* Show a prominent "Home" button if not on the homepage */}
          {showHomeButton && (
            <Link to="/" className="back-home-button">
              <FaHome className="home-icon me-1" />
              Home
            </Link>
          )}

          <Navbar.Toggle aria-controls="navbar-nav" className="navbar-toggler-custom">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav>
              {loading ? (
                <Nav.Link className="navbar-link-custom">Loading...</Nav.Link>
              ) : !isAuthenticated ? (
                <Button
                  className="custom-button me-2"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </Button>
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

                  {/* Cart Icon with total item quantity */}
                  <Nav.Link
                    as={Link}
                    to="/cart"
                    className="navbar-link-custom d-flex align-items-center"
                  >
                    <FaShoppingCart
                      style={{ width: '24px', height: '24px', marginRight: '5px' }}
                    />
                    {cartItemCount > 0 && (
                      <span style={{ fontWeight: 'bold', color: 'var(--text-color)' }}>
                        {cartItemCount}
                      </span>
                    )}
                  </Nav.Link>

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
          dispatch(fetchCart());
        }}
      />
    </>
  );
};

export default NavBar;
