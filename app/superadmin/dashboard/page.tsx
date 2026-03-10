"use client";

import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  ShieldCheck, 
  Activity, 
  Search, 
  Bell, 
  Settings,
  LogOut,
  ArrowUpRight,
  TrendingUp,
  Globe,
  Zap,
  X,
  CheckCircle2,
  Key,
  Copy,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { formatCurrency, cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const clients = [
  { id: 1, name: 'Zapatería El Sol', ruc: '80001234-5', owner: 'Carlos Benítez', plan: 'Premium Anual', status: 'Activo', revenue: 2750000, lastPayment: '10/03/2024', accessKey: 'GPY-7829-XJ21' },
  { id: 2, name: 'Moda Urbana PY', ruc: '80005678-2', owner: 'Elena Duarte', plan: 'Básico Mensual', status: 'Pendiente', revenue: 250000, lastPayment: '15/02/2024', accessKey: 'GPY-1290-BK99' },
  { id: 3, name: 'Calzados Asunción', ruc: '80009012-3', owner: 'Ricardo Meza', plan: 'Premium Anual', status: 'Activo', revenue: 2750000, lastPayment: '01/01/2024', accessKey: 'GPY-4432-LP05' },
  { id: 4, name: 'Boutique Glamour', ruc: '80003456-7', owner: 'Sofía López', plan: 'Básico Mensual', status: 'Vencido', revenue: 250000, lastPayment: '20/01/2024', accessKey: 'GPY-8812-QM11' },
];

const generateAccessKey = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const part1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `GPY-${part1}-${part2}`;
};

export default function SuperAdminDashboard() {
  const router = useRouter();
  const [clientsData, setClientsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch clients from Supabase
  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClientsData(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      // Fallback to localStorage if Supabase fails or is not configured
      const saved = localStorage.getItem('gpy_clients');
      setClientsData(saved ? JSON.parse(saved) : clients);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchClients();
  }, []);

  // Persist clients data to localStorage as backup
  React.useEffect(() => {
    if (clientsData.length > 0) {
      localStorage.setItem('gpy_clients', JSON.stringify(clientsData));
    }
  }, [clientsData]);

  const [currentTab, setCurrentTab] = useState('Resumen Global');
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [accessKeyInput, setAccessKeyInput] = useState('');
  const [clientForm, setClientForm] = useState({
    name: '',
    ruc: '',
    owner: '',
    plan: 'Mensual 250k',
    status: 'Activo'
  });

  const handleLogout = () => {
    router.push('/superadmin/login');
  };

  const handleDeleteClient = async (id: string | number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este comercio? Esta acción no se puede deshacer.')) {
      try {
        const { error } = await supabase
          .from('clients')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setClientsData((prev: any[]) => prev.filter(c => c.id !== id));
      } catch (error) {
        console.error('Error deleting client:', error);
        // Fallback for local-only mode
        setClientsData((prev: any[]) => prev.filter(c => c.id !== id));
      }
    }
  };

  const handleEditClient = (client: any) => {
    setEditingClient(client);
    setAccessKeyInput(client.access_key || client.accessKey || '');
    setClientForm({
      name: client.name || '',
      ruc: client.ruc || '',
      owner: client.owner || '',
      plan: client.plan || 'Mensual 250k',
      status: client.status || 'Activo'
    });
    setShowModal(true);
  };

  const handleOpenNewClientModal = () => {
    setEditingClient(null);
    setAccessKeyInput(generateAccessKey());
    setClientForm({
      name: '',
      ruc: '',
      owner: '',
      plan: 'Mensual 250k',
      status: 'Activo'
    });
    setShowModal(true);
  };

  const handleSaveClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const getPlanPrice = (planName: string) => {
      if (planName.includes('Anual')) return 2750000;
      if (planName.includes('Mensual')) return 250000;
      return 0; // Enterprise or other
    };

    const newClientData = {
      name: clientForm.name,
      ruc: clientForm.ruc,
      owner: clientForm.owner,
      plan: clientForm.plan,
      status: clientForm.status,
      access_key: accessKeyInput,
      revenue: getPlanPrice(clientForm.plan),
      last_payment: editingClient?.last_payment || new Date().toISOString(),
    };

    try {
      if (editingClient) {
        const { data, error } = await supabase
          .from('clients')
          .update(newClientData)
          .eq('id', editingClient.id)
          .select()
          .single();

        if (error) throw error;
        setClientsData((prev: any[]) => prev.map(c => c.id === editingClient.id ? data : c));
        setShowSuccess('Cambios Guardados Correctamente');
      } else {
        const { data, error } = await supabase
          .from('clients')
          .insert([newClientData])
          .select()
          .single();

        if (error) throw error;
        setClientsData((prev: any[]) => [data, ...prev]);
        setShowSuccess('Licencia Activada Correctamente');
      }
    } catch (error) {
      console.error('Error saving client:', error);
      // Fallback for local-only mode
      if (editingClient) {
        setClientsData((prev: any[]) => prev.map(c => c.id === editingClient.id ? { ...c, ...newClientData, accessKey: accessKeyInput } : c));
        setShowSuccess('Cambios Guardados Correctamente (Local)');
      } else {
        const newId = Math.max(0, ...clientsData.map((c: any) => c.id)) + 1;
        setClientsData((prev: any[]) => [{ id: newId, ...newClientData, accessKey: accessKeyInput }, ...prev]);
        setShowSuccess('Licencia Activada Correctamente (Local)');
      }
    }

    setShowModal(false);
    setEditingClient(null);
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const filteredClients = clientsData.filter((client: any) => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (client as any).ruc?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { icon: Activity, label: 'Resumen Global' },
    { icon: Users, label: 'Gestión de Clientes' },
    { icon: CreditCard, label: 'Pagos y Facturación' },
    { icon: Globe, label: 'Sucursales DNIT' },
    { icon: Settings, label: 'Configuración' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex">
      {/* SuperAdmin Sidebar */}
      <aside className="w-72 border-r border-slate-800 flex flex-col p-8 shrink-0">
        <div className="flex items-center gap-3 mb-12">
          <div className="size-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <Zap size={24} />
          </div>
          <h2 className="text-white text-xl font-black">Gestión Central</h2>
        </div>

        <nav className="flex-1 space-y-2">
          {tabs.map((item) => (
            <button 
              key={item.label}
              onClick={() => setCurrentTab(item.label)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm",
                currentTab === item.label ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-500 hover:text-slate-300 hover:bg-slate-900"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3.5 text-slate-500 hover:text-rose-500 transition-colors font-bold text-sm mt-auto"
        >
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              placeholder="Buscar cliente por RUC o nombre..."
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-slate-500 hover:text-white transition-colors">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 size-2 bg-blue-600 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
              <div className="text-right">
                <p className="text-xs font-black text-white">Super User</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Master Admin</p>
              </div>
              <div className="size-10 rounded-full bg-slate-800 border border-slate-700"></div>
            </div>
          </div>
        </header>

        <div className="p-10 space-y-10 overflow-y-auto">
          {currentTab === 'Resumen Global' && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Ingresos Mensuales', value: 45200000, trend: '+12%', icon: TrendingUp },
                  { label: 'Clientes Activos', value: 124, trend: '+4', icon: Users },
                  { label: 'Licencias por Vencer', value: 12, trend: '-2', icon: ShieldCheck },
                  { label: 'Uptime Sistema', value: '99.9%', trend: 'Estable', icon: Activity },
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl"
                  >
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{stat.label}</p>
                    <div className="flex items-end justify-between">
                      <h4 className="text-2xl font-black text-white">
                        {typeof stat.value === 'number' ? formatCurrency(stat.value) : stat.value}
                      </h4>
                      <div className="flex items-center gap-1 text-[10px] font-black text-blue-500 bg-blue-500/10 px-2 py-1 rounded-lg">
                        {stat.trend}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Client Table */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-white">Gestión de Licencias</h3>
                  <button 
                    onClick={handleOpenNewClientModal}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-xs font-black transition-all shadow-lg shadow-blue-600/20"
                  >
                    NUEVO CLIENTE
                  </button>
                </div>

                <div className="bg-slate-900/30 border border-slate-800 rounded-[2rem] overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-900/50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                      <tr>
                        <th className="px-8 py-5">Comercio</th>
                        <th className="px-8 py-5">Propietario</th>
                        <th className="px-8 py-5">Llave de Acceso</th>
                        <th className="px-8 py-5">Plan</th>
                        <th className="px-8 py-5">Estado</th>
                        <th className="px-8 py-5">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredClients.map((client: any) => (
                        <tr key={client.id} className="hover:bg-slate-900/50 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="size-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                                <Globe size={20} />
                              </div>
                              <span className="text-sm font-bold text-white">{client.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-sm text-slate-400">{client.owner}</td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                              <code className="bg-slate-950 px-2 py-1 rounded border border-slate-800 text-[10px] font-mono text-blue-400">
                                {client.access_key || client.accessKey}
                              </code>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{client.plan}</span>
                          </td>
                          <td className="px-8 py-6">
                            <span className={cn(
                              "px-3 py-1 rounded-full text-[10px] font-black uppercase",
                              client.status === 'Activo' ? "bg-emerald-500/10 text-emerald-500" :
                              client.status === 'Pendiente' ? "bg-amber-500/10 text-amber-500" :
                              "bg-rose-500/10 text-rose-500"
                            )}>
                              {client.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-sm font-black text-white">{formatCurrency(client.revenue)}</td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleEditClient(client)}
                                className="p-2 text-slate-600 hover:text-blue-500 transition-colors"
                                title="Editar"
                              >
                                <Settings size={18} />
                              </button>
                              <button 
                                onClick={() => handleDeleteClient(client.id)}
                                className="p-2 text-slate-600 hover:text-rose-500 transition-colors"
                                title="Eliminar"
                              >
                                <X size={18} />
                              </button>
                              <button className="p-2 text-slate-600 hover:text-white transition-colors">
                                <ArrowUpRight size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {currentTab === 'Gestión de Clientes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-white">Directorio de Clientes</h3>
                  <p className="text-slate-500 text-sm">Administración detallada de comercios y sus licencias.</p>
                </div>
                <button 
                  onClick={handleOpenNewClientModal}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-xs font-black transition-all shadow-lg shadow-blue-600/20"
                >
                  NUEVO CLIENTE
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredClients.map((client: any) => (
                  <motion.div 
                    key={client.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="size-12 rounded-2xl bg-slate-800 flex items-center justify-center text-blue-500">
                        <Globe size={24} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase",
                          client.status === 'Activo' ? "bg-emerald-500/10 text-emerald-500" :
                          client.status === 'Pendiente' ? "bg-amber-500/10 text-amber-500" :
                          "bg-rose-500/10 text-rose-500"
                        )}>
                          {client.status}
                        </span>
                        <button 
                          onClick={() => handleDeleteClient(client.id)}
                          className="p-1.5 hover:bg-rose-500/10 text-slate-600 hover:text-rose-500 rounded-lg transition-all"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white">{client.name}</h4>
                      <p className="text-slate-500 text-sm">{client.owner}</p>
                    </div>
                    <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Key size={14} className="text-blue-500" />
                        <code className="text-[10px] font-mono text-slate-300">{client.access_key || client.accessKey}</code>
                      </div>
                      <button 
                        onClick={() => {
                          const key = client.access_key || client.accessKey;
                          navigator.clipboard.writeText(key);
                          setShowSuccess('Llave Copiada');
                        }}
                        className="text-slate-600 hover:text-white transition-colors"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                    <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Plan</p>
                        <p className="text-xs text-white font-bold">{client.plan}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Último Pago</p>
                        <p className="text-xs text-white font-bold">{client.lastPayment}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditClient(client)}
                        className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-black text-white transition-all"
                      >
                        EDITAR
                      </button>
                      <button className="px-4 py-3 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 transition-all">
                        <ArrowUpRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {currentTab === 'Pagos y Facturación' && (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <div className="size-20 rounded-full bg-slate-900 flex items-center justify-center text-slate-700">
                <CreditCard size={40} />
              </div>
              <h3 className="text-xl font-black text-white">Módulo de Pagos</h3>
              <p className="text-slate-500 max-w-md">Aquí podrás gestionar la facturación centralizada y los cobros a los comercios afiliados.</p>
            </div>
          )}

          {currentTab === 'Sucursales DNIT' && (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <div className="size-20 rounded-full bg-slate-900 flex items-center justify-center text-slate-700">
                <Globe size={40} />
              </div>
              <h3 className="text-xl font-black text-white">Integración DNIT</h3>
              <p className="text-slate-500 max-w-md">Sincronización de sucursales y timbrados con el Sistema de Facturación Electrónica de la DNIT.</p>
            </div>
          )}

          {currentTab === 'Configuración' && (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <div className="size-20 rounded-full bg-slate-900 flex items-center justify-center text-slate-700">
                <Settings size={40} />
              </div>
              <h3 className="text-xl font-black text-white">Ajustes del Sistema</h3>
              <p className="text-slate-500 max-w-md">Configuración de parámetros globales, roles de administradores y mantenimiento del sistema.</p>
            </div>
          )}
        </div>
      </main>

      {/* Nuevo/Editar Cliente Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowModal(false);
                setEditingClient(null);
              }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-slate-900 border border-slate-800 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <form onSubmit={handleSaveClient} className="p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black text-white">
                    {editingClient ? 'Editar Comercio' : 'Registrar Nuevo Comercio'}
                  </h3>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingClient(null);
                    }}
                    className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                  >
                    <X size={20} className="text-slate-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nombre del Comercio</label>
                      <input 
                        type="text"
                        name="name"
                        value={clientForm.name}
                        onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all text-white"
                        placeholder="Ej: Zapatería El Sol"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">RUC</label>
                      <input 
                        type="text"
                        name="ruc"
                        value={clientForm.ruc}
                        onChange={(e) => setClientForm({...clientForm, ruc: e.target.value})}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all text-white"
                        placeholder="80001234-5"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Propietario / Responsable</label>
                    <input 
                      type="text"
                      name="owner"
                      value={clientForm.owner}
                      onChange={(e) => setClientForm({...clientForm, owner: e.target.value})}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all text-white"
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Plan de Suscripción</label>
                      <select 
                        name="plan"
                        value={clientForm.plan}
                        onChange={(e) => setClientForm({...clientForm, plan: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all text-white"
                      >
                        <option value="Básico Mensual">Básico Mensual (250.000 Gs.)</option>
                        <option value="Premium Anual">Premium Anual (2.750.000 Gs.)</option>
                        <option value="Enterprise">Enterprise (Personalizado)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Estado</label>
                      <select 
                        name="status"
                        value={clientForm.status}
                        onChange={(e) => setClientForm({...clientForm, status: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all text-white"
                      >
                        <option value="Activo">Activo</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Vencido">Vencido</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Llave de Acceso</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                        <input 
                          type="text"
                          name="accessKey"
                          value={accessKeyInput}
                          readOnly
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm font-mono text-blue-400 outline-none"
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={() => setAccessKeyInput(generateAccessKey())}
                        className="px-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all"
                        title="Regenerar Llave"
                      >
                        <RefreshCw size={18} />
                      </button>
                    </div>
                    <p className="text-[9px] text-slate-600 ml-1 italic">Esta llave es única y se utiliza para activar la instancia del cliente.</p>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingClient(null);
                    }}
                    className="flex-1 py-4 rounded-2xl border border-slate-800 text-xs font-black text-slate-500 hover:bg-slate-800 transition-all"
                  >
                    CANCELAR
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 rounded-2xl bg-blue-600 text-white text-xs font-black hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                  >
                    {editingClient ? 'GUARDAR CAMBIOS' : 'ACTIVAR LICENCIA'}
                  </button>
                </div>
              </form>
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
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 size={20} />
            <span className="text-sm font-black uppercase tracking-widest">
              {showSuccess}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
