
import React from 'react';
import { useOutletContext, Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const { user } = useOutletContext();

    if (!user) {
        return <div>Loading...</div>; // Or a spinner
    }

    return user.role === 'admin' ? <Outlet context={{ user }} /> : <Navigate to="/" />;
};

export default AdminRoute;