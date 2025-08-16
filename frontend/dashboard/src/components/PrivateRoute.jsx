import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get('token');

        if (urlToken) {
            localStorage.setItem('token', urlToken);
            
            navigate('/dashboard', { replace: true });

        } else if (!token) {
            navigate('/dashboard/login', { replace: true });
        }
    }, [token, navigate]);

    return token ? children : null;
};

export default PrivateRoute;
