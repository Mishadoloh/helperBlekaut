
import React, { useState, useEffect, useCallback } from 'react';
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

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('home');
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addNotification = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  const navigateTo = (view: View) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (item: ShopItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        // Сповіщення при збільшенні кількості видалено
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      // Сповіщення при додаванні нового товару видалено
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const decrementQuantity = (id: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      const item = prev.find(i => i.id === id);
      if (item) addNotification(`Видалено: ${item.name}`, 'info');
      return prev.filter(i => i.id !== id);
    });
  };

  const removeFromCart = (id: number) => {
    const item = cart.find(i => i.id === id);
    if (item) addNotification(`Видалено: ${item.name}`, 'info');
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    addNotification('Кошик очищено', 'info');
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
        return (
          <div className="pt-20">
            <Shop 
              cart={cart} 
              onAdd={addToCart} 
              onDecrement={decrementQuantity}
              onRemove={removeFromCart} 
              onClearCart={clearCart} 
              onOrderSuccess={() => addNotification('Замовлення оформлено!', 'success')}
            />
          </div>
        );
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

      {/* Глобальна система сповіщень */}
      <div className="fixed bottom-6 left-6 z-[300] flex flex-col gap-3 pointer-events-none">
        {notifications.map(n => (
          <div 
            key={n.id} 
            className={`pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl animate-in slide-in-from-left-10 duration-300 ${
              n.type === 'success' ? 'bg-emerald-500/90 border-emerald-400 text-slate-950' : 
              n.type === 'error' ? 'bg-rose-500/90 border-rose-400 text-white' : 
              'bg-slate-900/90 border-white/10 text-white'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
            <p className="text-xs font-black uppercase tracking-widest">{n.message}</p>
          </div>
        ))}
      </div>

      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
