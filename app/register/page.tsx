"use client";

import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Store, 
  Phone, 
  MapPin, 
  ArrowRight, 
  ShieldCheck,
  ShoppingBag,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="flex items-center justify-between px-6 md:px-40 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-3 text-blue-600">
          <div className="size-8 flex items-center justify-center bg-blue-50 rounded-lg">
            <ShoppingBag size={20} />
          </div>
          <h2 className="text-slate-900 text-xl font-black tracking-tight">Gestión <span className="text-blue-600">PY</span></h2>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[800px] w-full bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100 flex flex-col md:flex-row"
        >
          {/* Left Side: Info */}
          <div className="md:w-1/3 bg-blue-600 p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4">Crea tu cuenta profesional</h3>
              <p className="text-blue-100 text-sm leading-relaxed">Únete a cientos de comercios en Paraguay que ya optimizan sus ventas con nuestra plataforma.</p>
            </div>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold">Seguridad Total</p>
                  <p className="text-[10px] text-blue-100">Datos encriptados</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Store size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold">Multi-Sucursal</p>
                  <p className="text-[10px] text-blue-100">Gestiona todo en un lugar</p>
                </div>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute -bottom-20 -left-20 size-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-20 -right-20 size-64 bg-blue-400/20 rounded-full blur-3xl"></div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 p-8 md:p-12">
            <div className="flex items-center gap-2 mb-8">
              {[1, 2].map((s) => (
                <div 
                  key={s} 
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-all duration-500",
                    step >= s ? "bg-blue-600" : "bg-slate-100"
                  )}
                ></div>
              ))}
            </div>

            {step === 1 ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-slate-900">Datos Personales</h4>
                  <p className="text-slate-500 text-sm">Información del administrador de la cuenta.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">Nombre Completo</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input type="text" className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Juan Pérez" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">Correo Electrónico</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input type="email" className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="juan@ejemplo.com" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="password" className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="••••••••" />
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2"
                >
                  Siguiente Paso
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-slate-900">Datos del Comercio</h4>
                  <p className="text-slate-500 text-sm">Configura tu primera sucursal.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">Nombre de la Tienda</label>
                    <div className="relative">
                      <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input type="text" className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Zapatería Central" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">Teléfono</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="0981 000 000" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">RUC</label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="80000000-0" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">Dirección</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input type="text" className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Av. Mariscal López, Asunción" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Atrás
                  </button>
                  <Link href="/dashboard" className="flex-[2]">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2">
                      Finalizar Registro
                      <CheckCircle2 size={18} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}

            <p className="text-center text-sm text-slate-500 mt-8">
              ¿Ya tienes una cuenta? <Link href="/login" className="text-blue-600 font-bold hover:underline">Inicia sesión</Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
