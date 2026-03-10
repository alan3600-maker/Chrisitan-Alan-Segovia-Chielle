"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { 
  Building2, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  CreditCard,
  Info,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

interface BankAccount {
  id: number;
  bankName: string;
  accountNumber: string;
  accountType: string;
  holderName: string;
  holderRuc: string;
}

export default function BankAccountsPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>([
    { id: 1, bankName: 'Banco Itaú Paraguay', accountNumber: '720012345', accountType: 'Caja de Ahorro', holderName: 'Zapatería & Moda PY S.A.', holderRuc: '80001234-5' },
    { id: 2, bankName: 'Banco Continental', accountNumber: '12-34567-01', accountType: 'Cuenta Corriente', holderName: 'Zapatería & Moda PY S.A.', holderRuc: '80001234-5' },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newAccount, setNewAccount] = useState({
    bankName: '',
    accountNumber: '',
    accountType: 'Caja de Ahorro',
    holderName: '',
    holderRuc: ''
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setAccounts([...accounts, { ...newAccount, id: Date.now() }]);
    setShowAdd(false);
    setNewAccount({ bankName: '', accountNumber: '', accountType: 'Caja de Ahorro', holderName: '', holderRuc: '' });
  };

  const removeAccount = (id: number) => {
    setAccounts(accounts.filter(a => a.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header title="Cuentas Bancarias" />
        <div className="p-8 space-y-8 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/settings" className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-blue-600 border border-transparent hover:border-slate-100">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h3 className="text-2xl font-black text-slate-900">Mis Cuentas Bancarias</h3>
                <p className="text-slate-500 text-sm font-medium">Configura tus cuentas para recibir transferencias SIPAP/SPI.</p>
              </div>
            </div>
            <button 
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
            >
              <Plus size={20} />
              AGREGAR CUENTA
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex gap-4 items-start">
            <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
              <Info size={24} />
            </div>
            <div>
              <h5 className="text-sm font-black text-blue-900">Integración Directa</h5>
              <p className="text-xs text-blue-700 font-medium mt-1 leading-relaxed">
                Al registrar tus cuentas, el sistema generará automáticamente los datos de transferencia en el ticket de venta y permitirá a tus clientes pagar vía QR o transferencia directa. Para conciliación automática (SIPAP en tiempo real), se requiere integración con Bancard o la API de su banco.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {accounts.map((account) => (
                <motion.div 
                  key={account.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-6 relative group"
                >
                  <div className="flex justify-between items-start">
                    <div className="size-12 rounded-2xl bg-slate-50 text-blue-600 flex items-center justify-center">
                      <Building2 size={24} />
                    </div>
                    <button 
                      onClick={() => removeAccount(account.id)}
                      className="p-2 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{account.bankName}</p>
                    <h4 className="text-lg font-black text-slate-900">{account.accountNumber}</h4>
                    <p className="text-xs text-slate-500 font-medium">{account.accountType}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-50 space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400 font-bold uppercase">Titular</span>
                      <span className="text-slate-700 font-black">{account.holderName}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400 font-bold uppercase">RUC</span>
                      <span className="text-slate-700 font-black">{account.holderRuc}</span>
                    </div>
                  </div>

                  <div className="absolute top-6 right-14 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black">
                      <CheckCircle2 size={12} /> VERIFICADA
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Add Account Modal */}
      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdd(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <form onSubmit={handleAdd} className="p-8 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">Nueva Cuenta Bancaria</h3>
                  <p className="text-xs text-slate-500 font-medium">Ingresa los datos oficiales para transferencias.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Banco</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500/20 outline-none text-sm font-bold"
                      placeholder="Ej: Banco Itaú"
                      value={newAccount.bankName}
                      onChange={e => setNewAccount({...newAccount, bankName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Número de Cuenta</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500/20 outline-none text-sm font-bold"
                      placeholder="000000000"
                      value={newAccount.accountNumber}
                      onChange={e => setNewAccount({...newAccount, accountNumber: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Tipo</label>
                      <select 
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500/20 outline-none text-sm font-bold"
                        value={newAccount.accountType}
                        onChange={e => setNewAccount({...newAccount, accountType: e.target.value})}
                      >
                        <option>Caja de Ahorro</option>
                        <option>Cuenta Corriente</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">RUC Titular</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500/20 outline-none text-sm font-bold"
                        placeholder="80000000-0"
                        value={newAccount.holderRuc}
                        onChange={e => setNewAccount({...newAccount, holderRuc: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nombre del Titular</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500/20 outline-none text-sm font-bold"
                      placeholder="Nombre completo o Razón Social"
                      value={newAccount.holderName}
                      onChange={e => setNewAccount({...newAccount, holderName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowAdd(false)}
                    className="py-4 rounded-2xl border border-slate-200 text-xs font-black text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    CANCELAR
                  </button>
                  <button 
                    type="submit"
                    className="py-4 rounded-2xl bg-blue-600 text-white text-xs font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    GUARDAR CUENTA
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
