import React, { useState } from "react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
  ShoppingCartIcon,
  PlusCircleIcon,
  ClipboardDocumentListIcon,
  MapPinIcon,
  InformationCircleIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";
import "./Sidebar.css";

export default function Sidebar() {
  const [openAuthMenu, setOpenAuthMenu] = useState(false);

  return (
    <aside className="sidebar">

      {/* ===================== LOGIN / SIGNUP ===================== */}
      <div
        className="sidebar-login"
        onClick={() => setOpenAuthMenu(!openAuthMenu)}
      >
        <div className="login-left">
          <div className="login-icon">
            <UserCircleIcon className="w-8 h-8" />
          </div>
          <div>
            <div className="login-text">Login / Signup</div>
            <div className="login-subtext">My Account</div>
          </div>
        </div>

        <div className="login-arrow">
          {openAuthMenu ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </div>
      </div>

      {/* ===== DROPDOWN ===== */}
      {openAuthMenu && (
        <div className="auth-dropdown">
          <div
            className="auth-item"
            onClick={() => (window.location.href = "/login")}
          >
            User Login
          </div>

          <div
            className="auth-item"
            onClick={() => (window.location.href = "/signup")}
          >
            Signup
          </div>

          <div
            className="auth-item"
            onClick={() => (window.location.href = "/admin")}
          >
            Admin Login
          </div>
        </div>
      )}

      {/* ===================== MAIN SECTION ===================== */}
      <div className="sidebar-section">
        <div
          className="sidebar-item"
          onClick={() => (window.location.href = "/")}
        >
          <span className="sidebar-icon"><HomeIcon className="w-6 h-6" /></span>
          <span className="sidebar-text">Home</span>
        </div>

        <div
          className="sidebar-item"
          onClick={() => (window.location.href = "/marketplace")}
        >
          <span className="sidebar-icon"><ShoppingCartIcon className="w-6 h-6" /></span>
          <span className="sidebar-text">Marketplace</span>
        </div>
      </div>

      {/* ===================== MY ACTIVITIES ===================== */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">MY ACTIVITIES</div>

        <div
          className="sidebar-item"
          onClick={() => (window.location.href = "/upload")}
        >
          <span className="sidebar-icon"><PlusCircleIcon className="w-6 h-6" /></span>
          <span className="sidebar-text">Sell Crop</span>
        </div>

        <div
          className="sidebar-item"
          onClick={() => (window.location.href = "/myads")}
        >
          <span className="sidebar-icon"><ClipboardDocumentListIcon className="w-6 h-6" /></span>
          <span className="sidebar-text">My Ads</span>
        </div>
      </div>

      {/* ===================== OTHER LINKS ===================== */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">OTHERS</div>

        <div className="sidebar-item">
          <span className="sidebar-icon"><MapPinIcon className="w-6 h-6" /></span>
          <span className="sidebar-text">All India</span>
        </div>

        <div className="sidebar-item">
          <span className="sidebar-icon"><InformationCircleIcon className="w-6 h-6" /></span>
          <span className="sidebar-text">About AgriConnect</span>
        </div>

        <div className="sidebar-item">
          <span className="sidebar-icon"><PhoneIcon className="w-6 h-6" /></span>
          <span className="sidebar-text">Contact Us</span>
        </div>
      </div>
    </aside>
  );
}
