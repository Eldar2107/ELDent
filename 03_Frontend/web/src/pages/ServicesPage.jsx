import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, CheckCircle2, Calendar } from 'lucide-react';
import { servicesAPI } from '../services/api';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Hamısı');

  useEffect(() => {
    servicesAPI.getAll().then(res => setServices(res.data)).catch(console.error);
  }, []);

  const categories = ['Hamısı', 'Müayinə', 'Terapevtik', 'Gigiyena', 'Cərrahiyyə', 'Estetik'];

  const filteredServices = services.filter(s => {
    return activeCategory === 'Hamısı' || s.category === activeCategory;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 font-heading">Stomatoloji Xidmətlərimiz</h1>
          <p className="mt-2 text-slate-500 text-sm">Geniş profilli profilaktik, terapevtik və estetik diş müalicələri.</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(s => (
            <div key={s.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-600">
                    {s.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {s.duration_minutes} dəq
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">{s.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Qiymət</span>
                  <span className="text-xl font-extrabold text-slate-900">{s.price} <span className="text-xs font-normal text-slate-500">AZN</span></span>
                </div>
                <Link
                  to={`/booking?serviceId=${s.id}`}
                  className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" /> Randevu Al
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
