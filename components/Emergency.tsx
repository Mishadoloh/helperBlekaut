
import React from 'react';

const Emergency: React.FC = () => {
  const contacts = [
    { name: 'Пожежна служба', phone: '101', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    { name: 'Поліція', phone: '102', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { name: 'Швидка допомога', phone: '103', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    { name: 'Служба газу', phone: '104', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { name: 'Єдиний номер', phone: '112', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  ];

  return (
    <div className="py-12 bg-slate-950 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center animate-pulse">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
            <div>
              <p className="text-white font-bold uppercase tracking-widest text-xs">Екстрений зв'язок</p>
              <p className="text-slate-500 text-sm">Працює за будь-яких умов</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {contacts.map((contact) => (
              <a 
                key={contact.phone}
                href={`tel:${contact.phone}`}
                className={`${contact.color} border px-6 py-3 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform`}
              >
                <span className="font-black text-xl">{contact.phone}</span>
                <span className="text-xs font-bold uppercase tracking-wider">{contact.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
