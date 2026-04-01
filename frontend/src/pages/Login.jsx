import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { loginWithGoogle, registerWithEmail, loginWithEmail } = useAuth();
    const navigate = useNavigate();

    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setError('');
        try {
            const user = await loginWithGoogle();
            if (user) {
                navigate('/list-produce'); 
            }
        } catch (err) {
            setError(err.message || "Google sign in failed.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isSignUp) {
                if (!name) {
                    setError("Please enter your name.");
                    setLoading(false);
                    return;
                }
                const user = await registerWithEmail(name, email, password);
                if (user) navigate('/list-produce');
            } else {
                const user = await loginWithEmail(email, password);
                if (user) navigate('/list-produce');
            }
        } catch (err) {
            setError(err.message || "Authentication failed. Check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <h1 className="text-4xl font-extrabold text-green-800 text-center mb-1 tracking-tight">AgriConnect</h1>
                <p className="text-gray-500 text-center mb-6 text-sm">Empowering farmers with AI-driven intelligence</p>

                {/* Tab Switcher */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        onClick={() => { setIsSignUp(false); setError(''); }}
                        className={`w-1/2 pb-3 text-sm font-semibold transition-colors duration-200 ${!isSignUp ? 'border-b-2 border-green-700 text-green-800' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => { setIsSignUp(true); setError(''); }}
                        className={`w-1/2 pb-3 text-sm font-semibold transition-colors duration-200 ${isSignUp ? 'border-b-2 border-green-700 text-green-800' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Create Account
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs mb-4 border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignUp && (
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="yourname@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-800 text-white py-3 rounded-lg font-bold hover:bg-green-900 transition-colors shadow-md mt-2 disabled:bg-gray-400"
                    >
                        {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                    </button>
                </form>

                <div className="relative flex py-4 items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase tracking-wider font-semibold">Or connect with</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700 shadow-sm text-sm"
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" alt="google" />
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
