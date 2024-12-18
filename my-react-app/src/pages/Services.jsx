// src/pages/Services.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../redux/servicesSlice'; // Ensure this is correctly imported
import './Services.css'; // Ensure this file is correctly imported

const PackageCard = ({ pkg, onContact }) => {
  return (
    <div className="service-card">
      <div className="service-card__content">
        <h3 className="service-card__title">{pkg.title}</h3>
        {pkg.price && <p className="service-card__price">${pkg.price}</p>}
        <ul className="service-card__features">
          {pkg.features.map((feature, index) => (
            typeof feature === 'string' ? (
              <li key={`feature-${index}`}>{feature}</li>
            ) : (
              <li key={`feature-${index}`}>
                <strong>{feature.heading}</strong>
                {feature.items && feature.items.length > 0 && (
                  <ul className="service-card__subfeatures">
                    {feature.items.map((item, subIndex) => (
                      <li key={`subfeature-${index}-${subIndex}`}>{item}</li>
                    ))}
                  </ul>
                )}
              </li>
            )
          ))}
        </ul>
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
      <button
        className="service-card__button"
        onClick={() => onContact(pkg.title)}
        aria-label={`Contact about ${pkg.title}`}
      >
        Contact Me
      </button>
    </div>
  );
};

const Services = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch services from Redux store
  const { services, loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleContact = (serviceName) => {
    navigate(`/contact?service=${encodeURIComponent(serviceName)}`);
  };

  // Function to split by commas not within parentheses
  const splitFeatures = (description) => {
    const regex = /,(?![^(]*\))/;
    return description.split(regex).map(item => item.trim());
  };

  // Categorize services into sections
  const categorizedServices = services.reduce((acc, service) => {
    let category = 'Other Services'; // Default category

    // Define categories based on service titles or IDs
    if (['Basic Package', 'Standard Package', 'Premium Package'].includes(service.title)) {
      category = 'Pricing Packages';
    } else if (['Tier 1: Intermediate Advanced Site', 'Tier 2: Full Advanced Static Site'].includes(service.title)) {
      category = 'Advanced Static Website Packages';
    } else if (['Hosting & Domain Setup', 'Monthly Maintenance Plans', 'Add-On Monthly Services'].includes(service.title)) {
      category = 'Hosting, Deployment, and Monthly Maintenance';
    }

    if (!acc[category]) {
      acc[category] = [];
    }

    // Parse the description into features using advanced splitting
    const rawFeatures = splitFeatures(service.description);

    // Identify add-ons (services with price null could be treated as add-ons)
    const addons = service.price === null ? rawFeatures : [];

    // Handle features with sub-features (e.g., maintenance plans)
    const features = addons.length > 0 ? [] : rawFeatures.map(feature => {
      // Detect if feature has sub-features (e.g., "Basic Maintenance - $100/month:")
      if (feature.endsWith(':') || feature.includes(':')) {
        const [heading, ...rest] = feature.split(':');
        return {
          heading: heading.trim(),
          items: rest.length > 0 ? [rest.join(':').trim()] : []
        };
      }
      return feature;
    });

    acc[category].push({
      title: service.title,
      price: service.price,
      features: features,
      addons: addons.length > 0 ? addons : [],
    });

    return acc;
  }, {});

  // Optional: Handle loading and error states
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
        {Object.keys(categorizedServices).map((sectionTitle, sectionIdx) => (
          <section className="services-page__section" key={`section-${sectionIdx}`}>
            <h2 className="services-page__section-title">{sectionTitle}</h2>
            {/* If there's a description for the section, include it here */}
            {/* <p className="services-page__section-description">Section description</p> */}
            {categorizedServices[sectionTitle] && (
              <div className="services-page__packages">
                {categorizedServices[sectionTitle].map((pkg, pkgIdx) => (
                  <PackageCard
                    key={`package-${sectionIdx}-${pkgIdx}`}
                    pkg={pkg}
                    onContact={handleContact}
                  />
                ))}
              </div>
            )}
          </section>
        ))}
      </main>
    </div>
  );
};

export default Services;
