import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from './config/stripe';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import Music from './pages/Music';
import Blog from './pages/Blog';
import Services from './pages/Services';
import ChatGPTInteraction from './pages/ChatGPTInteraction';
import PaymentSuccess from './pages/PaymentSuccess';
import AdminPanel from './pages/AdminPanel';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Templates from './pages/Templates';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';

import ProtectedRoute from './components/ProtectedRoute';
import SuperAdminRoute from './components/SuperAdminRoute';
import { verifyToken } from './redux/userSlice';

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isAuthenticated, loading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(verifyToken());
    }, [dispatch]);

    useEffect(() => {
        const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

        if (gaId) {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag() {
                window.dataLayer.push(arguments);
            }
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', gaId);
        } else {
            console.warn('Google Analytics ID is missing!');
        }
    }, []);

    useEffect(() => {
        const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
        if (window.gtag && gaId) {
            window.gtag('config', gaId, {
                page_path: location.pathname,
            });
        }
    }, [location.pathname]);

    return (
        <HelmetProvider>
            <div id="app">
                <header>
                    <NavBar />
                </header>
                <main className="app-main">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/resume" element={<Resume />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/music" element={<Music />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/chat" element={<ChatGPTInteraction />} />
                        <Route path="/auth/success" element={<PaymentSuccess />} />
                        <Route path="/templates" element={<Templates />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route
                            path="/checkout"
                            element={
                                <Elements stripe={stripePromise}>
                                    <Checkout />
                                </Elements>
                            }
                        />
                        <Route path="/payment-success" element={<PaymentSuccess />} />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <AdminPanel />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/orders"
                            element={
                                <SuperAdminRoute>
                                    <Orders />
                                </SuperAdminRoute>
                            }
                        />
                        <Route
                            path="/orders/:orderId"
                            element={
                                <SuperAdminRoute>
                                    <OrderDetails />
                                </SuperAdminRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
        </HelmetProvider>
    );
};

export default App;
