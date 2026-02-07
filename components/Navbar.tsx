
import React, { useState } from 'react';
import { View } from '../App';

interface NavbarProps {
  scrolled: boolean;
  activeView: View;
  onNavigate: (view: View) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, activeView, onNavigate, cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks: { name: string; id: View; anchor?: string; desc: string; colorClass: string }[] = [
    { name: 'Головна', id: 'home', desc: 'На головну', colorClass: 'bg-amber-500' },
    { name: 'Магазин', id: 'shop', desc: 'Закупівля', colorClass: 'bg-emerald-500' },
    { name: 'Рецепти', id: 'recipes', desc: 'Кухня', colorClass: 'bg-cyan-500' },
    { name: 'Мапа', id: 'map', desc: 'Пункти', colorClass: 'bg-amber-500' },
    { name: 'Графіки', id: 'schedules', desc: 'Світло', colorClass: 'bg-blue-500' },
    { name: 'SOS', id: 'home', anchor: 'emergency', desc: 'Допомога', colorClass: 'bg-red-500' },
  ];

  const handleLinkClick = (id: View, anchor?: string) => {
    if (activeView === id && anchor) {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
        return;
      }
    }
    
    onNavigate(id);
    setIsOpen(false);

    // Якщо є якір, скролимо до нього після зміни в'ю (з невеликою затримкою для рендеру)
    if (anchor) {
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled || isOpen ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button onClick={() => handleLinkClick('home')} className="text-2xl font-black tracking-tighter uppercase text-white group flex items-center gap-2">
            <span className="transition-transform duration-500 group-hover:rotate-12">⚡</span>
            <span>BLACKOUT<span className="text-amber-500 transition-colors duration-500 group-hover:text-amber-400">HELPER</span></span>
          </button>
          
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map(link => (
              <button
                key={`${link.id}-${link.anchor || 'main'}`}
                onClick={() => handleLinkClick(link.id, link.anchor)}
                className={`relative px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all group overflow-hidden ${
                  activeView === link.id && !link.anchor ? 'text-white' : 'text-slate-500 hover:text-slate-200'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                
                <span className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full transition-all duration-300 transform origin-left ${
                  link.colorClass
                } ${activeView === link.id && !link.anchor ? 'scale-x-100 opacity-100 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-40'}`}></span>
                
                <span className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${link.colorClass}`}></span>
              </button>
            ))}
            
            <button 
              onClick={() => handleLinkClick('shop')} 
              className="relative ml-4 group"
            >
              <div className="absolute inset-0 bg-emerald-500 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-emerald-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all group-hover:bg-emerald-500 group-active:scale-95">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Кошик 
                {cartCount > 0 && (
                  <span className="bg-white text-emerald-900 min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center text-[9px] font-black animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white p-2 font-black text-[10px] tracking-widest uppercase border border-white/10 rounded-xl bg-white/5 active:scale-90 transition-all"
            >
              {isOpen ? 'Закрити' : 'Меню'}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden absolute w-full transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen border-b border-white/5 bg-slate-950/95 backdrop-blur-3xl' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-8 space-y-2">
          {navLinks.map(link => (
            <button
              key={`${link.id}-${link.anchor || 'mobile'}`}
              onClick={() => handleLinkClick(link.id, link.anchor)}
              className={`w-full text-left px-6 py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all border flex items-center justify-between group ${
                activeView === link.id && !link.anchor
                ? `${link.colorClass.replace('bg-', 'border-').replace('-500', '-500/30')} bg-white/5 text-white` 
                : 'border-transparent text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{link.name}</span>
              {(activeView === link.id && !link.anchor) && <span className={`w-2 h-2 rounded-full ${link.colorClass} shadow-lg shadow-current`}></span>}
            </button>
          ))}
          <div className="pt-6">
            <button 
              onClick={() => handleLinkClick('shop')}
              className="w-full bg-emerald-600 text-white p-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/20"
            >
              Перейти до кошика ({cartCount})
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
