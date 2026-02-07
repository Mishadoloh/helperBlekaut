
import React from 'react';

const Emergency: React.FC = () => {
  const contacts = [
    { name: 'Пожежна служба', phone: '101', color: 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500 hover:text-white' },
    { name: 'Поліція', phone: '102', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500 hover:text-white' },
    { name: 'Швидка допомога', phone: '103', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500 hover:text-white' },
    { name: 'Служба газу', phone: '104', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500 hover:text-white' },
    { name: 'Єдиний номер', phone: '112', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500 hover:text-white' },
  ];

  return (
    <div id="emergency" className="py-12 bg-slate-950/80 border-y border-red-500/20 scroll-mt-24 relative overflow-hidden group animate-sos-flicker">
      {/* Decorative scanline effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-20 -translate-y-full group-hover:animate-[radar_3s_linear_infinite] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 rounded-2xl blur-xl opacity-40 animate-pulse"></div>
              <div className="relative w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/40">
                <svg className="w-8 h-8 text-white animate-[bounce_1s_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-white font-black uppercase tracking-[0.3em] text-sm mb-1 flex items-center gap-2">
                Екстрений зв'язок
                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
              </p>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest opacity-60">Доступно без мережі та балансу</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {contacts.map((contact) => (
              <a 
                key={contact.phone}
                href={`tel:${contact.phone}`}
                className={`${contact.color} border px-8 py-4 rounded-[1.5rem] flex items-center space-x-4 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group/btn`}
              >
                <span className="font-black text-2xl tracking-tighter transition-transform group-hover/btn:-rotate-6">{contact.phone}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.15em] border-l border-current pl-4">{contact.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;