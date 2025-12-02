// src/components/CropListing.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CropListing.css";

import CropCard from "./CropCard";
import CropCardSkeleton from "./CropCardSkeleton";
import { motion } from "framer-motion";

export default function CropListing({ searchTerm = "" }) {
  const [crops, setCrops] = useState([]);
  const [filterLocation, setFilterLocation] = useState("");
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
          location: "India", // Placeholder as DB doesn't have location yet
          seller: p.farmer?.name || "Farmer",
          image: p.imageUrl,
          contact: p.farmer?.email // Using email as contact for now
        }));
        setCrops(mappedCrops);
      }
    } catch (err) {
      console.error("Failed to fetch crops:", err);
      // Fallback to local storage if API fails (optional)
      const saved = JSON.parse(localStorage.getItem("cropListings") || "[]");
      if (saved.length > 0) setCrops(saved);
    }
  };

  // Initial load
  useEffect(() => {
    setLoading(true);
    loadCrops().finally(() => setLoading(false));
  }, []);

  // Poll for updates (optional, every 30s)
  useEffect(() => {
    const listener = setInterval(loadCrops, 30000);
    return () => clearInterval(listener);
  }, []);

  // FILTERS
  const filteredCrops = crops.filter((crop) => {
    const matchesSearch =
      crop.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      !filterLocation ||
      crop.location.toLowerCase().includes(filterLocation.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="crop-listing-container">
      {/* Header */}
      <div className="listing-header">
        <h1 className="listing-title">🌾 Browse Crop Listings</h1>
        <p className="listing-subtitle">Buy directly from farmers at fair prices</p>
      </div>

      {/* Location Filter */}
      <div className="search-filter-bar">
        <div className="filter-box">
          <svg
            className="filter-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>

          <input
            type="text"
            placeholder="Filter by location..."
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        {loading ? (
          <p>Loading listings...</p>
        ) : filteredCrops.length > 0 ? (
          <p>
            Found {filteredCrops.length}{" "}
            {filteredCrops.length === 1 ? "listing" : "listings"}
          </p>
        ) : (
          <p>No listings found. Try changing filters.</p>
        )}
      </div>

      {/* GRID */}
      {loading ? (
        <div className="crop-grid">
          {[...Array(6)].map((_, i) => (
            <CropCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredCrops.length > 0 ? (
        <motion.div
          className="crop-grid"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.08 }}
        >
          {filteredCrops.map((crop, index) => (
            <CropCard key={index} item={crop} />
          ))}
        </motion.div>
      ) : (
        <div className="empty-state">
          <h3>No crops listed yet</h3>
          <p>Start by listing your first crop!</p>
        </div>
      )}
    </div>
  );
}
