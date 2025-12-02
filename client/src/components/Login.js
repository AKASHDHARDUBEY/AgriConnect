
import React from 'react';

const Login = () => {
    const handleGoogleLogin = () => {
        window.open('http://localhost:5001/auth/google', '_self');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md">
                <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Login to AgriConnect</h1>
                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center w-full px-4 py-2 text-white transition-colors duration-300 bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                        />
                    </svg>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
