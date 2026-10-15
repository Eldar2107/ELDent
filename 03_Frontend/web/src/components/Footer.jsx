import React from 'react';
import { Activity, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold font-heading text-white">EL<span className="text-sky-400">Dent</span></span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Müasir avadanlıqlar, təcrübəli stomatoloqlar və ağrısız müalicə üsulları ilə sağlam və parlaq təbəssümünüzün zəmanətiyik.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-base">Xidmətlərimiz</h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>Terapevtik Stomatologiya</li>
            <li>Ortodontiya & Breketlər</li>
            <li>İmplantasiya & Cərrahiyyə</li>
            <li>Estetik Diş Ağartma</li>
            <li>Uşaq Stomatologiyası</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-base">İş Saatları</h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-sky-400" /> B.e — Cümə: 09:00 - 20:00</li>
            <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-sky-400" /> Şənbə: 10:00 - 18:00</li>
            <li className="flex items-center gap-2 text-red-400"><Clock className="w-4 h-4" /> Bazar: İstirahət günü</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-base">Əlaqə</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2.5"><MapPin className="w-4 h-4 text-sky-400 shrink-0" /> Bakı şəh., Nizami küç. 142</li>
            <li className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-sky-400 shrink-0" /> +994 (12) 490 00 00</li>
            <li className="flex items-center gap-2.5"><Mail className="w-4 h-4 text-sky-400 shrink-0" /> info@eldent.az</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} ELDent Dental Clinic. Bütün hüquqlar qorunur.
      </div>
    </footer>
  );
}
