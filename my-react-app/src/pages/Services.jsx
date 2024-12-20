// src/pages/Services.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../redux/servicesSlice';
import { addItemToCart, fetchCart } from '../redux/cartSlice'; // Import cart actions
import Login from './Login'; // Import Login Modal
import './Services.css'; // Ensure this file is correctly imported

const PackageCard = ({ pkg, onContact, onAddToCart, onLogin, isAuthenticated }) => {
  const features = pkg.description ? pkg.description.split(',').map(f => f.trim()) : [];

  return (
    <div className="service-card">
      <div className="service-card__content">
        <h3 className="service-card__title">{pkg.title}</h3>
        {pkg.price && <p className="service-card__price">${pkg.price}</p>}
        {features.length > 0 && (
          <ul className="service-card__features">
            {features.map((feature, index) => (
              <li key={`feature-${index}`}>{feature}</li>
            ))}
          </ul>
        )}
        {pkg.addons && pkg.addons.length > 0 && (
          <div className="service-card__addons">
            <h4>Add-Ons:</h4>
            <ul>
              {pkg.addons.map((addon, idx) => (
                <li key={`addon-${idx}`}>{addon}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="service-card__buttons">
        <button
          className="service-card__button btn btn-primary"
          onClick={() => onContact(pkg.title)}
          aria-label={`Contact about ${pkg.title}`}
        >
          <i className="bi bi-envelope-fill" style={{ marginRight: '1rem' }}></i>
          Contact Me
        </button>

        {/* Conditional Add to Cart or Login/Register buttons */}
        {pkg.price && (
          isAuthenticated ? (
            <button
              className="service-card__button btn btn-success"
              onClick={() => onAddToCart(pkg.service_id)}
            >
              <i className="bi bi-cart-plus-fill" style={{ marginRight: '1rem' }}></i>
              Add to Cart
            </button>
          ) : (
            <button
              className="service-card__button btn btn-dark"
              onClick={onLogin}
              aria-label="Login to Add to Cart"
            >
              <i className="bi bi-box-arrow-in-right" style={{ marginRight: '1rem' }}></i>
              Login to Add to Cart
            </button>
          )
        )}
      </div>
    </div>
  );
};

const Services = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { services, loading, error } = useSelector((state) => state.services);
  const { isAuthenticated } = useSelector((state) => state.user);

  const [showLogin, setShowLogin] = useState(false); // State to manage login modal visibility
  const [pendingServiceId, setPendingServiceId] = useState(null); // To track which service to add after login

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleContact = (serviceName) => {
    navigate(`/contact?service=${encodeURIComponent(serviceName)}`);
  };

  const handleAddToCart = async (serviceId) => {
    try {
      await dispatch(addItemToCart({ service_id: serviceId, quantity: 1, addons: [] })).unwrap();
      dispatch(fetchCart());
      alert('Item added to cart successfully!');
    } catch (err) {
      console.error('Error adding item to cart:', err);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const handleLoginPrompt = (serviceId) => {
    setPendingServiceId(serviceId); // Store the service ID to add after login
    setShowLogin(true);
  };

  const handleLoginSuccess = async () => {
    setShowLogin(false);
    if (pendingServiceId) {
      try {
        await dispatch(addItemToCart({ service_id: pendingServiceId, quantity: 1, addons: [] })).unwrap();
        dispatch(fetchCart());
        alert('Item added to cart successfully!');
        setPendingServiceId(null);
      } catch (err) {
        console.error('Error adding item to cart after login:', err);
        alert('Failed to add item to cart. Please try again.');
      }
    }
  };

  const processedServices = services.map(s => {
    const isAddOn = s.price === null;
    const addons = isAddOn && s.description ? s.description.split(',').map(a => a.trim()) : [];
    return {
      ...s,
      addons: isAddOn ? addons : [],
    };
  });

  if (loading) {
    return <div className="services-page"><p>Loading services...</p></div>;
  }

  if (error) {
    return <div className="services-page"><p>Error: {error}</p></div>;
  }

  return (
    <div className="services-page">
      <header className="services-page__header">
        <h1 className="services-page__title">Services</h1>
        <p className="services-page__subtitle">
          Choose the package that best fits your needs and let’s build something great together!
        </p>
      </header>

      <main className="services-page__main">
        <section className="services-page__section">
         
          <div className="services-page__packages">
            {processedServices.map((pkg, pkgIdx) => (
              <PackageCard
                key={`package-${pkgIdx}`}
                pkg={pkg}
                onContact={handleContact}
                onAddToCart={handleAddToCart}
                onLogin={() => handleLoginPrompt(pkg.service_id)}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Login/Register Modal */}
      <Login
        show={showLogin}
        handleClose={() => {
          setShowLogin(false);
          setPendingServiceId(null);
        }}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default Services;
