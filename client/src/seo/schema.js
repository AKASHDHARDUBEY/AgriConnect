// src/seo/schema.js
export const generateOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AgriConnect",
    "url": "https://agriconnect.in",
    "logo": "https://agriconnect.in/logo512.png",
    "sameAs": [
        "https://twitter.com/agriconnect",
        "https://facebook.com/agriconnect",
        "https://linkedin.com/company/agriconnect"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-1800-123-4567",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["en", "hi"]
    },
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Tech Park, Sector 5",
        "addressLocality": "Bengaluru",
        "addressRegion": "KA",
        "postalCode": "560100",
        "addressCountry": "IN"
    }
});

export const generateWebSiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AgriConnect India",
    "alternateName": ["AgriConnect", "Smart Kisan Platform"],
    "url": "https://agriconnect.in",
    "potentialAction": {
        "@type": "SearchAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://agriconnect.in/marketplace?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
    }
});

export const generateFAQSchema = (faqs) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
});
