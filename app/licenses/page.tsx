"use client";

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { 
  Key, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  AlertTriangle,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency } from '@/lib/utils';

export default function LicensesPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header title="Suscripción y Licencia" />
        <div className="p-8 space-y-8 max-w-5xl mx-auto w-full">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
            <div className="bg-blue-600 p-10 text-white relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">Plan Premium Anual</h3>
                    <p className="text-blue-100 text-sm font-medium">Licencia activa para 1 sucursal</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-blue-200" />
                    <span className="text-sm font-bold">Vence el 15 de Marzo, 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-300" />
                    <span className="text-sm font-bold">Estado: Al día</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-24 -right-24 size-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-24 -left-24 size-64 bg-blue-400/20 rounded-full blur-3xl"></div>
            </div>

            <div className="p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Detalles de Facturación</h4>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500 font-medium">Monto Anual</span>
                      <span className="text-sm font-black text-slate-900">{formatCurrency(2750000)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500 font-medium">Próximo Cobro</span>
                      <span className="text-sm font-black text-slate-900">15/03/2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500 font-medium">Método de Pago</span>
                      <div className="flex items-center gap-2">
                        <CreditCard size={16} className="text-slate-400" />
                        <span className="text-sm font-black text-slate-900">Visa **** 4455</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Acciones Rápidas</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <button className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all group">
                      <div className="flex items-center gap-3">
                        <RefreshCw size={18} className="text-slate-400 group-hover:text-blue-600" />
                        <span className="text-sm font-bold text-slate-700">Renovar Suscripción</span>
                      </div>
                      <span className="text-[10px] font-black text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">PROMO</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl hover:border-slate-400 transition-all group">
                      <CreditCard size={18} className="text-slate-400" />
                      <span className="text-sm font-bold text-slate-700">Cambiar Método de Pago</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex gap-4 items-start">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-600">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h5 className="text-sm font-black text-amber-900">Atención: Su licencia vence pronto</h5>
                  <p className="text-xs text-amber-700 font-medium mt-1">
                    Le quedan 5 días de servicio. Renueve ahora para evitar interrupciones en su facturación y acceso al sistema.
                  </p>
                  <button className="mt-4 text-xs font-black text-amber-900 underline underline-offset-4">
                    RENOVAR AHORA
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Planes Disponibles</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
                    <div className="space-y-1">
                      <h5 className="text-lg font-black text-slate-900">Básico Mensual</h5>
                      <p className="text-2xl font-black text-blue-600">250.000 Gs. <span className="text-xs text-slate-400 font-bold">/ mes</span></p>
                    </div>
                    <ul className="text-xs text-slate-500 space-y-2 font-medium">
                      <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> 1 Sucursal</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Inventario Ilimitado</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Soporte Estándar</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-600 p-6 rounded-3xl shadow-md space-y-4 relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Recomendado</div>
                    <div className="space-y-1">
                      <h5 className="text-lg font-black text-slate-900">Premium Anual</h5>
                      <p className="text-2xl font-black text-blue-600">2.750.000 Gs. <span className="text-xs text-slate-400 font-bold">/ año</span></p>
                    </div>
                    <ul className="text-xs text-slate-500 space-y-2 font-medium">
                      <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> 1 Sucursal</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Facturación Electrónica</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Soporte Prioritario</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
                    <div className="space-y-1">
                      <h5 className="text-lg font-black text-slate-900">Enterprise</h5>
                      <p className="text-2xl font-black text-slate-900">Personalizado</p>
                    </div>
                    <ul className="text-xs text-slate-500 space-y-2 font-medium">
                      <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Multi-sucursal</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> API de Integración</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Gerente de Cuenta</li>
                    </ul>
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
