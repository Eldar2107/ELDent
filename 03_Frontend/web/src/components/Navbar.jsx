import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, User, LogOut, Activity, PhoneCall } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold font-heading text-slate-900 tracking-tight">EL<span className="text-sky-600">Dent</span></span>
            <span className="block text-[10px] uppercase tracking-wider font-semibold text-slate-400">Dental Clinic</span>
          </div>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Ana Səhifə</Link>
          <Link to="/doctors" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Həkimlərimiz</Link>
          <Link to="/services" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Xidmətlər</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/booking"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium shadow-sm transition-all"
          >
            <Calendar className="w-4 h-4" />
            Randevu Al
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-all"
              >
                <User className="w-4 h-4 text-sky-600" />
                <span className="hidden sm:inline">{user?.full_name?.split(' ')[0]}</span>
              </Link>
              <button
                onClick={handleLogout}
                title="Çıxış"
                className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="px-4 py-2 text-sm font-medium text-sky-600 hover:bg-sky-50 rounded-lg transition-colors border border-sky-200"
            >
              Giriş / Qeydiyyat
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
