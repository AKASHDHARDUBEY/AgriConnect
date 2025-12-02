// src/components/CropCard.js
import React from "react";
import { motion } from "framer-motion";
import "./CropCard.css";

export default function CropCard({ item }) {
  const handleContact = () => {
    if (item?.contact) {
      window.open(`tel:${item.contact}`, "_self");
    } else {
      alert(`Contact Seller: ${item.seller || "Unknown Seller"}`);
    }
  };

  return (
    <motion.div
      className="crop-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* ================= IMAGE WRAPPER ================= */}
      <div className="crop-img-wrapper">
        {item.image ? (
          <motion.img
            src={item.image}
            alt={item.cropName}
            className="crop-img"
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <div className="crop-img-placeholder">No Image</div>
        )}

        {/* LOCATION BADGE */}
        <motion.div
          className="crop-tag"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          📍 {item.location || "India"}
        </motion.div>
      </div>

      {/* ================= CARD BODY ================= */}
      <div className="crop-info">
        {/* TITLE + PRICE ROW */}
        <div className="crop-header">
          <h3 className="crop-name">{item.cropName}</h3>

          <div className="crop-price">
            <span className="price">₹{item.price}</span>
            <span className="unit">/kg</span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="crop-desc">
          {item.description?.length > 120
            ? item.description.substring(0, 120) + "..."
            : item.description}
        </p>

        {/* EXTRA INFO */}
        <div className="crop-extra">
          <span>📦 {item.quantity || "N/A"}</span>
          <span>🧑‍🌾 {item.seller || "Farmer"}</span>
        </div>

        {/* CONTACT BUTTON */}
        <motion.button
          className="contact-btn"
          onClick={handleContact}
          whileTap={{ scale: 0.96 }}
        >
          📞 Contact Seller
        </motion.button>
      </div>
    </motion.div>
  );
}
