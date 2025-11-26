import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ currentView, setCurrentView }) => {
  const [openAuthMenu, setOpenAuthMenu] = useState(false);

  return (
    <aside className="sidebar">

      {/* Login/Signup Section */}
      <div 
        className="sidebar-login"
        onClick={() => setOpenAuthMenu(!openAuthMenu)}
      >
        <div className="login-icon">👤</div>
        <div className="login-content">
          <div className="login-text">Login/Signup</div>
          <div className="login-subtext">My Account</div>
        </div>
        <div className="login-arrow">{openAuthMenu ? "▲" : "▼"}</div>
      </div>

      {/* DROPDOWN MENU */}
      {openAuthMenu && (
        <div className="auth-dropdown">
          <div 
            className="auth-item"
            onClick={() => window.location.href = "/login"}
          >
            User Login
          </div>

          <div 
            className="auth-item"
            onClick={() => window.location.href = "/signup"}
          >
            Signup
          </div>

          <div 
            className="auth-item"
            onClick={() => window.location.href = "/admin"}
          >
            Admin Login
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="sidebar-section">

        <div 
          className={`sidebar-item ${currentView === 'listings' ? 'active' : ''}`}
          onClick={() => window.location.href = "/"}
        >
          <span className="sidebar-icon">🏠</span>
          <span className="sidebar-text">Home</span>
        </div>

        <div className="sidebar-item">
          <span className="sidebar-icon">☰</span>
          <span className="sidebar-text">Categories</span>
          <span className="sidebar-arrow">›</span>
        </div>

      </div>

      {/* My Activities */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">MY ACTIVITIES</div>

        <div 
          className="sidebar-item"
          onClick={() => window.location.href = "/upload"}
        >
          <span className="sidebar-icon">📄</span>
          <span className="sidebar-text">Ads</span>
        </div>

        <div className="sidebar-item">
          <span className="sidebar-icon">📄</span>
          <span className="sidebar-text">Ads Posted by you</span>
        </div>
      </div>

      {/* Others */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">OTHERS</div>

        <div className="sidebar-item">
          <span className="sidebar-icon">📍</span>
          <span className="sidebar-text">All India</span>
        </div>

        <div className="sidebar-item">
          <span className="sidebar-icon">ℹ️</span>
          <span className="sidebar-text">About AgriConnect</span>
        </div>

        <div className="sidebar-item">
          <span className="sidebar-icon">📞</span>
          <span className="sidebar-text">Contact Us</span>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
