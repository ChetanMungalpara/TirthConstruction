
import React, { useState, useEffect } from 'react';
import { adminGetAllUsers, adminUpdateUserRole, adminDeleteUser } from '../../../client/src/services/apiService';
import { Users, Trash2, ShieldCheck } from 'lucide-react';

const ManageUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await adminGetAllUsers();
            setUsers(res.data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                await adminDeleteUser(userId);
                fetchUsers(); // Refresh the list
            } catch (error) {
                alert('Failed to delete user.');
            }
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await adminUpdateUserRole(userId, newRole);
            fetchUsers(); // Refresh the list
        } catch (error) {
            alert('Failed to update role.');
        }
    };

    if (loading) return <div>Loading users...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center"><Users className="mr-3" /> Manage Users</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                            <th className="px-5 py-3 border-b-2 border-gray-300 text-left">Name</th>
                            <th className="px-5 py-3 border-b-2 border-gray-300 text-left">Email</th>
                            <th className="px-5 py-3 border-b-2 border-gray-300 text-left">Role</th>
                            <th className="px-5 py-3 border-b-2 border-gray-300 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-5 py-4 text-sm">{user.contractorProfile?.name || 'N/A'}</td>
                                <td className="px-5 py-4 text-sm">{user.email}</td>
                                <td className="px-5 py-4 text-sm">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="p-2 rounded-md border border-gray-300"
                                    >
                                        <option value="contractor">Contractor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="px-5 py-4 text-sm text-center">
                                    <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-900">
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsersPage;