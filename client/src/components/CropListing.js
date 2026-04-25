import React, { useState, useEffect } from 'react';
import './CropListing.css';

const CropListing = ({ searchTerm = '' }) => {
  const [crops, setCrops] = useState([]);
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    loadCrops();
    // Listen for storage changes to update when new crops are added
    window.addEventListener('storage', loadCrops);
    return () => window.removeEventListener('storage', loadCrops);
  }, []);

  const loadCrops = () => {
    const savedCrops = JSON.parse(localStorage.getItem('cropListings') || '[]');
    setCrops(savedCrops);
  };

  // Refresh crops when component mounts or when storage changes
  useEffect(() => {
    const interval = setInterval(loadCrops, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !filterLocation || crop.location.toLowerCase().includes(filterLocation.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const handleContact = (contact) => {
    window.open(`tel:${contact}`, '_self');
  };

  return (
    <div className="crop-listing-container">
      <div className="listing-header">
        <h1 className="listing-title">🌾 Browse Crop Listings</h1>
        <p className="listing-subtitle">Buy directly from farmers at fair prices</p>
      </div>

      {/* Filter Bar */}
      <div className="search-filter-bar">
        <div className="filter-box">
          <svg className="filter-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          <input
            type="text"
            placeholder="Filter by location..."
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        {filteredCrops.length > 0 ? (
          <p>Found {filteredCrops.length} {filteredCrops.length === 1 ? 'listing' : 'listings'}</p>
        ) : (
          <p>No listings found. Be the first to list your crop!</p>
        )}
      </div>

      {/* Crop Grid */}
      {filteredCrops.length > 0 ? (
        <div className="crop-grid">
          {filteredCrops.map(crop => (
            <div key={crop.id} className="crop-card">
              <div className="crop-image-container">
                {crop.image ? (
                  <img src={crop.image} alt={crop.cropName} className="crop-image" />
                ) : (
                  <div className="crop-image-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                )}
                <div className="crop-badge">New</div>
              </div>
              
              <div className="crop-card-content">
                <h3 className="crop-name">{crop.cropName}</h3>
                <p className="crop-location">📍 {crop.location}</p>
                <p className="crop-quantity">📦 {crop.quantity}</p>
                
                {crop.description && (
                  <p className="crop-description">{crop.description.substring(0, 80)}...</p>
                )}
                
                <div className="crop-footer">
                  <div className="crop-price">
                    <span className="price-amount">₹{crop.price}</span>
                    <span className="price-unit">/kg</span>
                  </div>
                  <button 
                    className="contact-btn"
                    onClick={() => handleContact(crop.contact)}
                  >
                    📞 Contact
                  </button>
                </div>
                
                <div className="crop-date">
                  Posted: {crop.datePosted}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="empty-icon">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <h3>No crops listed yet</h3>
          <p>Start by listing your first crop!</p>
        </div>
      )}
    </div>
  );
};

export default CropListing;

