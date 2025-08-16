import React, { useState } from 'react';
import { loginUser, googleLogin } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordFlow from './ForgotPasswordFlow';
import { User, Lock, Eye, EyeOff } from 'lucide-react'; // Import Eye icons

// --- SVG for Google Icon (remains the same) ---
const GoogleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.655-3.317-11.297-7.962l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.244,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
);

const Login = ({ closeModal }) => {
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [error, setError] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
    const navigate = useNavigate();
    const { identifier, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await loginUser({ identifier, password });
            localStorage.setItem('token', res.data.token);
            if (closeModal) closeModal();
            window.location.href = '/dashboard.html';
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred');
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = googleLogin;
    };

    if (showForgotPassword) {
        return <ForgotPasswordFlow onFlowComplete={() => setShowForgotPassword(false)} />;
    }

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold text-center text-black">Contractor Portal</h2>
            <p className="text-neutral-600 text-sm max-w-sm text-center mx-auto mb-8">Sign in to access your dashboard.</p>
            
            {error && <p className="text-red-500 text-center text-sm mb-4 bg-red-100 p-2 rounded-md">{error}</p>}

            <form className="space-y-6" onSubmit={onSubmit}>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input id="identifier" name="identifier" type="text" placeholder="Username / Email / Phone" value={identifier} onChange={onChange} required className="w-full py-3 pl-12 pr-4 text-black bg-gray-100 border-2 border-transparent rounded-lg focus:bg-white focus:border-black focus:outline-none transition-all"/>
                </div>

                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input id="password" name="password" type={passwordVisible ? 'text' : 'password'} placeholder="Password" value={password} onChange={onChange} required className="w-full py-3 pl-12 pr-12 text-black bg-gray-100 border-2 border-transparent rounded-lg focus:bg-white focus:border-black focus:outline-none transition-all"/>
                    <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
                        {passwordVisible ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>
                </div>

                <button type="submit" className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all">
                    Sign In
                </button>

                <div className="text-sm text-center pt-2">
                    <button type="button" onClick={() => setShowForgotPassword(true)} className="font-medium text-black hover:text-neutral-700 transition-colors duration-300">
                        Forgot Password?
                    </button>
                </div>

                <div className="flex items-center my-2">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs">OR</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <button className="group relative flex h-12 w-full items-center justify-center space-x-2 rounded-md bg-white border border-neutral-300 px-4 font-medium text-black transition-all duration-300 hover:bg-neutral-100 hover:shadow-sm" type="button" onClick={handleGoogleLogin}>
                    <GoogleIcon className="h-5 w-5" />
                    <span className="text-sm text-neutral-700">Sign in with Google</span>
                </button>
            </form>
        </div>
    );
};

export default Login;
