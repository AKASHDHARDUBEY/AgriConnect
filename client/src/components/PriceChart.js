import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const PriceChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="text-center p-4 text-gray-500">No price data available for chart.</div>;
    }

    // Format data for chart (assuming data has date and price)
    // We might need to group by commodity if multiple commodities are passed
    // For now, let's assume simple array of { date, price, market }

    return (
        <div className="h-64 w-full bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Price Trends</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceChart;
