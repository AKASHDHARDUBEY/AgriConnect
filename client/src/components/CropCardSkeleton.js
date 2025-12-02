// src/components/CropCardSkeleton.js
import React from "react";
import "./CropCardSkeleton.css";

export default function CropCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img shimmer"></div>

      <div className="skeleton-content">
        <div className="skeleton-title shimmer"></div>
        <div className="skeleton-sub shimmer"></div>
        <div className="skeleton-sub shimmer"></div>

        <div className="skeleton-row">
          <div className="skeleton-price shimmer"></div>
          <div className="skeleton-btn shimmer"></div>
        </div>
      </div>
    </div>
  );
}
