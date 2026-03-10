"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { 
  Store, 
  Upload, 
  Save, 
  ArrowLeft,
  MapPin,
  Phone,
  FileText,
  Globe
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export default function StoreInfoPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);
  const [storeData, setStoreData] = useState({
    name: 'Zapatería & Moda PY S.A.',
    ruc: '80001234-5',
    address: 'Avda. Mariscal López 1234, Asunción',
    phone: '+595 981 123 456',
    email: 'contacto@zapateriamoda.com.py',
    website: 'www.zapateriamoda.com.py',
    logo: 'https://picsum.photos/seed/store/200/200',
    loginHeroImage: 'https://picsum.photos/seed/shoes/800/400',
    loginTitle: 'Bienvenido de nuevo',
    loginSubtitle: 'Ingresa tus credenciales para continuar',
    dashboardBannerTitle: 'Licencia Próxima a Vencer',
    dashboardBannerMessage: 'Su pago mensual de 250.000 Gs. vence pronto. Evite interrupciones en el servicio.',
    customersTitle: 'Directorio de Clientes',
    customersSubtitle: 'Administra la base de datos de tus compradores.',
    inventoryTitle: 'Inventario de Productos',
    inventorySubtitle: 'Controla el stock de calzados, ropas y accesorios.',
    invoicePrefix: '001-001',
    nextInvoiceNumber: '0000125'
  });

  useEffect(() => {
    const saved = localStorage.getItem('store_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStoreData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Error parsing store_info:', e);
      }
    }
  }, []);

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewLogo, setPreviewLogo] = useState(storeData.logo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    try {
      localStorage.setItem('store_info', JSON.stringify(storeData));
      // Simulate API call
      setTimeout(() => {
        setIsSaving(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }, 800);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      setIsSaving(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    // Check file size (max 1MB for localStorage)
    if (file.size > 1024 * 1024) {
      setError('El logo es demasiado grande (Máx 1MB).');
      setIsUploading(false);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreviewLogo(base64String);
      setStoreData(prev => ({ ...prev, logo: base64String }));
      setIsUploading(false);
    };
    reader.onerror = () => {
      setError('Error al procesar la imagen.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    // Check file size (max 1MB for localStorage)
    if (file.size > 1024 * 1024) {
      setError('La imagen es demasiado grande (Máx 1MB).');
      setIsUploading(false);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setStoreData(prev => ({ ...prev, loginHeroImage: base64String }));
      setIsUploading(false);
    };
    reader.onerror = () => {
      setError('Error al procesar la imagen.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header title="Información del Comercio" />
        
        <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
          <button 
            onClick={() => router.push('/settings')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm"
          >
            <ArrowLeft size={18} />
            VOLVER A CONFIGURACIÓN
          </button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900">Perfil del Comercio</h3>
              <p className="text-slate-500 text-sm font-medium">Personaliza los datos que aparecerán en tus facturas y tickets.</p>
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
                    ¡Cambios Guardados!
                  </motion.div>
                )}
              </AnimatePresence>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {isSaving ? 'GUARDANDO...' : (
                  <>
                    <Save size={18} />
                    GUARDAR CAMBIOS
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo Upload */}
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm text-center space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logo del Comercio</p>
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <div 
                  onClick={triggerFileUpload}
                  className="relative size-40 mx-auto rounded-3xl overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center group cursor-pointer hover:border-blue-400 transition-colors"
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="size-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <p className="text-[10px] font-black text-blue-600">SUBIENDO...</p>
                    </div>
                  ) : previewLogo ? (
                    <Image 
                      src={previewLogo} 
                      alt="Store Logo" 
                      fill 
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Store size={48} className="text-slate-300" />
                  )}
                  {!isUploading && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload size={24} className="text-white" />
                    </div>
                  )}
                </div>
                {error ? (
                  <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest">{error}</p>
                ) : (
                  <p className="text-[10px] text-slate-400 font-medium">Recomendado: PNG 512x512px (Máx 1MB)</p>
                )}
                <button 
                  onClick={triggerFileUpload}
                  disabled={isUploading}
                  className="w-full py-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 rounded-lg transition-all disabled:opacity-50"
                >
                  {isUploading ? 'PROCESANDO...' : 'SUBIR LOGO'}
                </button>
              </div>
            </div>

            {/* Form Data */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre de la Tienda</label>
                    <div className="relative">
                      <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="text"
                        name="name"
                        value={storeData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">RUC del Comercio</label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="text"
                        name="ruc"
                        value={storeData.ruc}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Dirección Física</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text"
                      name="address"
                      value={storeData.address}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Teléfono / WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="text"
                        name="phone"
                        value={storeData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sitio Web</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="text"
                        name="website"
                        value={storeData.website}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Config */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={20} className="text-blue-600" />
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Configuración de Facturación</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Prefijo de Factura (Est-Punto)</label>
                    <input 
                      type="text"
                      name="invoicePrefix"
                      value={storeData.invoicePrefix}
                      onChange={handleChange}
                      placeholder="Ej: 001-001"
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Próximo Número</label>
                    <input 
                      type="text"
                      name="nextInvoiceNumber"
                      value={storeData.nextInvoiceNumber}
                      onChange={handleChange}
                      placeholder="Ej: 0000001"
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 font-medium italic">
                  * Estos datos se incrementarán automáticamente después de cada venta finalizada.
                </p>
              </div>

              {/* Personalization Section */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={20} className="text-blue-600" />
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Personalización Visual</h4>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Imagen de Bienvenida (Login)</label>
                      <button 
                        onClick={() => heroInputRef.current?.click()}
                        className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                      >
                        Subir Archivo
                      </button>
                    </div>
                    <input 
                      type="file"
                      ref={heroInputRef}
                      onChange={handleHeroUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <input 
                      type="text"
                      name="loginHeroImage"
                      value={storeData.loginHeroImage}
                      onChange={handleChange}
                      placeholder="URL de la imagen o base64"
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    {storeData.loginHeroImage && (
                      <div className="mt-2 relative h-24 w-full rounded-xl overflow-hidden border border-slate-100">
                        <Image 
                          src={storeData.loginHeroImage} 
                          alt="Hero Preview" 
                          fill 
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título de Login</label>
                      <input 
                        type="text"
                        name="loginTitle"
                        value={storeData.loginTitle}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subtítulo de Login</label>
                      <input 
                        type="text"
                        name="loginSubtitle"
                        value={storeData.loginSubtitle}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título de Banner (Dashboard)</label>
                    <input 
                      type="text"
                      name="dashboardBannerTitle"
                      value={storeData.dashboardBannerTitle}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mensaje de Banner (Dashboard)</label>
                    <textarea 
                      name="dashboardBannerMessage"
                      value={storeData.dashboardBannerMessage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Títulos de Secciones</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título Clientes</label>
                        <input 
                          type="text"
                          name="customersTitle"
                          value={storeData.customersTitle}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subtítulo Clientes</label>
                        <input 
                          type="text"
                          name="customersSubtitle"
                          value={storeData.customersSubtitle}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título Inventario</label>
                        <input 
                          type="text"
                          name="inventoryTitle"
                          value={storeData.inventoryTitle}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subtítulo Inventario</label>
                        <input 
                          type="text"
                          name="inventorySubtitle"
                          value={storeData.inventorySubtitle}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>
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
