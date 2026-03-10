"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { 
  Printer, 
  Wifi, 
  Bluetooth, 
  Usb, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Settings2,
  FileText,
  Save
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const printerTypes = [
  { id: 'thermal', name: 'Térmica 80mm', icon: Printer },
  { id: 'thermal-58', name: 'Térmica 58mm', icon: Printer },
  { id: 'laser', name: 'Láser / A4', icon: FileText },
];

const connectionTypes = [
  { id: 'usb', name: 'USB', icon: Usb },
  { id: 'network', name: 'Red / IP', icon: Wifi },
  { id: 'bluetooth', name: 'Bluetooth', icon: Bluetooth },
];

export default function PrinterSettingsPage() {
  const [selectedType, setSelectedType] = useState('thermal');
  const [selectedConn, setSelectedConn] = useState('usb');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const handleTest = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult('success');
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      
      <main className="flex-1 flex flex-col">
        <Header title="Configuración de Impresora" />
        
        <div className="p-8 space-y-8 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-slate-900">Impresión de Tickets</h3>
              <p className="text-slate-500 text-sm font-medium">Configura el hardware para la emisión de comprobantes.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
              <Save size={18} />
              Guardar Cambios
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Printer Type */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Settings2 size={20} />
                  </div>
                  <h4 className="font-black text-slate-800">Tipo de Impresora</h4>
                </div>
                
                <div className="space-y-3">
                  {printerTypes.map((type) => (
                    <button 
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all",
                        selectedType === type.id 
                          ? "border-blue-600 bg-blue-50/50" 
                          : "border-slate-100 hover:border-slate-200 bg-white"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "p-2 rounded-xl",
                          selectedType === type.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                        )}>
                          <type.icon size={20} />
                        </div>
                        <span className={cn("text-sm font-bold", selectedType === type.id ? "text-blue-600" : "text-slate-600")}>
                          {type.name}
                        </span>
                      </div>
                      {selectedType === type.id && <CheckCircle2 size={20} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex gap-4">
                <AlertCircle className="text-amber-500 shrink-0" size={24} />
                <div>
                  <p className="text-sm font-bold text-amber-900">Nota sobre Facturación Electrónica</p>
                  <p className="text-xs text-amber-700 mt-1 leading-relaxed">Para imprimir el KuDE (Factura Electrónica), se recomienda una impresora de al menos 80mm para asegurar la legibilidad del código QR.</p>
                </div>
              </div>
            </div>

            {/* Connection & Test */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Wifi size={20} />
                  </div>
                  <h4 className="font-black text-slate-800">Conexión</h4>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {connectionTypes.map((conn) => (
                    <button 
                      key={conn.id}
                      onClick={() => setSelectedConn(conn.id)}
                      className={cn(
                        "flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all",
                        selectedConn === conn.id 
                          ? "border-blue-600 bg-blue-50/50" 
                          : "border-slate-100 hover:border-slate-200 bg-white"
                      )}
                    >
                      <conn.icon size={24} className={selectedConn === conn.id ? "text-blue-600" : "text-slate-400"} />
                      <span className={cn("text-[10px] font-black uppercase tracking-widest", selectedConn === conn.id ? "text-blue-600" : "text-slate-500")}>
                        {conn.name}
                      </span>
                    </button>
                  ))}
                </div>

                {selectedConn === 'network' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2 pt-2"
                  >
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Dirección IP de la Impresora</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono"
                      placeholder="192.168.1.100"
                    />
                  </motion.div>
                )}
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <h4 className="font-black text-slate-800">Prueba de Impresión</h4>
                <p className="text-xs text-slate-500">Envía un ticket de prueba para verificar la alineación y el corte de papel.</p>
                
                <button 
                  onClick={handleTest}
                  disabled={isTesting}
                  className={cn(
                    "w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all",
                    isTesting ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-slate-900 text-white hover:bg-slate-800"
                  )}
                >
                  {isTesting ? (
                    <RefreshCw size={20} className="animate-spin" />
                  ) : (
                    <Printer size={20} />
                  )}
                  {isTesting ? "Imprimiendo..." : "Imprimir Ticket de Prueba"}
                </button>

                {testResult === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100"
                  >
                    <CheckCircle2 size={20} />
                    <span className="text-xs font-bold">¡Prueba exitosa! Impresora lista.</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
