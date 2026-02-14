import React from 'react';
import { Palette } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-khaki-600 rounded-lg text-white">
            <Palette size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-900 tracking-tight">RestyleAI</h1>
            <p className="text-xs text-stone-500 hidden sm:block">Atelier de Patine Virtuel</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-khaki-700 bg-khaki-50 px-3 py-1 rounded-full border border-khaki-200">
            Powered by Gemini 2.5
          </span>
        </div>
      </div>
    </header>
  );
};