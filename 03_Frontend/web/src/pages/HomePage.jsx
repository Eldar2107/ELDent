import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Users, Calendar, ArrowRight, Star, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { doctorsAPI, servicesAPI } from '../services/api';

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80";

export default function HomePage() {
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    doctorsAPI.getAll().then(res => setDoctors(res.data.slice(0, 3))).catch(console.error);
    servicesAPI.getAll().then(res => setServices(res.data.slice(0, 4))).catch(console.error);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50/80 via-white to-teal-50/50 py-20 lg:py-28">
        {/* Decorative background glow circles */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none -z-10 animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none -z-10 animate-float-reverse" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Live Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200/80 text-sky-700 text-xs font-semibold mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-3.5 inline-block" />
                <span>Müasir & Ağrısız Stomatoloji Qəbul</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Sağlam Təbəssüm, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-teal-500 to-sky-700 animate-gradient">
                  Rahat və Zövqlü
                </span> Randevu.
              </h1>
              
              <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                ELDent ilə növbələrdə vaxt itirmədən peşəkar stomatoloqunuzu seçin, sizə uyğun tarixi təyin edin və sağlam təbəssümünüzə qovuşun.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold text-base shadow-lg shadow-sky-600/30 hover:shadow-xl hover:shadow-sky-600/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 group animate-pulse-glow"
                >
                  <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Onlayn Randevu Al
                </Link>
                <Link
                  to="/doctors"
                  className="px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  Həkimlərlə Tanış Ol <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/80">
                <div className="transform hover:scale-105 transition-transform">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">15,000+</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">Məmnun Pasiyent</div>
                </div>
                <div className="transform hover:scale-105 transition-transform">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">12+</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">Həkim Mütəxəssis</div>
                </div>
                <div className="transform hover:scale-105 transition-transform">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">99.4%</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">Müsbət Nəticə</div>
                </div>
              </div>
            </div>

            {/* Hero Image & Floating Cards */}
            <div className="relative">
              <div className="w-full h-[460px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-900/10">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern Dental Clinic"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Widget 1: Rating */}
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-float-slow">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base shadow-sm">
                  ★ 4.9
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Yüksək Xidmət Səviyyəsi</div>
                  <div className="text-xs text-slate-500">Google rəyləri əsasında</div>
                </div>
              </div>

              {/* Floating Widget 2: Painless Care */}
              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3 animate-float-reverse">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">100% Ağrısız Müalicə</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Premium Qayğı</span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-heading mt-1">Populyar Xidmətlərimiz</h2>
            <p className="mt-2 text-slate-500 text-sm">Ağız və diş sağlamlığınız üçün ən son texnologiyalarla təchiz olunmuş tam spektrli xidmətlər.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.id} className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/60 card-hover-effect group relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">{s.title}</h3>
                <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4">{s.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                  <span className="text-base font-extrabold text-sky-600">{s.price} AZN</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {s.duration_minutes} dəq
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 hover:translate-x-1 transition-all">
              Bütün xidmətləri nəzərdən keçir <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-20 bg-slate-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Ekspert Heyət</span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-heading mt-1">Peşəkar Həkim Komandamız</h2>
            <p className="mt-2 text-slate-500 text-sm">İllərlə təcrübəyə malik beynəlxalq dərəcəli stomatoloqlarımızla tanış olun.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doc) => (
              <div key={doc.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm card-hover-effect group flex flex-col justify-between">
                <div>
                  {/* Doctor Image Container with centered face positioning */}
                  <div className="h-72 overflow-hidden relative bg-slate-100">
                    <img
                      src={doc.avatar_url || DEFAULT_AVATAR}
                      alt={doc.full_name}
                      onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_AVATAR; }}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-500 flex items-center gap-1 shadow-md">
                      <Star className="w-3.5 h-3.5 fill-amber-500" /> {doc.rating}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{doc.full_name}</h3>
                    <p className="text-xs font-semibold text-sky-600 mt-0.5">{doc.specialty}</p>
                    <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">{doc.bio}</p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-400 font-medium">{doc.experience_years} il təcrübə</span>
                    <Link
                      to={`/booking?doctorId=${doc.id}`}
                      className="px-4 py-2.5 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white text-xs font-bold transition-all shadow-sm group-hover:shadow"
                    >
                      Randevu Götür
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
