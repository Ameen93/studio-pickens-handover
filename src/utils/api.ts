// Authenticated API client for admin operations
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const TOKEN_KEY = 'studio-pickens-auth-token';

/**
 * Get authentication token from localStorage
 */
function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Create authenticated request headers
 */
function createAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

/**
 * Handle API response and errors
 */
async function handleApiResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    // Handle authentication errors
    if (response.status === 401) {
      // Token expired or invalid, remove from localStorage
      localStorage.removeItem(TOKEN_KEY);
      window.location.reload(); // This will show login form
      throw new Error('Authentication required');
    }
    
    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Authenticated GET request
 */
export async function apiGet(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: createAuthHeaders(),
  });
  
  return handleApiResponse(response);
}

/**
 * Authenticated POST request
 */
export async function apiPost(endpoint: string, data: any) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: createAuthHeaders(),
    body: JSON.stringify(data),
  });
  
  return handleApiResponse(response);
}

/**
 * Authenticated PUT request
 */
export async function apiPut(endpoint: string, data: any) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: createAuthHeaders(),
    body: JSON.stringify(data),
  });
  
  return handleApiResponse(response);
}

/**
 * Authenticated DELETE request
 */
export async function apiDelete(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: createAuthHeaders(),
  });
  
  return handleApiResponse(response);
}

/**
 * Upload file with authentication
 */
export async function apiUpload(endpoint: string, file: File) {
  const token = getAuthToken();
  const formData = new FormData();
  formData.append('image', file);
  
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers,
    body: formData,
  });
  
  return handleApiResponse(response);
}

/**
 * Public API request (no authentication required)
 */
export async function publicApiGet(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  return handleApiResponse(response);
}

// Export for backward compatibility with existing code
export const api = {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  delete: apiDelete,
  upload: apiUpload,
  publicGet: publicApiGet,
};

export default api;