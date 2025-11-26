// src/pages/AdminLogin.js
import React, { useState } from "react";
import AuthCard from "../components/AuthCard";
import { adminLogin } from "../utils/adminAuth";
import "./AuthPages.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();

    const result = adminLogin(email, password);

    if (result.success) {
      // Redirect admin to dashboard
      window.location.href = "/admin/dashboard";
    } else {
      alert("❌ Invalid admin credentials");
    }
  };

  return (
    <AuthCard
      title="Admin Panel 🔐"
      subtitle="Authorized access only"
    >
      <form onSubmit={handleAdminLogin}>

        <input
          type="email"
          placeholder="Admin Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="auth-btn" type="submit">
          Login as Admin
        </button>

        <span
          className="auth-link"
          onClick={() => (window.location.href = "/login")}
        >
          User Login
        </span>
      </form>
    </AuthCard>
  );
}
