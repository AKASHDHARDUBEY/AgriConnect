// src/pages/AdminDashboard.js
import React from "react";
import "./AdminDashboard.css";

/*
  AdminDashboard
  - Uses mock data for demo (replace with API calls)
  - Designed to be responsive and dark-mode friendly
*/

const statItems = [
  { id: 1, title: "Total Revenue", value: "₹ 12.4L", delta: "+8.2%" },
  { id: 2, title: "Orders Today", value: "184", delta: "+4.1%" },
  { id: 3, title: "Registered Farmers", value: "3,204", delta: "+1.8%" },
  { id: 4, title: "Active Listings", value: "2,891", delta: "-0.6%" },
];

const recentActivities = [
  { id: 1, text: "New farmer registered: Ramesh from Punjab", time: "2m ago" },
  { id: 2, text: "Listing approved: 100kg Rice by S. Kumar", time: "15m ago" },
  { id: 3, text: "PDS alert: Wheat dispatch delayed in UP", time: "1h ago" },
  { id: 4, text: "Admin changed price threshold settings", time: "3h ago" },
];

const recentListings = [
  { id: 101, crop: "Rice", price: "₹ 28/kg", qty: "1000 kg", farmer: "S. Kumar", posted: "2025-11-20" },
  { id: 102, crop: "Tomato", price: "₹ 36/kg", qty: "200 kg", farmer: "P. Singh", posted: "2025-11-22" },
  { id: 103, crop: "Wheat", price: "₹ 22/kg", qty: "500 kg", farmer: "M. Patel", posted: "2025-11-23" },
  { id: 104, crop: "Moong Dal", price: "₹ 120/kg", qty: "50 kg", farmer: "R. Verma", posted: "2025-11-24" },
];

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">

      {/* Header */}
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="muted">Overview of system metrics, recent activity, and listings.</p>
        </div>
        <div className="admin-actions">
          <button className="btn btn-outline">Export CSV</button>
          <button className="btn btn-primary">Create Announcement</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {statItems.map((s) => (
          <div key={s.id} className="stat-card">
            <div className="stat-left">
              <div className="stat-value">{s.value}</div>
              <div className="stat-title">{s.title}</div>
            </div>
            <div className={`stat-delta ${s.delta.startsWith("-") ? "negative" : "positive"}`}>
              {s.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Main grid: Recent Activity + Recent Listings */}
      <div className="admin-main-grid">
        {/* Recent Activity */}
        <section className="panel activity-panel">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            {recentActivities.map((a) => (
              <li key={a.id} className="activity-item">
                <div className="activity-text">{a.text}</div>
                <div className="activity-time muted">{a.time}</div>
              </li>
            ))}
          </ul>
        </section>

        {/* Recent Listings */}
        <section className="panel listings-panel">
          <h3>Recent Listings</h3>

          <div className="table-wrapper">
            <table className="listings-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Crop</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Farmer</th>
                  <th>Posted</th>
                </tr>
              </thead>
              <tbody>
                {recentListings.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.crop}</td>
                    <td>{r.price}</td>
                    <td>{r.qty}</td>
                    <td>{r.farmer}</td>
                    <td>{r.posted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>
      </div>
    </div>
  );
}
