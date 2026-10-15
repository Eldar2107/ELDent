import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('eldent_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: (data) => api.post('/auth/login-json', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/me', data),
};

export const doctorsAPI = {
  getAll: (params) => api.get('/doctors/', { params }),
  getById: (id) => api.get(`/doctors/${id}`),
};

export const servicesAPI = {
  getAll: (params) => api.get('/services/', { params }),
  getById: (id) => api.get(`/services/${id}`),
};

export const appointmentsAPI = {
  getBookedSlots: (doctorId, date) => api.get('/appointments/booked-slots', {
    params: { doctor_id: doctorId, date }
  }),
  create: (data) => api.post('/appointments/', data),
  getMy: () => api.get('/appointments/my'),
  cancel: (id) => api.patch(`/appointments/${id}/cancel`),
};

export default api;
