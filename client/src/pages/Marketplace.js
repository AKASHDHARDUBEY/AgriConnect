// src/pages/Marketplace.js
import React, { useState } from "react";
import CropListing from "../components/CropListing";
import "./Marketplace.css";

export default function Marketplace({ searchTerm }) {
  const [filters, setFilters] = useState({
    category: "All Categories",
    sort: "default",
    location: "All India",
  });

  return (
    <div className="market-wrapper">

      {/* HEADER */}
      <header className="market-header">
        <div>
          <h2 className="market-title">🌾 Marketplace</h2>
          <p className="market-subtitle">
            Buy fresh crops directly from farmers across India.
          </p>
        </div>

        {/* RIGHT-SIDE CONTROLS */}
        <div className="market-controls">
          {/* CATEGORY */}
          <select
            className="market-select"
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option>All Categories</option>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Cereals</option>
            <option>Oilseeds</option>
            <option>Pulses</option>
          </select>

          {/* SORT */}
          <select
            className="market-select"
            value={filters.sort}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sort: e.target.value }))
            }
          >
            <option value="default">Sort: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </header>

      {/* ADVANCED FILTER BAR */}
      <section className="market-filters">

        {/* Location Filter */}
        <select
          className="market-select wide-select"
          value={filters.location}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, location: e.target.value }))
          }
        >
          <option>All India</option>
          <option>Punjab</option>
          <option>Maharashtra</option>
          <option>Haryana</option>
          <option>Uttar Pradesh</option>
          <option>Karnataka</option>
          <option>Tamil Nadu</option>
          <option>Rajasthan</option>
        </select>

        {/* Quick Filters */}
        <div className="quick-filters">
          <button className="quick-chip">Organic</button>
          <button className="quick-chip">Local</button>
          <button className="quick-chip">Bulk Quantity</button>
        </div>
      </section>

      {/* LISTINGS */}
      <div className="market-list-wrapper">
        <CropListing
          searchTerm={searchTerm}
          category={filters.category}
          sort={filters.sort}
          location={filters.location}
        />
      </div>

    </div>
  );
}
