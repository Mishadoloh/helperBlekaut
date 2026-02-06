
import React, { useState } from 'react';

type WarmthCategory = 'body' | 'home' | 'sleep';

interface GuideItem {
  title: string;
  description: string;
  tips: string[];
  icon: string;
}

const guides: Record<WarmthCategory, GuideItem> = {
  body: {
    title: 'Зігрівання тіла',
    icon: '🧘',
    description: 'Ваше тіло — це головний генератор тепла. Навчіться утримувати його правильно.',
    tips: [
      'Принцип "Цибулі": мінімум 3 шари одягу.',
      'Термобілизна (синтетика або вовна) — відводить вологу.',
      'Фліс — створює повітряний прошарок.',
      'Рухайтесь: прості вправи кожні 30-40 хвилин.',
      'Уникайте бавовни: вона вбирає піт і холоне.'
    ]
  },
  home: {
    title: 'Ізоляція оселі',
    icon: '🏠',
    description: 'Не дайте теплу втікати через мікрощілини. Перетворіть кімнату на термос.',
    tips: [
      'Заклейте щілини у вікнах малярним скотчем.',
      'Використовуйте штори на ніч — це бар’єр для холоду.',
      'Покладіть килими на підлогу.',
      'Створіть "Кімнату в кімнаті" — намет на ліжку.',
      'Перевірте вентиляцію: закрийте її, якщо вона занадто тягне холод.'
    ]
  },
  sleep: {
    title: 'Безпечний сон',
    icon: '🛌',
    description: 'Вночі температура падає найнижче. Готуйте спальне місце заздалегідь.',
    tips: [
      'Грілка з гарячою водою в ногах (пляшка в шкарпетці).',
      'Спіть разом: тепло кількох тіл зберігається краще.',
      'Одягайте шапку на ніч — 30% тепла втрачається через голову.',
      'Спальник всередині ковдри — подвійний ефект.',
      'Не спіть на підлозі — використовуйте матраци або каремати.'
    ]
  }
};

const Warmth: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WarmthCategory>('body');

  return (
    <div className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-4">Енергія виживання</h2>
          <p className="text-4xl md:text-5xl font-extrabold text-white mb-6">Як зберегти тепло?</p>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Коли центральне опалення зникає, ваша стратегія має змінитися. Оберіть категорію, щоб отримати конкретні інструкції.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 p-1 bg-slate-900/50 rounded-2xl border border-white/5 max-w-lg mx-auto">
          {(Object.keys(guides) as WarmthCategory[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                activeTab === key
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {guides[key].title.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-slate-900/40 rounded-[2.5rem] border border-orange-500/20 backdrop-blur-md">
              <div className="text-5xl mb-6">{guides[activeTab].icon}</div>
              <h3 className="text-3xl font-bold text-white mb-4">{guides[activeTab].title}</h3>
              <p className="text-slate-400 mb-8">{guides[activeTab].description}</p>
              
              <ul className="space-y-4">
                {guides[activeTab].tips.map((tip, index) => (
                  <li key={index} className="flex items-start group">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 text-xs font-bold mr-4 group-hover:bg-orange-500 group-hover:text-white transition-all">
                      {index + 1}
                    </span>
                    <span className="text-slate-300 group-hover:text-white transition-colors">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="relative rounded-[3rem] overflow-hidden border-4 border-slate-800 shadow-3xl">
              <img 
                src={
                  activeTab === 'body' 
                    ? 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&q=80&w=1200' 
                    : activeTab === 'home'
                    ? 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200'
                    : 'https://images.unsplash.com/photo-1515444744559-7be63e1600de?auto=format&fit=crop&q=80&w=1200'
                } 
                alt={guides[activeTab].title} 
                className="w-full h-[500px] object-cover opacity-60 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent"></div>
              
              {/* Floating Alert */}
              <div className="absolute top-8 right-8 bg-orange-600/90 backdrop-blur-sm p-6 rounded-2xl max-w-[240px] border border-white/10 shadow-2xl animate-pulse">
                <p className="text-white text-xs font-bold uppercase tracking-widest mb-2">⚡ Важливо</p>
                <p className="text-white text-sm font-medium leading-tight">
                  {activeTab === 'body' 
                    ? "Не допускайте переохолодження ніг та голови. Використовуйте вовняні шкарпетки."
                    : activeTab === 'home'
                    ? "Уникайте відкритого вогню в квартирі (свічки без нагляду) — це небезпечно."
                    : "Пам'ятайте про вентиляцію, якщо використовуєте газові пальники."}
                </p>
              </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute -bottom-10 left-10 right-10 grid grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl shadow-2xl">
                <p className="text-orange-500 text-2xl font-black mb-1">+3-5°C</p>
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">З намет на ліжку</p>
              </div>
              <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl shadow-2xl">
                <p className="text-orange-500 text-2xl font-black mb-1">20%</p>
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Збереження калорій</p>
              </div>
              <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl shadow-2xl">
                <p className="text-orange-500 text-2xl font-black mb-1">8 год</p>
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Тепла від грілки</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warmth;
