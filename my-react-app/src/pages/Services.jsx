import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../redux/servicesSlice';
import { addItemToCart, fetchCart } from '../redux/cartSlice'; // Import cart actions
import Login from './Login'; // Import Login Modal
import './Services.css'; // Ensure this file is correctly imported

const MAX_FEATURES_VISIBLE = 3;
const MAX_ADDONS_VISIBLE = 3;

const PackageCard = ({ pkg, onContact, onAddToCart, onLogin, isAuthenticated }) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showAllAddons, setShowAllAddons] = useState(false);

  const visibleFeatures = showAllFeatures ? pkg.features : pkg.features.slice(0, MAX_FEATURES_VISIBLE);
  const visibleAddons = showAllAddons ? pkg.addons : pkg.addons.slice(0, MAX_ADDONS_VISIBLE);

  const hasMoreFeatures = pkg.features.length > MAX_FEATURES_VISIBLE;
  const hasMoreAddons = pkg.addons.length > MAX_ADDONS_VISIBLE;

  return (
    <div className="service-card">
      <div className="service-card__content">
        <h3 className="service-card__title">{pkg.title}</h3>
        {pkg.price !== null && <p className="service-card__price">${pkg.price}</p>}

        {/* Features Section */}
        {pkg.features.length > 0 && (
          <div className="service-card__section">
            <h4 className="section-title">Features:</h4>
            <ul className="service-card__features">
              {visibleFeatures.map((feature, index) => (
                <li key={`feature-${index}`}>{feature}</li>
              ))}
            </ul>
            {hasMoreFeatures && (
              <button
                className="toggle-button"
                onClick={() => setShowAllFeatures(!showAllFeatures)}
                aria-expanded={showAllFeatures}
                aria-controls={`features-${pkg.service_id}`}
              >
                {showAllFeatures ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        )}

        {/* Add-ons Section */}
        {pkg.addons.length > 0 && (
          <div className="service-card__section">
            <h4 className="section-title">Add-Ons:</h4>
            <ul className="service-card__addons">
              {visibleAddons.map((addon, idx) => (
                <li key={`addon-${idx}`}>{addon}</li>
              ))}
            </ul>
            {hasMoreAddons && (
              <button
                className="toggle-button"
                onClick={() => setShowAllAddons(!showAllAddons)}
                aria-expanded={showAllAddons}
                aria-controls={`addons-${pkg.service_id}`}
              >
                {showAllAddons ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        )}
      </div>
      <div className="service-card__buttons">
        <button
          className="service-card__button btn btn-primary"
          onClick={() => onContact(pkg.title)}
          aria-label={`Contact about ${pkg.title}`}
        >
          <i className="bi bi-envelope-fill" aria-hidden="true"></i>
          <span className="button-text">Contact Me</span>
        </button>

        {/* Conditional Add to Cart or Login/Register buttons */}
        {pkg.price !== null && (
          isAuthenticated ? (
            <button
              className="service-card__button btn btn-success"
              onClick={() => onAddToCart(pkg.service_id)}
              aria-label={`Add ${pkg.title} to Cart`}
            >
              <i className="bi bi-cart-plus-fill" aria-hidden="true"></i>
              <span className="button-text">Add to Cart</span>
            </button>
          ) : (
            <button
              className="service-card__button btn btn-dark"
              onClick={() => onLogin(pkg.service_id)}
              aria-label="Login to Add to Cart"
            >
              <i className="bi bi-box-arrow-in-right" aria-hidden="true"></i>
              <span className="button-text">Login to Add to Cart</span>
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

  const [showLogin, setShowLogin] = useState(false);
  const [pendingServiceId, setPendingServiceId] = useState(null);

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
    setPendingServiceId(serviceId);
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
    const features = isAddOn ? [] : (s.description ? s.description.split(',').map(f => f.trim()) : []);
    const addons = isAddOn ? (s.description ? s.description.split(',').map(a => a.trim()) : []) : [];
    return {
      ...s,
      features,
      addons,
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
        <h1 className="services-page__title">Our Services</h1>
        <p className="services-page__subtitle">
          Choose the package that best fits your needs and let’s build something great together!
        </p>
      </header>

      <main className="services-page__main">
        <section className="services-page__section">
          <div className="services-page__packages">
            {processedServices.map((pkg, pkgIdx) => (
              <PackageCard
                key={`package-${pkg.service_id || pkgIdx}`}
                pkg={pkg}
                onContact={handleContact}
                onAddToCart={handleAddToCart}
                onLogin={handleLoginPrompt}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        </section>
      </main>

      {showLogin && (
        <Login
          show={showLogin}
          handleClose={() => {
            setShowLogin(false);
            setPendingServiceId(null);
          }}
          onSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default Services;
