// src/components/Services/ServiceCard.jsx

import React, { useState, useEffect } from 'react';
import './ServiceCard.css';

const MAX_ADDONS_VISIBLE = 3;

const ServiceCard = ({ pkg, onContact, onAddToCart, onLogin, isAuthenticated }) => {
  const [showAllAddons, setShowAllAddons] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [totalPrice, setTotalPrice] = useState(parseFloat(pkg.price) || 0);

  useEffect(() => {
    const addonsPrice = selectedAddons.reduce(
      (acc, addon) => acc + parseFloat(addon.price) * addon.quantity,
      0
    );
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

  const increaseAddonQuantity = (addon_id) => {
    setSelectedAddons((prevSelected) =>
      prevSelected.map((addon) =>
        addon.addon_id === addon_id
          ? { ...addon, quantity: addon.quantity + 1 }
          : addon
      )
    );
  };

  const decreaseAddonQuantity = (addon_id) => {
    setSelectedAddons((prevSelected) =>
      prevSelected
        .map((addon) =>
          addon.addon_id === addon_id
            ? { ...addon, quantity: addon.quantity - 1 }
            : addon
        )
        .filter((addon) => addon.quantity > 0)
    );
  };

  const clearAddon = (addon_id) => {
    setSelectedAddons((prevSelected) =>
      prevSelected.filter((addon) => addon.addon_id !== addon_id)
    );
  };

  const features = pkg.features || [];
  const addons = pkg.addons || [];
  const visibleAddons = showAllAddons ? addons : addons.slice(0, MAX_ADDONS_VISIBLE);

  return (
    <div className="service-card">
      {/* Main Content */}
      <div className="service-card__content">
        <div className="service-card__header">
          <h3 className="service-card__title">{pkg.title}</h3>
          <p className="service-card__price">
            Total Price: ${totalPrice.toFixed(2)}
          </p>
        </div>

        {/* Features Section */}
        {features.length > 0 && (
          <div className="service-card__section">
            <h4 className="section-title">Features</h4>
            <ul className="service-card__features">
              {features.map((feature, index) => (
                <li key={`feature-${index}`}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Addons Section */}
        {addons.length > 0 && (
          <div className="service-card__section">
            <h4 className="section-title">Add-Ons</h4>
            <ul className="service-card__addons">
              {visibleAddons.map((addon, idx) => {
                const selectedAddon = selectedAddons.find(
                  (item) => item.addon_id === addon.addon_id
                );
                return (
                  <li key={`addon-${idx}`} className="addon-item">
                    <div className="addon-toggle">
                      <label className="switch">
                        <input
                          type="checkbox"
                          onChange={() => toggleAddonSelection(addon)}
                          checked={!!selectedAddon}
                        />
                        <span className="slider round"></span>
                      </label>
                      <span className="addon-name">
                        {addon.name} - ${addon.price}
                      </span>
                    </div>
                    {selectedAddon && (
                      <div className="addon-controls">
                        <button
                          className="quantity-button"
                          onClick={() => decreaseAddonQuantity(addon.addon_id)}
                          aria-label={`Decrease quantity for ${addon.name}`}
                        >
                          -
                        </button>
                        <span className="addon-quantity">
                          {selectedAddon.quantity}
                        </span>
                        <button
                          className="quantity-button"
                          onClick={() => increaseAddonQuantity(addon.addon_id)}
                          aria-label={`Increase quantity for ${addon.name}`}
                        >
                          +
                        </button>
                        <button
                          className="clear-button"
                          onClick={() => clearAddon(addon.addon_id)}
                          aria-label={`Clear ${addon.name}`}
                        >
                          ✕
                        </button>
                      </div>
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

      {/* Action Buttons */}
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

export default ServiceCard;
