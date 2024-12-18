// src/pages/Services.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../redux/servicesSlice';
import { addItemToCart, fetchCart } from '../redux/cartSlice'; // Import cart actions
import './Services.css'; // Ensure this file is correctly imported

const PackageCard = ({ pkg, onContact, onAddToCart, isAuthenticated }) => {
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
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          className="service-card__button"
          onClick={() => onContact(pkg.title)}
          aria-label={`Contact about ${pkg.title}`}
        >
          Contact Me
        </button>

        {/* Show Add to Cart button if user is logged in and service has a price */}
        {isAuthenticated && pkg.price && (
          <button
            className="service-card__button"
            style={{ backgroundColor: '#4444e2' }} // Slightly different color for "Add to Cart"
            onClick={() => onAddToCart(pkg.service_id)}
          >
            Add to Cart
          </button>
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

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleContact = (serviceName) => {
    navigate(`/contact?service=${encodeURIComponent(serviceName)}`);
  };

  const handleAddToCart = async (serviceId) => {
    try {
      // Add one item of the selected service to the cart with no addons
      await dispatch(addItemToCart({ service_id: serviceId, quantity: 1, addons: [] })).unwrap();
      // Re-fetch cart to update cart state
      dispatch(fetchCart());
      alert('Item added to cart successfully!');
    } catch (err) {
      console.error('Error adding item to cart:', err);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  // If any service has price null, treat its entire description as addons
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
          <h2 className="services-page__section-title">Our Offerings</h2>
          <div className="services-page__packages">
            {processedServices.map((pkg, pkgIdx) => (
              <PackageCard
                key={`package-${pkgIdx}`}
                pkg={pkg}
                onContact={handleContact}
                onAddToCart={handleAddToCart}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;
