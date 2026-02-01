// src/components/LandingHero.js
import React from "react";
import { motion } from "framer-motion";
import "./LandingHero.css";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, BuildingStorefrontIcon, PlusIcon } from "@heroicons/react/24/outline";

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
          initial={{
            opacity: 0,
            x: -40
          }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
          >
            Revolutionizing Agriculture 🚀
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Empowering Farmers with <span className="highlight-text">Smart Agriculture</span>
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
              <PlusIcon className="w-5 h-5 mr-2" /> List Your Crop
            </button>

            <button
              className="hero-btn-secondary"
              onClick={() => navigate("/marketplace")}
            >
              <BuildingStorefrontIcon className="w-5 h-5 mr-2" /> Visit Marketplace
            </button>
          </motion.div>
        </motion.div>

        {/* HERO IMAGE SECTION */}
        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9 }}
        >
          {/* You can replace this valid URL with a local asset if preferred */}
          <img
            src="https://img.freepik.com/free-vector/farmer-concept-illustration_114360-3164.jpg?w=826&t=st=1678888888~exp=1678889488~hmac=..."
            alt="Smart Farming"
            className="hero-illustration"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://cdn-icons-png.flaticon.com/512/2907/2907933.png" // Fallback
            }}
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
            <div className="glass-icon">
              <ArrowRightIcon className="w-5 h-5 text-white" />
            </div>
            <div className="glass-text">
              <strong>Direct Marketplace</strong>
              <span>Connect with buyers</span>
            </div>
          </motion.div>
        </motion.div>

      </div>

    </section>
  );
}
