import React, { useState } from 'react';
import axios from 'axios';

const AlertConfig = () => {
    const [commodity, setCommodity] = useState('');
    const [targetPrice, setTargetPrice] = useState('');
    const [condition, setCondition] = useState('BELOW');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
            // Or use cookie authentication if configured. Using axios withCredentials for cookies.

            const config = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            // Ensure URL matches your backend
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

            await axios.post(`${API_URL}/api/v1/prices/alerts`, {
                commodity,
                targetPrice,
                condition
            }, config);

            setMessage('Alert set successfully!');
            setCommodity('');
            setTargetPrice('');
        } catch (error) {
            console.error('Error setting alert:', error);
            setMessage('Failed to set alert.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-bold mb-4">Set Price Alert</h3>
            {message && <p className={`mb-4 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Commodity</label>
                    <input
                        type="text"
                        value={commodity}
                        onChange={(e) => setCommodity(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        required
                        placeholder="e.g. Wheat"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Target Price (₹)</label>
                        <input
                            type="number"
                            value={targetPrice}
                            onChange={(e) => setTargetPrice(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                            required
                            placeholder="2000"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Condition</label>
                        <select
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        >
                            <option value="BELOW">Below Target</option>
                            <option value="ABOVE">Above Target</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {loading ? 'Setting Alert...' : 'Create Alert'}
                </button>
            </form>
        </div>
    );
};

export default AlertConfig;
