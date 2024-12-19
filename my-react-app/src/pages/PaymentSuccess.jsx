// src/pages/PaymentSuccess.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentSuccess.css'; // We'll create this CSS file next

const PaymentSuccess = () => {
    return (
        <div className="payment-success-page">
            <div className="payment-success-page__content">
                <h1 className="payment-success-page__title">Payment Successful!</h1>
                <p className="payment-success-page__message">
                    Thank you for your purchase. Your order has been received and is being processed.
                </p>
                <Link to="/" className="payment-success-page__button">Return to Home</Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
