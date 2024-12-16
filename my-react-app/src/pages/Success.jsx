import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice'; // Import login action
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            localStorage.setItem('token', token); // Save the token
            dispatch(login({ token })); // Update Redux store
            navigate('/'); // Redirect to home
        } else {
            navigate('/login'); // Redirect to login if no token
        }
    }, [dispatch, navigate]);

    return <div>Processing login...</div>;
};

export default Success;
