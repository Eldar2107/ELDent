import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Check, X, CheckCheck, Filter } from 'lucide-react';
import { adminAPI } from '../services/api';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const loadAppointments = () => {
    setLoading(true);
    adminAPI.getAppointments(filterStatus ? { status_filter: filterStatus } : {})
      .then(res => setAppointments(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAppointments();
  }, [filterStatus]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await adminAPI.updateAppointmentStatus(id, newStatus);
      loadAppointments();
    } catch (err) {
      alert("Status yenilənərkən xəta baş verdi");
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bütün Randevular</h1>
          <p className="text-xs text-slate-500 mt-1">Gələn rezervasiya sorğuları və pasiyent qəbul statusları.</p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:outline-none"
          >
            <option value="">Bütün Statuslar</option>
            <option value="PENDING">Gözləmədə</option>
            <option value="CONFIRMED">Təsdiqlənmiş</option>
            <option value="CANCELLED">Ləğv edilmiş</option>
            <option value="COMPLETED">Tamamlanmış</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 text-xs">Yüklənir...</div>
        ) : appointments.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">Heç bir randevu tapılmadı.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="p-4">ID</th>
                  <th className="p-4">Pasiyent</th>
                  <th className="p-4">Həkim</th>
                  <th className="p-4">Xidmət</th>
                  <th className="p-4">Tarix & Saat</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Əməliyyat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.map(appt => (
                  <tr key={appt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono text-slate-400">#{appt.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{appt.user?.full_name || `İstifadəçi #${appt.user_id}`}</div>
                      <div className="text-[11px] text-slate-400">{appt.user?.phone_number || appt.user?.email}</div>
                    </td>
                    <td className="p-4 font-medium text-slate-800">{appt.doctor?.full_name}</td>
                    <td className="p-4">
                      <span className="font-semibold text-slate-800">{appt.service?.title}</span>
                      <span className="block text-[11px] text-sky-600 font-bold">{appt.service?.price} AZN</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 font-medium text-slate-700">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> {appt.appointment_date}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mt-0.5">
                        <Clock className="w-3.5 h-3.5" /> {appt.appointment_time}
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(appt.status)}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {appt.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(appt.id, 'CONFIRMED')}
                              title="Təsdiqlə"
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(appt.id, 'CANCELLED')}
                              title="İmtina et"
                              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {appt.status === 'CONFIRMED' && (
                          <button
                            onClick={() => handleStatusChange(appt.id, 'COMPLETED')}
                            title="Müayinəni tamamla"
                            className="px-2.5 py-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white text-[11px] font-semibold transition-colors flex items-center gap-1"
                          >
                            <CheckCheck className="w-3.5 h-3.5" /> Tamamla
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
