// src/components/CropListing.js
import React, { useState, useEffect } from "react";
import "./CropListing.css";

import CropCard from "./CropCard";
import CropCardSkeleton from "./CropCardSkeleton";
import { motion } from "framer-motion";

export default function CropListing({ searchTerm = "" }) {
  const [crops, setCrops] = useState([]);
  const [filterLocation, setFilterLocation] = useState("");
  const [loading, setLoading] = useState(true);

  // Load from localStorage
  const loadCrops = () => {
    const saved = JSON.parse(localStorage.getItem("cropListings") || "[]");
    setCrops(saved);
  };

  // Initial load + skeleton delay
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      loadCrops();
      setLoading(false);
    }, 800); // skeleton shimmer duration
  }, []);

  // Live sync if user updates localStorage
  useEffect(() => {
    const listener = setInterval(loadCrops, 1000);
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
