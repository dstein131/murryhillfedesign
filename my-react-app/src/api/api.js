import axios from 'axios';

// Create an Axios instance with the correct baseURL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://maindb-a2dugpdndze5d9br.canadacentral-01.azurewebsites.net', // Include 'https://'
  headers: {
    'Content-Type': 'application/json',
  },
});

// Debugging: Log the baseURL to ensure it's correct
console.log('API Base URL:', api.defaults.baseURL);

// Add a request interceptor to include JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response, // Simply return the response if successful
  (error) => {
    if (error.response) {
      // Handle common errors (e.g., 401 Unauthorized)
      if (error.response.status === 401 && window.location.pathname !== '/login') {
        console.error('Unauthorized: Invalid token');
        // Redirect only if not already on the login page
        window.location.href = '/login';
      }
    } else {
      console.error('Network/Server error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
