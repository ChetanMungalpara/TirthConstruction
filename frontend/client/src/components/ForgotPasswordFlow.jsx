import React, { useState, useRef, useEffect } from 'react';
import { requestPasswordOtp, resetPasswordWithOtp } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, X } from 'lucide-react';

// --- Reusable Password Validator Component ---
const PasswordValidator = ({ password }) => {
    const checks = {
        minLength: password.length >= 8,
        hasUpper: /[A-Z]/.test(password),
        hasLower: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSymbol: /[^A-Za-z0-9]/.test(password),
    };

    const ValidationItem = ({ text, isValid }) => (
        <li className={`flex items-center text-xs transition-colors ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
            {isValid ? <Check size={14} className="mr-2" /> : <X size={14} className="mr-2" />}
            {text}
        </li>
    );

    return (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
            <ValidationItem text="8+ characters" isValid={checks.minLength} />
            <ValidationItem text="1 uppercase" isValid={checks.hasUpper} />
            <ValidationItem text="1 lowercase" isValid={checks.hasLower} />
            <ValidationItem text="1 number" isValid={checks.hasNumber} />
            <ValidationItem text="1 symbol" isValid={checks.hasSymbol} />
        </ul>
    );
};

// --- Step 1: Component to request the OTP ---
const Step1_RequestOtp = ({ onOtpRequested }) => {
    const [identifier, setIdentifier] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await requestPasswordOtp({ identifier });
            setMessage(res.data.msg);
            setTimeout(() => onOtpRequested(identifier), 1500);
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred.');
            setLoading(false);
        }
    };

    return (
        <div>
            <h3 className="text-xl font-bold text-center mb-2">Forgot Password</h3>
            <p className="text-center text-sm text-gray-600 mb-6">Enter your registered email to receive an OTP.</p>
            <form onSubmit={handleSubmit}>
                <input type="email" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="your.email@example.com" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"/>
                <button type="submit" disabled={loading} className="w-full mt-4 bg-black text-white font-bold py-3 rounded-lg hover:bg-neutral-800 disabled:bg-gray-400">
                    {loading ? 'Sending...' : 'Send OTP'}
                </button>
            </form>
            {message && <p className="text-center text-green-600 mt-4">{message}</p>}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        </div>
    );
};

// --- Step 2: Component to enter OTP and new password ---
const Step2_ResetWithOtp = ({ identifier, onPasswordReset }) => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const inputsRef = useRef([]);

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return; // Only allow numbers
        
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus next input
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Move to previous input on backspace if current is empty
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const fullOtp = otp.join('');
            const res = await resetPasswordWithOtp({ identifier, otp: fullOtp, password });
            localStorage.setItem('token', res.data.token);
            onPasswordReset();
            window.location.href = '/dashboard.html';
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to reset password. Please check your OTP.');
            setLoading(false);
        }
    };

    return (
        <div>
            <h3 className="text-xl font-bold text-center mb-2">Reset Your Password</h3>
            <p className="text-center text-sm text-gray-600 mb-6">An OTP was sent to <strong>{identifier}</strong>.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-center text-gray-700 mb-2">Enter OTP</label>
                    <div className="flex justify-center gap-2">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                value={data}
                                onChange={e => handleOtpChange(e.target, index)}
                                onKeyDown={e => handleKeyDown(e, index)}
                                maxLength="1"
                                ref={el => inputsRef.current[index] = el}
                                className="w-10 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input type={passwordVisible ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                    <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-gray-500">
                        {passwordVisible ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>
                </div>
                {password && <PasswordValidator password={password} />}
                
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input type={passwordVisible ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                </div>

                <button type="submit" disabled={loading} className="w-full mt-4 bg-black text-white font-bold py-3 rounded-lg hover:bg-neutral-800 disabled:bg-gray-400">
                    {loading ? 'Resetting...' : 'Reset Password & Login'}
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

    const handleOtpRequested = (id) => {
        setIdentifier(id);
        setStep(2);
    };

    return (
        <div>
            {step === 1 && <Step1_RequestOtp onOtpRequested={handleOtpRequested} />}
            {step === 2 && <Step2_ResetWithOtp identifier={identifier} onPasswordReset={onFlowComplete} />}
            
            <button onClick={onFlowComplete} className="text-center w-full mt-6 text-sm text-blue-600 hover:underline">
                Back to Login
            </button>
        </div>
    );
};

export default ForgotPasswordFlow;
