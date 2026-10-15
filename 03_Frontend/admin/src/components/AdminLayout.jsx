import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, CalendarCheck, UserCheck, Stethoscope, LogOut, Activity } from 'lucide-react';

export default function AdminLayout() {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Randevular', path: '/appointments', icon: CalendarCheck },
    { name: 'Həkimlər', path: '/doctors', icon: UserCheck },
    { name: 'Xidmətlər', path: '/services', icon: Stethoscope },
  ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo */}
          <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-white">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">EL<span className="text-sky-400">Dent</span></span>
              <span className="block text-[10px] uppercase font-bold text-sky-400 tracking-wider">Admin Panel</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="p-4 space-y-1.5">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
          <div className="font-semibold text-slate-400">Admin Qəbul Mərkəzi</div>
          <div className="text-[11px] mt-0.5">v1.0.0 &bull; Canlı Sistem</div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <h2 className="text-base font-bold text-slate-800">Klinika İdarəetmə Mərkəzi</h2>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
              ● Sistem Aktivdir
            </span>
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-sky-600 hover:underline"
            >
              Veb Saytı Aç ↗
            </a>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
