import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
    updateAccountDetails,
    changePassword,
    checkUsernameAvailability,
    unlinkGoogleAccount,
    requestVerificationOtp,
    confirmVerificationOtp,
    googleLogin
} from '../../../client/src/services/apiService';
import { Settings, UserCog, ShieldCheck, Link, Eye, EyeOff, CheckCircle, AlertTriangle, XCircle, Check, X } from 'lucide-react';

// --- Reusable Component for Verifiable Inputs ---
const VerifiableInput = ({ field, label, type, initialValue, onVerificationChange, onVerificationSuccess }) => {
    const [value, setValue] = useState(initialValue);
    const [isChanged, setIsChanged] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [isVerified, setIsVerified] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const changed = value !== initialValue;
        setIsChanged(changed);
        const newVerificationStatus = !changed;
        setIsVerified(newVerificationStatus);
        onVerificationChange(newVerificationStatus);
    }, [value, initialValue, onVerificationChange]);

    const handleRequestOtp = async () => {
        setError(''); setLoading(true);
        try {
            const res = await requestVerificationOtp(field, value);
            setMessage(res.data.msg); setOtpSent(true);
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred.');
        } finally { setLoading(false); }
    };

    const handleConfirmOtp = async () => {
        setError(''); setLoading(true);
        try {
            const res = await confirmVerificationOtp(otp);
            setMessage('Successfully verified!'); setIsVerified(true);
            onVerificationChange(true); setOtpSent(false);
            onVerificationSuccess(res.data.updatedField);
        } catch (err) {
            setError(err.response?.data?.msg || 'Confirmation failed.');
        } finally { setLoading(false); }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="mt-1 flex items-center gap-2">
                <input type={type} value={value} onChange={(e) => setValue(e.target.value)} className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                {isChanged && !isVerified && !otpSent && (
                    <button type="button" onClick={handleRequestOtp} disabled={loading} className="px-3 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-md hover:bg-yellow-600 disabled:bg-yellow-300">
                        {loading ? '...' : 'Verify'}
                    </button>
                )}
                {isVerified && (<span className="text-green-600 flex items-center"><CheckCircle size={20} /></span>)}
            </div>
            {otpSent && (
                <div className="mt-2 p-3 bg-gray-50 rounded-md border">
                    <p className="text-sm text-gray-600 mb-2">{message}</p>
                    <div className="flex items-center gap-2">
                        <input type="text" placeholder="Enter OTP" value={otp} maxLength="6" onChange={(e) => setOtp(e.target.value)} className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                        <button type="button" onClick={handleConfirmOtp} disabled={loading} className="px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 disabled:bg-green-400">
                            {loading ? '...' : 'Confirm'}
                        </button>
                    </div>
                </div>
            )}
            {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
        </div>
    );
};

// --- Password Validation Component ---
const PasswordValidator = ({ password }) => {
    const checks = {
        minLength: password.length >= 8,
        hasUpper: /[A-Z]/.test(password),
        hasLower: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSymbol: /[^A-Za-z0-9]/.test(password),
    };

    const ValidationItem = ({ text, isValid }) => (
        <li className={`flex items-center text-sm transition-colors ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
            {isValid ? <Check size={16} className="mr-2" /> : <X size={16} className="mr-2" />}
            {text}
        </li>
    );

    return (
        <ul className="space-y-1 mt-2">
            <ValidationItem text="At least 8 characters" isValid={checks.minLength} />
            <ValidationItem text="Contains an uppercase letter" isValid={checks.hasUpper} />
            <ValidationItem text="Contains a lowercase letter" isValid={checks.hasLower} />
            <ValidationItem text="Contains a number" isValid={checks.hasNumber} />
            <ValidationItem text="Contains a special character" isValid={checks.hasSymbol} />
        </ul>
    );
};

// --- Main Page Component ---
const AccountSettingsPage = () => {
    const { user, setUser } = useOutletContext();

    const [accountData, setAccountData] = useState({ username: '', phone: '' });
    const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [usernameStatus, setUsernameStatus] = useState({ checking: false, message: '', isAvailable: false });
    const [verifications, setVerifications] = useState({ email: true });

    const setInitialStates = useCallback((currentUser) => {
        if (currentUser) {
            setAccountData({
                username: currentUser.username || '',
                phone: currentUser.phone || '',
                email: currentUser.email || ''
            });
        }
    }, []);

    useEffect(() => {
        setInitialStates(user);
    }, [user, setInitialStates]);

    const showFeedback = (setter, text) => {
        setter(text);
        setTimeout(() => setter(''), 4000);
    };

    const handleAccountChange = (e) => {
        setAccountData({ ...accountData, [e.target.name]: e.target.value });
        if (e.target.name === 'username') {
            setUsernameStatus({ checking: false, message: '', isAvailable: false });
        }
    };

    const handleCheckUsername = async () => {
        setUsernameStatus({ checking: true, message: '', isAvailable: false });
        try {
            const res = await checkUsernameAvailability(accountData.username);
            setUsernameStatus({ checking: false, message: res.data.msg, isAvailable: true });
        } catch (err) {
            setUsernameStatus({ checking: false, message: err.response?.data?.msg || 'Error', isAvailable: false });
        }
    };

    const handleAccountSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateAccountDetails({ username: accountData.username, phone: accountData.phone });
            showFeedback(setMessage, res.data.msg);
            setUser(prev => ({ ...prev, username: accountData.username, phone: accountData.phone }));
        } catch (err) {
            showFeedback(setError, err.response?.data?.msg || 'Update failed.');
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return showFeedback(setError, 'Passwords do not match.');
        }
        try {
            const res = await changePassword({ newPassword: passwordData.newPassword });
            showFeedback(setMessage, res.data.msg);
            setPasswordData({ newPassword: '', confirmPassword: '' });
        } catch (err) {
            showFeedback(setError, err.response?.data?.errors[0]?.msg || 'Password update failed.');
        }
    };

    const handleUnlinkGoogle = async () => {
        if (window.confirm('Are you sure you want to unlink your Google account? You will need to set a password to log in.')) {
            try {
                const res = await unlinkGoogleAccount();
                showFeedback(setMessage, res.data.msg);
                setUser(res.data.user);
            } catch (err) {
                showFeedback(setError, 'Failed to unlink Google account.');
            }
        }
    };

    const handleVerificationSuccess = ({ field, value }) => {
        setUser(prevUser => {
            const updatedUser = { ...prevUser, [field]: value };
            setInitialStates(updatedUser);
            return updatedUser;
        });
    };
    const handleEmailVerificationChange = useCallback((isValid) => {
        setVerifications(prev => ({ ...prev, email: isValid }));
    }, []);
    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center"><Settings className="mr-3" /> Account Settings</h1>
            {message && <div className="mb-4 text-center text-green-800 bg-green-100 p-3 rounded-md">{message}</div>}
            {error && <div className="mb-4 text-center text-red-800 bg-red-100 p-3 rounded-md">{error}</div>}

            <div className="space-y-8">
                {/* General Info Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 flex items-center"><UserCog className="mr-2" /> General Information</h2>
                    <form onSubmit={handleAccountSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <div className="mt-1 flex items-center gap-2">
                                <input type="text" name="username" value={accountData.username} onChange={handleAccountChange} className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                                <button type="button" onClick={handleCheckUsername} disabled={usernameStatus.checking || accountData.username === user.username} className="px-3 py-2 bg-gray-200 text-sm font-semibold rounded-md hover:bg-gray-300 disabled:opacity-50">
                                    {usernameStatus.checking ? '...' : 'Check'}
                                </button>
                            </div>
                            {usernameStatus.message && <p className={`mt-1 text-xs ${usernameStatus.isAvailable ? 'text-green-600' : 'text-red-600'}`}>{usernameStatus.message}</p>}
                        </div>
                        <VerifiableInput
                            field="email"
                            label="Email"
                            type="email"
                            initialValue={user.email}
                            onVerificationChange={handleEmailVerificationChange}
                            onVerificationSuccess={handleVerificationSuccess}
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="tel" name="phone" value={accountData.phone} onChange={handleAccountChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                        </div>
                        <button type="submit" className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition">Save General Info</button>
                    </form>
                </div>

                {/* Password Card - ALWAYS VISIBLE */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 flex items-center"><ShieldCheck className="mr-2" /> Change Password</h2>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700">New Password</label>
                            <input type={passwordVisible ? 'text' : 'password'} value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-gray-500">
                                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {passwordData.newPassword && <PasswordValidator password={passwordData.newPassword} />}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                            <input type={passwordVisible ? 'text' : 'password'} value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                        </div>
                        <button type="submit" className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition">Update Password</button>
                    </form>
                </div>

                {/* Connected Accounts Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 flex items-center"><Link className="mr-2" /> Connected Accounts</h2>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-8 w-8"><path fill="#FFC107" d="M43.611 20.083H42v-2.083H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" /><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" /><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.655-3.317-11.297-7.962l-6.522 5.025C9.505 39.556 16.227 44 24 44z" /><path fill="#1976D2" d="M43.611 20.083H42v-2.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.574l6.19 5.238C42.022 35.244 44 30.038 44 24c0-1.341-.138-2.65-.389-3.917z" /></svg>
                            <span className="font-semibold">Google</span>
                        </div>
                        {user.googleId ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-md">Connected</span>
                                <button onClick={handleUnlinkGoogle} className="text-sm font-semibold text-red-600 hover:underline">Unlink</button>
                            </div>
                        ) : (
                            <a href={googleLogin} className="px-3 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600">
                                Connect
                            </a>
                        )}
                    </div>
                    {!user.googleId && !user.password && (
                        <p className="text-xs text-yellow-700 mt-2 p-2 bg-yellow-50 rounded-md flex items-center gap-2"><AlertTriangle size={14} />You have no password set. Please connect a Google account or set a password to secure your account.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountSettingsPage;
