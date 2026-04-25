// src/components/LandingHero.js
import React from "react";
import "./LandingHero.css";
import { useNavigate } from "react-router-dom";

export default function LandingHero() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-container">

        {/* TEXT */}
        <div className="hero-content">
          <h1 className="hero-title">
            Empowering Farmers with <span>Smart Agriculture</span>
          </h1>

          <p className="hero-subtitle">
            AI-powered crop recommendations, direct farmer-to-buyer marketplace,
            and transparent Public Distribution System (PDS) services.
          </p>

          <div className="hero-buttons">
            <button 
              className="hero-btn-primary"
              onClick={() => navigate("/upload")}
            >
              🌱 List Your Crop
            </button>

            <button 
              className="hero-btn-secondary"
              onClick={() => navigate("/marketplace")}
            >
              🛒 Visit Marketplace
            </button>
          </div>
        </div>

        {/* IMAGE / ICON */}
        <div className="hero-image">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2907/2907933.png" 
            alt="Farmer Illustration"
          />
        </div>

      </div>
    </section>
  );
}
