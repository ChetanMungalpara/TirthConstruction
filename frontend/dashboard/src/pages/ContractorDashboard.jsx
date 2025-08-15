
import React from 'react';

const ContractorDashboard = ({ user }) => {
    return (
        <div>
            <h2 className="text-3xl font-semibold">Contractor Dashboard</h2>
            <p className="text-gray-600">Welcome, {user.email}!</p>

             <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Add your contractor-specific components here */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-bold">My Projects</h3>
                    <p>View and update the status of your assigned projects.</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-bold">My Profile</h3>
                    <p>Update your contact information and skills.</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-bold">Events</h3>
                    <p>Manage company events.</p>
                </div>
            </div>
        </div>
    );
};

export default ContractorDashboard;