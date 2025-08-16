import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../../client/src/services/apiService';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getCurrentUser();
                setUser(res.data);
            } catch (error) {
                console.error("Could not fetch user data", error);
                localStorage.removeItem('token');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/'; // Redirect to the main marketing site
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading Dashboard...</div>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar user={user} onLogout={handleLogout} />
            <main className="flex-1 p-8 overflow-y-auto">
                {/* This now passes both the user data AND the function to update it */}
                <Outlet context={{ user, setUser }} />
            </main>
        </div>
    );
};

export default DashboardLayout;
