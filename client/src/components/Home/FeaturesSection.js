// src/components/Home/FeaturesSection.js
import React from 'react';
import {
    CurrencyRupeeIcon,
    ChartBarIcon,
    UserGroupIcon
} from "@heroicons/react/24/outline";

export default function FeaturesSection() {
    const features = [
        {
            title: "Fair Price Discovery",
            description: "Get real-time insights into market prices and sell directly to buyers to maximize profit.",
            icon: <CurrencyRupeeIcon className="w-8 h-8 text-teal-600" />
        },
        {
            title: "AI Crop Advisory",
            description: "Advanced algorithms suggest the best crops to grow based on your soil and weather analysis.",
            icon: <ChartBarIcon className="w-8 h-8 text-teal-600" />
        },
        {
            title: "Community Support",
            description: "Connect with a nationwide network of farmers and experts to share knowledge.",
            icon: <UserGroupIcon className="w-8 h-8 text-teal-600" />
        }
    ];

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-heading mb-4">
                        Why Choose AgriConnect?
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        We bridge the gap between technology and agriculture to solve real-world problems for Indian farmers.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700">
                            <div className="bg-teal-50 dark:bg-teal-900/30 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
