"use client";

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import Link from 'next/link';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  PlusCircle, 
  History,
  Search,
  ArrowRight,
  Package,
  ShoppingCart,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency, cn } from '@/lib/utils';

const stats = [
  { 
    label: 'Ventas del Día', 
    value: 1250000, 
    trend: '+15.2% vs ayer', 
    trendType: 'up', 
    icon: ShoppingCart,
    color: 'blue'
  },
  { 
    label: 'Total Transacciones', 
    value: '42 Operaciones', 
    trend: '+8% hoy', 
    trendType: 'up', 
    icon: History,
    color: 'emerald'
  },
  { 
    label: 'Stock Calzados', 
    value: '184 Pares', 
    trend: '3 modelos bajo stock', 
    trendType: 'warning', 
    icon: Package,
    color: 'amber'
  },
  { 
    label: 'Stock Ropas', 
    value: '312 Prendas', 
    trend: 'Inventario al día', 
    trendType: 'success', 
    icon: Package,
    color: 'emerald'
  },
];

const recentStock = [
  { id: 1, name: 'Nike Air Max 270', category: 'Calzado Deportivo', size: '42', quantity: 12, price: 850000, status: 'success' },
  { id: 2, name: 'Remera Polo Classic', category: 'Ropa Masculina', size: 'L', quantity: 3, price: 185000, status: 'warning' },
  { id: 3, name: 'Jean Slim Fit', category: 'Ropa Masculina', size: '34', quantity: 25, price: 245000, status: 'success' },
];

const recentSales = [
  { id: 1, customer: 'Juan Pérez', time: 'hace 15 min', amount: 850000 },
  { id: 2, customer: 'María Rodríguez', time: 'hace 42 min', amount: 185000 },
  { id: 3, customer: 'Anónimo (Cons. Final)', time: 'hace 1 hora', amount: 320000 },
];

export default function DashboardPage() {
  const [isSearchingRuc, setIsSearchingRuc] = React.useState(false);
  const [rucResult, setRucResult] = React.useState<string | null>(null);
  const [bannerInfo, setBannerInfo] = React.useState({
    title: 'Licencia Próxima a Vencer',
    message: 'Su pago mensual de 250.000 Gs. vence pronto. Evite interrupciones en el servicio.'
  });

  React.useEffect(() => {
    const saved = localStorage.getItem('store_info');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setBannerInfo(prev => ({
          title: data.dashboardBannerTitle || prev.title,
          message: data.dashboardBannerMessage || prev.message
        }));
      } catch (e) {
        console.error('Error parsing store_info:', e);
      }
    }
  }, []);

  const handleRucLookup = () => {
    setIsSearchingRuc(true);
    setRucResult(null);
    setTimeout(() => {
      setIsSearchingRuc(false);
      setRucResult('Contribuyente: ZAPATERIA EL SOL S.A. (ACTIVO)');
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      
      <main className="flex-1 flex flex-col">
        <Header title="Panel de Control" />
        
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Alert Notification */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-blue-600 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-200 text-white"
          >
            <div className="flex items-center gap-5">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
                <AlertCircle size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black">{bannerInfo.title}</h3>
                <p className="text-blue-100 text-sm">{bannerInfo.message}</p>
              </div>
            </div>
            <button className="whitespace-nowrap bg-white text-blue-600 px-8 py-3 rounded-xl font-black hover:bg-blue-50 transition-all shadow-lg active:scale-95">
              Pagar Ahora
            </button>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-slate-500">{stat.label}</p>
                  <div className={cn(
                    "p-2 rounded-lg",
                    stat.color === 'blue' ? "bg-blue-50 text-blue-600" :
                    stat.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                    "bg-amber-50 text-amber-600"
                  )}>
                    <stat.icon size={18} />
                  </div>
                </div>
                <h4 className="text-2xl font-black text-slate-900">
                  {typeof stat.value === 'number' ? formatCurrency(stat.value) : stat.value}
                </h4>
                <div className={cn(
                  "flex items-center gap-1 text-[11px] font-bold mt-3",
                  stat.trendType === 'up' ? "text-emerald-600" :
                  stat.trendType === 'warning' ? "text-amber-600" :
                  "text-emerald-600"
                )}>
                  {stat.trendType === 'up' && <TrendingUp size={14} />}
                  {stat.trendType === 'warning' && <AlertCircle size={14} />}
                  {stat.trendType === 'success' && <CheckCircle2 size={14} />}
                  <span>{stat.trend}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Inventory Management */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900">Gestión de Stock</h2>
                <div className="flex gap-2">
                  <button className="text-xs font-bold px-4 py-2 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-100">Calzados</button>
                  <button className="text-xs font-bold px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">Ropas</button>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                      <tr>
                        <th className="px-6 py-4">Producto</th>
                        <th className="px-6 py-4">Categoría</th>
                        <th className="px-6 py-4">Talle</th>
                        <th className="px-6 py-4">Cantidad</th>
                        <th className="px-6 py-4">Precio</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {recentStock.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="size-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                                <Package size={20} />
                              </div>
                              <span className="text-sm font-bold text-slate-800">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500 font-medium">{item.category}</td>
                          <td className="px-6 py-4 text-xs font-bold text-slate-700">{item.size}</td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "px-2.5 py-1 rounded-full text-[10px] font-black uppercase",
                              item.status === 'success' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                            )}>
                              {item.quantity} u.
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-black text-slate-900">{formatCurrency(item.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-slate-50 flex justify-center">
                  <button className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-2">
                    Ver todo el inventario
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Access & Recent Sales */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-black text-slate-900">Accesos Rápidos</h2>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nueva Operación</p>
                  <Link href="/pos" className="block">
                    <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-100 transition-all active:scale-[0.98]">
                      <ShoppingCart size={20} />
                      REGISTRAR VENTA
                    </button>
                  </Link>
                  <button 
                    onClick={handleRucLookup}
                    disabled={isSearchingRuc}
                    className="w-full bg-slate-100 text-slate-900 py-4 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-slate-200 transition-all border border-slate-200 active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSearchingRuc ? <History size={20} className="text-blue-600 animate-spin" /> : <Search size={20} className="text-blue-600" />}
                    {isSearchingRuc ? 'CONSULTANDO...' : 'CONSULTA RUC (DNIT)'}
                  </button>
                  {rucResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[10px] font-bold text-blue-700 text-center"
                    >
                      {rucResult}
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-6">
                <h3 className="font-black text-slate-900 flex items-center gap-2 mb-6">
                  <History size={20} className="text-blue-600" />
                  Últimas Ventas
                </h3>
                <div className="space-y-5">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="flex justify-between items-center border-b border-blue-100/50 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm">
                          <Users size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{sale.customer}</p>
                          <p className="text-[10px] text-slate-500 font-medium">{sale.time}</p>
                        </div>
                      </div>
                      <p className="text-sm font-black text-emerald-600">{formatCurrency(sale.amount)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
