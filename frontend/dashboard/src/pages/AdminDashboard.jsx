
import React from 'react';

const AdminDashboard = ({ user }) => {
    return (
        <div>
            <h2 className="text-3xl font-semibold">Admin Dashboard</h2>
            <p className="text-gray-600">Welcome, {user.email}!</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Add your admin-specific components here */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-bold">Manage Projects</h3>
                    <p>View, create, edit, and delete all projects.</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-bold">Manage Contractors</h3>
                    <p>View, create, edit, and delete contractor profiles and logins.</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-bold">Manage Users</h3>
                    <p>View and manage all user accounts.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;