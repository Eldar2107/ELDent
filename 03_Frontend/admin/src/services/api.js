import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('eldent_admin_token') || localStorage.getItem('eldent_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminAPI = {
  getStats: () => api.get('/admin/dashboard-stats'),
  getAppointments: (params) => api.get('/admin/appointments', { params }),
  updateAppointmentStatus: (id, status) => api.patch(`/admin/appointments/${id}/status`, { status }),
  // Doctors
  getDoctors: () => api.get('/doctors/'),
  createDoctor: (data) => api.post('/doctors/', data),
  updateDoctor: (id, data) => api.put(`/doctors/${id}`, data),
  deleteDoctor: (id) => api.delete(`/doctors/${id}`),
  // Services
  getServices: () => api.get('/services/', { params: { active_only: false } }),
  createService: (data) => api.post('/services/', data),
  updateService: (id, data) => api.put(`/services/${id}`, data),
  deleteService: (id) => api.delete(`/services/${id}`),
};

export default api;
