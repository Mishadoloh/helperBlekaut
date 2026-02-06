
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Recipes from './components/Recipes';
import Warmth from './components/Warmth';
import Checklist from './components/Checklist';
import Emergency from './components/Emergency';
import Registration from './components/Registration';
import Map from './components/Map';
import Schedules from './components/Schedules';
import Shop from './components/Shop';
import Footer from './components/Footer';
import { CartItem, ShopItem } from './types';

export type View = 'home' | 'emergency' | 'recipes' | 'warmth' | 'tips' | 'register' | 'map' | 'schedules' | 'shop';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('home');
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (view: View) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (item: ShopItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return (
          <div className="animate-in fade-in duration-700">
            <Hero onNavigate={navigateTo} />
            <Emergency />
          </div>
        );
      case 'recipes':
        return <div className="pt-20"><Recipes onAddToCart={addToCart} /></div>;
      case 'shop':
        return <div className="pt-20"><Shop cart={cart} onAdd={addToCart} onRemove={removeFromCart} onClearCart={clearCart} /></div>;
      case 'warmth':
        return <div className="pt-20"><Warmth /></div>;
      case 'tips':
        return <div className="pt-20"><Checklist /></div>;
      case 'register':
        return <div className="pt-20"><Registration /></div>;
      case 'map':
        return <div className="pt-20"><Map /></div>;
      case 'schedules':
        return <div className="pt-20"><Schedules /></div>;
      default:
        return <Hero onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-amber-500/30 overflow-x-hidden">
      <Navbar scrolled={scrolled} activeView={activeView} onNavigate={navigateTo} cartCount={cart.length} />
      <main className="relative">
        {renderView()}
      </main>
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
