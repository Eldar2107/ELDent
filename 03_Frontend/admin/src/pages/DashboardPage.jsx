import React, { useEffect, useState } from 'react';
import { Users, Calendar, DollarSign, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { adminAPI } from '../services/api';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getStats()
      .then(res => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-slate-500 text-sm">Göstəricilər yüklənir...</div>;
  }

  const statCards = [
    { title: 'Ümumi Pasiyentlər', value: stats?.total_patients || 0, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { title: 'Aktiv Randevular', value: stats?.total_appointments || 0, icon: Calendar, color: 'text-sky-600 bg-sky-50' },
    { title: 'Gözləmədə Olanlar', value: stats?.pending_count || 0, icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { title: 'Təsdiqlənmiş Qəbullar', value: stats?.confirmed_count || 0, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Ləğv Edilənlər', value: stats?.cancelled_count || 0, icon: XCircle, color: 'text-red-600 bg-red-50' },
    { title: 'Təxmini Gəlir', value: `${stats?.estimated_revenue_azn || 0} AZN`, icon: DollarSign, color: 'text-teal-600 bg-teal-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Klinika İcmalı</h1>
        <p className="text-xs text-slate-500 mt-1">Gündəlik qəbul axını, pasiyent sayı və gəlir hesabatı.</p>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{card.title}</p>
                <p className="text-2xl font-extrabold text-slate-900 mt-2">{card.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick notice banner */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-sky-900">Gözləmədə Olan Randevular Var</h4>
          <p className="text-xs text-sky-700 mt-1 leading-relaxed">
            Pasiyentlər tərəfindən göndərilmiş {stats?.pending_count || 0} ədəd randevu təsdiq gözləyir. "Randevular" bölməsinə keçərək onları təsdiqləyə və ya redaktə edə bilərsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
