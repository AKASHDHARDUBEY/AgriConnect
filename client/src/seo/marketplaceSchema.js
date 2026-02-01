// src/seo/marketplaceSchema.js
export const generateCollectionSchema = (products) => ({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AgriConnect Marketplace",
    "description": "Buy fresh crops directly from farmers across India. Vegetables, Fruits, Cereals, and more.",
    "url": "https://agriconnect.in/marketplace",
    "mainEntity": {
        "@type": "ItemList",
        "itemListElement": products.map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "name": product.item.cropName,
                "description": product.item.description,
                "image": product.item.image,
                "offers": {
                    "@type": "Offer",
                    "price": product.item.price,
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                        "@type": "Person",
                        "name": product.item.seller
                    }
                }
            }
        }))
    }
});
