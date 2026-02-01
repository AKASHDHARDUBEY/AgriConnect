import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import {
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // DARK MODE STATE
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch {
      return false;
    }
  });

  // APPLY THEME ON LOAD + WHEN CHANGED
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <div
          className="navbar-logo"
          onClick={() => navigate("/")}
        >
          {/* Logo Icon using an SVG or Image if preferred, or just styled text */}
          <div className="logo-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="logo-icon-svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          </div>
          <span className="logo-text">AgriConnect</span>
        </div>

        {/* DESKTOP NAV LINKS */}
        <nav className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>

          {/* MARKETPLACE DROPDOWN */}
          <div className="nav-dropdown-container">
            <Link to="/marketplace" className="nav-link dropdown-trigger">
              Marketplace <ChevronDownIcon className="w-4 h-4" />
            </Link>
            <div className="nav-dropdown-menu">
              <Link to="/marketplace" className="dropdown-item">All Products</Link>
              <Link to="/marketplace?category=Vegetables" className="dropdown-item">Vegetables</Link>
              <Link to="/marketplace?category=Fruits" className="dropdown-item">Fruits</Link>
              <Link to="/marketplace?category=Cereals" className="dropdown-item">Cereals</Link>
              <Link to="/marketplace?category=Pulses" className="dropdown-item">Pulses</Link>
            </div>
          </div>
          <Link to="/farm" className="nav-link">Farmer Dashboard</Link>
          {user ? (
            <div className="nav-user-menu">
              <span className="user-name">Hello, {user.name?.split(' ')[0]}</span>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}

          <Link to="/upload" className="sell-btn">+ Sell Crop</Link>

          {/* DARK MODE TOGGLE */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {isDark ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
          </button>
        </nav>

        {/* MOBILE MENU ICON */}
        <div
          className="mobile-menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
        </div>

      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="mobile-dropdown">
          <Link to="/" onClick={() => setMenuOpen(false)} className="mobile-link">Home</Link>
          <Link to="/marketplace" onClick={() => setMenuOpen(false)} className="mobile-link">Marketplace</Link>
          <Link to="/farm" onClick={() => setMenuOpen(false)} className="mobile-link">Farmer Dashboard</Link>
          <Link to="/upload" onClick={() => setMenuOpen(false)} className="mobile-sell-btn">+ Sell Crop</Link>

          {user ? (
            <>
              <div className="mobile-link user-mobile-link">
                <UserCircleIcon className="w-5 h-5 inline-block mr-2" />
                {user.name}
              </div>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="mobile-link mobile-logout"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="mobile-link">Login</Link>
          )}

          {/* Mobile Dark mode toggle */}
          <button
            className="mobile-theme-toggle"
            onClick={() => { toggleTheme(); setMenuOpen(false); }}
          >
            {isDark ? (
              <> <MoonIcon className="w-5 h-5 mr-2" /> Dark Mode </>
            ) : (
              <> <SunIcon className="w-5 h-5 mr-2" /> Light Mode </>
            )}
          </button>
        </div>
      )}

    </header>
  );
}

