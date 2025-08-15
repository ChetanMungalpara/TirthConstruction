import React, { useState } from 'react';
import { requestPasswordOtp, verifyPasswordOtp, resetPassword } from '../services/apiService';

import { useNavigate } from 'react-router-dom';

// --- UI Components for each step ---

const Step1_RequestOtp = ({ onOtpRequested }) => {
    const [identifier, setIdentifier] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // --- REFACTORED API CALL ---
            const res = await requestPasswordOtp({ identifier });
            setMessage(res.data.msg);
            setTimeout(() => onOtpRequested(identifier), 2000);
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div>
            <h3 className="text-xl font-bold text-center mb-2">Forgot Password</h3>
            <p className="text-center text-sm text-gray-600 mb-6">Enter your email or phone number to receive an OTP.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Email or Phone Number"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" disabled={loading} className="w-full mt-4 bg-black text-white font-bold py-3 rounded-lg hover:bg-neutral-800 disabled:bg-gray-400">
                    {loading ? 'Sending...' : 'Send OTP'}
                </button>
            </form>
            {message && <p className="text-center text-green-600 mt-4">{message}</p>}
        </div>
    );
};
const Step2_VerifyOtp = ({ identifier, onOtpVerified }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // --- REFACTORED API CALL ---
            const res = await verifyPasswordOtp({ identifier, otp });
            onOtpVerified(res.data.resetToken);
        } catch (err) {
            setError(err.response?.data?.msg || 'Verification failed.');
            setLoading(false);
        }
    };
    
    return (
        <div>
            <h3 className="text-xl font-bold text-center mb-2">Verify OTP</h3>
            <p className="text-center text-sm text-gray-600 mb-6">An OTP was sent to {identifier}. Check your email (or backend console for the Ethereal link).</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    required
                    maxLength="6"
                    className="w-full text-center tracking-[1em] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" disabled={loading} className="w-full mt-4 bg-black text-white font-bold py-3 rounded-lg hover:bg-neutral-800 disabled:bg-gray-400">
                    {loading ? 'Verifying...' : 'Verify'}
                </button>
            </form>
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        </div>
    );
};

const Step3_ResetPassword = ({ resetToken, onPasswordReset }) => {
    const [password, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            // --- REFACTORED API CALL ---
            const res = await resetPassword({ resetToken, password });
            localStorage.setItem('token', res.data.token);
            onPasswordReset();
            navigate('/dashboard.html');
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to reset password.');
            setLoading(false);
        }
    };

    return (
        <div>
            <h3 className="text-xl font-bold text-center mb-6">Set New Password</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    required
                    className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" disabled={loading} className="w-full mt-4 bg-black text-white font-bold py-3 rounded-lg hover:bg-neutral-800 disabled:bg-gray-400">
                    {loading ? 'Saving...' : 'Reset Password & Login'}
                </button>
            </form>
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        </div>
    );
};


// --- Main Controller Component ---

const ForgotPasswordFlow = ({ onFlowComplete }) => {
    const [step, setStep] = useState(1);
    const [identifier, setIdentifier] = useState('');
    const [resetToken, setResetToken] = useState('');

    const handleOtpRequested = (id) => {
        setIdentifier(id);
        setStep(2);
    };

    const handleOtpVerified = (token) => {
        setResetToken(token);
        setStep(3);
    };

    return (
        <div>
            {step === 1 && <Step1_RequestOtp onOtpRequested={handleOtpRequested} />}
            {step === 2 && <Step2_VerifyOtp identifier={identifier} onOtpVerified={handleOtpVerified} />}
            {step === 3 && <Step3_ResetPassword resetToken={resetToken} onPasswordReset={onFlowComplete} />}
            
            <button onClick={onFlowComplete} className="text-center w-full mt-6 text-sm text-blue-600 hover:underline">
                Back to Login
            </button>
        </div>
    );
};

export default ForgotPasswordFlow;
