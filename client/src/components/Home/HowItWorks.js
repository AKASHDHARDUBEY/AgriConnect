// src/components/Home/HowItWorks.js
import React from 'react';
import {
    UserPlusIcon,
    ArrowUpTrayIcon,
    CurrencyRupeeIcon,
    ShoppingBagIcon
} from "@heroicons/react/24/outline";

export default function HowItWorks() {
    const steps = [
        {
            title: "1. Register",
            description: "Sign up as a farmer or buyer in seconds.",
            icon: <UserPlusIcon className="w-8 h-8 text-white" />,
            color: "bg-teal-500"
        },
        {
            title: "2. List or Browse",
            description: "Farmers upload crops; Buyers browse fresh produce.",
            icon: <ArrowUpTrayIcon className="w-8 h-8 text-white" />,
            color: "bg-emerald-500"
        },
        {
            title: "3. Connect",
            description: "Negotiate directly and agree on a fair price.",
            icon: <CurrencyRupeeIcon className="w-8 h-8 text-white" />,
            color: "bg-cyan-500"
        },
        {
            title: "4. Trade",
            description: "Complete the transaction securely and transparently.",
            icon: <ShoppingBagIcon className="w-8 h-8 text-white" />,
            color: "bg-blue-500"
        }
    ];

    return (
        <section className="py-20 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-heading mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Simplifying the farm-to-table journey in 4 easy steps
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10"></div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative flex flex-col items-center text-center group">
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg mb-6 ${step.color} transform transition duration-300 group-hover:scale-110`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
