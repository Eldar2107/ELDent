import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Clock, DollarSign, X } from 'lucide-react';
import { adminAPI } from '../services/api';

export default function ServicesAdminPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 30.0,
    duration_minutes: 30,
    category: 'Ümumi',
    is_active: true
  });

  const loadServices = () => {
    setLoading(true);
    adminAPI.getServices()
      .then(res => setServices(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.createService({
        ...formData,
        price: parseFloat(formData.price),
        duration_minutes: parseInt(formData.duration_minutes)
      });
      setShowModal(false);
      setFormData({ title: '', description: '', price: 30.0, duration_minutes: 30, category: 'Ümumi', is_active: true });
      loadServices();
    } catch (err) {
      alert("Xidmət əlavə edilərkən xəta baş verdi");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu xidməti silmək istədiyinizə əminsiniz?")) {
      try {
        await adminAPI.deleteService(id);
        loadServices();
      } catch (err) {
        alert("Silinmə xətası");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Xidmətlər & Tariflər</h1>
          <p className="text-xs text-slate-500 mt-1">Klinikanın təklif etdiyi prosedurlar və qiymət cədvəli.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Yeni Xidmət Yarat
        </button>
      </div>

      {/* Services List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 text-xs">Yüklənir...</div>
        ) : (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="p-4">Xidmət Adı</th>
                <th className="p-4">Kateqoriya</th>
                <th className="p-4">Müddət</th>
                <th className="p-4">Qiymət</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Sil</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{s.title}</div>
                    <div className="text-[11px] text-slate-400 max-w-sm line-clamp-1">{s.description}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-sky-50 text-sky-700">
                      {s.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">
                    {s.duration_minutes} dəq
                  </td>
                  <td className="p-4 font-bold text-emerald-600">
                    {s.price} AZN
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      s.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {s.is_active ? 'Aktiv' : 'Passiv'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Yeni Xidmət Əlavə Et</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Xidmətin Adı</label>
                <input
                  type="text"
                  required
                  placeholder="Məs. Zirkon Tac qoyulması"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Qiymət (AZN)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Müddət (Dəq)</label>
                  <input
                    type="number"
                    value={formData.duration_minutes}
                    onChange={e => setFormData({ ...formData, duration_minutes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kateqoriya</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500 bg-white"
                >
                  <option value="Müayinə">Müayinə</option>
                  <option value="Terapevtik">Terapevtik</option>
                  <option value="Gigiyena">Gigiyena</option>
                  <option value="Cərrahiyyə">Cərrahiyyə</option>
                  <option value="Estetik">Estetik</option>
                  <option value="Ortodontiya">Ortodontiya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Təsvir</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
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
                  Əlavə et
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
