
import axios from 'axios';

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',  // Replace with your backend URL
  timeout: 5000,  // Timeout after 5 seconds (optional)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
