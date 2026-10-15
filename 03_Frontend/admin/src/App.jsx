import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import DashboardPage from './pages/DashboardPage';
import AppointmentsPage from './pages/AppointmentsPage';
import DoctorsAdminPage from './pages/DoctorsAdminPage';
import ServicesAdminPage from './pages/ServicesAdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="doctors" element={<DoctorsAdminPage />} />
          <Route path="services" element={<ServicesAdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
