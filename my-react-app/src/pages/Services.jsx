// src/components/Services/Services.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from './../redux/servicesSlice';
import { addItemToCart, fetchCart } from './../redux/cartSlice'; // Import cart actions
import ServiceCard from './ServiceCard'; // Import the ServiceCard component
import './Services.css'; // Import the services page CSS

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
      return (
        <div className="error-boundary">
          Something went wrong. Please try again later.
        </div>
      );
    }
    return this.props.children;
  }
}

const Services = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleContact = (serviceName) =>
    navigate(`/contact?service=${encodeURIComponent(serviceName)}`);

  const handleAddToCart = async (serviceId, selectedAddons) => {
    try {
      const addons = selectedAddons.map((addon) => ({
        addon_id: addon.addon_id,
        price: addon.price,
        quantity: addon.quantity,
      }));
      await dispatch(
        addItemToCart({ service_id: serviceId, quantity: 1, addons })
      ).unwrap();
      dispatch(fetchCart());
      alert('Item added to cart successfully!');
    } catch (err) {
      console.error('Error adding item to cart:', err);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  if (loading)
    return (
      <div className="services-page">
        <p>Loading services...</p>
      </div>
    );
  if (error)
    return (
      <div className="services-page">
        <p>Error: {error}</p>
      </div>
    );

  const processedServices = (list) =>
    list.map((service) => ({
      ...service,
      features: service.description
        ? service.description.split(',').map((f) => f.trim())
        : [],
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
            {/* <h2>One-Time Services</h2> */}
            <div className="services-page__packages">
              {processedServices(services.filter((s) => !s.isMonthly)).map(
                (pkg) => (
                  <ServiceCard
                    key={pkg.service_id}
                    pkg={pkg}
                    onContact={handleContact}
                    onAddToCart={handleAddToCart}
                    onLogin={() => alert('Please log in first!')}
                    isAuthenticated={isAuthenticated}
                  />
                )
              )}
            </div>
          </section>
          <section className="services-page__section">
            {/* <h2>Monthly Services</h2> */}
            <div className="services-page__packages">
              {processedServices(services.filter((s) => s.isMonthly)).map(
                (pkg) => (
                  <ServiceCard
                    key={pkg.service_id}
                    pkg={pkg}
                    onContact={handleContact}
                    onAddToCart={handleAddToCart}
                    onLogin={() => alert('Please log in first!')}
                    isAuthenticated={isAuthenticated}
                  />
                )
              )}
            </div>
          </section>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default Services;
