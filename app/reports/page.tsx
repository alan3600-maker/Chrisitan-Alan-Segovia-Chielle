"use client";

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Download, 
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MoreHorizontal
} from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency, cn } from '@/lib/utils';

const kpis = [
  { label: 'Ventas Totales', value: 15420000, trend: '+12.5%', trendType: 'up', icon: TrendingUp },
  { label: 'Costo de Mercancía', value: 8200000, trend: '+5.2%', trendType: 'up', icon: TrendingUp },
  { label: 'Margen de Utilidad', value: '46.8%', trend: '+2.1%', trendType: 'up', icon: TrendingUp },
  { label: 'Valor Inventario', value: 245000000, trend: '-1.5%', trendType: 'down', icon: TrendingDown },
];

const topProducts = [
  { id: 1, name: 'Nike Air Max 270', category: 'Calzado', units: 142, revenue: 1250000, status: 'Stock OK' },
  { id: 2, name: 'Camisa Denim Classic', category: 'Ropa', units: 98, revenue: 450000, status: 'Bajo Stock' },
  { id: 3, name: 'Reloj Deportivo S2', category: 'Accesorios', units: 56, revenue: 850000, status: 'Stock OK' },
  { id: 4, name: 'Jean Slim Fit Black', category: 'Ropa', units: 112, revenue: 320000, status: 'Stock OK' },
];

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      
      <main className="flex-1 flex flex-col">
        <Header title="Reportes y Analítica" />
        
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Title and Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Análisis de Rendimiento</h3>
              <p className="text-slate-500 text-sm font-medium mt-1">Visualiza el flujo de caja y el estado del stock en tiempo real.</p>
            </div>
            <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
              <button className="px-5 py-2 text-xs font-bold rounded-xl text-slate-500 hover:bg-slate-50 transition-all">Hoy</button>
              <button className="px-5 py-2 text-xs font-bold rounded-xl text-slate-500 hover:bg-slate-50 transition-all">7 Días</button>
              <button className="px-5 py-2 text-xs font-bold rounded-xl bg-blue-600 text-white shadow-md shadow-blue-100">Este Mes</button>
              <button className="px-5 py-2 text-xs font-bold rounded-xl text-slate-500 hover:bg-slate-50 transition-all flex items-center gap-2">
                Personalizado
                <Calendar size={14} />
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, i) => (
              <motion.div 
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
              >
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{kpi.label}</p>
                <h4 className="text-2xl font-black text-slate-900">
                  {typeof kpi.value === 'number' ? formatCurrency(kpi.value) : kpi.value}
                </h4>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-bold mt-3",
                  kpi.trendType === 'up' ? "text-emerald-600" : "text-rose-600"
                )}>
                  <kpi.icon size={14} />
                  <span>{kpi.trend}</span>
                  <span className="text-slate-400 font-medium ml-1">vs mes anterior</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sales Trend Bar Chart */}
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h4 className="text-lg font-black text-slate-900">Tendencia de Ventas Diarias</h4>
                  <p className="text-xs text-slate-400 font-medium">Distribución de ingresos por día de la semana</p>
                </div>
                <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              
              <div className="h-64 flex items-end justify-between gap-4 px-4">
                {[65, 45, 85, 70, 95, 100, 35].map((height, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 w-full group">
                    <div className="relative w-full">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={cn(
                          "w-full rounded-t-xl transition-all duration-300",
                          i === 5 ? "bg-blue-600 shadow-lg shadow-blue-100" : "bg-blue-100 group-hover:bg-blue-200"
                        )}
                      />
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {formatCurrency(height * 100000)}
                      </div>
                    </div>
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest",
                      i === 5 ? "text-blue-600" : "text-slate-400"
                    )}>
                      {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Donut Chart */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="text-lg font-black text-slate-900 mb-10">Ventas por Categoría</h4>
              <div className="relative flex items-center justify-center mb-10">
                <div className="size-48 rounded-full border-[20px] border-blue-600 flex items-center justify-center relative">
                  <div className="absolute inset-0 border-[20px] border-slate-100 rounded-full" style={{ clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%)' }}></div>
                  <div className="text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Líder</p>
                    <p className="text-2xl font-black text-slate-900">Calzado</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Calzado', value: '55%', color: 'bg-blue-600' },
                  { label: 'Ropa', value: '30%', color: 'bg-blue-200' },
                  { label: 'Accesorios', value: '15%', color: 'bg-slate-100' },
                ].map((cat) => (
                  <div key={cat.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("size-3 rounded-full", cat.color)}></div>
                      <span className="text-sm font-bold text-slate-600">{cat.label}</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">{cat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h4 className="text-lg font-black text-slate-900">Productos Más Vendidos</h4>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 text-slate-700 rounded-xl text-xs font-black hover:bg-slate-100 transition-all border border-slate-100">
                  <Download size={16} />
                  Descargar PDF
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 text-slate-700 rounded-xl text-xs font-black hover:bg-slate-100 transition-all border border-slate-100">
                  <FileSpreadsheet size={16} />
                  Exportar Excel
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                  <tr>
                    <th className="px-8 py-4">Producto</th>
                    <th className="px-8 py-4">Categoría</th>
                    <th className="px-8 py-4">Unidades Vendidas</th>
                    <th className="px-8 py-4">Ingresos Totales</th>
                    <th className="px-8 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {topProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="size-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                            <BarChart3 size={24} />
                          </div>
                          <span className="text-sm font-bold text-slate-800">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg uppercase">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-slate-600">{product.units}</td>
                      <td className="px-8 py-5 text-sm font-black text-slate-900">{formatCurrency(product.revenue)}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "size-2 rounded-full",
                            product.status === 'Stock OK' ? "bg-emerald-500" : "bg-amber-500"
                          )}></div>
                          <span className="text-xs font-bold text-slate-600">{product.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 flex items-center justify-between bg-slate-50/50">
              <p className="text-xs font-bold text-slate-400">Mostrando 4 de 125 productos</p>
              <div className="flex gap-2">
                <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-white transition-all">
                  <ChevronLeft size={20} />
                </button>
                <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-white transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
