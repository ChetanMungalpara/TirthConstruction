// TirthConstruction/frontend/dashboard/src/components/Sidebar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Users, LogOut, User, Settings, ShieldCheck } from 'lucide-react';
import Logo from '../assets/Logo-White.svg';

const Sidebar = ({ user, onLogout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinkClass = ({ isActive }) =>
        `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
        isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
        }`;

    if (!user) return null;

    return (
        <div className="flex flex-col h-full w-64 bg-gray-800 text-white">
            {/* Logo */}
            <div className="flex items-center justify-center h-20 border-b border-gray-700">
                <Link to="/">
                    <img src={Logo} alt="Tirth Construction" className="h-10" />
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-grow px-4 py-6 space-y-2">
                <NavLink to="/" end className={navLinkClass}>
                    <LayoutDashboard className="h-5 w-5 mr-3" /> Dashboard
                </NavLink>
                <NavLink to="/my-projects" className={navLinkClass}>
                    <Briefcase className="h-5 w-5 mr-3" /> My Projects
                </NavLink>

                {/* Admin Only Links */}
                {user.role === 'admin' && (
                    <>
                        <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin Tools</div>
                        <NavLink to="/manage/projects" className={navLinkClass}>
                            <Briefcase className="h-5 w-5 mr-3" /> All Projects
                        </NavLink>
                        <NavLink to="/manage/users" className={navLinkClass}>
                            <Users className="h-5 w-5 mr-3" /> Manage Users
                        </NavLink>
                    </>
                )}
            </nav>

            {/* User Profile Section */}
            <div className="p-4 border-t border-gray-700 relative" ref={dropdownRef}>
                {dropdownOpen && (
                    <div className="absolute bottom-full mb-2 w-[calc(100%-2rem)] bg-gray-900 rounded-lg shadow-xl overflow-hidden animate-fade-in-up">
                        <Link to="/profile/edit" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700">
                            <User className="h-4 w-4 mr-3" /> Edit Profile
                        </Link>
                        <Link to="/settings/account" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700">
                            <Settings className="h-4 w-4 mr-3" /> Account Settings
                        </Link>
                        <button onClick={onLogout} className="w-full flex items-center px-4 py-3 text-sm text-red-400 hover:bg-red-500 hover:text-white">
                            <LogOut className="h-4 w-4 mr-3" /> Logout
                        </button>
                    </div>
                )}

                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center w-full text-left p-2 rounded-lg hover:bg-gray-700/50">
                    <img
                        src={user.contractorProfile?.dpimageurl || 'https://placehold.co/40x40/718096/FFFFFF?text=TC'}
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover mr-3"
                    />
                    <div className="flex-grow">
                        <p className="font-semibold text-sm leading-tight">{user.contractorProfile?.name || 'Contractor'}</p>
                        <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;