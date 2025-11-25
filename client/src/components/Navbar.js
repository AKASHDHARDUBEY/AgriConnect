// src/components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <div
          className="navbar-logo"
          onClick={() => navigate("/")}
        >
          <span className="logo-icon">🌾</span>
          <span className="logo-text">AgriConnect</span>
        </div>

        {/* Desktop Links */}
        <nav className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/marketplace" className="nav-link">Marketplace</Link>
          <Link to="/farm" className="nav-link">Farmer Dashboard</Link>
          <Link to="/upload" className="sell-btn">+ Sell Crop</Link>
        </nav>

        {/* Mobile menu */}
        <div
          className="mobile-menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </div>

      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="mobile-dropdown">
          <Link to="/" onClick={() => setMenuOpen(false)} className="mobile-link">Home</Link>
          <Link to="/marketplace" onClick={() => setMenuOpen(false)} className="mobile-link">Marketplace</Link>
          <Link to="/farm" onClick={() => setMenuOpen(false)} className="mobile-link">Farmer Dashboard</Link>
          <Link to="/upload" onClick={() => setMenuOpen(false)} className="mobile-sell-btn">+ Sell Crop</Link>
        </div>
      )}

    </header>
  );
}
