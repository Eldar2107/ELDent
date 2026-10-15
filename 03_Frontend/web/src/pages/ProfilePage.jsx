import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, Clock, AlertCircle, XCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { appointmentsAPI } from '../services/api';

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [loading, isAuthenticated, navigate]);

  const loadAppointments = () => {
    appointmentsAPI.getMy()
      .then(res => setAppointments(res.data))
      .catch(console.error)
      .finally(() => setFetchLoading(false));
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAppointments();
    }
  }, [isAuthenticated]);

  const handleCancel = async (id) => {
    if (window.confirm("Bu randevunu ləğv etmək istədiyinizə əminsiniz?")) {
      try {
        await appointmentsAPI.cancel(id);
        loadAppointments();
      } catch (err) {
        alert(err.response?.data?.detail || "Randevu ləğv edilərkən xəta baş verdi");
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Təsdiqləndi</span>;
      case 'CANCELLED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Ləğv edildi</span>;
      case 'COMPLETED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700">Tamamlandı</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">Gözləmədə</span>;
    }
  };

  if (loading || fetchLoading) {
    return <div className="py-20 text-center text-slate-500">Yüklənir...</div>;
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* User Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-2xl">
            {user?.full_name?.charAt(0)}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-slate-900 font-heading">{user?.full_name}</h1>
            <p className="text-slate-500 text-sm mt-0.5">{user?.email}</p>
            <p className="text-slate-500 text-xs mt-1">Əlaqə: {user?.phone_number || "Qeyd edilməyib"}</p>
          </div>
          {user?.is_admin && (
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all"
            >
              Admin Panelə Keçid
            </a>
          )}
        </div>

        {/* Appointments Section */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-heading mb-4">Rezervasiya Tarixçəniz</h2>
          {appointments.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500">
              Hələ heç bir randevunuz yoxdur.
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map(appt => (
                <div key={appt.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-base font-bold text-slate-900">{appt.service?.title}</h4>
                        {getStatusBadge(appt.status)}
                      </div>
                      <p className="text-xs text-sky-600 font-medium mt-1">Həkim: {appt.doctor?.full_name}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                        <span className="flex items-center gap-1 font-medium"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {appt.appointment_date}</span>
                        <span className="flex items-center gap-1 font-medium"><Clock className="w-3.5 h-3.5 text-slate-400" /> {appt.appointment_time}</span>
                      </div>
                      {appt.notes && (
                        <p className="text-xs text-slate-400 mt-2 bg-slate-50 p-2 rounded-lg italic">
                          " {appt.notes} "
                        </p>
                      )}
                    </div>
                  </div>

                  {appt.status === 'PENDING' && (
                    <button
                      onClick={() => handleCancel(appt.id)}
                      className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-all"
                    >
                      Ləğv Et
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
