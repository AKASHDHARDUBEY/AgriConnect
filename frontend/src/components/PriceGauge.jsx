import React from 'react';

const PriceGauge = ({ value = 2450, modalPrice = 2400, low = 1800, high = 3200 }) => {
    // Calculate percentage deviation from modal
    const percentage = modalPrice > 0 ? (value / modalPrice) * 100 : 100;
    
    let color = "#10b981"; // Emerald Green
    let statusText = "Fair Range";
    let statusBg = "bg-emerald-50 text-emerald-700 border-emerald-200";

    if (percentage < 80) {
        color = "#f43f5e"; // Rose Red
        statusText = "Exploitative Low";
        statusBg = "bg-rose-50 text-rose-700 border-rose-200";
    } else if (percentage > 120) {
        color = "#f43f5e"; // Rose Red
        statusText = "Overpriced Listing";
        statusBg = "bg-rose-50 text-rose-700 border-rose-200";
    } else if ((percentage >= 80 && percentage < 90) || (percentage > 110 && percentage <= 120)) {
        color = "#f59e0b"; // Amber Yellow
        statusText = "Cautionary Boundary";
        statusBg = "bg-amber-50 text-amber-700 border-amber-200";
    }

    // Map the value onto a 0-180 degree semi-circle gauge
    const range = high - low;
    const clampedValue = Math.max(low, Math.min(high, value));
    const ratio = range > 0 ? (clampedValue - low) / range : 0.5;
    const angle = ratio * 180; // 0 to 180 degrees

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center w-full">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">AG-3 Price Gauge</h3>
            
            {/* SVG Arc Gauge */}
            <div className="relative w-48 h-28 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 180 100" className="w-full h-full">
                    {/* Background Arc */}
                    <path 
                        d="M 10 90 A 80 80 0 0 1 170 90" 
                        fill="none" 
                        stroke="#f3f4f6" 
                        strokeWidth="16" 
                        strokeLinecap="round" 
                    />
                    
                    {/* Active Arc (Colored dynamically) */}
                    <path 
                        d="M 10 90 A 80 80 0 0 1 170 90" 
                        fill="none" 
                        stroke={color} 
                        strokeWidth="16" 
                        strokeLinecap="round" 
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (ratio * 251.2)}
                        className="transition-all duration-1000 ease-out"
                    />

                    {/* Center Point */}
                    <circle cx="90" cy="90" r="6" fill="#1f2937" />

                    {/* Needle */}
                    <line 
                        x1="90" 
                        y1="90" 
                        x2="90" 
                        y2="20" 
                        stroke="#1f2937" 
                        strokeWidth="4" 
                        strokeLinecap="round"
                        transform={`rotate(${angle - 90}, 90, 90)`}
                        className="transition-transform duration-1000 ease-out origin-[90px_90px]"
                    />
                </svg>
            </div>

            {/* Price Metadata */}
            <div className="text-4xl font-black text-green-950 mt-2">₹{value.toLocaleString()}</div>
            <div className={`mt-2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border ${statusBg}`}>
                {statusText}
            </div>

            {/* Gauge Limits */}
            <div className="w-full flex justify-between text-[10px] text-gray-400 font-extrabold mt-6 border-t border-gray-100 pt-3">
                <div className="text-left">
                    <p className="text-gray-300">LOW FAIR</p>
                    <p className="text-gray-500 font-bold">₹{low.toLocaleString()}</p>
                </div>
                <div className="text-center">
                    <p className="text-gray-300">MODAL</p>
                    <p className="text-green-800 font-bold">₹{modalPrice.toLocaleString()}</p>
                </div>
                <div className="text-right">
                    <p className="text-gray-300">HIGH FAIR</p>
                    <p className="text-gray-500 font-bold">₹{high.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default PriceGauge;
