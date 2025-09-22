import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://tirthconstruction.onrender.com/api',
});

// This function runs before any request is sent
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
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
// Admin routes
export const getAdminSummary = () => apiClient.get('/admin/dashboard-summary');

// Contractor routes
export const getMyProjects = () => apiClient.get('/contractor-dashboard/my-projects');
export const updateMyProfile = (profileData) => apiClient.put('/contractor-dashboard/my-profile', profileData);
export const getCurrentUser = () => apiClient.get('/dashboard/user');
export const updateAccountDetails = (accountData) => apiClient.put('/user/account', accountData);
export const changePassword = (passwordData) => apiClient.put('/user/change-password', passwordData);
export const adminGetAllUsers = () => apiClient.get('/admin/users');
export const adminUpdateUserRole = (id, role) => apiClient.put(`/admin/users/${id}/role`, { role });
export const adminUpdateUser = (id, userData) => apiClient.put(`/admin/users/${id}`, userData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const adminDeleteUser = (id) => apiClient.delete(`/admin/users/${id}`);
export const adminCreateUser = (userData) => apiClient.post('/admin/users', userData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const adminDeleteProject = (id) => apiClient.delete(`/projects/delete/${id}`);
export const adminCreateProject = (projectData) => apiClient.post('/projects/add', projectData);
export const uploadDisplayPicture = (formData) => apiClient.post('/contractor-dashboard/upload-dp', formData, {headers: {'Content-Type': 'multipart/form-data'}});
export const uploadFullImage = (formData) => apiClient.post('/contractor-dashboard/upload-full-image', formData, {headers: {'Content-Type': 'multipart/form-data'}});
export const requestVerificationOtp = (field, value) => apiClient.post('/user/request-verification', { field, value });
export const confirmVerificationOtp = (otp) => apiClient.post('/user/confirm-verification', { otp });
export const checkUsernameAvailability = (username) => apiClient.post('/user/check-username', { username });
export const unlinkGoogleAccount = () => apiClient.put('/user/unlink-google');
export const resetPasswordWithOtp = (data) => apiClient.post('/auth/reset-with-otp', data);
