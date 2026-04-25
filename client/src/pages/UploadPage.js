// src/pages/UploadPage.js
import React from "react";
import CropUploadForm from "../components/CropUploadForm";
import "./UploadPage.css";

export default function UploadPage({ onCropAdded }) {
  return (
    <div className="upload-page">

      <div className="upload-header">
        <h2 className="upload-title">📤 Sell Your Crop</h2>
        <p className="upload-subtitle">
          Upload crop details and connect directly with buyers across India.
        </p>
      </div>

      {/* Elegant upload card */}
      <div className="upload-card">
        <CropUploadForm onCropAdded={onCropAdded} />
      </div>

    </div>
  );
}
