import React from "react";
import { adminLogout } from "../utils/adminAuth";
import "./AdminLayout.css";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">

      {/* ADMIN SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">AgriConnect Admin</h2>

        <nav className="admin-nav">
          <a href="/admin/dashboard">📊 Dashboard</a>
          <a href="/admin/listings">🛒 Manage Listings</a>
          <a href="/admin/farmers">👨‍🌾 Farmers</a>
          <a href="/admin/pds">🍚 PDS Reports</a>
          <a href="/admin/settings">⚙ Settings</a>
        </nav>

        <button 
          className="admin-logout-btn"
          onClick={() => {
            adminLogout();
            window.location.href = "/admin";
          }}
        >
          Logout
        </button>
      </aside>

      {/* ADMIN PAGE CONTENT */}
      <main className="admin-main">
        {children}
      </main>

    </div>
  );
}
