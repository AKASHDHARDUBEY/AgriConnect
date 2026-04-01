import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-green-800 mb-6">Welcome to AgriConnect</h1>
                <p className="text-xl text-gray-700 mb-8">Empowering farmers with AI-driven market intelligence.</p>
                <div className="flex gap-4 justify-center">
                    <Link to="/login" className="bg-green-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-800 transition">
                        Login / Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
