// src/pages/AdminManageListings.js
import React, { useState } from "react";
import "./AdminManageListings.css";

export default function AdminManageListings() {
  // MOCK DATA — replace with API later
  const [listings, setListings] = useState([
    { id: 101, crop: "Rice", price: "₹28/kg", qty: "1000 kg", farmer: "S. Kumar", posted: "2025-11-20", status: "Pending" },
    { id: 102, crop: "Tomato", price: "₹36/kg", qty: "200 kg", farmer: "P. Singh", posted: "2025-11-22", status: "Approved" },
    { id: 103, crop: "Wheat", price: "₹22/kg", qty: "500 kg", farmer: "M. Patel", posted: "2025-11-23", status: "Pending" },
    { id: 104, crop: "Moong Dal", price: "₹120/kg", qty: "50 kg", farmer: "R. Verma", posted: "2025-11-24", status: "Rejected" },
  ]);

  const [search, setSearch] = useState("");

  // HANDLERS
  const updateStatus = (id, newStatus) => {
    setListings((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: newStatus } : l
      )
    );
  };

  const deleteListing = (id) => {
    if (!window.confirm("Delete this listing permanently?")) return;
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  const filteredListings = listings.filter(
    (l) =>
      l.crop.toLowerCase().includes(search.toLowerCase()) ||
      l.farmer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-listings-page">

      {/* HEADER */}
      <div className="admin-listings-header">
        <h1>Manage Listings</h1>
        <p className="muted">Approve, reject, or delete crop listings.</p>
      </div>

      {/* SEARCH BAR */}
      <div className="admin-listings-search">
        <input
          type="text"
          placeholder="Search by crop or farmer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="admin-listings-table-wrapper">
        <table className="admin-listings-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Crop</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Farmer</th>
              <th>Posted</th>
              <th>Status</th>
              <th className="actions-col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredListings.map((l) => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.crop}</td>
                <td>{l.price}</td>
                <td>{l.qty}</td>
                <td>{l.farmer}</td>
                <td>{l.posted}</td>

                <td>
                  <span
                    className={`status-badge ${l.status.toLowerCase()}`}
                  >
                    {l.status}
                  </span>
                </td>

                <td className="action-buttons">
                  <button
                    className="btn-approve"
                    onClick={() => updateStatus(l.id, "Approved")}
                  >
                    Approve
                  </button>

                  <button
                    className="btn-reject"
                    onClick={() => updateStatus(l.id, "Rejected")}
                  >
                    Reject
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() => deleteListing(l.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
