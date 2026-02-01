// src/components/Home/CategoryGrid.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
    { name: "Vegetables", image: "https://img.freepik.com/free-photo/fresh-vegetables-wicker-basket-wooden-background_169016-5384.jpg", count: "120+ items" },
    { name: "Fruits", image: "https://img.freepik.com/free-photo/delicious-fruits-arrangement-high-angle_23-2148962646.jpg", count: "85+ items" },
    { name: "Cereals", image: "https://img.freepik.com/free-photo/sack-rice-with-rice-plant-white-background_1150-34676.jpg", count: "50+ items" },
    { name: "Pulses", image: "https://img.freepik.com/free-photo/various-legumes-beans-chickpeas-lentils_23-2148153965.jpg", count: "40+ items" },
];

export default function CategoryGrid() {
    const navigate = useNavigate();

    return (
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
                            Explore Categories
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">
                            Find exactly what you are looking for
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/marketplace')}
                        className="text-teal-600 font-semibold hover:text-teal-700 transition hidden md:block"
                    >
                        View All Categories &rarr;
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            onClick={() => navigate(`/marketplace?category=${cat.name}`)}
                            className="group relative h-48 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all"
                        >
                            {/* Background Image */}
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => e.target.src = "https://via.placeholder.com/300?text=AgriCategory"}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                                <h3 className="text-white font-bold text-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    {cat.name}
                                </h3>
                                <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {cat.count}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
