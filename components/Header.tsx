"use client";

import React from 'react';
import Link from 'next/link';
import { Search, Bell, User } from 'lucide-react';

interface HeaderProps {
  title: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export function Header({ title, showSearch = true, searchPlaceholder = "Búsqueda de RUC DNIT..." }: HeaderProps) {
  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
      <div className="flex items-center gap-4 flex-1">
        <h2 className="text-lg font-bold text-slate-800 hidden lg:block">{title}</h2>
        {showSearch && (
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 text-sm transition-all"
              placeholder={searchPlaceholder}
            />
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-px bg-slate-200 mx-1"></div>
        <Link href="/settings/profile">
          <button className="flex items-center gap-2 p-1 pr-3 hover:bg-slate-100 rounded-full transition-colors">
            <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <User size={18} />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-900">Admin Local</p>
              <p className="text-[10px] text-slate-500">Sucursal Asunción</p>
            </div>
          </button>
        </Link>
      </div>
    </header>
  );
}
