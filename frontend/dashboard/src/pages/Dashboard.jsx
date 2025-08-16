
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import ContractorDashboard from './ContractorDashboard';

const DashboardPage = () => {
    const { user } = useOutletContext();

    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <>
            {user.role === 'admin' && <AdminDashboard user={user} />}
            {user.role === 'contractor' && <ContractorDashboard user={user} />}
        </>
    );
};

export default DashboardPage;