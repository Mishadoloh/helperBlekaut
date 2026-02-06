
import React, { useState, useEffect } from 'react';
import { View } from '../App';

interface NavbarProps {
  scrolled: boolean;
  activeView: View;
  onNavigate: (view: View) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, activeView, onNavigate, cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks: { name: string; id: View; desc: string; color: string }[] = [
    { name: 'Головна', id: 'home', desc: 'На головну', color: 'amber' },
    { name: 'Магазин', id: 'shop', desc: 'Закупівля', color: 'emerald' },
    { name: 'Рецепти', id: 'recipes', desc: 'Кухня', color: 'cyan' },
    { name: 'Мапа', id: 'map', desc: 'Пункти', color: 'amber' },
    { name: 'Графіки', id: 'schedules', desc: 'Світло', color: 'blue' },
  ];

  const handleLinkClick = (id: View) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled || isOpen ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button onClick={() => handleLinkClick('home')} className="text-2xl font-black tracking-tighter uppercase text-white group">
            BLACKOUT<span className="text-amber-500">HELPER</span>
          </button>
          
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${activeView === link.id ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white'}`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => handleLinkClick('shop')} 
              className="relative ml-4 bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all"
            >
              Кошик {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-white text-emerald-900 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black">{cartCount}</span>}
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              МЕНЮ
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
