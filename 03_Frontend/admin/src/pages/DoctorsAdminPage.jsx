import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Star, Check, X } from 'lucide-react';
import { adminAPI } from '../services/api';

export default function DoctorsAdminPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    specialty: '',
    experience_years: 5,
    bio: '',
    rating: 5.0,
    avatar_url: '',
    is_available: true
  });

  const loadDoctors = () => {
    setLoading(true);
    adminAPI.getDoctors()
      .then(res => setDoctors(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.createDoctor({
        ...formData,
        experience_years: parseInt(formData.experience_years),
        rating: parseFloat(formData.rating),
        avatar_url: formData.avatar_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'
      });
      setShowModal(false);
      setFormData({ full_name: '', specialty: '', experience_years: 5, bio: '', rating: 5.0, avatar_url: '', is_available: true });
      loadDoctors();
    } catch (err) {
      alert("Həkim əlavə edilərkən xəta baş verdi");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu həkimi silmək istədiyinizə əminsiniz?")) {
      try {
        await adminAPI.deleteDoctor(id);
        loadDoctors();
      } catch (err) {
        alert("Silinmə xətası");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Həkimlər İdarəetməsi</h1>
          <p className="text-xs text-slate-500 mt-1">Klinikanın tibbi heyətinin tənzimlənməsi və yeni mütəxəssis əlavəsi.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Yeni Həkim Əlavə Et
        </button>
      </div>

      {/* Grid of doctors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map(doc => (
          <div key={doc.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-start gap-4">
              <img src={doc.avatar_url} alt={doc.full_name} className="w-16 h-16 rounded-2xl object-cover shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">{doc.full_name}</h4>
                <p className="text-xs text-sky-600 font-medium">{doc.specialty}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span>★ {doc.rating}</span>
                  <span>&bull;</span>
                  <span>{doc.experience_years} il təcrübə</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-xl">
              {doc.bio || "Həkim haqqında əlavə qeyd daxil edilməyib."}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                doc.is_available ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {doc.is_available ? 'Qəbuldadır' : 'Qeyri-aktiv'}
              </span>

              <button
                onClick={() => handleDelete(doc.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Həkimi sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Yeni Həkim Qeydiyyatı</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Həkimin Ad və Soyadı</label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Əli Quliyev"
                  value={formData.full_name}
                  onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">İxtisası</label>
                <input
                  type="text"
                  required
                  placeholder="Ortodontist / Cərrah / Terapevt"
                  value={formData.specialty}
                  onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Təcrübə (il)</label>
                  <input
                    type="number"
                    value={formData.experience_years}
                    onChange={e => setFormData({ ...formData, experience_years: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Reytinq (0 - 5)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.rating}
                    onChange={e => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Avatar Şəkil URL-i</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.avatar_url}
                  onChange={e => setFormData({ ...formData, avatar_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bio / Təsvir</label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700"
                >
                  Yadda saxla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
