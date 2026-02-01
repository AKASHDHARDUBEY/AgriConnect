// src/components/CropListing.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CropListing.css"; // You can keep this for specific overrides or remove if fully Tailwind
import CropCard from "./CropCard";
import CropCardSkeleton from "./CropCardSkeleton";
import { motion } from "framer-motion";
import { generateCollectionSchema } from "../seo/marketplaceSchema";

export default function CropListing({ searchTerm = "", category, sort, location, isPreview }) {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load from API
  const loadCrops = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await axios.get(`${apiUrl}/api/v1/products`);

      if (response.data.status === 'success') {
        const mappedCrops = response.data.data.products.map(p => ({
          id: p.id,
          cropName: p.name,
          price: p.price,
          quantity: `${p.quantity} ${p.unit}`,
          description: p.description,
          location: "India",
          seller: p.farmer?.name || "Farmer",
          image: p.imageUrl,
          contact: p.farmer?.email
        }));
        setCrops(mappedCrops);
      }
    } catch (err) {
      console.error("Failed to fetch crops:", err);
      // Fallback 
      const saved = JSON.parse(localStorage.getItem("cropListings") || "[]");
      if (saved.length > 0) setCrops(saved);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadCrops().finally(() => setLoading(false));
  }, []);

  // FILTERS
  const filteredCrops = crops.filter((crop) => {
    const matchesSearch =
      crop.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Simple mock logic for other filters since DB might not have them yet
    const matchesCategory = category === "All Categories" || true;
    const matchesLocation = location === "All India" || true;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  // SCHEMA
  const collectionSchema = generateCollectionSchema(filteredCrops.map(c => ({ item: c })));

  return (
    <div className="w-full">
      {!loading && !isPreview && (
        <script type="application/ld+json">
          {JSON.stringify(collectionSchema)}
        </script>
      )}

      {/* RESULTS HEADER */}
      {!isPreview && (
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            {loading ? "Searching..." : `Viewing ${filteredCrops.length} Listings`}
          </h3>
        </div>
      )}

      {/* GRID */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <CropCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredCrops.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.08 }}
        >
          {filteredCrops.slice(0, isPreview ? 3 : undefined).map((crop, index) => (
            <CropCard key={index} item={crop} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No listings found</h3>
          <p className="text-slate-500">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
}
