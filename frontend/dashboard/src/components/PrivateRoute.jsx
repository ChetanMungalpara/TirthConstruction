import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get('token');

        if (urlToken) {
            // 1. A new token is found in the URL from the Google redirect.
            localStorage.setItem('token', urlToken);
            
            // 2. IMPORTANT FIX: Force a full page reload.
            // This clears the old application state and forces a fresh load
            // of the DashboardLayout with the new, correct token.
            window.location.href = '/dashboard.html'; 

        } else if (!token) {
            // 3. If no token exists at all, redirect to the login page.
            navigate('/login', { replace: true });
        }
    }, [token, navigate]);

    // Render children if a token exists, otherwise render null while the redirect happens.
    return token ? children : null;
};

export default PrivateRoute;
