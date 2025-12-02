// src/components/CropListing.js
import React, { useState, useEffect } from "react";
import "./CropListing.css";
import { motion } from "framer-motion";

export default function CropListing({ searchTerm = "" }) {
  const [crops, setCrops] = useState([]);
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    loadCrops();

    // Sync when other tabs update the localStorage
    const syncStorage = () => loadCrops();
    window.addEventListener("storage", syncStorage);

    return () => window.removeEventListener("storage", syncStorage);
  }, []);

  const loadCrops = () => {
    try {
      const savedCrops = JSON.parse(localStorage.getItem("cropListings") || "[]");
      setCrops(savedCrops);
    } catch (error) {
      console.error("Error loading crops:", error);
      setCrops([]);
    }
  };

  // FILTER + SEARCH
  const filteredCrops = crops.filter((crop) => {
    const name = crop.cropName?.toLowerCase() || "";
    const description = crop.description?.toLowerCase() || "";
    const location = crop.location?.toLowerCase() || "";

    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      description.includes(searchTerm.toLowerCase());

    const matchesLocation =
      !filterLocation ||
      location.includes(filterLocation.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  const handleContact = (contact) => {
    if (!contact) return alert("No contact number provided.");
    window.open(`tel:${contact}`, "_self");
  };

  return (
    <div className="crop-listing-container">
      {/* HEADER */}
      <div className="listing-header">
        <h1 className="listing-title">🌾 Browse Crop Listings</h1>
        <p className="listing-subtitle">
          Buy directly from farmers at fair prices
        </p>
      </div>

      {/* FILTER BAR */}
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

      {/* RESULT INFO */}
      <div className="results-info">
        {filteredCrops.length > 0 ? (
          <p>
            Found {filteredCrops.length}{" "}
            {filteredCrops.length === 1 ? "listing" : "listings"}
          </p>
        ) : (
          <p>No listings found. Be the first to list your crop!</p>
        )}
      </div>

      {/* CROP GRID */}
      {filteredCrops.length > 0 ? (
        <div className="crop-grid">
          {filteredCrops.map((crop, index) => (
            <motion.div
              className="crop-card upgraded-card"
              key={index}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {/* IMAGE SECTION */}
              <div className="crop-image-container">
                {crop.image ? (
                  <img
                    src={crop.image}
                    alt={crop.cropName}
                    className="crop-image"
                  />
                ) : (
                  <div className="crop-image-placeholder">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                )}

                <div className="crop-badge">📍 {crop.location || "N/A"}</div>
              </div>

              {/* CONTENT SECTION */}
              <div className="crop-card-content">
                <h3 className="crop-name">{crop.cropName || "Unknown Crop"}</h3>
                <p className="crop-location">📍 {crop.location || "N/A"}</p>
                <p className="crop-quantity">📦 {crop.quantity || "N/A"}</p>

                {crop.description && (
                  <p className="crop-description">
                    {crop.description.substring(0, 80)}...
                  </p>
                )}

                <div className="crop-footer">
                  <div className="crop-price">
                    <span className="price-amount">₹{crop.price || "N/A"}</span>
                    <span className="price-unit">/kg</span>
                  </div>

                  <button
                    className="contact-btn"
                    onClick={() => handleContact(crop.contact)}
                  >
                    📞 Contact
                  </button>
                </div>

                <div className="crop-date">
                  Posted: {crop.datePosted || "Unknown"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        // EMPTY STATE
        <div className="empty-state">
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="empty-icon"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <h3>No crops listed yet</h3>
          <p>Start by listing your first crop!</p>
        </div>
      )}
    </div>
  );
}
