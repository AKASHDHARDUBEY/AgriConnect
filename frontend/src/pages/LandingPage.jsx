import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
    const { user } = useAuth();

    return (
        <div className="bg-gradient-to-b from-green-950 via-emerald-900 to-green-900 min-h-screen text-white font-sans selection:bg-emerald-500 selection:text-white">
            {/* Header */}
            <header className="px-6 py-5 flex justify-between items-center max-w-7xl mx-auto border-b border-white/10">
                <div className="flex items-center gap-3">
                    <span className="text-3xl"></span>
                    <span className="font-extrabold text-white text-2xl tracking-tight">AgriConnect</span>
                </div>
                <div className="flex items-center gap-4">
                    {user ? (
                        <Link 
                            to="/dashboard" 
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-lg shadow-emerald-700/20"
                        >
                            Go to Dashboard →
                        </Link>
                    ) : (
                        <Link 
                            to="/login" 
                            className="bg-white hover:bg-gray-100 text-green-950 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-lg shadow-black/10"
                        >
                            Get Started
                        </Link>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
                <span className="bg-emerald-800/60 text-emerald-300 text-xs font-extrabold px-4 py-2 rounded-full uppercase tracking-widest border border-emerald-500/20">
                     Next-Gen Precision Agriculture
                </span>
                
                <h1 className="text-5xl md:text-7xl font-black mt-8 mb-6 leading-none tracking-tight max-w-4xl mx-auto bg-gradient-to-r from-white via-emerald-100 to-green-300 bg-clip-text text-transparent">
                    Empowering Farmers with AI-Driven Intelligence
                </h1>
                
                <p className="text-lg md:text-xl text-green-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Maximize yield, verify market prices, and sell crops directly to buyers with our AG-3 intelligence engine.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                    {user ? (
                        <Link 
                            to="/dashboard" 
                            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-455 text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-300 shadow-xl shadow-emerald-500/10"
                        >
                            Access Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-300 shadow-xl shadow-emerald-500/10"
                            >
                                Start Selling Now
                            </Link>
                            <Link 
                                to="/login" 
                                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-base transition-all duration-300"
                            >
                                Browse Marketplace
                            </Link>
                        </>
                    )}
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-10">
                    {/* Feature 1 */}
                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition duration-300 group">
                        <div className="bg-emerald-800/80 w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition duration-300">
                            🧠
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-300 transition">AI Recommendations</h3>
                        <p className="text-green-100/70 text-sm leading-relaxed">
                            Simulated predictive intelligence analyzing local soil parameters, weather trends, and crop demands to prescribe optimal planting recommendations.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition duration-300 group">
                        <div className="bg-emerald-800/80 w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition duration-300">
                            �
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-300 transition">AG-3 Price Intelligence</h3>
                        <p className="text-green-100/70 text-sm leading-relaxed">
                            Analyzes mandi price listings dynamically, calculating true fair price ranges and broadcasting alarm warnings if anomalies are flagged.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition duration-300 group">
                        <div className="bg-emerald-800/80 w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition duration-300">
                            �
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-300 transition">Direct Marketplace</h3>
                        <p className="text-green-100/70 text-sm leading-relaxed">
                            A direct peer-to-peer commerce platform showing verified badges, which enables buyers to connect directly with farmers via Call or WhatsApp.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-white/10 text-center text-xs text-green-100/40">
                <p>© {new Date().getFullYear()} AgriConnect. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
