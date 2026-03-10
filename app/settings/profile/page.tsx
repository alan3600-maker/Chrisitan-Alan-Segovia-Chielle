"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { 
  User, 
  Mail, 
  Shield, 
  MapPin, 
  Camera,
  Lock,
  Save,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ProfilePage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Admin Local',
    email: 'admin@zapateriaelsol.com',
    role: 'Administrador de Sucursal',
    branch: 'Sucursal Asunción - Centro',
    phone: '0981 123 456'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header title="Mi Perfil" />
        
        <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3 text-emerald-800"
              >
                <CheckCircle2 size={20} className="text-emerald-500" />
                <p className="text-sm font-bold">Perfil actualizado correctamente</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Avatar & Basic Info */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 text-center space-y-4">
                <div className="relative inline-block">
                  <div className="size-32 rounded-[2rem] bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-black">
                    {profile.name.charAt(0)}
                  </div>
                  <button className="absolute -bottom-2 -right-2 size-10 bg-white border border-slate-100 rounded-xl shadow-lg flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors">
                    <Camera size={20} />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{profile.name}</h3>
                  <p className="text-sm font-medium text-slate-500">{profile.role}</p>
                </div>
                <div className="pt-4 border-t border-slate-50 space-y-3">
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin size={16} className="text-slate-400" />
                    <span className="text-xs font-medium">{profile.branch}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white space-y-4">
                <Shield size={32} className="text-blue-200" />
                <h4 className="text-lg font-black">Nivel de Acceso</h4>
                <p className="text-sm text-blue-100 font-medium">
                  Tienes permisos completos para gestionar inventario, ventas y reportes de esta sucursal.
                </p>
              </div>
            </div>

            {/* Right Column: Edit Form */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Información Personal</h4>
                </div>
                <form onSubmit={handleSave} className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nombre Completo</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Correo Electrónico</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Teléfono</label>
                      <input 
                        type="text"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Cargo / Rol</label>
                      <input 
                        type="text"
                        value={profile.role}
                        disabled
                        className="w-full bg-slate-100 border-none rounded-2xl py-3.5 px-4 text-sm font-bold text-slate-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-50 flex justify-end">
                    <button 
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl text-sm font-black transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
                    >
                      <Save size={18} />
                      GUARDAR CAMBIOS
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Seguridad</h4>
                </div>
                <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center">
                        <Lock size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Contraseña</p>
                        <p className="text-xs text-slate-500 font-medium">Último cambio hace 3 meses</p>
                      </div>
                    </div>
                    <button className="text-xs font-black text-blue-600 hover:underline underline-offset-4">
                      CAMBIAR CONTRASEÑA
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
