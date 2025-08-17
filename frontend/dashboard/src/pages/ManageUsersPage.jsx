import React, { useState, useEffect } from 'react';
import { adminGetAllUsers, adminUpdateUser, adminUpdateUserRole, adminDeleteUser, adminCreateUser } from '../../../client/src/services/apiService';
import { Users, Trash2, PlusCircle, Edit, X, Shield, User, KeyRound, Phone, Mail, Eye, EyeOff, Check, UploadCloud, Image as ImageIcon } from 'lucide-react';

// --- (Password Validator Component) ---
const PasswordValidator = ({ password }) => {
    const checks = {
        minLength: password.length >= 8,
        hasUpper: /[A-Z]/.test(password),
        hasLower: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
    };

    const ValidationItem = ({ text, isValid }) => (
        <li className={`flex items-center text-xs transition-colors ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
            {isValid ? <Check size={14} className="mr-2" /> : <X size={14} className="mr-2 text-red-400" />}
            {text}
        </li>
    );

    return (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 pl-1">
            <ValidationItem text="8+ characters" isValid={checks.minLength} />
            <ValidationItem text="1 uppercase" isValid={checks.hasUpper} />
            <ValidationItem text="1 lowercase" isValid={checks.hasLower} />
            <ValidationItem text="1 number" isValid={checks.hasNumber} />
        </ul>
    );
};


// --- (Modal Component for Add/Edit User) ---
const UserFormModal = ({ isOpen, onClose, onSubmit, user }) => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    // State for image previews
    const [dpPreview, setDpPreview] = useState(null);
    const [fullImagePreview, setFullImagePreview] = useState(null);


    useEffect(() => {
        if (isOpen) {
            if (user) {
                setFormData({
                    name: user.contractorProfile?.name || '',
                    email: user.email || '',
                    username: user.username || '',
                    phone: user.phone || '',
                    password: '',
                    role: user.role || 'contractor',
                    companyRole: user.contractorProfile?.companyRole || '',
                    description: user.contractorProfile?.description || '',
                    quotes: user.contractorProfile?.quotes || '',
                    dpImageFile: null,
                    fullImageFile: null,
                });
                setDpPreview(user.contractorProfile?.dpimageurl);
                setFullImagePreview(user.contractorProfile?.fullimageurl);
            } else {
                setFormData({
                    name: '', email: '', username: '', phone: '',
                    password: '', role: 'contractor', companyRole: '',
                    description: '', quotes: '', dpImageFile: null, fullImageFile: null,
                });
                setDpPreview(null);
                setFullImagePreview(null);
            }
            setError('');
        }
    }, [user, isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files[0]) {
            const previewUrl = URL.createObjectURL(files[0]);
            if (name === 'dpImageFile') {
                setDpPreview(previewUrl);
            } else {
                setFullImagePreview(previewUrl);
            }
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.username && !formData.email && !formData.phone) {
            setError('At least one of Username, Email, or Phone is required.');
            return;
        }
        if (!user && !formData.password) {
            setError('Password is required for a new user.');
            return;
        }
        if (formData.password && formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in-up">
            <div className="bg-white rounded-lg shadow-2xl w-full h-full max-w-4xl flex flex-col">
                <div className="sticky top-0 bg-white p-6 border-b z-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">{user ? 'Edit User' : 'Add New User'}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-6">
                    {error && <p className="text-red-600 text-sm bg-red-100 p-3 rounded-md text-center">{error}</p>}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                             {/* Section: Login Credentials */}
                            <div className="space-y-4 p-4 border rounded-md">
                                <h3 className="font-semibold text-gray-700 flex items-center"><KeyRound size={18} className="mr-2"/> Login Credentials</h3>
                                <p className="text-xs text-gray-500">At least one identifier (Username, Email, or Phone) is required.</p>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Username</label>
                                    <input type="text" name="username" value={formData.username || ''} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Email</label>
                                    <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-600">Password <span className="text-red-500 font-bold">{user ? '' : '*'}</span></label>
                                    <input type={passwordVisible ? 'text' : 'password'} name="password" placeholder={user ? "Leave blank to keep unchanged" : "Required for new user"} value={formData.password} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500" />
                                    <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-gray-500">
                                        {passwordVisible ? <EyeOff size={20}/> : <Eye size={20}/>}
                                    </button>
                                </div>
                                {formData.password && <PasswordValidator password={formData.password} />}
                            </div>

                            {/* Section: Role */}
                            <div className="space-y-4 p-4 border rounded-md">
                                <h3 className="font-semibold text-gray-700 flex items-center"><Shield size={18} className="mr-2"/> Role</h3>
                                <select name="role" value={formData.role} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500">
                                    <option value="contractor">Contractor</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Section: Personal Details */}
                            <div className="space-y-4 p-4 border rounded-md">
                                <h3 className="font-semibold text-gray-700 flex items-center"><User size={18} className="mr-2"/> Personal Details</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Full Name</label>
                                    <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Company Role (e.g., Founder, Partner)</label>
                                    <input type="text" name="companyRole" value={formData.companyRole || ''} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Description / Bio</label>
                                    <textarea name="description" value={formData.description || ''} onChange={handleChange} rows="3" className="mt-1 w-full p-2 border rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Quote</label>
                                    <input type="text" name="quotes" value={formData.quotes || ''} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500" />
                                </div>
                            </div>
                             {/* Section: Images */}
                            <div className="space-y-4 p-4 border rounded-md">
                                <h3 className="font-semibold text-gray-700 flex items-center"><ImageIcon size={18} className="mr-2"/> Profile Images</h3>
                                <div className="grid grid-cols-2 gap-4 items-center">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Display Picture</label>
                                        <img src={dpPreview || 'https://placehold.co/128x128/EFEFEF/AAAAAA&text=DP'} alt="DP Preview" className="w-32 h-32 rounded-full object-cover shadow-sm border"/>
                                        <input type="file" name="dpImageFile" onChange={handleFileChange} accept="image/*" className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Full Image</label>
                                        <img src={fullImagePreview || 'https://placehold.co/200x266/EFEFEF/AAAAAA&text=Full'} alt="Full Image Preview" className="w-full h-32 object-cover rounded-md shadow-sm border"/>
                                        <input type="file" name="fullImageFile" onChange={handleFileChange} accept="image/*" className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4 sticky bottom-0 bg-white p-6 border-t">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition">Save User</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const ManageUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

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

    const handleAddUser = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = async (userId) => {
        if (users.length <= 1) {
            alert("You cannot delete the last user.");
            return;
        }
        const adminCount = users.filter(u => u.role === 'admin').length;
        const userToDelete = users.find(u => u._id === userId);
        if (adminCount <= 1 && userToDelete.role === 'admin') {
            alert("You cannot delete the last admin.");
            return;
        }

        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                await adminDeleteUser(userId);
                fetchUsers();
            } catch (error) {
                alert('Failed to delete user.');
            }
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        const adminCount = users.filter(u => u.role === 'admin').length;
        const userToChange = users.find(u => u._id === userId);

        if (adminCount <= 1 && userToChange.role === 'admin' && newRole !== 'admin') {
            alert("You cannot remove the last admin's role.");
            fetchUsers();
            return;
        }

        try {
            await adminUpdateUserRole(userId, newRole);
            fetchUsers();
        } catch (error) {
            alert('Failed to update role.');
        }
    };

    const handleFormSubmit = async (userData) => {
        try {
            if (editingUser) {
                await adminUpdateUser(editingUser._id, userData);
            } else {
                await adminCreateUser(userData);
            }
            fetchUsers();
            setIsModalOpen(false);
        } catch (error) {
            alert('Failed to save user. ' + (error.response?.data?.msg || ''));
        }
    };

    if (loading) return <div>Loading users...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center"><Users className="mr-3" /> Manage Users</h1>
                <button onClick={handleAddUser} className="bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center transition shadow-sm hover:shadow-md">
                    <PlusCircle size={20} className="mr-2" /> Add New User
                </button>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">User</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Contact</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Role</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-5 py-4 text-sm">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-10 h-10">
                                            <img className="w-full h-full rounded-full object-cover" src={user.contractorProfile?.dpimageurl} alt={user.contractorProfile?.name} />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-gray-900 font-semibold whitespace-no-wrap">{user.contractorProfile?.name || 'N/A'}</p>
                                            <p className="text-gray-600 whitespace-no-wrap text-xs">{user.username || 'No Username'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap flex items-center"><Mail size={14} className="mr-2 text-gray-400"/>{user.email || 'N/A'}</p>
                                    <p className="text-gray-600 whitespace-no-wrap flex items-center"><Phone size={14} className="mr-2 text-gray-400"/>{user.phone || 'N/A'}</p>
                                </td>
                                <td className="px-5 py-4 text-sm">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="p-2 rounded-md border border-gray-300 bg-white"
                                    >
                                        <option value="contractor">Contractor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="px-5 py-4 text-sm text-center">
                                    <div className="flex item-center justify-center space-x-4">
                                        <button onClick={() => handleEditUser(user)} className="text-indigo-600 hover:text-indigo-900" title="Edit">
                                            <Edit size={20} />
                                        </button>
                                        <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-900" title="Delete">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <UserFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                user={editingUser}
            />
        </div>
    );
};

export default ManageUsersPage;
