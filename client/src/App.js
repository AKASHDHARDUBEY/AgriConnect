// UPDATED PROFESSIONAL App.js (Routing + Layout + Clean UI)

import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

import CropUploadForm from './components/CropUploadForm';
import CropListing from './components/CropListing';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

// ------------------------------------------
// Layout wrapper for Sidebar + TopBar
// ------------------------------------------
function MainLayout({ children, searchTerm, setSearchTerm }) {
  return (
    <div className="app-layout">

      {/* Sidebar (fixed on left) */}
      <Sidebar />

      {/* Main content area */}
      <main className="app-main" style={{ marginLeft: 240 }}>
        <TopBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="app-content" style={{ padding: "1rem" }}>
          {children}
        </div>
      </main>

    </div>
  );
}

// ------------------------------------------
// MAIN APP
// ------------------------------------------
export default function App() {

  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleCropAdded = () => {
    setRefreshKey(prev => prev + 1);  // refresh listings
    navigate('/');                   // redirect to Home page
  };

  return (
    <div className="App">

      {/* Header (Can replace later with a professional Navbar component) */}
      <nav className="app-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <h1>🌾 AgriConnect</h1>
          </div>
        </div>
      </nav>

      {/* All Routes */}
      <Routes>

        {/* HOME PAGE (Listings) */}
        <Route 
          path="/" 
          element={
            <MainLayout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
              <CropListing key={refreshKey} searchTerm={searchTerm} />
            </MainLayout>
          }
        />

        {/* UPLOAD PAGE */}
        <Route 
          path="/upload" 
          element={
            <MainLayout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
              <CropUploadForm onCropAdded={handleCropAdded} />
            </MainLayout>
          }
        />

        {/* WILDCARD → Redirect to Home */}
        <Route 
          path="*"
          element={
            <MainLayout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
              <CropListing key={refreshKey} searchTerm={searchTerm} />
            </MainLayout>
          }
        />
      </Routes>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2024 AgriConnect - Connecting Farmers, Buyers & Communities</p>
      </footer>

    </div>
  );
}
