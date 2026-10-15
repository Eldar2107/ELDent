import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Users, Calendar, ArrowRight, Star, Clock } from 'lucide-react';
import { doctorsAPI, servicesAPI } from '../services/api';

export default function HomePage() {
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    doctorsAPI.getAll().then(res => setDoctors(res.data.slice(0, 3))).catch(console.error);
    servicesAPI.getAll().then(res => setServices(res.data.slice(0, 4))).catch(console.error);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold mb-6">
                <ShieldCheck className="w-4 h-4" /> Müasir & Təhlükəsiz Stomatologiya
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Sağlam Təbəssüm, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-teal-500">
                  Rahat və Ağrısız
                </span> Randevu.
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                ELDent ilə növbələrdə vaxt itirmədən peşəkar stomatoloqunuzu seçin, sizə uyğun tarixi təyin edin və sağlam təbəssümünüzə qovuşun.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  className="px-8 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-base shadow-lg shadow-sky-600/25 transition-all flex items-center gap-2"
                >
                  <Calendar className="w-5 h-5" /> Onlayn Randevu Al
                </Link>
                <Link
                  to="/doctors"
                  className="px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200 shadow-sm transition-all flex items-center gap-2"
                >
                  Həkimlərlə Tanış Ol <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                <div>
                  <div className="text-2xl font-bold text-slate-900">15,000+</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">Məmnun Pasiyent</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">12+</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">Həkim Mütəxəssis</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">99.4%</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">Müsbət Nəticə</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="w-full h-[460px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-900/10">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern Dental Clinic"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  ★ 4.9
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Yüksək Xidmət Səviyyəsi</div>
                  <div className="text-xs text-slate-500">Google rəyləri əsasında</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 font-heading">Populyar Xidmətlərimiz</h2>
            <p className="mt-3 text-slate-500 text-sm">Ağız və diş sağlamlığınız üçün ən son texnologiyalarla təchiz olunmuş tam spektrli xidmətlər.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.id} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-sky-200 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4">{s.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                  <span className="text-base font-bold text-sky-600">{s.price} AZN</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {s.duration_minutes} dəq
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700">
              Bütün xidmətləri nəzərdən keçir <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 font-heading">Peşəkar Həkim Komandamız</h2>
            <p className="mt-3 text-slate-500 text-sm">İllərlə təcrübəyə malik beynəlxalq dərəcəli stomatoloqlarımızla tanış olun.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doc) => (
              <div key={doc.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
                <div className="h-64 overflow-hidden relative">
                  <img src={doc.avatar_url} alt={doc.full_name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-500 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500" /> {doc.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900">{doc.full_name}</h3>
                  <p className="text-xs font-semibold text-sky-600 mt-0.5">{doc.specialty}</p>
                  <p className="text-xs text-slate-500 mt-3 line-clamp-2">{doc.bio}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">{doc.experience_years} il təcrübə</span>
                    <Link
                      to={`/booking?doctorId=${doc.id}`}
                      className="px-4 py-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white text-xs font-semibold transition-all"
                    >
                      Randevu Gotür
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
