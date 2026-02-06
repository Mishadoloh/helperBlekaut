
import React, { useState } from 'react';

const Schedules: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<number>(1);
  
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

  return (
    <div className="py-24 relative overflow-hidden min-h-screen">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-blue-500 font-black uppercase tracking-[0.4em] text-xs mb-4">Плануй свій час</h2>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Графіки відключень</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Оберіть свою групу, щоб побачити ймовірні часи відсутності електроенергії та спланувати роботу заздалегідь.</p>
        </div>

        <div className="flex justify-center gap-3 mb-12">
           {[1, 2, 3, 4, 5, 6].map((group) => (
             <button
               key={group}
               onClick={() => setSelectedGroup(group)}
               className={`w-14 h-14 rounded-2xl font-black text-lg transition-all border flex items-center justify-center ${
                 selectedGroup === group 
                   ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-110' 
                   : 'bg-white/5 border-white/10 text-slate-500 hover:text-white hover:border-blue-500/30'
               }`}
             >
               {group}
             </button>
           ))}
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl relative">
           <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                 <thead>
                    <tr className="bg-white/5">
                       <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest border-r border-white/5">Час / День</th>
                       {days.map(d => (
                         <th key={d} className="p-6 text-[10px] font-black text-white uppercase tracking-widest">{d}</th>
                       ))}
                    </tr>
                 </thead>
                 <tbody>
                    {hours.map(hour => (
                       <tr key={hour} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-xs font-black text-slate-400 border-r border-white/5">{hour}:00</td>
                          {days.map((day, i) => {
                             // Імітація графіка: випадкові відключення для візуалізації
                             const isOff = (hour + i + selectedGroup) % 3 === 0;
                             const isMaybe = (hour + i + selectedGroup) % 5 === 0;
                             
                             return (
                               <td key={day} className="p-1">
                                  <div className={`h-10 rounded-lg mx-1 flex items-center justify-center transition-all ${
                                    isOff 
                                      ? 'bg-blue-500/20 border border-blue-500/30' 
                                      : isMaybe 
                                      ? 'bg-amber-500/10 border border-amber-500/20' 
                                      : 'bg-emerald-500/10 border border-emerald-500/20'
                                  }`}>
                                     {isOff && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]"></div>}
                                  </div>
                               </td>
                             );
                          })}
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           <div className="p-10 border-t border-white/10 bg-black/20 grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4">
                 <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/50"></div>
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Світло є</span>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="w-4 h-4 rounded bg-blue-500/20 border border-blue-500/50"></div>
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Відключення</span>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="w-4 h-4 rounded bg-amber-500/10 border border-amber-500/50"></div>
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Можливе відключення</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Schedules;
