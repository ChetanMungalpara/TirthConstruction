import React, { useState } from 'react';
import { loginUser,googleLogin } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordFlow from './ForgotPasswordFlow';
// --- SVG Icons (No changes needed here) ---
const UserIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);
const LockIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);
const GoogleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.655-3.317-11.297-7.962l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.244,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);


const Login = ({ closeModal }) => {
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const { identifier, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            // --- REFACTORED API CALL ---
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
        <>
          <style>{`
            @keyframes slide-in-from-bottom {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .form-element {
              animation: slide-in-from-bottom 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
            }
            .form-container > *:nth-child(1) { animation-delay: 0.1s; }
            .form-container > *:nth-child(2) { animation-delay: 0.2s; }
            .form-container > form > *:nth-child(1) { animation-delay: 0.3s; }
            .form-container > form > *:nth-child(2) { animation-delay: 0.4s; }
            .form-container > form > *:nth-child(3) { animation-delay: 0.5s; }
            .form-container > form > *:nth-child(4) { animation-delay: 0.6s; }
            .form-container > form > *:nth-child(5) { animation-delay: 0.7s; }
            .form-container > form > *:nth-child(6) { animation-delay: 0.8s; }

            .form-group {
              position: relative;
            }
            .form-input {
              background-color: #f0f0f0;
              border: 2px solid transparent;
              transition: border-color 0.3s ease, background-color 0.3s ease;
            }
            .form-input:focus {
              background-color: #fff;
              border-color: #000;
            }
            .form-label {
              position: absolute;
              left: 44px;
              top: 50%;
              transform: translateY(-50%);
              color: #6b7280;
              transition: all 0.3s ease;
              pointer-events: none;
            }
            .form-input:focus + .form-label,
            .form-input:not(:placeholder-shown) + .form-label {
              top: -10px;
              left: 40px;
              font-size: 0.75rem;
              color: #000;
              background-color: white;
              padding: 0 4px;
              border-radius: 4px;
            }
            .btn-shine {
                position: relative;
                overflow: hidden;
                transition: color 0.3s ease-out, background-color 0.3s ease-out;
            }
            .btn-shine::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 300px;
                height: 300px;
                background-color: rgba(255, 255, 255, 0.15);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                transition: transform 0.8s ease;
            }
            .btn-shine:hover::before {
                transform: translate(-50%, -50%) scale(2);
            }
          `}</style>
          
          <div className="w-full form-container">
            <h2 className="text-3xl font-bold text-center text-black form-element">
              Contractor Portal
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm text-center mx-auto mb-8 form-element">
              Sign in to access your dashboard.
            </p>
            
            {error && <p className="text-red-500 text-center text-sm mb-4 bg-red-100 p-2 rounded-md">{error}</p>}

            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="form-group form-element">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder=" " 
                  value={identifier}
                  onChange={onChange}
                  required
                  className="form-input appearance-none rounded-lg w-full py-3 pl-12 pr-4 text-black leading-tight focus:outline-none"
                />
                <label className="form-label" htmlFor="identifier">
                  Username / Email / Phone
                </label>
              </div>

              <div className="form-group form-element">
                <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder=" "
                  value={password}
                  onChange={onChange}
                  required
                  className="form-input appearance-none rounded-lg w-full py-3 pl-12 pr-4 text-black leading-tight focus:outline-none"
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>

              <button
                type="submit"
                className="btn-shine w-full bg-black hover:bg-neutral-800 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black form-element"
              >
                Sign In
              </button>

              <div className="text-sm text-center pt-2 form-element">
                  <button 
                    type="button" 
                    onClick={() => setShowForgotPassword(true)}
                    className="font-medium text-black hover:text-neutral-700 transition-colors duration-300"
                  >
                      Forgot Password?
                  </button>
              </div>

              <div className="flex items-center my-2 form-element">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-xs">OR</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button
                className="group/btn relative flex h-12 w-full items-center justify-center space-x-2 rounded-md bg-white border border-neutral-300 px-4 font-medium text-black transition-all duration-300 hover:bg-neutral-100 hover:shadow-sm form-element"
                type="button"
                onClick={handleGoogleLogin}
              >
                <GoogleIcon className="h-5 w-5" />
                <span className="text-sm text-neutral-700">
                  Sign in with Google
                </span>
              </button>
            </form>
          </div>
        </>
    );
};

export default Login;
