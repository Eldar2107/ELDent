import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Award, Calendar } from 'lucide-react';
import { doctorsAPI } from '../services/api';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Hamısı');

  useEffect(() => {
    doctorsAPI.getAll().then(res => setDoctors(res.data)).catch(console.error);
  }, []);

  const specialties = ['Hamısı', 'İmplantoloq', 'Ortodontist', 'Terapevt', 'Estetik'];

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.full_name.toLowerCase().includes(search.toLowerCase()) ||
                          doc.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'Hamısı' || doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 font-heading">Stomatoloqlarımız</h1>
          <p className="mt-2 text-slate-500 text-sm">Hər biri öz sahəsində ixtisaslaşmış peşəkar həkim komandamız.</p>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Həkim adı və ya ixtisas axtar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-white"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {specialties.map(spec => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedSpecialty === spec
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map(doc => (
            <div key={doc.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="h-56 overflow-hidden relative">
                  <img src={doc.avatar_url} alt={doc.full_name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-bold text-amber-500 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-500" /> {doc.rating}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900">{doc.full_name}</h3>
                  <p className="text-xs font-semibold text-sky-600 mt-0.5">{doc.specialty}</p>
                  <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">{doc.bio}</p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3 mb-4">
                  <span>Təcrübə:</span>
                  <span className="font-semibold text-slate-800">{doc.experience_years} il</span>
                </div>
                <Link
                  to={`/booking?doctorId=${doc.id}`}
                  className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" /> Randevu Götür
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
