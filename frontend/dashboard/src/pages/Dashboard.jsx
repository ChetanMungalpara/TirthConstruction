
import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../../client/src/services/apiService';
import AdminDashboard from './AdminDashboard';
import ContractorDashboard from './ContractorDashboard';

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getCurrentUser();
                setUser(res.data);
            } catch (error) {
                console.error("Could not fetch user data", error);
                // Handle error, e.g., logout user
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/'; // Redirect to the main site
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading Dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Tirth Dashboard</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
            </header>
            <main className="p-8">
                {user && user.role === 'admin' && <AdminDashboard user={user} />}
                {user && user.role === 'contractor' && <ContractorDashboard user={user} />}
            </main>
        </div>
    );
};

export default DashboardPage;