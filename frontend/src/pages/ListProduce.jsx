import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListProduce = () => {
    const [formData, setFormData] = useState({
        cropName: '',
        quantity: '',
        price: '',
        harvestDate: ''
    });
    const [marketData, setMarketData] = useState(null); // Store API response here
    const [loadingPrice, setLoadingPrice] = useState(false);
    const [listingStatus, setListingStatus] = useState({ success: null, message: '' });

    // Function to fetch fair price from the Intelligence Engine
    const fetchFairPrice = async (crop) => {
        if (crop.length < 3) {
            setMarketData(null);
            return; 
        }
        setLoadingPrice(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/market/fair-price/${crop}`);
            setMarketData(res.data);
        } catch (err) {
            console.log("Price not found");
            setMarketData(null);
        } finally {
            setLoadingPrice(false);
        }
    };

    // Trigger fetch when cropName changes
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchFairPrice(formData.cropName);
        }, 500); // Debounce API calls by 500ms to reduce database load

        return () => clearTimeout(delayDebounceFn);
    }, [formData.cropName]);

    const isFair = marketData && 
                   parseFloat(formData.price) >= parseFloat(marketData.fairRange.min) && 
                   parseFloat(formData.price) <= parseFloat(marketData.fairRange.max);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setListingStatus({ success: null, message: '' });

        if (!formData.cropName || !formData.quantity || !formData.price || !formData.harvestDate) {
            setListingStatus({ success: false, message: 'Please fill in all fields.' });
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/products/list', {
                ...formData,
                imageUrl: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=400", // Quality placeholder image
                farmerId: 1 // Temporary hardcoded ID for now
            });
            setListingStatus({ success: true, message: 'Your produce was listed successfully!' });
            // Reset form
            setFormData({ cropName: '', quantity: '', price: '', harvestDate: '' });
            setMarketData(null);
        } catch (err) {
            setListingStatus({ success: false, message: 'Error publishing listing. Please try again.' });
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10 px-4">
                <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <h1 className="text-3xl font-bold text-green-800 mb-2">List New Produce</h1>
                    <p className="text-gray-500 mb-6 text-sm">Fill in the details to publish your crop on the marketplace.</p>
                    
                    {listingStatus.message && (
                        <div className={`p-4 rounded-lg mb-6 text-sm ${listingStatus.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                            {listingStatus.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Visual Placeholder for Photography */}
                        <div className="border-2 border-dashed border-gray-300 p-8 text-center rounded-xl cursor-pointer hover:bg-gray-50 transition duration-200">
                            <div className="text-gray-400 text-3xl mb-1">�</div>
                            <p className="text-gray-500 text-sm font-medium">Click or Drag to Upload Crop Photography</p>
                            <p className="text-gray-300 text-xs mt-1">PNG, JPG up to 5MB</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Crop Name</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Tomato, Potato, Yellow Maize" 
                                    value={formData.cropName}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition" 
                                    onChange={(e) => setFormData({...formData, cropName: e.target.value})} 
                                    required
                                />
                                {loadingPrice && <p className="text-xs text-green-700 mt-1 animate-pulse"> Analyzing market trends...</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Quantity (KG)</label>
                                <input 
                                    type="number" 
                                    placeholder="0" 
                                    value={formData.quantity}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition" 
                                    onChange={(e) => setFormData({...formData, quantity: e.target.value})} 
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Asking Price (Per KG)</label>
                            <input 
                                type="number" 
                                placeholder="₹ 20" 
                                value={formData.price}
                                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition" 
                                onChange={(e) => setFormData({...formData, price: e.target.value})} 
                                required
                            />
                            
                            {/* AG-3 PRICE INTELLIGENCE ALERTS */}
                            {marketData ? (
                                <div className={`mt-3 p-4 rounded-xl border transition-all duration-300 ${!formData.price ? 'bg-blue-50 border-blue-200 text-blue-800' : (isFair ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800')}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-base">{!formData.price ? "" : (isFair ? "" : "")}</span>
                                        <p className="font-bold text-sm">
                                            {!formData.price ? "Market Intelligence" : (isFair ? "Fair Price Validated" : "Price Warning")}
                                        </p>
                                    </div>
                                    <p className="text-xs">
                                        Market Average: <span className="font-semibold">₹{marketData.modalPrice}</span> | 
                                        Fair Range: <span className="font-semibold">₹{marketData.fairRange.min} - ₹{marketData.fairRange.max}</span>
                                    </p>
                                    {marketData.status === "ANOMALY_DETECTED" && (
                                        <p className="text-xs font-bold mt-2 text-red-600 animate-bounce">{marketData.alert}</p>
                                    )}
                                </div>
                            ) : (
                                formData.cropName.length >= 3 && !loadingPrice && (
                                    <div className="mt-3 p-4 rounded-xl border border-yellow-200 bg-yellow-50 text-yellow-800">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-base"></span>
                                            <p className="font-bold text-sm">No Market Data Found</p>
                                        </div>
                                        <p className="text-xs">
                                            We don't have historical price records for "{formData.cropName}" yet. You are free to set any asking price you like!
                                        </p>
                                    </div>
                                )
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Harvest Date</label>
                            <input 
                                type="date" 
                                value={formData.harvestDate}
                                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition" 
                                onChange={(e) => setFormData({...formData, harvestDate: e.target.value})} 
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-green-800 text-white py-3 rounded-lg font-bold hover:bg-green-900 transition-colors shadow-md mt-4"
                        >
                            Publish Listing
                        </button>
                    </form>
                </div>
            </div>
    );
};

export default ListProduce;
