// src/seo/metaConfig.js
export const DEFAULT_SEO = {
    title: "AgriConnect | Smart Agriculture & Farmer Support Platform India",
    description: "AI-powered crop advisory, direct farmer marketplace, and government scheme awareness platform in India. Empowering farmers with technology and fair pricing.",
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://agriconnect.in",
        site_name: "AgriConnect India",
        images: [
            {
                url: "https://agriconnect.in/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "AgriConnect - Smart Farming for India"
            }
        ]
    },
    twitter: {
        handle: "@agriconnect_in",
        cardType: "summary_large_image"
    },
    keywords: [
        "smart farming india",
        "agriculture technology",
        "kisan support",
        "crop advisory ai",
        "farmer marketplace",
        "mandi prices",
        "organic farming india",
        "PM kisan schemes",
        "agriculture startups"
    ]
};

export const ROUTES_SEO = {
    "/": {
        title: "AgriConnect | Home - Smart Farming Solutions for Indian Farmers",
        description: "Join India's leading digital agriculture platform. Get AI crop recommendations, sell crops directly to buyers, and access latest farming news."
    },
    "/marketplace": {
        title: "Agri Marketplace | Buy & Sell Fresh Crops Online",
        description: "Direct farmer-to-buyer marketplace. Buy fresh vegetables, fruits, and grains directly from farmers. Fair prices, no middlemen."
    },
    "/upload": {
        title: "Sell Your Crop | Farmer Dashboard",
        description: "List your agricultural produce for sale. Reach thousands of buyers across India instantly."
    },
    "/login": {
        title: "Login | AgriConnect",
        description: "Secure login for farmers and buyers. Access your dashboard and marketplace."
    },
    "/signup": {
        title: "Join AgriConnect | Farmers & Buyers Registration",
        description: "Register today to access smart farming tools and direct market access."
    }
};
