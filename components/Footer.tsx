
import React from 'react';
import { View } from '../App';

interface FooterProps {
  onNavigate: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-black/40 backdrop-blur-xl py-20 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 md:col-span-2">
            <button onClick={() => onNavigate('home')} className="text-2xl font-black tracking-tighter text-white mb-6 block text-left uppercase group transition-all">
              BLACKOUT<span className="text-amber-500 group-hover:text-glow transition-all">HELPER</span>
            </button>
            <p className="text-slate-500 text-lg max-w-sm leading-relaxed mb-8 font-medium">
              Ми допомагаємо українцям залишатися зі світлом та теплом у серці. Найбільша база практичних знань для цивільної оборони.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-8 opacity-50">Навігація</h4>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate('shop')} className="text-slate-400 hover:text-emerald-500 transition-colors font-bold text-sm">🛒 Магазин</button></li>
              <li><button onClick={() => onNavigate('recipes')} className="text-slate-400 hover:text-cyan-400 transition-colors font-bold text-sm">🥗 Рецепти</button></li>
              <li><button onClick={() => onNavigate('map')} className="text-slate-400 hover:text-amber-500 transition-colors font-bold text-sm">📍 Мапа</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-8 opacity-50">Сервіси</h4>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate('schedules')} className="text-slate-400 hover:text-blue-500 transition-colors font-bold text-sm">🕒 Графіки</button></li>
              <li><button onClick={() => onNavigate('warmth')} className="text-slate-400 hover:text-orange-500 transition-colors font-bold text-sm">🔥 Тепло</button></li>
              <li><button onClick={() => onNavigate('tips')} className="text-slate-400 hover:text-emerald-500 transition-colors font-bold text-sm">✅ Чек-ліст</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2024 BLACKOUT HELPER. LIGHT WILL PREVAIL.</p>
          <div className="mt-6 md:mt-0 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Слава Україні 🇺🇦</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
