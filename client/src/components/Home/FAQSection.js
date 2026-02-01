// src/components/Home/FAQSection.js
import React from 'react';
import { generateFAQSchema } from '../../seo/schema';

const faqs = [
    {
        question: "How does AgriConnect help farmers in India?",
        answer: "AgriConnect provides AI-driven crop advisory, real-time mandi prices, and a direct marketplace to sell crops to buyers without middlemen."
    },
    {
        question: "Is there a fee to list crops on AgriConnect?",
        answer: "No, listing crops on AgriConnect is completely free for farmers to encourage fair pricing and better income."
    },
    {
        question: "How can I access government agricultural schemes?",
        answer: "AgriConnect aggregates the latest PM-Kisan and state-level agricultural schemes in your dashboard to keep you informed."
    }
];

export default function FAQSection() {
    const schema = generateFAQSchema(faqs);

    return (
        <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white font-heading">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                            <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-400 mb-2">
                                {faq.question}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
