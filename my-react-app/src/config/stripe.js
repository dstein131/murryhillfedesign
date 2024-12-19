// src/config/stripe.js

import { loadStripe } from '@stripe/stripe-js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default stripePromise;
