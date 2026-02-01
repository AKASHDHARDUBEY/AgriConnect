// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import {
    PaperAirplaneIcon,
    PhoneIcon,
    EnvelopeIcon
} from "@heroicons/react/24/outline";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800 font-sans">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* BRAND COLUMN */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🌾</span>
                        <span className="text-xl font-bold font-heading">AgriConnect</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Empowering Indian farmers with technology, fair market access, and AI-driven insights. Join the revolution in smart agriculture.
                    </p>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h3 className="font-bold text-lg mb-4 text-teal-400">Quick Links</h3>
                    <ul className="space-y-2 text-slate-300 text-sm">
                        <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                        <li><Link to="/marketplace" className="hover:text-white transition">Marketplace</Link></li>
                        <li><Link to="/upload" className="hover:text-white transition">Sell Crops</Link></li>
                        <li><Link to="/login" className="hover:text-white transition">Login / Signup</Link></li>
                    </ul>
                </div>

                {/* RESOURCES */}
                <div>
                    <h3 className="font-bold text-lg mb-4 text-teal-400">Resources</h3>
                    <ul className="space-y-2 text-slate-300 text-sm">
                        <li><a href="#" className="hover:text-white transition">Government Schemes</a></li>
                        <li><a href="#" className="hover:text-white transition">Mandi Prices</a></li>
                        <li><a href="#" className="hover:text-white transition">Crop Advisory</a></li>
                        <li><a href="#" className="hover:text-white transition">Weather Forecast</a></li>
                    </ul>
                </div>

                {/* CONTACT */}
                <div>
                    <h3 className="font-bold text-lg mb-4 text-teal-400">Contact Us</h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li className="flex items-center gap-2">
                            <PhoneIcon className="w-4 h-4 text-teal-500" />
                            <span>+91 1800-456-7890</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <EnvelopeIcon className="w-4 h-4 text-teal-500" />
                            <span>support@agriconnect.in</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <PaperAirplaneIcon className="w-4 h-4 text-teal-500" />
                            <span>HSR Layout, Bangalore, India</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                <p>&copy; {new Date().getFullYear()} AgriConnect India. All rights reserved.</p>
            </div>
        </footer>
    );
}
