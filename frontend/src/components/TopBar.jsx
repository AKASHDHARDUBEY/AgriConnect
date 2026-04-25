import React from 'react';
import { useLocation } from 'react-router-dom';

const TopBar = ({ toggleSidebar }) => {
    const location = useLocation();

    // Map route path to human-readable page name
    const getPageName = () => {
        switch (location.pathname) {
            case '/dashboard':
                return 'Dashboard';
            case '/marketplace':
                return 'Marketplace';
            case '/list-produce':
                return 'Sell Crop';
            default:
                return 'AgriConnect';
        }
    };

    return (
        <header className="bg-white border-b border-gray-150 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-30">
            {/* Left section: Hamburger (mobile) + Page Title */}
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleSidebar}
                    className="p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none md:hidden"
                    aria-label="Toggle Sidebar"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold text-gray-800 capitalize tracking-tight">
                    {getPageName()}
                </h1>
            </div>

            {/* Right section: Location Selector / Status */}
            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 text-xs font-semibold text-gray-600">
                    <span>�</span> Nashik, Maharashtra
                </div>
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-sm font-bold border border-green-200">
                    �
                </div>
            </div>
        </header>
    );
};

export default TopBar;
