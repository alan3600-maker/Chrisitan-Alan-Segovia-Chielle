"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Package, 
  ArrowUpDown,
  Edit2,
  Trash2,
  Eye,
  QrCode,
  X,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatCurrency, cn } from '@/lib/utils';
import Image from 'next/image';

const inventory = [
  { id: 1, name: 'Nike Air Max 270', category: 'Calzado', size: '42', stock: 12, price: 850000, status: 'Disponible' },
  { id: 2, name: 'Remera Polo Classic', category: 'Ropa', size: 'L', stock: 3, price: 185000, status: 'Bajo Stock' },
  { id: 3, name: 'Jean Slim Fit', category: 'Ropa', size: '34', stock: 25, price: 245000, status: 'Disponible' },
  { id: 4, name: 'Vans Old Skool', category: 'Calzado', size: '40', stock: 0, price: 420000, status: 'Agotado' },
  { id: 5, name: 'Gorra Trucker NY', category: 'Accesorios', size: 'U', stock: 45, price: 95000, status: 'Disponible' },
];

export default function InventoryPage() {
  const [products, setProducts] = useState(inventory);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Calzado',
    size: '',
    stock: 0,
    price: 0,
    status: 'Disponible'
  });

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const filteredProducts = products.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      (1000 + item.id).toString().includes(query)
    );
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const id = products.length + 1;
    setProducts([{ id, ...newProduct }, ...products]);
    setShowAddModal(false);
    setShowSuccess(true);
    setNewProduct({ name: '', category: 'Calzado', size: '', stock: 0, price: 0, status: 'Disponible' });
    setTimeout(() => setShowSuccess(false), 3000);
  };
  const [pageInfo, setPageInfo] = useState({
    title: 'Inventario de Productos',
    subtitle: 'Controla el stock de calzados, ropas y accesorios.'
  });

  React.useEffect(() => {
    const saved = localStorage.getItem('store_info');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setPageInfo(prev => ({
          title: data.inventoryTitle || prev.title,
          subtitle: data.inventorySubtitle || prev.subtitle
        }));
      } catch (e) {
        console.error('Error parsing store_info:', e);
      }
    }
  }, []);

  const handleShowQr = (item: any) => {
    setSelectedItem(item);
    setShowQrModal(true);
  };

  const handleViewProduct = (item: any) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      
      <main className="flex-1 flex flex-col">
        <Header title="Gestión de Inventario" />
        
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900">{pageInfo.title}</h3>
              <p className="text-slate-500 text-sm font-medium">{pageInfo.subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
              <AnimatePresence>
                {showSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-100"
                  >
                    ¡Producto Agregado!
                  </motion.div>
                )}
              </AnimatePresence>
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
              >
                <Plus size={20} />
                NUEVO PRODUCTO
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Buscar por nombre, código o categoría..."
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <Filter size={16} />
                Categoría
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <ArrowUpDown size={16} />
                Ordenar
              </button>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                  <tr>
                    <th className="px-8 py-5">Producto</th>
                    <th className="px-8 py-5">Categoría</th>
                    <th className="px-8 py-5">Talle/Variante</th>
                    <th className="px-8 py-5">Stock</th>
                    <th className="px-8 py-5">Precio Venta</th>
                    <th className="px-8 py-5">Estado</th>
                    <th className="px-8 py-5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredProducts.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="size-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                            <Package size={24} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{item.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">SKU: {1000 + item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-lg uppercase">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-slate-600">{item.size}</td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-black text-slate-800">{item.stock} unidades</span>
                          <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full",
                                item.stock > 10 ? "bg-emerald-500" : item.stock > 0 ? "bg-amber-500" : "bg-rose-500"
                              )} 
                              style={{ width: `${Math.min(100, (item.stock / 50) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-black text-slate-900">{formatCurrency(item.price)}</td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase",
                          item.status === 'Disponible' ? "bg-emerald-50 text-emerald-600" :
                          item.status === 'Bajo Stock' ? "bg-amber-50 text-amber-600" :
                          "bg-rose-50 text-rose-600"
                        )}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleShowQr(item)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Generar QR"
                          >
                            <QrCode size={18} />
                          </button>
                          <button 
                            onClick={() => handleViewProduct(item)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Ver Detalles"
                          >
                            <Eye size={18} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <Edit2 size={18} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
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
                      <Plus size={20} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">Registrar Nuevo Producto</h3>
                  </div>
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre del Producto</label>
                    <input 
                      required
                      type="text" 
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Ej: Nike Air Max 270"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Categoría</label>
                      <select 
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="Calzado">Calzado</option>
                        <option value="Ropa">Ropa</option>
                        <option value="Accesorios">Accesorios</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Talle / Variante</label>
                      <input 
                        required
                        type="text" 
                        value={newProduct.size}
                        onChange={(e) => setNewProduct({...newProduct, size: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Ej: 42 o XL"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Stock Inicial</label>
                      <input 
                        required
                        type="number" 
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Precio de Venta (Gs.)</label>
                      <input 
                        required
                        type="number" 
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
                    >
                      REGISTRAR PRODUCTO
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQrModal && selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQrModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-6 text-center">
                <div className="flex justify-between items-start">
                  <div className="text-left space-y-1">
                    <h3 className="text-xl font-black text-slate-900">Etiqueta QR</h3>
                    <p className="text-xs text-slate-500 font-medium">SKU: {1000 + selectedItem.id}</p>
                  </div>
                  <button 
                    onClick={() => setShowQrModal(false)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <div className="bg-slate-50 rounded-3xl p-8 flex flex-col items-center justify-center border border-slate-100 space-y-4">
                  <div className="relative size-48 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <Image 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=PRODUCT:${1000 + selectedItem.id}`}
                      alt="Product QR"
                      fill
                      className="object-contain p-2"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-black text-slate-900 uppercase">{selectedItem.name}</p>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{selectedItem.category} • {selectedItem.size}</p>
                    <p className="text-xs font-bold text-slate-500">{formatCurrency(selectedItem.price)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setShowQrModal(false)}
                    className="py-4 rounded-2xl border border-slate-200 text-xs font-black text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    CERRAR
                  </button>
                  <button 
                    onClick={() => window.print()}
                    className="py-4 rounded-2xl bg-blue-600 text-white text-xs font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    <Printer size={16} />
                    IMPRIMIR
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Product View Modal */}
      <AnimatePresence>
        {showViewModal && selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowViewModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="size-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Package size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">{selectedItem.name}</h3>
                      <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">SKU: {1000 + selectedItem.id}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowViewModal(false)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-slate-400" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Información General</p>
                      <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-500 uppercase">Categoría</span>
                          <span className="text-sm font-black text-slate-800">{selectedItem.category}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-500 uppercase">Talle / Variante</span>
                          <span className="text-sm font-black text-slate-800">{selectedItem.size}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-500 uppercase">Estado</span>
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-black uppercase",
                            selectedItem.status === 'Disponible' ? "bg-emerald-50 text-emerald-600" :
                            selectedItem.status === 'Bajo Stock' ? "bg-amber-50 text-amber-600" :
                            "bg-rose-50 text-rose-600"
                          )}>
                            {selectedItem.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Precios y Costos</p>
                      <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-500 uppercase">Precio de Venta</span>
                          <span className="text-lg font-black text-blue-600">{formatCurrency(selectedItem.price)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-500 uppercase">IVA (10%)</span>
                          <span className="text-sm font-bold text-slate-700">{formatCurrency(selectedItem.price * 0.1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Control de Stock</p>
                      <div className="bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="size-24 rounded-full border-4 border-white shadow-sm flex items-center justify-center bg-white relative overflow-hidden">
                          <div 
                            className={cn(
                              "absolute bottom-0 w-full transition-all duration-1000",
                              selectedItem.stock > 10 ? "bg-emerald-100" : selectedItem.stock > 0 ? "bg-amber-100" : "bg-rose-100"
                            )}
                            style={{ height: `${Math.min(100, (selectedItem.stock / 50) * 100)}%` }}
                          />
                          <span className="relative text-3xl font-black text-slate-900">{selectedItem.stock}</span>
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">Unidades Disponibles</p>
                          <p className="text-xs text-slate-500 font-medium">Capacidad de stock: 50 unidades</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => {
                          setShowViewModal(false);
                          handleShowQr(selectedItem);
                        }}
                        className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                      >
                        <QrCode size={16} />
                        QR ETIQUETA
                      </button>
                      <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                        <Edit2 size={16} />
                        EDITAR
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
