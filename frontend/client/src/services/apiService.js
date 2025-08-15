// TirthConstruction/frontend/client/src/services/apiService.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
});
export const googleLogin = `${apiClient.defaults.baseURL}/auth/google`;

// --- Existing Functions ---
export const fetchProjects = () => apiClient.get('/projects/');
export const fetchProjectById = (id) => apiClient.get(`/projects/${id}`);
export const fetchContractors = () => apiClient.get('/contractors/');
export const fetchEvents = () => apiClient.get('/events/');
export const fetchStatuses = () => apiClient.get('/statuses/');
export const fetchTypesOfWork = () => apiClient.get('/work-types/');
export const submitContactForm = (formData) => apiClient.post('/contact/submit', formData);
export const loginUser = (credentials) => apiClient.post('/auth/login', credentials);
export const requestPasswordOtp = (data) => apiClient.post('/auth/forgot-password', data);
export const verifyPasswordOtp = (data) => apiClient.post('/auth/verify-otp', data);
export const resetPassword = (data) => apiClient.post('/auth/reset-password', data);