
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
    <div className="py-24 bg-[#020617] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-orange-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4">Енергія виживання</h2>
          <p className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Як зберегти <span className="text-orange-500">тепло?</span></p>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Коли центральне опалення зникає, ваша стратегія має змінитися. Оберіть категорію, щоб отримати конкретні інструкції.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-16 p-2 bg-slate-900/50 rounded-3xl border border-white/5 max-w-lg mx-auto backdrop-blur-xl">
          {(Object.keys(guides) as WarmthCategory[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === key
                  ? 'bg-orange-600 text-white shadow-xl shadow-orange-900/40'
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              {guides[key].title.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            <div className="p-10 bg-slate-900/40 rounded-[3rem] border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-6xl opacity-10 group-hover:scale-110 transition-transform duration-700">{guides[activeTab].icon}</div>
              <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">{guides[activeTab].title}</h3>
              <p className="text-slate-400 mb-10 leading-relaxed font-medium text-sm">{guides[activeTab].description}</p>
              
              <ul className="space-y-5">
                {guides[activeTab].tips.map((tip, index) => (
                  <li key={index} className="flex items-start group/tip">
                    <span className="flex-shrink-0 w-7 h-7 rounded-xl bg-orange-600/10 border border-orange-600/30 flex items-center justify-center text-orange-500 text-[10px] font-black mr-4 group-hover/tip:bg-orange-600 group-hover/tip:text-white transition-all shadow-lg">
                      {index + 1}
                    </span>
                    <span className="text-slate-300 group-hover/tip:text-white transition-colors text-sm font-semibold leading-snug">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 relative order-1 lg:order-2 px-4 md:px-0">
            <div className="relative rounded-[3.5rem] overflow-hidden border-[12px] border-slate-900/80 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              <img 
                src={
                  activeTab === 'body' 
                    ? 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&q=80&w=1200' 
                    : activeTab === 'home'
                    ? 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200'
                    : 'https://images.unsplash.com/photo-1515444744559-7be63e1600de?auto=format&fit=crop&q=80&w=1200'
                } 
                alt={guides[activeTab].title} 
                className="w-full h-[450px] md:h-[600px] object-cover opacity-60 transition-opacity duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              {/* Floating Alert - Styled like the screenshot */}
              <div className="absolute top-10 right-10 bg-orange-600 rounded-[2rem] p-8 md:p-10 max-w-[280px] md:max-w-[320px] shadow-[0_20px_50px_rgba(234,88,12,0.4)] border border-orange-400/30">
                <div className="flex items-center space-x-3 mb-4">
                   <svg className="w-5 h-5 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                   <p className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Важливо</p>
                </div>
                <p className="text-white text-sm md:text-base font-bold leading-[1.4] tracking-tight">
                  {activeTab === 'body' 
                    ? "Не допускайте переохолодження ніг та голови. Використовуйте вовняні шкарпетки."
                    : activeTab === 'home'
                    ? "Закривайте штори на ніч — це створює повітряний бар’єр між вікном та кімнатою."
                    : "Пам'ятайте: пляшка з гарячою водою в спальнику тримає тепло до 8 годин."}
                </p>
              </div>
            </div>

            {/* Stats Overlay - Styled like the screenshot */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] md:w-full max-w-2xl grid grid-cols-3 gap-3 md:gap-6">
              <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-2xl flex flex-col items-center text-center">
                <p className="text-orange-500 text-2xl md:text-3xl font-black mb-2">+3-5°C</p>
                <p className="text-slate-500 text-[8px] md:text-[9px] uppercase font-black tracking-widest leading-tight">З намет на ліжку</p>
              </div>
              <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-2xl flex flex-col items-center text-center">
                <p className="text-orange-500 text-2xl md:text-3xl font-black mb-2">20%</p>
                <p className="text-slate-500 text-[8px] md:text-[9px] uppercase font-black tracking-widest leading-tight">Збереження енергії</p>
              </div>
              <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-2xl flex flex-col items-center text-center">
                <p className="text-orange-500 text-2xl md:text-3xl font-black mb-2">8 год</p>
                <p className="text-slate-500 text-[8px] md:text-[9px] uppercase font-black tracking-widest leading-tight">Тепла від грілки</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warmth;
