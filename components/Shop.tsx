
import React, { useState } from 'react';
import { ShopItem, CartItem } from '../types';

export const INGREDIENTS_DB: ShopItem[] = [
  // ... (база даних залишається без змін)
  { id: 1, name: 'Гречка', price: 45, category: 'крупи', desc: 'Ядриця, перший сорт. 1кг. Термін зберігання 12 місяців.' },
  { id: 2, name: 'Рис пропарений', price: 55, category: 'крупи', desc: 'Довгозернистий, шліфований. 1кг. Підходить для термоса.' },
  { id: 3, name: 'Кускус', price: 60, category: 'крупи', desc: 'Дрібна фракція пшеничної крупи. 500г. Готується запарюванням.' },
  { id: 4, name: 'Булгур', price: 48, category: 'крупи', desc: 'Дроблена пшениця, оброблена парою. 800г.' },
  { id: 5, name: 'Вівсяні пластівці', price: 35, category: 'крупи', desc: 'Екстра-ніжні, швидкого приготування. 400г.' },
  { id: 6, name: 'Тунець консервований', price: 85, category: 'консерви', desc: 'Шматочки смугастого тунця у власному соку. 185г.' },
  { id: 7, name: 'Квасоля біла', price: 40, category: 'консерви', desc: 'Квасоля в томатному соусі, готова до вживання. 420г.' },
  { id: 8, name: 'Кукурудза солодка', price: 38, category: 'консерви', desc: 'Зерна десертної кукурудзи у вакуумі. 340г.' },
  { id: 9, name: 'Горошок зелений', price: 35, category: 'консерви', desc: 'Молодий горошок першого сорту. 400г.' },
  { id: 10, name: 'Шпроти в олії', price: 65, category: 'консерви', desc: 'Копчена салака у соняшниковій олії. 150г.' },
  { id: 11, name: 'Паштет печінковий', price: 32, category: 'консерви', desc: 'Класичний курячий паштет у жерстяній банці. 240г.' },
  { id: 12, name: 'Сардини в олії', price: 45, category: 'консерви', desc: 'Натуральна консерва, джерело білка. 230г.' },
  { id: 13, name: 'Хлібці пшеничні', price: 25, category: 'бакалія', desc: 'Сухі хрусткі хлібці. 100г. Заміна свіжому хлібу.' },
  { id: 14, name: 'Галети', price: 28, category: 'бакалія', desc: 'Печиво галетне, низькокалорійне. 150г.' },
  { id: 15, name: 'Олія соняшникова', price: 62, category: 'бакалія', desc: 'Рафінована дезодорована. 850мл.' },
  { id: 16, name: 'Мед натуральний', price: 120, category: 'солодощі', desc: 'Квітковий мед, тривале зберігання. 250г.' },
  { id: 17, name: 'Фініки сушені', price: 75, category: 'солодощі', desc: 'Натуральні сухофрукти без сиропу. 200г.' },
  { id: 18, name: 'Горіхи волоські', price: 55, category: 'солодощі', desc: 'Ядро горіха очищене. 100г.' },
  { id: 19, name: 'Арахісова паста', price: 110, category: 'солодощі', desc: 'Кремова текстура, висока енергоємність. 350г.' },
  { id: 20, name: 'Чай чорний', price: 45, category: 'бакалія', desc: 'Середньолистовий у пакетиках. 25 шт.' },
  { id: 21, name: 'Какао-порошок', price: 42, category: 'бакалія', desc: 'Натуральний какао без цукру. 100г.' },
  { id: 22, name: 'Згущене молоко', price: 58, category: 'солодощі', desc: 'З цукром, 8.5% жирності. 370г.' },
  { id: 23, name: 'Сіль йодована', price: 22, category: 'бакалія', desc: 'Кухонна сіль, збагачена йодом. 1кг.' },
  { id: 24, name: 'Цукор білий', price: 35, category: 'бакалія', desc: 'Кристалічний білий цукор. 1кг.' },
  { id: 25, name: 'Сочевиця червона', price: 52, category: 'крупи', desc: 'Колота сочевиця, не потребує замочування. 500г.' },
  { id: 26, name: 'Нут консервований', price: 48, category: 'консерви', desc: 'Готовий турецький горох. 400г.' },
  { id: 27, name: 'Оливки без кісточки', price: 42, category: 'консерви', desc: 'Зелені оливки у розсолі. 300г.' },
  { id: 28, name: 'Томатна паста', price: 18, category: 'бакалія', desc: 'Концентрат томатів 25%. 70г.' },
  { id: 29, name: 'Суміш спецій', price: 15, category: 'бакалія', desc: 'Склад: сіль, паприка, перець, трави. 30г.' },
  { id: 30, name: 'Лаваш тонкий', price: 25, category: 'бакалія', desc: 'Пшеничний коржик. 3 шт. в упаковці.' },
  { id: 31, name: 'Макарони швидкі', price: 12, category: 'бакалія', desc: 'Вермішель, що не потребує варіння. 60г.' },
  { id: 32, name: 'Суп у брикеті', price: 18, category: 'бакалія', desc: 'Концентрований гороховий суп. 180г.' },
  { id: 33, name: 'Плавлений сирок', price: 24, category: 'бакалія', desc: 'Вершковий смак, м’яка консистенція. 70г.' },
  { id: 34, name: 'Яблука сушені', price: 45, category: 'солодощі', desc: 'Натуральні сухофрукти власного виробництва. 100г.' },
  { id: 35, name: 'Курага', price: 85, category: 'солодощі', desc: 'Сушений абрикос без кісточки. 200г.' },
  { id: 36, name: 'Родзинки', price: 38, category: 'солодощі', desc: 'Сушений виноград темних сортів. 150г.' },
  { id: 37, name: 'Морська капуста', price: 28, category: 'консерви', desc: 'Водорості мариновані. 250г.' },
  { id: 38, name: 'Печиво Марія', price: 32, category: 'солодощі', desc: 'Галетне затяжне печиво. 150г.' },
  { id: 39, name: 'Шоколад чорний', price: 48, category: 'солодощі', desc: 'Екстра-чорний, 70% какао. 90г.' },
  { id: 40, name: 'Квасоля біла суха', price: 45, category: 'крупи', desc: 'Сорт біла звичайна. 800г.' },
  { id: 41, name: 'Ячна крупа', price: 24, category: 'крупи', desc: 'Крупа ячмінна ячна. 1кг.' },
  { id: 42, name: 'Пшенична крупа', price: 22, category: 'крупи', desc: 'Крупа пшенична Артек. 1кг.' },
];

interface ShopProps {
  cart: CartItem[];
  onAdd: (item: ShopItem) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
  onClearCart: () => void;
  onOrderSuccess: () => void;
}

const Shop: React.FC<ShopProps> = ({ cart, onAdd, onDecrement, onRemove, onClearCart, onOrderSuccess }) => {
  const [activeCategory, setActiveCategory] = useState<string>('усі');
  const [orderStatus, setOrderStatus] = useState<'idle' | 'success'>('idle');
  
  const filteredItems = activeCategory === 'усі' 
    ? INGREDIENTS_DB 
    : INGREDIENTS_DB.filter(item => item.category === activeCategory);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleOrder = () => {
    if (cart.length === 0) return;
    setOrderStatus('success');
    onOrderSuccess();
    setTimeout(() => {
      onClearCart();
      setOrderStatus('idle');
    }, 3000);
  };

  return (
    <div className="py-24 bg-[#020617] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">База <span className="text-emerald-500">Закупівлі</span></h1>
          
          <div className="flex flex-wrap gap-2">
            {['усі', 'крупи', 'консерви', 'бакалія', 'солодощі'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeCategory === cat ? 'bg-emerald-500 border-emerald-400 text-slate-900' : 'bg-white/5 border-white/10 text-slate-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-32">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-slate-900/50 border border-white/10 p-8 rounded-[2rem] hover:border-emerald-500/30 transition-all">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{item.category}</div>
              <h3 className="text-white font-bold text-xl mb-2">{item.name}</h3>
              <p className="text-slate-500 text-sm mb-6 h-12 overflow-hidden">{item.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-emerald-500 font-black text-xl">{item.price} ₴</span>
                <button 
                  onClick={() => onAdd(item)}
                  className="bg-white/5 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-emerald-600 hover:border-emerald-500 transition-all"
                >
                  У кошик
                </button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && orderStatus === 'idle' && (
          <div className="fixed bottom-8 right-8 z-[150] w-full max-w-sm px-4 md:px-0">
            <div className="bg-slate-900 border border-emerald-500/30 p-8 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.9)] backdrop-blur-xl">
              <h3 className="text-white font-black uppercase tracking-widest text-xs mb-6 border-b border-white/5 pb-4">Ваш кошик</h3>
              <div className="max-h-64 overflow-y-auto mb-6 custom-scrollbar pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex flex-col mb-6 last:mb-0 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <p className="text-white text-xs font-bold leading-tight">{item.name}</p>
                        <p className="text-slate-500 text-[9px] uppercase font-black tracking-wider mt-1">{item.price} ₴ / шт</p>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)} 
                        className="text-slate-600 hover:text-rose-500 transition-colors p-1"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                       <div className="flex items-center bg-slate-950/50 rounded-xl border border-white/10 p-1">
                          <button 
                            onClick={() => onDecrement(item.id)}
                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-all active:scale-90"
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" /></svg>
                          </button>
                          <span className="w-10 text-center text-xs font-black text-white">{item.quantity}</span>
                          <button 
                            onClick={() => onAdd(item)}
                            className="w-8 h-8 flex items-center justify-center text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-all active:scale-90"
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                          </button>
                       </div>
                       <div className="text-right">
                          <p className="text-emerald-500 text-sm font-black">{item.price * item.quantity} ₴</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Разом</p>
                  <p className="text-emerald-500 text-2xl font-black">{total} ₴</p>
                </div>
                <button 
                  onClick={handleOrder}
                  className="bg-emerald-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-900/40 hover:bg-emerald-500 active:scale-95 transition-all"
                >
                  Оформити
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Shop;
