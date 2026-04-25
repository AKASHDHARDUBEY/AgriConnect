import React from "react";
import CropListing from "../components/CropListing";
import "./Marketplace.css";

export default function Marketplace({ searchTerm }) {
  return (
    <div className="market-wrapper">

      {/* HEADER */}
      <header className="market-header">
        <h2>🌾 Marketplace</h2>
        <p>Buy fresh crops directly from farmers across India.</p>
      </header>

      {/* FILTER BAR */}
      <section className="market-filters">
        <select className="market-select">
          <option>All Categories</option>
          <option>Vegetables</option>
          <option>Fruits</option>
          <option>Cereals</option>
          <option>Oilseeds</option>
        </select>

        <select className="market-select">
          <option>Sort: Default</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest First</option>
        </select>
      </section>

      {/* LISTINGS */}
      <div className="market-list-wrapper">
        <CropListing searchTerm={searchTerm} />
      </div>

    </div>
  );
}
