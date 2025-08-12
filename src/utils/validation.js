// Validation utilities for data integrity

/**
 * Validates location data for completeness and correctness
 * @param {Object} location - Location object to validate
 * @param {string} location.location - Location name (required)
 * @param {string} location.address - Address with line breaks (required)
 * @param {string} location.mapsUrl - Google Maps URL (required)
 * @param {string} location.imagePath - Image file path (required)
 * @param {string} location.imageAlt - Image alt text for accessibility (required)
 * @returns {Object} Validation result with isValid boolean and errors array
 */
export const validateLocationData = (location) => {
  const errors = [];
  
  // Required fields validation
  if (!location.location || typeof location.location !== 'string' || location.location.trim().length === 0) {
    errors.push('Location name is required and must be a non-empty string');
  }
  
  if (!location.address || typeof location.address !== 'string' || location.address.trim().length === 0) {
    errors.push('Address is required and must be a non-empty string');
  }
  
  if (!location.mapsUrl || typeof location.mapsUrl !== 'string') {
    errors.push('Maps URL is required and must be a string');
  }
  
  // URL format validation
  if (location.mapsUrl && !isValidGoogleMapsUrl(location.mapsUrl)) {
    errors.push('Maps URL must be a valid Google Maps URL');
  }
  
  // Address format validation
  if (location.address) {
    const addressLines = location.address.split('\n').filter(line => line.trim().length > 0);
    if (addressLines.length < 2) {
      errors.push('Address must contain at least 2 lines (street, city/country)');
    }
  }
  
  // Image validation
  if (!location.imagePath || typeof location.imagePath !== 'string' || location.imagePath.trim().length === 0) {
    errors.push('Image path is required and must be a non-empty string');
  }
  
  if (!location.imageAlt || typeof location.imageAlt !== 'string' || location.imageAlt.trim().length === 0) {
    errors.push('Image alt text is required for accessibility');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validates if a URL is a properly formatted Google Maps URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid Google Maps URL, false otherwise
 */
export const isValidGoogleMapsUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'maps.google.com' && urlObj.searchParams.has('q');
  } catch (e) {
    return false;
  }
};

/**
 * Validates contact form data for completeness and format
 * @param {Object} data - Contact form data to validate
 * @param {string} data.name - User's name (required, 2-100 chars)
 * @param {string} data.email - User's email address (required, valid format)
 * @param {string} data.message - User's message (required, 10-2000 chars)
 * @param {string} [data.company] - User's company (optional, max 200 chars)
 * @returns {Object} Validation result with isValid boolean and errors array
 */
export const validateContactData = (data) => {
  const errors = [];
  
  // Name validation
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required');
  } else if (data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (data.name.trim().length > 100) {
    errors.push('Name must be less than 100 characters');
  }
  
  // Email validation
  if (!data.email || typeof data.email !== 'string' || data.email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }
  
  // Message validation
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    errors.push('Message is required');
  } else if (data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  } else if (data.message.trim().length > 2000) {
    errors.push('Message must be less than 2000 characters');
  }
  
  // Company validation (optional but if provided, must be valid)
  if (data.company && typeof data.company === 'string' && data.company.trim().length > 200) {
    errors.push('Company name must be less than 200 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validates email address format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format, false otherwise
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim().toLowerCase());
};

/**
 * Validates consistency across multiple locations (no duplicates, all valid)
 * @param {Array<Object>} locations - Array of location objects to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
export const validateLocationConsistency = (locations) => {
  const errors = [];
  const locationNames = new Set();
  const mapsUrls = new Set();
  
  locations.forEach((location, index) => {
    // Check for duplicate location names
    if (locationNames.has(location.location)) {
      errors.push(`Duplicate location name "${location.location}" at index ${index}`);
    } else {
      locationNames.add(location.location);
    }
    
    // Check for duplicate maps URLs
    if (mapsUrls.has(location.mapsUrl)) {
      errors.push(`Duplicate maps URL "${location.mapsUrl}" at index ${index}`);
    } else {
      mapsUrls.add(location.mapsUrl);
    }
    
    // Validate individual location
    const validation = validateLocationData(location);
    if (!validation.isValid) {
      errors.push(`Location "${location.location}" has errors: ${validation.errors.join(', ')}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};