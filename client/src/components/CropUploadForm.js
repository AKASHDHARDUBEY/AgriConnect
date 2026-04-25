import React, { useState } from 'react';
import './CropUploadForm.css';

const CropUploadForm = ({ onCropAdded }) => {
  const [formData, setFormData] = useState({
    cropName: '',
    price: '',
    quantity: '',
    description: '',
    location: '',
    contact: '',
    image: null,
    imagePreview: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      alert('Please upload a crop image');
      return;
    }

    setIsSubmitting(true);

    // Create a new crop listing object
    const newCrop = {
      id: Date.now(),
      cropName: formData.cropName,
      price: formData.price,
      quantity: formData.quantity,
      description: formData.description,
      location: formData.location,
      contact: formData.contact,
      image: formData.imagePreview, // In real app, upload to server and get URL
      datePosted: new Date().toLocaleDateString()
    };

    // Save to localStorage (in real app, this would be an API call)
    const existingCrops = JSON.parse(localStorage.getItem('cropListings') || '[]');
    existingCrops.push(newCrop);
    localStorage.setItem('cropListings', JSON.stringify(existingCrops));

    // Reset form
    setFormData({
      cropName: '',
      price: '',
      quantity: '',
      description: '',
      location: '',
      contact: '',
      image: null,
      imagePreview: null
    });

    setIsSubmitting(false);
    
    // Notify parent component
    if (onCropAdded) {
      onCropAdded();
    }

    alert('Crop listing added successfully!');
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
  };

  return (
    <div className="crop-upload-container">
      <div className="crop-upload-card">
        <h2 className="upload-title">📤 List Your Crop</h2>
        <p className="upload-subtitle">Sell directly to buyers and get fair prices</p>
        
        <form onSubmit={handleSubmit} className="crop-upload-form">
          {/* Image Upload Section */}
          <div className="form-section">
            <label className="form-label">
              Crop Image <span className="required">*</span>
            </label>
            <div className="image-upload-area">
              {formData.imagePreview ? (
                <div className="image-preview-container">
                  <img 
                    src={formData.imagePreview} 
                    alt="Crop preview" 
                    className="image-preview"
                  />
                  <button 
                    type="button" 
                    onClick={removeImage}
                    className="remove-image-btn"
                  >
                    ✕ Remove
                  </button>
                </div>
              ) : (
                <label className="image-upload-label">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-input"
                  />
                  <div className="upload-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <p>Click to upload crop image</p>
                    <span>PNG, JPG up to 5MB</span>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Crop Details */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Crop Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="cropName"
                value={formData.cropName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., Wheat, Rice, Tomatoes"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Price (₹ per kg/unit) <span className="required">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 50"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Quantity Available <span className="required">*</span>
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 100 kg, 50 bags"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Location <span className="required">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., Village, District, State"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Contact Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="form-input"
              placeholder="e.g., +91 9876543210"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Add details about quality, organic status, harvest date, etc."
              rows="4"
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Publishing...' : '📢 Publish Listing'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CropUploadForm;


