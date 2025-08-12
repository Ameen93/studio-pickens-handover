// API Configuration
// This file centralizes all API endpoint configuration

// Get API base URL from environment variable
// In development: http://localhost:3001
// In production: https://api.yourdomain.com
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

// API Endpoints
export const API_ENDPOINTS = {
  // Health check
  health: `${API_BASE_URL}/api/health`,
  
  // Content endpoints
  hero: `${API_BASE_URL}/api/hero`,
  work: `${API_BASE_URL}/api/work`,
  process: `${API_BASE_URL}/api/process`,
  story: `${API_BASE_URL}/api/story`,
  locations: `${API_BASE_URL}/api/locations`,
  contact: `${API_BASE_URL}/api/contact`,
  faq: `${API_BASE_URL}/api/faq`,
  
  // File management
  upload: `${API_BASE_URL}/api/upload`,
  images: `${API_BASE_URL}/api/images`,
  
  // Individual operations
  workProject: (id) => `${API_BASE_URL}/api/work/${id}`,
  faqItem: (id) => `${API_BASE_URL}/api/faq/${id}`,
  processStep: (id) => `${API_BASE_URL}/api/process/steps/${id}`,
  processSteps: `${API_BASE_URL}/api/process/steps`,
};

// Helper function for fetch with error handling
export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Helper for GET requests
export const apiGet = (endpoint) => apiRequest(endpoint);

// Helper for POST requests
export const apiPost = (endpoint, data) => apiRequest(endpoint, {
  method: 'POST',
  body: JSON.stringify(data),
});

// Helper for PUT requests
export const apiPut = (endpoint, data) => apiRequest(endpoint, {
  method: 'PUT',
  body: JSON.stringify(data),
});

// Helper for DELETE requests
export const apiDelete = (endpoint) => apiRequest(endpoint, {
  method: 'DELETE',
});

export default API_ENDPOINTS;