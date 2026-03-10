"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  Store,
  LogOut,
  Key
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Panel de Control', href: '/dashboard' },
  { icon: Package, label: 'Inventario', href: '/inventory' },
  { icon: ShoppingCart, label: 'Ventas (POS)', href: '/pos' },
  { icon: Users, label: 'Clientes', href: '/customers' },
  { icon: BarChart3, label: 'Reportes', href: '/reports' },
  { icon: Key, label: 'Licencias', href: '/licenses' },
  { icon: Settings, label: 'Configuración', href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, clear cookies/tokens here
    router.push('/login');
  };

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
          <Store size={24} />
        </div>
        <div>
          <h1 className="text-base font-bold leading-tight text-slate-900">Gestión Py</h1>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Administrador</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-blue-50 text-blue-600 font-bold" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              )}
            >
              <item.icon size={20} className={cn(isActive ? "text-blue-600" : "text-slate-400 group-hover:text-blue-600")} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-blue-50 rounded-xl p-4 mb-4">
          <p className="text-[10px] uppercase tracking-widest font-black text-blue-600 mb-1">Estado de Licencia</p>
          <p className="text-xs font-bold text-slate-700">Vence en 5 días</p>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full w-[85%] transition-all duration-1000"></div>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
