"use client";

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { 
  Settings as SettingsIcon, 
  Printer, 
  User, 
  Store, 
  Bell, 
  Shield, 
  Database,
  ChevronRight,
  CreditCard
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

const settingsGroups = [
  {
    title: 'General',
    items: [
      { icon: Store, label: 'Información del Comercio', description: 'Nombre, RUC, dirección y contacto.', href: '/settings/store-info' },
      { icon: User, label: 'Perfil de Usuario', description: 'Gestiona tu información personal y contraseña.', href: '/settings/profile' },
    ]
  },
  {
    title: 'Finanzas y Pagos',
    items: [
      { icon: CreditCard, label: 'Cuentas Bancarias', description: 'Gestiona tus cuentas para transferencias SIPAP/SPI.', href: '/settings/bank-accounts' },
    ]
  },
  {
    title: 'Hardware y Dispositivos',
    items: [
      { icon: Printer, label: 'Impresoras Térmicas', description: 'Configura tus ticketeras de 80mm y 58mm.', href: '/settings/printers' },
    ]
  },
  {
    title: 'Sistema',
    items: [
      { icon: Bell, label: 'Notificaciones', description: 'Alertas de stock, vencimientos y ventas.', href: '#' },
      { icon: Shield, label: 'Seguridad y Permisos', description: 'Roles de empleados y accesos.', href: '#' },
      { icon: Database, label: 'Copia de Seguridad', description: 'Exportar datos y gestionar backups.', href: '#' },
    ]
  }
];

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header title="Configuración del Sistema" />
        <div className="p-8 space-y-8 max-w-4xl mx-auto w-full">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">Configuración</h3>
            <p className="text-slate-500 text-sm font-medium">Personaliza el funcionamiento de tu plataforma.</p>
          </div>

          <div className="space-y-8">
            {settingsGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-2">
                  {group.title}
                </h4>
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
                  {group.items.map((item) => (
                    <Link 
                      key={item.label} 
                      href={item.href}
                      className="flex items-center justify-between p-6 hover:bg-slate-50 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                          <item.icon size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{item.label}</p>
                          <p className="text-xs text-slate-500 font-medium">{item.description}</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
