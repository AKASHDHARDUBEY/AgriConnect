import React, { useState } from 'react';
import './App.css';
import CropUploadForm from './components/CropUploadForm';
import CropListing from './components/CropListing';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

function App() {
  const [currentView, setCurrentView] = useState('listings');
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCropAdded = () => {
    // Switch to listings view and refresh
    setCurrentView('listings');
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="App">
      {/* Top Navigation Header */}
      <nav className="app-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <h1>🌾 AgriConnect</h1>
          
          </div>
        </div>
      </nav>

      {/* Top Bar with Search */}
      {currentView === 'listings' && (
        <TopBar 
          currentView={currentView}
          setCurrentView={setCurrentView}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}

      {/* Main Layout with Sidebar */}
      <div className="app-layout">
        {/* Sidebar Navigation */}
        <Sidebar 
          currentView={currentView}
          setCurrentView={setCurrentView}
        />

        {/* Main Content */}
        <main className="app-main">
          {currentView === 'listings' ? (
            <CropListing key={refreshKey} searchTerm={searchTerm} />
          ) : (
            <CropUploadForm onCropAdded={handleCropAdded} />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2024 AgriConnect - Connecting Farmers, Buyers & Communities</p>
      </footer>
    </div>
  );
}

export default App;
