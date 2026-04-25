import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Marketplace = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products/all');
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Filter products based on search term
    const filteredProducts = products.filter(p => 
        p.cropName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
                <p className="mt-4 text-gray-500 font-semibold animate-pulse">Loading Marketplace...</p>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-green-800 tracking-tight">Browse Fresh Inventory</h1>
                        <p className="text-gray-500 text-sm mt-1">Direct from local farms with verified fair prices</p>
                    </div>
                    <div className="relative w-full md:w-80">
                        <input 
                            type="text" 
                            placeholder="Search crops (e.g. Tomato)..." 
                            className="p-3 pl-10 border border-gray-300 rounded-full w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition text-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="absolute left-3.5 top-3.5 text-gray-400 text-sm">�</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                {filteredProducts.length === 0 && (
                    <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
                        <span className="text-4xl mb-2"></span>
                        <p className="text-lg font-medium">No crops found matching your search.</p>
                    </div>
                )}
            </div>
    );
};

// Sub-component for the Product Card
const ProductCard = ({ product }) => {
    const [isFair, setIsFair] = useState(null);
    const [loadingFair, setLoadingFair] = useState(true);

    useEffect(() => {
        const checkFairPrice = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/market/fair-price/${product.cropName}`);
                const { fairRange } = res.data;
                const listingPrice = parseFloat(product.price);
                const minRange = parseFloat(fairRange.min);
                const maxRange = parseFloat(fairRange.max);
                
                if (listingPrice >= minRange && listingPrice <= maxRange) {
                    setIsFair(true);
                } else {
                    setIsFair(false);
                }
            } catch (err) {
                setIsFair(null);
            } finally {
                setLoadingFair(false);
            }
        };
        checkFairPrice();
    }, [product]);

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between overflow-hidden group">
            <div className="relative overflow-hidden flex-shrink-0">
                <img 
                    src={product.imageUrl || "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=400"} 
                    alt={product.cropName} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-500" 
                />
                {!loadingFair && isFair && (
                    <div className="absolute top-3 left-3 bg-green-600 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-md tracking-wider uppercase">
                         Verified Fair Price
                    </div>
                )}
                {!loadingFair && isFair === false && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-md tracking-wider uppercase">
                         Above Market Rate
                    </div>
                )}
            </div>
            
            <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-800 capitalize leading-snug">{product.cropName}</h3>
                        <span className="text-green-800 font-extrabold text-lg">₹{product.price}<span className="text-xs font-normal text-gray-400">/kg</span></span>
                    </div>
                    
                    <p className="text-gray-400 text-xs font-semibold mb-4">Quantity: {product.quantity} KG available</p>
                    
                    <div className="text-sm text-gray-600 space-y-1 mb-5 border-t border-gray-100 pt-3">
                        <p className="flex items-center gap-2 text-gray-700">
                            <span className="text-xs"></span> <span className="font-medium">{product.farmer?.name || "Ramesh Kumar"}</span>
                        </p>
                        <p className="flex items-center gap-2 text-gray-550">
                            <span className="text-xs">�</span> <span>{product.farmer?.location || "Nashik, Maharashtra"}</span>
                        </p>
                        {product.distanceKm !== undefined && (
                            <p className="flex items-center gap-2 text-emerald-700 text-xs font-bold mt-1">
                                <span className="text-xs">�</span> <span>{product.distanceKm} km away</span>
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex gap-2.5">
                    <a 
                        href={`tel:${product.farmer?.phone || '+919876543210'}`} 
                        className="flex-1 bg-gray-900 text-white text-center py-2.5 rounded-xl text-xs font-bold hover:bg-black transition duration-200 shadow-sm"
                    >
                        � Call
                    </a>
                    <a 
                        href={`https://wa.me/${product.farmer?.phone?.replace('+', '') || '919876543210'}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 bg-emerald-600 text-white text-center py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-700 transition duration-200 shadow-sm"
                    >
                        � WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
