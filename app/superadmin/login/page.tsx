"use client";

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  Mail, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function SuperAdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 size-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 size-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-[440px] w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="size-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-600/40 mb-6">
            <ShieldAlert size={32} />
          </div>
          <h1 className="text-white text-3xl font-black tracking-tight">SuperAdmin</h1>
          <p className="text-slate-400 text-sm mt-2">Portal de gestión de licencias y plataforma</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">Acceso Maestro</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                placeholder="admin@gestionpy.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">Llave de Seguridad</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <Link href="/superadmin/dashboard">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl mt-4 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95 group">
              AUTENTICAR PORTAL
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        <div className="mt-10 pt-10 border-t border-slate-800 flex items-center justify-center gap-2">
          <Zap size={16} className="text-blue-500" />
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Sistema de Gestión Centralizado v4.0</p>
        </div>
      </motion.div>
    </div>
  );
}
