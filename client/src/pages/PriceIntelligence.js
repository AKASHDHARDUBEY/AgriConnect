import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PriceChart from '../components/PriceChart';
import AlertConfig from '../components/AlertConfig';

const PriceIntelligence = () => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCommodity, setSelectedCommodity] = useState('All');

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
                const response = await axios.get(`${API_URL}/api/v1/prices/prices`);
                setPrices(response.data.data.prices);
            } catch (err) {
                console.error('Error fetching prices:', err);
                setError('Failed to load price data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, []);

    const commodities = ['All', ...new Set(prices.map(p => p.commodity || p.Commodity))];

    const filteredPrices = selectedCommodity === 'All'
        ? prices
        : prices.filter(p => (p.commodity || p.Commodity) === selectedCommodity);

    // Prepare data for chart (simple mapping for now)
    const chartData = filteredPrices.map(p => ({
        date: p.date || new Date().toLocaleDateString(),
        price: parseFloat(p.price || p.modal_price),
        market: p.market || p.Market
    }));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Farm-to-Market Price Intelligence</h1>

            {loading && <p className="text-center text-gray-500">Loading market data...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && (
                <>
                    <div className="mb-6">
                        <label className="mr-2 font-medium text-gray-700">Filter by Commodity:</label>
                        <select
                            value={selectedCommodity}
                            onChange={(e) => setSelectedCommodity(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                            style={{ maxWidth: '200px', display: 'inline-block' }}
                        >
                            {commodities.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <PriceChart data={chartData} />

                            <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Current Market Prices</h3>
                                </div>
                                <div className="border-t border-gray-200">
                                    <ul className="divide-y divide-gray-200">
                                        {filteredPrices.slice(0, 10).map((p, idx) => (
                                            <li key={idx} className="px-4 py-4 sm:px-6 hover:bg-gray-50 flex justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-indigo-600 truncate">{p.commodity || p.Commodity}</p>
                                                    <p className="flex items-center text-sm text-gray-500">
                                                        {p.market || p.Market}, {p.state || p.State}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium text-gray-900">₹{p.price || p.modal_price}</p>
                                                    <p className="text-xs text-gray-400">{p.date || 'Today'}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <AlertConfig />
                            <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-blue-800 mb-2">💡 Fair Price Insights</h4>
                                <p className="text-sm text-blue-600">
                                    Based on current trends, prices for {selectedCommodity !== 'All' ? selectedCommodity : 'most commodities'} are stable.
                                    Set an alert to get notified of sudden drops.
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PriceIntelligence;
