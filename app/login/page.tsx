"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ShoppingBag, 
  ShieldCheck,
  ArrowRight,
  Key,
  AlertTriangle,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'key'>('email');
  const [accessKey, setAccessKey] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [storeInfo, setStoreInfo] = useState({
    loginHeroImage: 'https://picsum.photos/seed/shoes/800/400',
    loginTitle: 'Bienvenido de nuevo',
    loginSubtitle: 'Ingresa tus credenciales para continuar'
  });

  useEffect(() => {
    const saved = localStorage.getItem('store_info');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStoreInfo(prev => ({
          loginHeroImage: data.loginHeroImage || prev.loginHeroImage,
          loginTitle: data.loginTitle || prev.loginTitle,
          loginSubtitle: data.loginSubtitle || prev.loginSubtitle
        }));
      } catch (e) {
        console.error('Error parsing store_info:', e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="flex items-center justify-between px-6 md:px-40 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-3 text-blue-600">
          <div className="size-8 flex items-center justify-center bg-blue-50 rounded-lg">
            <ShoppingBag size={20} />
          </div>
          <h2 className="text-slate-900 text-xl font-black tracking-tight">Zapatería & Moda <span className="text-blue-600">PY</span></h2>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[480px] w-full bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-100"
        >
          <div className="relative h-48 w-full">
            <Image 
              src={storeInfo.loginHeroImage} 
              alt="Store" 
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl font-black">{storeInfo.loginTitle}</h3>
              <p className="text-slate-300 text-sm">{storeInfo.loginSubtitle}</p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="flex p-1 bg-slate-100 rounded-xl mb-2">
              <button 
                onClick={() => setLoginMethod('email')}
                className={cn(
                  "flex-1 py-2 text-xs font-black rounded-lg transition-all",
                  loginMethod === 'email' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                EMAIL / USUARIO
              </button>
              <button 
                onClick={() => setLoginMethod('key')}
                className={cn(
                  "flex-1 py-2 text-xs font-black rounded-lg transition-all",
                  loginMethod === 'key' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                LLAVE DE ACCESO
              </button>
            </div>

            <div className="space-y-4">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex gap-3 items-start"
                >
                  <AlertTriangle className="text-rose-600 shrink-0" size={18} />
                  <div className="flex-1">
                    <p className="text-xs font-black text-rose-900 uppercase tracking-widest">Acceso Denegado</p>
                    <p className="text-[11px] text-rose-700 font-medium mt-0.5">{error}</p>
                  </div>
                  <button onClick={() => setError(null)} className="text-rose-400 hover:text-rose-600">
                    <X size={14} />
                  </button>
                </motion.div>
              )}

              {loginMethod === 'email' ? (
                <>
                  <div className="space-y-2">
                    <label className="text-slate-700 text-sm font-bold">Usuario</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-sm"
                        placeholder="ejemplo@correo.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-700 text-sm font-bold">Contraseña</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-sm"
                        placeholder="••••••••"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <label className="text-slate-700 text-sm font-bold">Llave de Acceso Maestro</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      value={accessKey}
                      onChange={(e) => setAccessKey(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-600 focus:border-blue-500 transition-all outline-none text-sm font-mono text-blue-600"
                      placeholder="GPY-XXXX-XXXX"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 italic ml-1">Ingresa la llave proporcionada por el administrador central.</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Recordarme</span>
              </label>
              <a href="#" className="text-sm text-blue-600 font-bold hover:underline">¿Olvidaste tu contraseña?</a>
            </div>

            <button 
              onClick={async () => {
                if (loginMethod === 'key') {
                  if (!accessKey) {
                    setError('Por favor, ingresa tu llave de acceso.');
                    return;
                  }

                  try {
                    // Try Supabase first
                    const { data: client, error: dbError } = await supabase
                      .from('clients')
                      .select('*')
                      .eq('access_key', accessKey)
                      .single();

                    if (dbError || !client) {
                      // Fallback to localStorage
                      const savedClients = localStorage.getItem('gpy_clients');
                      if (savedClients) {
                        const clients = JSON.parse(savedClients);
                        const localClient = clients.find((c: any) => (c.access_key || c.accessKey) === accessKey);

                        if (!localClient) {
                          setError('La llave de acceso ingresada no es válida.');
                        } else if (localClient.status === 'Vencido') {
                          setError('Su licencia ha vencido. Por favor, contacte al administrador para renovar su suscripción.');
                        } else if (localClient.status === 'Inactivo') {
                          setError('Su cuenta se encuentra inactiva temporalmente.');
                        } else {
                          router.push('/dashboard');
                        }
                      } else {
                        setError('La llave de acceso ingresada no es válida.');
                      }
                    } else {
                      // Handle Supabase client
                      if (client.status === 'Vencido') {
                        setError('Su licencia ha vencido. Por favor, contacte al administrador para renovar su suscripción.');
                      } else if (client.status === 'Inactivo') {
                        setError('Su cuenta se encuentra inactiva temporalmente.');
                      } else {
                        router.push('/dashboard');
                      }
                    }
                  } catch (err) {
                    console.error('Login error:', err);
                    setError('Ocurrió un error al intentar iniciar sesión.');
                  }
                } else {
                  // Email login simulation
                  if (!email || !password) {
                    setError('Por favor, completa todos los campos.');
                    return;
                  }
                  router.push('/dashboard');
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
            >
              Iniciar Sesión
              <ArrowRight size={18} />
            </button>

            <div className="pt-6 border-t border-slate-100">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-600 uppercase font-black tracking-widest">Estado de Suscripción</p>
                    <p className="text-sm font-bold text-slate-800">Plan Anual Activo</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Renovación</p>
                  <p className="text-xs font-black text-blue-600">Gs. 2.750.000 / año</p>
                </div>
              </div>
            </div>
            
            <p className="text-center text-sm text-slate-500">
              ¿No tienes una cuenta? <Link href="/register" className="text-blue-600 font-bold hover:underline">Regístrate aquí</Link>
            </p>

            <div className="pt-4 flex justify-center">
              <Link 
                href="/superadmin/login" 
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-all group"
              >
                <ShieldCheck size={14} className="group-hover:scale-110 transition-transform" />
                Acceso Portal SuperAdmin
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="py-8 text-center text-slate-400 text-xs">
        <p>© 2024 Zapatería & Moda PY. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-6 mt-3">
          <a href="#" className="hover:text-blue-600 transition-colors">Términos</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Privacidad</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Soporte</a>
        </div>
      </footer>
    </div>
  );
}
