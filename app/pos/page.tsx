"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  Receipt,
  RotateCcw,
  CheckCircle2,
  X,
  Printer,
  Building2,
  QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatCurrency, cn } from '@/lib/utils';
import Image from 'next/image';

const categories = ['Todos', 'Calzados', 'Ropa', 'Accesorios', 'Ofertas'];

const products = [
  { id: 1, name: 'Champión Nike Air Zoom', category: 'Calzados', price: 650000, image: 'https://picsum.photos/seed/nike/400/400', tag: 'Talle: 42' },
  { id: 2, name: 'Remera Cotton Premium', category: 'Ropa', price: 125000, image: 'https://picsum.photos/seed/shirt/400/400', tag: 'Azul Navy' },
  { id: 3, name: 'Zapatos Taco Alto Grace', category: 'Calzados', price: 380000, image: 'https://picsum.photos/seed/heels/400/400', tag: 'Cuero' },
  { id: 4, name: 'Chaqueta Denim Blue', category: 'Ropa', price: 290000, image: 'https://picsum.photos/seed/jacket/400/400', tag: 'Talle XL' },
  { id: 5, name: 'Vans Classic White', category: 'Calzados', price: 450000, image: 'https://picsum.photos/seed/vans/400/400', tag: 'Skate' },
  { id: 6, name: 'Cinto Cuero Genuino', category: 'Accesorios', price: 85000, image: 'https://picsum.photos/seed/belt/400/400', tag: 'Black' },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  details: string;
}

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: 'Nike Air Zoom', price: 650000, quantity: 1, image: 'https://picsum.photos/seed/nike/400/400', details: 'Talle: 42 | Color: Rojo' },
    { id: 2, name: 'Remera Cotton Premium', price: 125000, quantity: 2, image: 'https://picsum.photos/seed/shirt/400/400', details: 'Talle: M | Color: Azul' },
  ]);
  const [ruc, setRuc] = useState('');
  const [customerName, setCustomerName] = useState('Consumidor Final');
  const [isSearching, setIsSearching] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState({ ruc: '', name: '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState<'Efectivo' | 'Tarjeta' | 'Transferencia'>('Efectivo');
  const [storeInfo, setStoreInfo] = useState<{
    name: string;
    ruc: string;
    address: string;
    logo: string;
    invoicePrefix: string;
    nextInvoiceNumber: string;
  }>(() => {
    const defaultData = {
      name: 'ZAPATERÍA & MODA PY',
      ruc: '80001234-5',
      address: 'Asunción, Paraguay',
      logo: 'https://picsum.photos/seed/store/200/200',
      invoicePrefix: '001-001',
      nextInvoiceNumber: '0000123'
    };
    
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('store_info');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          return { ...defaultData, ...data };
        } catch (e) {
          console.error('Error parsing store_info:', e);
          return defaultData;
        }
      }
    }
    return defaultData;
  });

  const handleRucLookup = () => {
    if (!ruc) return;
    setIsSearching(true);
    // Simulate API delay
    setTimeout(() => {
      if (ruc === '80001234') {
        setCustomerName('Juan Pérez Centurión');
      } else if (ruc === '4444555') {
        setCustomerName('María Rodríguez');
      } else {
        setCustomerName('Cliente Registrado (Mock)');
      }
      setIsSearching(false);
    }, 800);
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const iva = subtotal * 0.1;
  const total = subtotal;

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1, details: product.tag }]);
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleFinalizeSale = () => {
    if (cart.length === 0) return;
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Increment invoice number
      const nextNum = (parseInt(storeInfo.nextInvoiceNumber) + 1).toString().padStart(7, '0');
      const updatedStoreInfo = { ...storeInfo, nextInvoiceNumber: nextNum };
      setStoreInfo(updatedStoreInfo);
      localStorage.setItem('store_info', JSON.stringify(updatedStoreInfo));

      setCart([]);
      setRuc('');
      setCustomerName('Consumidor Final');
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-row overflow-hidden">
        {/* Left Column: Product Catalog */}
        <section className="flex-1 flex flex-col border-r border-slate-200">
          <header className="p-6 space-y-4 bg-white shadow-sm z-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm outline-none"
                placeholder="Buscar calzado o ropa por nombre o código..."
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {categories.map((cat, i) => (
                <button 
                  key={cat}
                  className={cn(
                    "whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold transition-all",
                    i === 0 ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
              >
                <div className="aspect-square relative overflow-hidden bg-slate-50">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[10px] font-black px-2.5 py-1 rounded-full text-blue-600 shadow-sm">
                    {product.tag}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-slate-800 truncate">{product.name}</h3>
                  <p className="text-[11px] text-slate-500 mb-3">{product.category}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-black text-blue-600">{formatCurrency(product.price)}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="size-9 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all active:scale-90 shadow-lg shadow-blue-100"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Right Column: Cart */}
        <section className="w-[480px] bg-white flex flex-col shadow-2xl relative z-20">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-black text-xl text-slate-900">Venta Actual</h2>
            <button 
              onClick={() => setCart([])}
              className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1"
            >
              <RotateCcw size={14} />
              Vaciar Carrito
            </button>
          </div>

          {/* Customer Search */}
          <div className="p-6 bg-slate-50 border-b border-slate-100">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Datos del Cliente</span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full">
                  <span className="size-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase">DNIT Conectado</span>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    value={ruc}
                    onChange={(e) => setRuc(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="RUC o C.I. sin puntos..."
                  />
                </div>
                <button 
                  onClick={handleRucLookup}
                  disabled={isSearching}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
                >
                  {isSearching ? <RotateCcw size={16} className="animate-spin" /> : <Search size={16} />} 
                  {isSearching ? 'Buscando...' : 'Consultar'}
                </button>
                <button 
                  onClick={() => setShowCustomerModal(true)}
                  className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-slate-50 transition-all"
                  title="Nuevo Cliente"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2 px-1">
                <div className={cn("size-2 rounded-full", customerName === 'Consumidor Final' ? "bg-slate-300" : "bg-blue-600")}></div>
                <p className="text-xs text-slate-600 font-bold">{customerName}</p>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-4 items-center group"
                >
                  <div className="size-16 rounded-2xl bg-slate-100 shrink-0 overflow-hidden border border-slate-100 relative">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill
                      className="object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 truncate leading-tight">{item.name}</h4>
                    <p className="text-[10px] text-slate-500 italic mt-0.5">{item.details}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-slate-400 hover:text-blue-600 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-xs font-black min-w-[16px] text-center text-slate-700">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-slate-400 hover:text-blue-600 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-sm font-black text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-slate-200 hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {cart.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                <ShoppingCart size={64} className="text-slate-300" />
                <p className="text-sm font-bold text-slate-400">Tu carrito está vacío</p>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="p-8 bg-slate-50 border-t border-slate-200 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Método de Pago</span>
                <div className="flex gap-1">
                  {['Efectivo', 'Tarjeta', 'Transferencia'].map((m) => (
                    <button 
                      key={m}
                      onClick={() => setPaymentMethod(m as any)}
                      className={cn(
                        "px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all",
                        paymentMethod === m ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "bg-white text-slate-400 border border-slate-200 hover:border-blue-600"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod === 'Transferencia' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-blue-50 border border-blue-100 rounded-xl p-3 space-y-2 mb-4"
                >
                  <div className="flex items-center gap-2 text-blue-600">
                    <Building2 size={14} />
                    <span className="text-[10px] font-black uppercase">Datos de Transferencia</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-slate-700">Banco Itaú: 720012345</p>
                    <p className="text-[10px] text-slate-500">Zapatería & Moda PY S.A.</p>
                  </div>
                  <button 
                    onClick={() => setShowQr(true)}
                    className="w-full py-2 bg-white border border-blue-200 rounded-lg text-[10px] font-black text-blue-600 flex items-center justify-center gap-2 hover:bg-blue-50 transition-all"
                  >
                    <QrCode size={14} /> MOSTRAR QR SPI
                  </button>
                </motion.div>
              )}

              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-slate-800">{formatCurrency(subtotal - iva)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-500">IVA (10%)</span>
                <span className="text-slate-800">{formatCurrency(iva)}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                <span className="font-black text-slate-600 uppercase tracking-widest text-xs">Total a Pagar</span>
                <span className="text-3xl font-black text-blue-600">{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowTicket(true)}
                disabled={cart.length === 0}
                className="bg-white border border-slate-200 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex flex-col items-center justify-center gap-2 hover:border-blue-600 hover:text-blue-600 group transition-all shadow-sm disabled:opacity-50"
              >
                <Receipt size={20} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                Vista Ticket
              </button>
              <button 
                onClick={handleFinalizeSale}
                disabled={cart.length === 0 || isProcessing}
                className="bg-blue-600 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex flex-col items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-[0.98] disabled:opacity-50"
              >
                {isProcessing ? <RotateCcw size={20} className="animate-spin" /> : <CreditCard size={20} />}
                {isProcessing ? 'Procesando...' : 'Finalizar Venta'}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Ticket Modal */}
      <AnimatePresence>
        {showTicket && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTicket(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900">Vista Previa de Ticket</h3>
                    <p className="text-xs text-slate-500 font-medium tracking-widest uppercase">Factura No. {storeInfo.invoicePrefix}-{storeInfo.nextInvoiceNumber}</p>
                  </div>
                  <button 
                    onClick={() => setShowTicket(false)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <div className="bg-slate-50 rounded-3xl p-6 font-mono text-[11px] space-y-4 border border-slate-100">
                  <div className="text-center border-b border-slate-200 pb-4 space-y-2">
                    <div className="relative size-12 mx-auto mb-2 rounded-xl overflow-hidden bg-white border border-slate-200">
                      <Image 
                        src={storeInfo.logo}
                        alt="Logo"
                        fill
                        className="object-contain p-1"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="font-black text-sm uppercase">{storeInfo.name}</p>
                    <p>RUC: {storeInfo.ruc}</p>
                    <p className="text-[9px] text-slate-500">{storeInfo.address}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>FECHA:</span>
                      <span>09/03/2026 12:37</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CLIENTE:</span>
                      <span className="truncate max-w-[150px]">{customerName}</span>
                    </div>
                    {ruc && (
                      <div className="flex justify-between">
                        <span>RUC/CI:</span>
                        <span>{ruc}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-dashed border-slate-300 pt-4 space-y-2">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.quantity}x {item.name.substring(0, 15)}</span>
                        <span>{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dashed border-slate-300 pt-4 space-y-2">
                    <div className="flex justify-between font-black text-sm">
                      <span>TOTAL:</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>IVA (10%):</span>
                      <span>{formatCurrency(iva)}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>PAGO:</span>
                      <span>{paymentMethod.toUpperCase()}</span>
                    </div>
                  </div>

                  {paymentMethod === 'Transferencia' && (
                    <div className="bg-slate-100 p-3 rounded-xl space-y-1 text-[9px] border border-slate-200">
                      <p className="font-black">DATOS PARA TRANSFERENCIA:</p>
                      <p>BANCO: ITAÚ PARAGUAY</p>
                      <p>CTA: 720012345</p>
                      <p>TITULAR: ZAPATERÍA & MODA PY S.A.</p>
                      <p>RUC: 80001234-5</p>
                    </div>
                  )}

                  <div className="text-center pt-4 border-t border-dashed border-slate-300">
                    <p>¡GRACIAS POR SU PREFERENCIA!</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setShowTicket(false)}
                    className="py-4 rounded-2xl border border-slate-200 text-xs font-black text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    CERRAR
                  </button>
                  <button className="py-4 rounded-2xl bg-blue-600 text-white text-xs font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                    <Printer size={16} />
                    IMPRIMIR
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-blue-600/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative bg-white w-full max-w-sm rounded-[3rem] shadow-2xl p-10 text-center space-y-6"
            >
              <div className="size-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">¡Venta Exitosa!</h3>
                <p className="text-slate-500 text-sm font-medium">La transacción ha sido procesada y registrada correctamente.</p>
              </div>
              <button 
                onClick={() => setShowSuccess(false)}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
              >
                CONTINUAR
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QR Modal */}
      <AnimatePresence>
        {showQr && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQr(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white w-full max-w-xs rounded-[3rem] shadow-2xl p-8 text-center space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">QR de Transferencia</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Escanee con su App Bancaria</p>
              </div>
              
              <div className="aspect-square bg-slate-50 rounded-3xl flex items-center justify-center border-2 border-slate-100 p-4">
                <div className="relative size-full">
                  <Image 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=SIPAP:720012345:AMOUNT:${total}`}
                    alt="QR Code"
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-black text-blue-600">{formatCurrency(total)}</p>
                <p className="text-[10px] text-slate-400 font-medium">Banco Itaú • Cta: 720012345</p>
              </div>

              <button 
                onClick={() => setShowQr(false)}
                className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-black text-xs hover:bg-slate-200 transition-all"
              >
                CERRAR
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Nuevo Cliente Modal */}
      <AnimatePresence>
        {showCustomerModal && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCustomerModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black text-slate-900">Nuevo Cliente</h3>
                  <button 
                    onClick={() => setShowCustomerModal(false)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">RUC / C.I.</label>
                    <input 
                      type="text"
                      value={newCustomerData.ruc}
                      onChange={(e) => setNewCustomerData({...newCustomerData, ruc: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Ej: 80001234-5"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre o Razón Social</label>
                    <input 
                      type="text"
                      value={newCustomerData.name}
                      onChange={(e) => setNewCustomerData({...newCustomerData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Ej: Juan Pérez"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Teléfono</label>
                    <input 
                      type="text"
                      value={newCustomerData.phone}
                      onChange={(e) => setNewCustomerData({...newCustomerData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Ej: 0981 123 456"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    onClick={() => setShowCustomerModal(false)}
                    className="flex-1 py-4 rounded-2xl border border-slate-200 text-xs font-black text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    CANCELAR
                  </button>
                  <button 
                    onClick={() => {
                      if (newCustomerData.name && newCustomerData.ruc) {
                        setCustomerName(newCustomerData.name);
                        setRuc(newCustomerData.ruc);
                        setShowCustomerModal(false);
                        setNewCustomerData({ ruc: '', name: '', phone: '' });
                      }
                    }}
                    className="flex-1 py-4 rounded-2xl bg-blue-600 text-white text-xs font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    GUARDAR
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
