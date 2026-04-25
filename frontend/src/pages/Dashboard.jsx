import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PriceGauge from '../components/PriceGauge';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [rec, setRec] = useState(null);
    const [ndviData, setNdviData] = useState(null);
    const [trendData, setTrendData] = useState([]);
    const [dailyPrices, setDailyPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const { user } = useAuth();

    const fetchDashboardData = async () => {
        try {
                        const recRes = await axios.get('http://localhost:5000/api/market/recommendation/1');
            setRec(recRes.data);

                        const ndviRes = await axios.get('http://localhost:5000/api/market/satellite-ndvi?lat=20.0016&lon=73.7898');
            setNdviData(ndviRes.data);

                        const dailyPricesRes = await axios.get('http://localhost:5000/api/market/daily-prices');
            setDailyPrices(dailyPricesRes.data);

            // 4. Simulate Market Trend Data for the Chart
            const fakeTrend = [
                { day: 'Day 1', price: 18 }, { day: 'Day 5', price: 19 },
                { day: 'Day 10', price: 17 }, { day: 'Day 15', price: 22 },
                { day: 'Day 20', price: 21 }, { day: 'Day 25', price: 25 },
                { day: 'Today', price: 24 },
            ];
            setTrendData(fakeTrend);
        } catch (err) {
            console.error("Error loading dashboard data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const triggerManualSync = async () => {
        try {
            setSyncing(true);
            await axios.get('http://localhost:5000/api/market/update-prices');
            await fetchDashboardData();
        } catch (err) {
            console.error("Sync error", err);
        } finally {
            setSyncing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
                <p className="mt-4 text-gray-500 font-semibold animate-pulse">Retrieving Real-Time Satellite & Market Data...</p>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-green-950 tracking-tight">Welcome, {user?.displayName || "Farmer Rajesh"} </h1>
                        <p className="text-gray-500 text-sm mt-1">Here is your production-grade precision intelligence overview for today.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={triggerManualSync}
                            disabled={syncing}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold shadow-sm transition ${syncing ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-800 hover:bg-green-900 text-white'}`}
                        >
                            {syncing ? ' Syncing Data...' : ' Sync Gov Prices'}
                        </button>
                        <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-bold border border-emerald-200 shadow-sm flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Live Sensor Connectivity: Active
                        </div>
                    </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded-r-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-amber-100">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl"></span>
                        <div>
                            <p className="font-bold text-amber-900 text-sm sm:text-base">Market Anomaly Detected!</p>
                            <p className="text-xs sm:text-sm text-amber-700">Abnormal price drop in Tomato detected in nearby Mandis. Recommended: Hold stock.</p>
                        </div>
                    </div>
                    <button className="text-amber-800 hover:text-amber-950 font-bold text-xs underline whitespace-nowrap self-end sm:self-auto">View Details</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                    <div className="lg:col-span-2 bg-gradient-to-br from-green-800 to-emerald-950 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
                        <div className="relative z-10">
                            <span className="bg-emerald-700/80 text-emerald-200 text-[10px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-emerald-500/20">
                                AI Crop Recommendation
                            </span>
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

                    <PriceGauge 
                        value={2450} 
                        modalPrice={2400} 
                        low={1800} 
                        high={3200} 
                    />

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-extrabold text-gray-800 tracking-tight">Sentinel Satellite NDVI</h3>
                                <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                                    {ndviData?.status}
                                </span>
                            </div>
                            
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-5xl font-black text-green-800">{ndviData?.ndvi}</span>
                                <span className="text-gray-400 text-xs font-semibold">NDVI Index</span>
                            </div>

                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                {ndviData?.advice}
                            </p>
                        </div>

                        <div className="text-[10px] text-gray-400 font-bold border-t border-gray-100 pt-4 flex justify-between">
                            <span> Sentinel Hub L2A</span>
                            <span>Last Updated: Today</span>
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
                            <div>
                                <h3 className="text-xl font-extrabold text-gray-800 tracking-tight">30-Day Market Price Trend</h3>
                                <p className="text-gray-400 text-xs mt-0.5">Crop: {rec?.recommendedCrop}</p>
                            </div>
                            <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-100 flex items-center gap-1 shadow-sm">
                                 +8.4%
                            </span>
                        </div>
                        <div className="h-56 w-full mt-2">
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

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h3 className="text-xl font-extrabold text-gray-800 tracking-tight">Live Mandi Daily Prices (Data.gov.in Feed)</h3>
                            <p className="text-gray-400 text-xs mt-0.5">Real-time daily mandi prices synced from government Agmarknet listings</p>
                        </div>
                        <span className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-200 shadow-sm flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            API Feed Connected
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-150 text-[10px] uppercase text-gray-400 font-extrabold tracking-wider">
                                    <th className="py-4 px-2">Crop Name</th>
                                    <th className="py-4 px-2">Mandi / Location</th>
                                    <th className="py-4 px-2">Modal Price</th>
                                    <th className="py-4 px-2">Price Range (Min - Max)</th>
                                    <th className="py-4 px-2">Date / Arrival</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {dailyPrices.map((price) => (
                                    <tr key={price.id} className="hover:bg-gray-50/50 transition">
                                        <td className="py-4 px-2 font-bold text-gray-850 capitalize">{price.cropName}</td>
                                        <td className="py-4 px-2 text-gray-600 font-medium">{price.mandiName}</td>
                                        <td className="py-4 px-2 font-extrabold text-green-800">
                                            ₹{price.modalPrice.toLocaleString()} <span className="text-[10px] font-normal text-gray-400">/ Quintal</span>
                                            <span className="block text-[10px] text-gray-400 font-normal">≈ ₹{(price.modalPrice / 100).toFixed(2)} / KG</span>
                                        </td>
                                        <td className="py-4 px-2 text-gray-500 font-bold">
                                            ₹{price.minPrice.toLocaleString()} - ₹{price.maxPrice.toLocaleString()}
                                        </td>
                                        <td className="py-4 px-2 text-gray-400 text-xs font-semibold">
                                            {new Date(price.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                    </tr>
                                ))}
                                {dailyPrices.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-8 text-gray-400 font-semibold">
                                            No government Mandi price logs found. Click 'Sync Gov Prices' to pull live entries.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
    );
};

export default Dashboard;
