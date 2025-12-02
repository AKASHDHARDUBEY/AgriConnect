// src/components/LandingHero.js
import React from "react";
import { motion } from "framer-motion";
import "./LandingHero.css";
import { useNavigate } from "react-router-dom";

export default function LandingHero() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">

      {/* Background Decorative Circles */}
      <div className="hero-bg-circle circle1"></div>
      <div className="hero-bg-circle circle2"></div>

      <div className="hero-container">

        {/* TEXT SECTION */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Empowering Farmers with <span>Smart Agriculture</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            AI-powered crop recommendations, direct farmer-to-buyer marketplace,
            and transparent Public Distribution System (PDS) services.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.30, duration: 0.8 }}
          >
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
          </motion.div>
        </motion.div>

        {/* FLOATING IMAGE */}
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9 }}
        >
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2907/2907933.png" 
            alt="Farmer Illustration"
          />

          {/* Floating glass card */}
          <motion.div
            className="floating-glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            🌾 Smart Farming • Direct Marketplace • AI Insights
          </motion.div>
        </motion.div>

      </div>

    </section>
  );
}
