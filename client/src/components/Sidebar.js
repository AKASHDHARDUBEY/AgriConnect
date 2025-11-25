// UPDATED Sidebar.js (with React Router navigation)
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ currentView, setCurrentView }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if a route is active
  const isActive = (path) => location.pathname === path;

  // Helper function for navigation
  const goTo = (path, viewName) => {
    if (setCurrentView) setCurrentView(viewName);
    navigate(path);
  };

  return (
    <aside className="sidebar">
      
      {/* Login/Signup Section */}
      <div
        className="sidebar-login"
        onClick={() => goTo('/profile', 'profile')}
        role="button"
      >
        <div className="login-icon">👤</div>
        <div className="login-content">
          <div className="login-text">Login/Signup</div>
          <div className="login-subtext">My Account</div>
        </div>
        <div className="login-arrow">›</div>
      </div>

      {/* Main Navigation */}
      <div className="sidebar-section">
        <div
          className={`sidebar-item ${isActive('/') ? 'active' : ''}`}
          onClick={() => goTo('/', 'listings')}
        >
          <span className="sidebar-icon">🏠</span>
          <span className="sidebar-text">Home</span>
        </div>

        <div
          className={`sidebar-item ${isActive('/categories') ? 'active' : ''}`}
          onClick={() => goTo('/categories', 'categories')}
        >
          <span className="sidebar-icon">☰</span>
          <span className="sidebar-text">Categories</span>
          <span className="sidebar-arrow">›</span>
        </div>
      </div>

      {/* My Activities */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">MY ACTIVITIES</div>

        <div
          className={`sidebar-item ${isActive('/upload') ? 'active' : ''}`}
          onClick={() => goTo('/upload', 'upload')}
        >
          <span className="sidebar-icon">📄</span>
          <span className="sidebar-text">Ads</span>
        </div>

        <div
          className={`sidebar-item ${isActive('/my-ads') ? 'active' : ''}`}
          onClick={() => goTo('/my-ads', 'myads')}
        >
          <span className="sidebar-icon">📄</span>
          <span className="sidebar-text">Ads Posted by you</span>
        </div>
      </div>

      {/* Others */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">OTHERS</div>

        <div
          className={`sidebar-item ${isActive('/all-india') ? 'active' : ''}`}
          onClick={() => goTo('/all-india', 'allindia')}
        >
          <span className="sidebar-icon">📍</span>
          <span className="sidebar-text">All India</span>
        </div>

        <div
          className={`sidebar-item ${isActive('/about') ? 'active' : ''}`}
          onClick={() => goTo('/about', 'about')}
        >
          <span className="sidebar-icon">ℹ️</span>
          <span className="sidebar-text">About AgriConnect</span>
        </div>

        <div
          className={`sidebar-item ${isActive('/contact') ? 'active' : ''}`}
          onClick={() => goTo('/contact', 'contact')}
        >
          <span className="sidebar-icon">📞</span>
          <span className="sidebar-text">Contact Us</span>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
