// src/pages/Checkout.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../redux/paymentSlice'; // Assuming you have this slice
import './Checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { cart_id, items, loading, error } = useSelector((state) => state.cart);
  const { clientSecret, paymentLoading, paymentError, paymentSuccess } = useSelector((state) => state.payment);
  
  const stripe = useStripe();
  const elements = useElements();
  
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);
  
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  
  useEffect(() => {
    if (paymentSuccess) {
      navigate('/payment-success'); // Navigate to payment success page
    }
  }, [paymentSuccess, navigate]);
  
  // Calculate subtotal
  const subtotal = items.reduce((acc, item) => {
    const itemPrice = isNaN(Number(item.price)) ? 0 : Number(item.price);
    const addonsTotal = item.addons ? item.addons.reduce((a, addon) => {
      const addonPrice = isNaN(Number(addon.price)) ? 0 : Number(addon.price);
      return a + addonPrice;
    }, 0) : 0;
    return acc + (itemPrice * item.quantity) + addonsTotal;
  }, 0);
  
  // Apply Florida sales tax (6%)
  const floridaSalesTaxRate = 0.06; // 6%
  const salesTax = subtotal * floridaSalesTaxRate;
  
  const total = subtotal + salesTax;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setProcessing(true);
    
    // Create payment intent on the backend
    try {
      await dispatch(createPaymentIntent({ items, currency: 'usd' })).unwrap();
    } catch (err) {
      console.error('Error creating payment intent:', err);
      setProcessing(false);
      return;
    }
    
    // Confirm the payment on the client
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setCardError('Card Element not found.');
      setProcessing(false);
      return;
    }
    
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });
    
    if (error) {
      setCardError(error.message);
      setProcessing(false);
    } else {
      setCardError('');
      setProcessing(false);
      // The payment success is handled via Redux and webhook
      // Optionally, you can dispatch an action to set paymentSuccess here
      // or rely on the webhook to update the state
    }
  };
  
  return (
    <div className="checkout-page">
      <header className="checkout-page__header">
        <h1 className="checkout-page__title">Checkout</h1>
      </header>
      
      <main className="checkout-page__main">
        {loading ? (
          <p>Loading your cart...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : items.length === 0 ? (
          <p>Your cart is empty. <a href="/services">Browse services</a> to add items.</p>
        ) : (
          <div className="checkout-page__content">
            <section className="checkout-page__section">
              <h2>Order Summary</h2>
              <ul className="checkout-page__items">
                {items.map((item) => (
                  <li key={item.cart_item_id} className="checkout-page__item">
                    <div>
                      <strong>{item.title}</strong> x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                      {item.addons && item.addons.length > 0 && (
                        <ul className="checkout-page__addons">
                          {item.addons.map((addon) => (
                            <li key={addon.cart_item_addon_id}>
                              {addon.name} - ${Number(addon.price).toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div>
                      <strong>${((item.price * item.quantity) + 
                        (item.addons ? item.addons.reduce((sum, addon) => sum + Number(addon.price), 0) : 0)).toFixed(2)}</strong>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="checkout-page__summary">
                <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
                <p><strong>Sales Tax (6%):</strong> ${salesTax.toFixed(2)}</p>
                <p><strong>Total:</strong> ${total.toFixed(2)}</p>
              </div>
            </section>
            
            <section className="checkout-page__section">
              <h2>Payment Details</h2>
              <form onSubmit={handleSubmit} className="checkout-page__form">
                <div className="checkout-page__card-element">
                  <CardElement options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }} />
                </div>
                
                {cardError && <div className="checkout-page__error">{cardError}</div>}
                {paymentError && <div className="checkout-page__error">{paymentError}</div>}
                
                <button type="submit" className="checkout-page__button" disabled={!stripe || processing || paymentLoading}>
                  {processing || paymentLoading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                </button>
              </form>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;
