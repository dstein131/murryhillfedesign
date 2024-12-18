// src/pages/Checkout.jsx

import React from 'react';
import './Checkout.css';

const Checkout = () => {
  return (
    <div className="checkout-page">
      <header className="checkout-page__header">
        <h1 className="checkout-page__title">Checkout</h1>
      </header>
      <main className="checkout-page__main">
        <p className="checkout-page__message">
          We are currently setting up our payment system. Please check back soon!
        </p>
      </main>
    </div>
  );
};

export default Checkout;
