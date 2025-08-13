import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../../client/src/components/Login'; // We can reuse the login component

const LoginPage = () => {
    const navigate = useNavigate();

    // If user is already logged in, redirect them to the dashboard
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                {/* We can reuse the Login component from the client folder */}
                <Login closeModal={() => navigate('/')} />
            </div>
        </div>
    );
};

export default LoginPage;
