import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { doctorsAPI, servicesAPI, appointmentsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  // Form states
  const [selectedDoctor, setSelectedDoctor] = useState(searchParams.get('doctorId') || '');
  const [selectedService, setSelectedService] = useState(searchParams.get('serviceId') || '');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    doctorsAPI.getAll().then(res => setDoctors(res.data)).catch(console.error);
    servicesAPI.getAll().then(res => setServices(res.data)).catch(console.error);
  }, []);

  // Fetch booked slots when doctor or date changes
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      appointmentsAPI.getBookedSlots(selectedDoctor, selectedDate)
        .then(res => setBookedSlots(res.data))
        .catch(console.error);
      setSelectedTime('');
    }
  }, [selectedDoctor, selectedDate]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      navigate('/auth?redirect=/booking');
      return;
    }

    if (!selectedDoctor || !selectedService || !selectedDate || !selectedTime) {
      setError('Zəhmət olmasa bütün vacib sahələri (həkim, xidmət, tarix və saat) doldurun.');
      return;
    }

    setSubmitting(true);
    try {
      await appointmentsAPI.create({
        doctor_id: parseInt(selectedDoctor),
        service_id: parseInt(selectedService),
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        notes: notes.trim() || undefined,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.detail || 'Rezervasiya zamanı xəta baş verdi. Yenidən cəhd edin.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="py-20 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading">Rezervasiya Uğurla Qəbul Olundu!</h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Randevunuz təsdiq üçün klinika administratoruna yönləndirildi. Şəxsi kabinetinizdə statusu izləyə bilərsiniz.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="w-full py-3 rounded-xl bg-sky-600 text-white font-semibold text-sm hover:bg-sky-700 transition-all shadow-sm"
            >
              Randevularıma Bax
            </button>
            <button
              onClick={() => { setSuccess(false); setSelectedTime(''); }}
              className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-all"
            >
              Yeni Randevu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 font-heading">Onlayn Randevu Rezervasiyası</h1>
          <p className="mt-2 text-slate-500 text-sm">Həkim, xidmət və sizə uyğun vaxtı seçərək asanlıqla qeydiyyatdan keçin.</p>
        </div>

        <form onSubmit={handleBooking} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          {/* 1. Həkim seçimi */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">1. Həkimi Seçin *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {doctors.map(doc => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                    selectedDoctor == doc.id
                      ? 'border-sky-600 bg-sky-50/50 ring-2 ring-sky-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={doc.avatar_url} alt={doc.full_name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{doc.full_name}</h4>
                    <p className="text-xs text-sky-600">{doc.specialty}</p>
                    <span className="text-[11px] text-slate-400">★ {doc.rating} reytinq</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Xidmət seçimi */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">2. Xidməti Seçin *</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 bg-white"
            >
              <option value="">-- Xidməti seçin --</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.price} AZN - {s.duration_minutes} dəq)
                </option>
              ))}
            </select>
          </div>

          {/* 3. Tarix & Saat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">3. Tarix *</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">4. Müsait Saatlar *</label>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map(slot => {
                  const isBooked = bookedSlots.includes(slot);
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      type="button"
                      key={slot}
                      disabled={isBooked}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                        isBooked
                          ? 'bg-slate-100 text-slate-400 border-slate-200 line-through cursor-not-allowed'
                          : isSelected
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-sky-500 hover:text-sky-600'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. Əlavə Qeyd */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Əlavə Qeydlər və ya Şikayətiniz</label>
            <textarea
              rows={3}
              placeholder="Məsələn: Sağ alt azı dişimdə kəskin ağrı var..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-lg shadow-sky-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {submitting ? 'Göndərilir...' : 'Rezervasiyanı Təsdiqlə'}
          </button>
        </form>
      </div>
    </div>
  );
}
