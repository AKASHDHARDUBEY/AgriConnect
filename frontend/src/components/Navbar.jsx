import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    return (
        <nav className="bg-white border-b border-gray-150 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <span className="text-2xl"></span>
                <span className="font-extrabold text-green-800 text-xl tracking-tight">AgriConnect</span>
            </div>
            
            <div className="flex items-center gap-6">
                <Link to="/dashboard" className="text-sm font-semibold text-gray-600 hover:text-green-800 transition">
                    Dashboard
                </Link>
                <Link to="/marketplace" className="text-sm font-semibold text-gray-600 hover:text-green-800 transition">
                    Marketplace
                </Link>
                <Link to="/list-produce" className="text-sm font-semibold text-gray-600 hover:text-green-800 transition">
                    Sell Produce
                </Link>
                
                {user && (
                    <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                             {user.displayName || user.email}
                        </span>
                        <button 
                            onClick={handleLogout}
                            className="text-xs font-bold text-red-650 hover:text-red-800 transition uppercase tracking-wider"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
