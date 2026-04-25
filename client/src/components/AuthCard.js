import React from "react";
import "./AuthCard.css";

export default function AuthCard({ title, subtitle, children }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">{title}</h2>
        <p className="auth-subtitle">{subtitle}</p>

        <div className="auth-form">
          {children}
        </div>
      </div>
    </div>
  );
}
