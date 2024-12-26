// services.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../redux/servicesSlice';
import { addItemToCart, fetchCart } from '../redux/cartSlice'; // Import cart actions
import Login from './Login'; // Import Login Modal
import './Services.css'; // Ensure this file is correctly imported

const MAX_FEATURES_VISIBLE = 3;
const MAX_ADDONS_VISIBLE = 3;

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error caught in ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-boundary">Something went wrong. Please try again later.</div>;
    }
    return this.props.children;
  }
}

const PackageCard = ({ pkg, onContact, onAddToCart, onLogin, isAuthenticated }) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showAllAddons, setShowAllAddons] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [totalPrice, setTotalPrice] = useState(parseFloat(pkg.price) || 0);

  useEffect(() => {
    const addonsPrice = selectedAddons.reduce((acc, addon) => acc + (parseFloat(addon.price) * addon.quantity), 0);
    setTotalPrice((parseFloat(pkg.price) || 0) + addonsPrice);
  }, [selectedAddons, pkg.price]);

  const toggleAddonSelection = (addon) => {
    setSelectedAddons((prevSelected) => {
      if (prevSelected.find((item) => item.addon_id === addon.addon_id)) {
        return prevSelected.filter((item) => item.addon_id !== addon.addon_id);
      } else {
        return [...prevSelected, { ...addon, quantity: 1 }];
      }
    });
  };

  const updateAddonQuantity = (addon_id, quantity) => {
    setSelectedAddons((prevSelected) =>
      prevSelected.map((addon) =>
        addon.addon_id === addon_id ? { ...addon, quantity: quantity } : addon
      )
    );
  };

  // Ensure features and addons are defined before accessing them
  const features = pkg.features || [];
  const addons = pkg.addons || [];
  const visibleFeatures = showAllFeatures ? features : features.slice(0, MAX_FEATURES_VISIBLE);
  const visibleAddons = showAllAddons ? addons : addons.slice(0, MAX_ADDONS_VISIBLE);

  return (
    <div className="service-card">
      <div className="service-card__content">
        <h3 className="service-card__title">{pkg.title}</h3>
        <p className="service-card__price">Total Price: ${totalPrice.toFixed(2)}</p>

        {features.length > 0 && (
          <div className="service-card__section">
            <h4 className="section-title">Features:</h4>
            <ul className="service-card__features">
              {visibleFeatures.map((feature, index) => (
                <li key={`feature-${index}`}>{feature}</li>
              ))}
            </ul>
            {features.length > MAX_FEATURES_VISIBLE && (
              <button
                className="toggle-button"
                onClick={() => setShowAllFeatures(!showAllFeatures)}
                aria-expanded={showAllFeatures}
              >
                {showAllFeatures ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        )}

        {addons.length > 0 && (
          <div className="service-card__section">
            <h4 className="section-title">Add-Ons:</h4>
            <ul className="service-card__addons">
              {visibleAddons.map((addon, idx) => {
                const selectedAddon = selectedAddons.find(item => item.addon_id === addon.addon_id);
                return (
                  <li key={`addon-${idx}`}>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => toggleAddonSelection(addon)}
                        checked={!!selectedAddon}
                      />
                      {addon.name} - ${addon.price}
                    </label>
                    {selectedAddon && (
                      <input
                        type="number"
                        min="1"
                        value={selectedAddon.quantity}
                        onChange={(e) => {
                          const qty = parseInt(e.target.value, 10);
                          if (qty > 0) {
                            updateAddonQuantity(addon.addon_id, qty);
                          }
                        }}
                        className="addon-quantity-input"
                        aria-label={`Quantity for ${addon.name}`}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
            {addons.length > MAX_ADDONS_VISIBLE && (
              <button
                className="toggle-button"
                onClick={() => setShowAllAddons(!showAllAddons)}
                aria-expanded={showAllAddons}
              >
                {showAllAddons ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        )}
      </div>
      <div className="service-card__buttons">
        <button
          className="service-card__button btn-primary"
          onClick={() => onContact(pkg.title)}
        >
          Contact Me
        </button>

        {pkg.price !== null && (
          isAuthenticated ? (
            <button
              className="service-card__button btn-success"
              onClick={() => onAddToCart(pkg.service_id, selectedAddons)}
            >
              Add to Cart
            </button>
          ) : (
            <button
              className="service-card__button btn-dark"
              onClick={() => onLogin(pkg.service_id)}
            >
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

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleContact = (serviceName) => navigate(`/contact?service=${encodeURIComponent(serviceName)}`);
  
  const handleAddToCart = async (serviceId, selectedAddons) => {
    try {
      const addons = selectedAddons.map((addon) => ({
        addon_id: addon.addon_id,
        price: addon.price,
        quantity: addon.quantity
      }));
      await dispatch(addItemToCart({ service_id: serviceId, quantity: 1, addons })).unwrap();
      dispatch(fetchCart());
      alert('Item added to cart successfully!');
    } catch (err) {
      console.error('Error adding item to cart:', err);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  if (loading) return <div className="services-page"><p>Loading services...</p></div>;
  if (error) return <div className="services-page"><p>Error: {error}</p></div>;

  const processedServices = (list) =>
    list.map((service) => ({
      ...service,
      features: service.description ? service.description.split(',').map((f) => f.trim()) : [],
      addons: service.addons || [],
    }));

  return (
    <div className="services-page">
      <header>
        <h1>Our Services</h1>
      </header>
      <main>
        <ErrorBoundary>
          <section className="services-page__section">
            <h2>One-Time Services</h2>
            <div className="services-page__packages">
              {processedServices(services.filter((s) => !s.isMonthly)).map((pkg) => (
                <PackageCard
                  key={pkg.service_id}
                  pkg={pkg}
                  onContact={handleContact}
                  onAddToCart={handleAddToCart}
                  onLogin={() => alert('Please log in first!')}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>
          </section>
          <section className="services-page__section">
            <h2>Monthly Services</h2>
            <div className="services-page__packages">
              {processedServices(services.filter((s) => s.isMonthly)).map((pkg) => (
                <PackageCard
                  key={pkg.service_id}
                  pkg={pkg}
                  onContact={handleContact}
                  onAddToCart={handleAddToCart}
                  onLogin={() => alert('Please log in first!')}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>
          </section>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default Services;
