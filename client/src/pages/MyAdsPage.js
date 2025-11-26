// src/pages/MyAdsPage.js
import React, { useEffect, useState } from "react";
import "./MyAdsPage.css";

export default function MyAdsPage() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Temporary storage (replace with backend API later)
    const storedListings = JSON.parse(localStorage.getItem("cropListings")) || [];
    setAds(storedListings);
  }, []);

  return (
    <div className="myads-container">

      {/* Header */}
      <div className="myads-header">
        <h2>📄 My Ads</h2>
        <p className="subtitle">Manage all the crops you have listed.</p>
      </div>

      {/* No Ads */}
      {ads.length === 0 && (
        <div className="empty-ads">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076508.png"
            alt="Empty"
            className="empty-img"
          />
          <h3>No Ads Posted Yet</h3>
          <p>You haven’t listed any crops yet. Start by listing your first crop!</p>
          <button 
            className="post-btn"
            onClick={() => (window.location.href = "/upload")}
          >
            + Post Crop
          </button>
        </div>
      )}

      {/* Ads Grid */}
      <div className="myads-grid">
        {ads.map((item, index) => (
          <div key={index} className="myads-card">

            <div className="myads-img-wrapper">
              {item.image ? (
                <img src={item.image} alt={item.cropName} className="myads-img" />
              ) : (
                <div className="myads-img-placeholder">No Image</div>
              )}
            </div>

            <div className="myads-content">
              <h3>{item.cropName}</h3>

              <p className="myads-location">📍 {item.location}</p>
              <p className="myads-qty">📦 {item.quantity}</p>

              <p className="myads-desc">{item.description}</p>

              <div className="myads-footer">
                <div className="price">
                  <span className="price-value">₹{item.price}</span>
                  <span className="unit">/ kg</span>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => {
                    const updated = ads.filter((_, idx) => idx !== index);
                    setAds(updated);
                    localStorage.setItem("cropListings", JSON.stringify(updated));
                  }}
                >
                  ❌ Delete
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
