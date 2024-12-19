// src/pages/PaymentSuccess.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com'; // Import EmailJS
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import { fetchCart, resetCartState } from '../redux/cartSlice'; // Import fetchCart and resetCartState
import './PaymentSuccess.css'; // Ensure this file is correctly imported

const PaymentSuccess = () => {
    const [emailStatus, setEmailStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch(); // Initialize dispatch

    // Access user information from Redux store
    const { user } = useSelector((state) => state.user); // Adjust according to your Redux state structure

    useEffect(() => {
        const sendConfirmationEmail = async () => {
            if (!user || !user.email) {
                setEmailStatus('User email not found. Please contact support.');
                return;
            }

            setLoading(true);

            const templateParams = {
                to_name: user.name || 'Customer',
                to_email: user.email,
                message: 'Thank you for your purchase! We will be reaching out to discuss your project as soon as possible.',
            };

            try {
                const result = await emailjs.send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID, // Your EmailJS Service ID
                    import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Your EmailJS Template ID
                    templateParams,
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY // Your EmailJS Public Key
                );
                console.log('Email sent successfully:', result.text);
                setEmailStatus('A confirmation email has been sent to your email address.');
            } catch (error) {
                console.error('Error sending confirmation email:', error.text);
                setEmailStatus('Failed to send confirmation email. Please contact support.');
            } finally {
                setLoading(false);
                // After sending the email (regardless of success), refresh the cart
                dispatch(fetchCart());
            }
        };

        sendConfirmationEmail();
    }, [user, dispatch]); // Add dispatch to the dependency array

    return (
        <div className="payment-success-page">
            <div className="payment-success-page__content">
                <h1 className="payment-success-page__title">Payment Successful!</h1>
                <p className="payment-success-page__message">
                    Thank you for your purchase. Your order has been received and is being processed.
                </p>
                <p className="payment-success-page__additional-message">
                    We will be reaching out to discuss the project as soon as possible.
                </p>
                {loading && <p className="payment-success-page__loading">Sending confirmation email...</p>}
                {emailStatus && (
                    <p
                        className={`payment-success-page__email-status ${
                            emailStatus.includes('successfully') ? 'success' : 'error'
                        }`}
                    >
                        {emailStatus}
                    </p>
                )}
                <Link to="/" className="payment-success-page__button">
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
