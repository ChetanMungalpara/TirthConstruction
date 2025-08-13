import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        // This effect handles the token from the Google redirect
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get('token');

        if (urlToken) {
            localStorage.setItem('token', urlToken);
            // Redirect to a clean URL without the token in the query string
            navigate('/', { replace: true });
        } else if (!token) {
            // If no token exists at all, redirect to the login page
            navigate('/login', { replace: true });
        }
    }, [token, navigate]);

    // Render children if token exists, otherwise render null while redirecting
    return token ? children : null;
};

export default PrivateRoute;
