import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './PaymentSuccess.css'; // Ensure this file is correctly imported

const PaymentSuccess = () => {
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    useEffect(() => {
        // Redirect the user to home after 3 seconds
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [navigate]); // Add navigate to the dependency array

    return (
        <div className="payment-success-page">
            <div className="payment-success-page__content">
                <h1 className="payment-success-page__title">Payment Successful!</h1>
                <p className="payment-success-page__message">
                    Thank you for your purchase. Your order has been received and is being processed.
                </p>
                <p className="payment-success-page__additional-message">
                    We will be reaching out to discuss the project as soon as possible and gather any additional information needed.
                </p>
                <Link to="/" className="payment-success-page__button">
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
