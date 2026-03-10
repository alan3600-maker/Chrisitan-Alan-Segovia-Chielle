"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { 
  Users, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  MoreVertical,
  UserPlus,
  X,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const initialCustomers = [
  { id: 1, name: 'Carlos Benítez', ruc: '80001234-5', email: 'carlos@email.com', phone: '0981 123 456', address: 'Asunción', totalSales: 12, status: 'Activo' },
  { id: 2, name: 'Elena Duarte', ruc: '4444555-1', email: 'elena@email.com', phone: '0971 987 654', address: 'San Lorenzo', totalSales: 5, status: 'Activo' },
  { id: 3, name: 'Ricardo Meza', ruc: '1234567-8', email: 'ricardo@email.com', phone: '0982 555 444', address: 'Luque', totalSales: 28, status: 'VIP' },
  { id: 4, name: 'Sofía López', ruc: '9876543-2', email: 'sofia@email.com', phone: '0991 222 333', address: 'Lambaré', totalSales: 0, status: 'Nuevo' },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pageInfo, setPageInfo] = useState(() => {
    const defaultInfo = {
      title: 'Directorio de Clientes',
      subtitle: 'Administra la base de datos de tus compradores.'
    };
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('store_info');
      if (saved) {
        const data = JSON.parse(saved);
        return {
          title: data.customersTitle || defaultInfo.title,
          subtitle: data.customersSubtitle || defaultInfo.subtitle
        };
      }
    }
    return defaultInfo;
  });

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    ruc: '',
    email: '',
    phone: '',
    address: '',
    status: 'Nuevo'
  });

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const id = customers.length + 1;
    setCustomers([{ id, ...newCustomer, totalSales: 0 }, ...customers]);
    setShowModal(false);
    setShowSuccess(true);
    setNewCustomer({ name: '', ruc: '', email: '', phone: '', address: '', status: 'Nuevo' });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const filteredCustomers = customers.filter(customer => {
    const query = searchQuery.toLowerCase();
    return (
      customer.name.toLowerCase().includes(query) ||
      (customer.ruc && customer.ruc.toLowerCase().includes(query)) ||
      customer.email.toLowerCase().includes(query) ||
      customer.phone.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header title="Gestión de Clientes" />
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900">{pageInfo.title}</h3>
              <p className="text-slate-500 text-sm font-medium">{pageInfo.subtitle}</p>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
            >
              <UserPlus size={20} />
              NUEVO CLIENTE
            </button>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Buscar por nombre, RUC, email o teléfono..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((customer) => (
              <motion.div 
                key={customer.id}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="size-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl">
                    {customer.name.charAt(0)}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    customer.status === 'VIP' ? 'bg-amber-50 text-amber-600' : 
                    customer.status === 'Nuevo' ? 'bg-blue-50 text-blue-600' : 
                    'bg-emerald-50 text-emerald-600'
                  }`}>
                    {customer.status}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">{customer.name}</h4>
                  <div className="flex flex-col gap-0.5">
                    {customer.ruc && (
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">RUC: {customer.ruc}</p>
                    )}
                    <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                      <Mail size={14} /> {customer.email}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-50 space-y-2">
                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <Phone size={14} /> {customer.phone}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <MapPin size={14} /> {customer.address}
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 font-black uppercase">Compras</p>
                    <p className="text-sm font-black text-slate-900">{customer.totalSales}</p>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal Nuevo Cliente */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
              >
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <UserPlus size={20} />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Registrar Nuevo Cliente</h3>
                    </div>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                      <X size={20} className="text-slate-400" />
                    </button>
                  </div>

                  <form onSubmit={handleAddCustomer} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Completo / Razón Social</label>
                        <input 
                          required
                          type="text"
                          value={newCustomer.name}
                          onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                          placeholder="Ej: Juan Pérez"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">RUC / C.I.</label>
                        <input 
                          required
                          type="text"
                          value={newCustomer.ruc}
                          onChange={(e) => setNewCustomer({...newCustomer, ruc: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                          placeholder="Ej: 80001234-5"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                        <input 
                          required
                          type="email"
                          value={newCustomer.email}
                          onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                          placeholder="juan@ejemplo.com"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Teléfono</label>
                        <input 
                          required
                          type="text"
                          value={newCustomer.phone}
                          onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                          placeholder="09xx xxx xxx"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ciudad / Dirección</label>
                      <input 
                        required
                        type="text"
                        value={newCustomer.address}
                        onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Ej: Asunción"
                      />
                    </div>

                    <div className="pt-4 flex gap-3">
                      <button 
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="flex-1 py-4 rounded-2xl border border-slate-200 text-xs font-black text-slate-600 hover:bg-slate-50 transition-all"
                      >
                        CANCELAR
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 py-4 rounded-2xl bg-blue-600 text-white text-xs font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                      >
                        GUARDAR CLIENTE
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
            >
              <CheckCircle2 size={20} />
              <span className="text-sm font-black uppercase tracking-widest">Cliente Registrado con Éxito</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
