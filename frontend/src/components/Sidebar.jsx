import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '�' },
        { name: 'Marketplace', path: '/marketplace', icon: '' },
        { name: 'Sell Crop', path: '/list-produce', icon: '➕' }
    ];

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar Container */}
            <aside 
                className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-gradient-to-b from-green-950 via-emerald-950 to-green-950 text-white border-r border-white/10 transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Brand / Logo Header */}
                <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
                    <span className="text-2xl"></span>
                    <div>
                        <span className="font-extrabold text-white text-lg tracking-tight block">AgriConnect</span>
                        <span className="text-[10px] text-green-300 font-semibold uppercase tracking-wider">Precision AgriTech</span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <p className="text-[10px] text-green-300/50 font-bold px-3 uppercase tracking-widest mb-3">Main Menu</p>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => {
                                    if (window.innerWidth < 768) {
                                        toggleSidebar();
                                    }
                                }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-green-105 hover:bg-white/5 hover:text-white'}`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile / Logout Section */}
                <div className="p-4 border-t border-white/10 bg-black/10">
                    <div className="flex items-center gap-3 px-2 py-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-emerald-800 border border-emerald-500/30 flex items-center justify-center text-sm font-bold uppercase text-emerald-200">
                            {user?.displayName ? user.displayName.split(' ').map(n => n[0]).join('') : 'U'}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-white truncate">{user?.displayName || 'User'}</p>
                            <p className="text-[10px] text-green-300 font-semibold truncate">{user?.email || 'farmer@agriconnect.com'}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-white/5 hover:bg-red-950/30 hover:text-red-300 text-green-200 border border-white/10 hover:border-red-900/30 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <span>�</span> Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
