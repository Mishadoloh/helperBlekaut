
import React, { useState, useEffect, useMemo } from 'react';

interface Point {
  id: number;
  name: string;
  address: string;
  status: 'online' | 'offline' | 'busy';
  services: string[];
  distance: number; // в метрах для сортування
  coords: { x: number; y: number }; // для візуалізації на сітці
}

const DEFAULT_POINTS: Point[] = [
  { id: 1, name: 'Хаб "Енергія"', address: 'вул. Незалежності, 15', status: 'online', services: ['📶', '🔥', '⚡', '☕'], distance: 450, coords: { x: 25, y: 30 } },
  { id: 2, name: 'ЦНАП Центральний', address: 'пр. Перемоги, 3', status: 'online', services: ['📶', '⚡', '💧'], distance: 1200, coords: { x: 60, y: 45 } },
  { id: 3, name: 'Гімназія №4', address: 'вул. Героїв, 22', status: 'busy', services: ['🔥', '⚡', '🧸'], distance: 2500, coords: { x: 40, y: 70 } },
  { id: 4, name: 'Коворкінг Space', address: 'пл. Ринок, 1', status: 'offline', services: ['📶', '⚡'], distance: 3100, coords: { x: 75, y: 20 } },
];

const Map: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [activeFilter, setActiveFilter] = useState('всі');
  const [sortBy, setSortBy] = useState<'distance' | 'name'>('distance');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredPointId, setHoveredPointId] = useState<number | null>(null);

  // Form state
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('blackout_points');
    if (saved) {
      setPoints(JSON.parse(saved));
    } else {
      setPoints(DEFAULT_POINTS);
    }
  }, []);

  useEffect(() => {
    if (points.length > 0) {
      localStorage.setItem('blackout_points', JSON.stringify(points));
    }
  }, [points]);

  const filteredAndSortedPoints = useMemo(() => {
    let result = [...points];

    // Filtering
    if (activeFilter !== 'всі') {
      const iconMap: Record<string, string> = {
        internet: '📶',
        heat: '🔥',
        power: '⚡'
      };
      result = result.filter(p => p.services.includes(iconMap[activeFilter]));
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [points, activeFilter, sortBy]);

  const handleAddPoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newAddress) return;

    const newPoint: Point = {
      id: Date.now(),
      name: newName,
      address: newAddress,
      status: 'online',
      services: selectedServices.length > 0 ? selectedServices : ['⚡'],
      distance: Math.floor(Math.random() * 5000) + 100,
      coords: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 }
    };

    setPoints([newPoint, ...points]);
    setIsModalOpen(false);
    setNewName('');
    setNewAddress('');
    setSelectedServices([]);
  };

  const toggleService = (icon: string) => {
    setSelectedServices(prev => 
      prev.includes(icon) ? prev.filter(i => i !== icon) : [...prev, icon]
    );
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
      case 'busy': return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
      case 'offline': return 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="py-24 relative overflow-hidden min-h-screen bg-[#020617]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Active Network Monitor</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">
              Мапа <span className="text-amber-500 text-glow">Незламності</span>
            </h1>
            <div className="flex items-center space-x-4">
               <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white/5 border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-2 outline-none focus:border-amber-500/50"
               >
                 <option value="distance">За відстанню</option>
                 <option value="name">За назвою</option>
               </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'всі', label: 'Усі', icon: '📍' },
              { id: 'internet', label: 'Інтернет', icon: '📶' },
              { id: 'heat', label: 'Тепло', icon: '🔥' },
              { id: 'power', label: 'Зарядка', icon: '⚡' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all border ${
                  activeFilter === f.id 
                  ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <span>{f.icon}</span>
                <span className="uppercase tracking-widest">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Tactical Map Visualization */}
          <div className="lg:col-span-8 relative group">
             <div className="relative rounded-[3rem] overflow-hidden border border-white/10 h-[400px] lg:h-[650px] bg-slate-900 shadow-2xl">
                <div className="absolute inset-0 neon-grid opacity-30"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(2,6,23,0.8)_100%)]"></div>
                
                {/* Radar Line */}
                <div className="absolute inset-0 pointer-events-none">
                   <div className="w-full h-px bg-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-[radar_4s_linear_infinite]"></div>
                </div>

                <div className="absolute inset-0 p-12">
                   {filteredAndSortedPoints.map((p) => (
                     <div 
                       key={p.id} 
                       className="absolute transition-all duration-500"
                       style={{ top: `${p.coords.y}%`, left: `${p.coords.x}%` }}
                       onMouseEnter={() => setHoveredPointId(p.id)}
                       onMouseLeave={() => setHoveredPointId(null)}
                     >
                        <div className="relative group/pin cursor-help">
                           <div className={`w-4 h-4 rounded-full border-2 border-white/40 ${getStatusColor(p.status)} ${hoveredPointId === p.id ? 'scale-150 animate-ping' : 'animate-pulse'}`}></div>
                           <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 opacity-0 group-hover/pin:opacity-100 transition-all pointer-events-none z-50">
                              <div className="bg-slate-950 border border-white/10 p-3 rounded-xl shadow-2xl min-w-[150px]">
                                 <p className="text-white text-xs font-bold mb-1">{p.name}</p>
                                 <div className="flex space-x-1">
                                    {p.services.map((s, i) => <span key={i} className="text-[10px]">{s}</span>)}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="absolute bottom-6 right-6">
                   <button 
                    // Fixed: Changed setIsOpen to setIsModalOpen to match the defined state setter.
                    onClick={() => setIsModalOpen(!isModalOpen)}
                    className="bg-amber-500 text-slate-950 p-5 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-110 active:scale-95 transition-all group"
                   >
                      <svg className="w-8 h-8 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                      </svg>
                   </button>
                </div>
             </div>
          </div>

          {/* Points Sidebar */}
          <div className="lg:col-span-4 space-y-4 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
             <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-white font-black uppercase tracking-widest text-xs">Локації ({filteredAndSortedPoints.length})</h3>
                <button 
                  onClick={() => { setPoints(DEFAULT_POINTS); localStorage.removeItem('blackout_points'); }}
                  className="text-slate-600 text-[9px] font-black uppercase hover:text-rose-500 transition-colors"
                >
                  Скинути дані
                </button>
             </div>
             
             {filteredAndSortedPoints.length > 0 ? filteredAndSortedPoints.map((p) => (
                <div 
                  key={p.id} 
                  onMouseEnter={() => setHoveredPointId(p.id)}
                  onMouseLeave={() => setHoveredPointId(null)}
                  className={`group relative transition-all duration-300 ${hoveredPointId === p.id ? 'translate-x-2' : ''}`}
                >
                   <div className="relative p-6 bg-white/5 border border-white/10 rounded-[2rem] transition-all group-hover:border-amber-500/30 group-hover:bg-white/[0.07]">
                      <div className="flex items-start justify-between mb-4">
                         <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                               <div className={`w-2 h-2 rounded-full ${getStatusColor(p.status)}`}></div>
                               <h4 className="text-white font-bold text-lg leading-tight">{p.name}</h4>
                            </div>
                            <p className="text-slate-500 text-xs font-medium">{p.address}</p>
                         </div>
                         <div className="text-right">
                            <span className="text-amber-500 text-[10px] font-black block mb-1">
                              {p.distance < 1000 ? `${p.distance}м` : `${(p.distance/1000).toFixed(1)}км`}
                            </span>
                         </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                         {p.services.map((s, idx) => (
                            <span key={idx} className="w-8 h-8 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-sm shadow-inner group-hover:border-amber-500/20">
                               {s}
                            </span>
                         ))}
                         <button className="ml-auto w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                         </button>
                      </div>
                   </div>
                </div>
             )) : (
               <div className="py-20 text-center border border-dashed border-white/10 rounded-[2rem]">
                  <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Нічого не знайдено</p>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Add Point Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
           <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={() => setIsModalOpen(false)}></div>
           <div className="relative bg-slate-900 border border-amber-500/30 p-8 md:p-12 rounded-[3rem] w-full max-w-lg shadow-[0_0_50px_rgba(245,158,11,0.2)] animate-in zoom-in-95 duration-300">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Додати <span className="text-amber-500">пункт</span></h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">Поділіться світлом з іншими</p>
              
              <form onSubmit={handleAddPoint} className="space-y-5">
                 <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Назва локації</label>
                    <input 
                      autoFocus
                      type="text" 
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Напр. Кав'ярня 'Затишок'"
                      className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Точна адреса</label>
                    <input 
                      type="text" 
                      required
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      placeholder="вул. Світла, 12"
                      className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Доступні послуги</label>
                    <div className="flex flex-wrap gap-2">
                       {['📶', '🔥', '⚡', '☕', '💧', '🧸'].map(icon => (
                         <button
                           key={icon}
                           type="button"
                           onClick={() => toggleService(icon)}
                           className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border transition-all ${
                             selectedServices.includes(icon) 
                             ? 'bg-amber-500 border-amber-400 scale-110 shadow-lg' 
                             : 'bg-white/5 border-white/10'
                           }`}
                         >
                           {icon}
                         </button>
                       ))}
                    </div>
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button 
                      type="button" 
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 bg-white/5 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all border border-white/5"
                    >
                      Скасувати
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 bg-amber-600 text-white font-black uppercase tracking-widest py-4 rounded-2xl shadow-xl shadow-amber-900/40 hover:bg-amber-500 transition-all active:scale-95"
                    >
                      Створити
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
      
      <style>{`
        @keyframes radar {
          from { top: 0%; }
          to { top: 100%; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.4);
        }
      `}</style>
    </div>
  );
};

export default Map;
