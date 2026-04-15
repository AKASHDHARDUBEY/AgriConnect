import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [rec, setRec] = useState(null);
    const [trendData, setTrendData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // 1. Fetch AI Recommendation
                const recRes = await axios.get('http://localhost:5000/api/market/recommendation/1');
                setRec(recRes.data);

                // 2. Simulate Market Trend Data for the Chart
                const fakeTrend = [
                    { day: 'Day 1', price: 18 }, { day: 'Day 5', price: 19 },
                    { day: 'Day 10', price: 17 }, { day: 'Day 15', price: 22 },
                    { day: 'Day 20', price: 21 }, { day: 'Day 25', price: 25 },
                    { day: 'Today', price: 24 },
                ];
                setTrendData(fakeTrend);
            } catch (err) {
                console.error("Error loading dashboard", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
                <p className="mt-4 text-gray-500 font-semibold animate-pulse">Loading AI Insights...</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="p-8 bg-gray-50 min-h-screen">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-green-950 tracking-tight">Welcome, {user?.displayName || "Farmer Rajesh"} 👋</h1>
                        <p className="text-gray-500 text-sm mt-1">Here is your precision intelligence overview for today.</p>
                    </div>
                    <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-bold border border-emerald-200 shadow-sm flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Live Sensor Connectivity: Active
                    </div>
                </div>

                {/* ANOMALY ALERT BANNER */}
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded-r-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-amber-100">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">⚠️</span>
                        <div>
                            <p className="font-bold text-amber-900 text-sm sm:text-base">Market Anomaly Detected!</p>
                            <p className="text-xs sm:text-sm text-amber-700">Abnormal price drop in Tomato detected in nearby Mandis. Recommended: Hold stock.</p>
                        </div>
                    </div>
                    <button className="text-amber-800 hover:text-amber-950 font-bold text-xs underline whitespace-nowrap self-end sm:self-auto">View Details</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* AI RECOMMENDATION CARD */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-green-800 to-emerald-950 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
                        <div className="relative z-10">
                            <span className="bg-emerald-700 text-emerald-200 text-[10px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">AI Intelligence Suggestion</span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold mt-5 mb-4 leading-tight tracking-tight">
                                Grow <span className="text-green-300 underline decoration-green-400/50 decoration-wavy">{rec?.recommendedCrop}</span> this season for {rec?.projectedProfit} projected profit
                            </h2>
                            <p className="text-green-100/90 text-sm sm:text-base mb-6 max-w-xl leading-relaxed">
                                {rec?.analysis}
                            </p>
                        </div>
                        <div className="relative z-10 flex gap-4 mt-auto">
                            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl flex-1 border border-white/10">
                                <p className="text-[10px] text-green-200 font-bold uppercase tracking-wider">Risk Level</p>
                                <p className="font-extrabold text-base sm:text-lg">{rec?.riskLevel}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl flex-1 border border-white/10">
                                <p className="text-[10px] text-green-200 font-bold uppercase tracking-wider">Confidence</p>
                                <p className="font-extrabold text-base sm:text-lg">{rec?.confidenceScore}</p>
                            </div>
                        </div>
                        {/* Background Decorative Circles */}
                        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-emerald-600/30 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -left-10 -top-10 w-40 h-40 bg-green-700/20 rounded-full blur-2xl pointer-events-none"></div>
                    </div>

                    {/* FAIR PRICE GAUGE */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">AG-3 Market Value</h3>
                        <div className="text-5xl font-black text-green-800 mb-2">₹2,450</div>
                        <p className="text-green-600 text-xs font-extrabold tracking-widest mb-6">FAIR RANGE</p>
                        
                        <div className="w-full flex justify-between text-[10px] text-gray-400 font-extrabold px-1">
                            <span>LOW: ₹1,800</span>
                            <span>HIGH: ₹3,200</span>
                        </div>
                        <div className="w-full h-3.5 bg-gray-100 rounded-full mt-2.5 overflow-hidden p-0.5 border border-gray-200/50">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full w-[65%] shadow-inner"></div>
                        </div>
                    </div>

                    {/* TREND CHART */}
                    <div className="lg:col-span-3 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
                            <div>
                                <h3 className="text-xl font-extrabold text-gray-800 tracking-tight">30-Day Market Price Trend</h3>
                                <p className="text-gray-400 text-xs mt-0.5">Crop: {rec?.recommendedCrop}</p>
                            </div>
                            <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-100 flex items-center gap-1 shadow-sm">
                                📈 +8.4%
                            </span>
                        </div>
                        <div className="h-64 w-full mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }} />
                                    <YAxis hide />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
                                        labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="price" 
                                        stroke="#166534" 
                                        strokeWidth={4} 
                                        dot={{ r: 6, fill: '#166534', stroke: '#ffffff', strokeWidth: 2 }} 
                                        activeDot={{ r: 8, fill: '#059669', stroke: '#ffffff', strokeWidth: 2 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
