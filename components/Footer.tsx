
import React from 'react';
import { View } from '../App';

interface FooterProps {
  onNavigate: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#020617] relative pt-24 pb-12 border-t border-white/5 overflow-hidden">
      {/* Background Enhancements */}
      <div className="absolute inset-0 neon-grid opacity-[0.15] pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
      
      {/* Top Divider with Glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 lg:gap-24 mb-20">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div>
              <button 
                onClick={() => onNavigate('home')} 
                className="text-3xl font-black tracking-tighter text-white mb-6 block text-left uppercase group transition-all"
              >
                BLACKOUT<span className="text-amber-500 group-hover:text-amber-400 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all">HELPER</span>
              </button>
              <p className="text-slate-400 text-lg max-w-sm leading-relaxed font-medium">
                Ми допомагаємо українцям залишатися зі світлом та теплом у серці. Найбільша база практичних знань для цивільної оборони в умовах енергетичного терору.
              </p>
            </div>
            
            <div className="flex gap-4">
              {/* Pseudo-social icons with tactical look */}
              {[1, 2, 3].map((_, i) => (
                <button key={i} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-amber-500/50 hover:bg-white/10 transition-all group">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full group-hover:bg-amber-500 group-hover:shadow-[0_0_8px_rgba(245,158,11,0.8)] transition-all"></div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Navigation Column 1 */}
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-2">
              <span className="w-4 h-px bg-amber-500"></span>
              База знань
            </h4>
            <ul className="space-y-5">
              {[
                { name: '🛒 Магазин', id: 'shop' as View, color: 'hover:text-emerald-500' },
                { name: '🥗 Рецепти', id: 'recipes' as View, color: 'hover:text-cyan-400' },
                { name: '📍 Мапа', id: 'map' as View, color: 'hover:text-amber-500' },
              ].map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => onNavigate(link.id)} 
                    className={`text-slate-500 ${link.color} transition-all font-bold text-sm flex items-center group`}
                  >
                    <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all mr-2">›</span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Navigation Column 2 */}
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-2">
              <span className="w-4 h-px bg-blue-500"></span>
              Сервіси
            </h4>
            <ul className="space-y-5">
              {[
                { name: '🕒 Графіки', id: 'schedules' as View, color: 'hover:text-blue-500' },
                { name: '🔥 Тепло', id: 'warmth' as View, color: 'hover:text-orange-500' },
                { name: '✅ Чек-ліст', id: 'tips' as View, color: 'hover:text-emerald-500' },
              ].map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => onNavigate(link.id)} 
                    className={`text-slate-500 ${link.color} transition-all font-bold text-sm flex items-center group`}
                  >
                    <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all mr-2">›</span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
              © 2024 BLACKOUT HELPER. LIGHT WILL PREVAIL.
            </p>
            <div className="flex items-center space-x-2 bg-slate-900/50 px-4 py-2 rounded-full border border-white/5">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest">System Online</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">UA_TACTICAL_INTERFACE</span>
            </div>
            <div className="h-4 w-px bg-white/5 hidden md:block"></div>
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors cursor-default flex items-center gap-2">
              Слава Україні <span className="text-sm">🇺🇦</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
