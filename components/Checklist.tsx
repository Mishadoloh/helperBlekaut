
import React, { useState, useEffect } from 'react';
import { ChecklistItem } from '../types';

const defaultChecklist: ChecklistItem[] = [
  { id: 1, task: 'Запас технічної та питної води (на 3 доби)', category: 'база' },
  { id: 2, task: 'Повербанки заряджені на 100%', category: 'база' },
  { id: 3, task: 'Ліхтарики та запасні батарейки', category: 'база' },
  { id: 4, task: 'Аптечка: знеболювальні, сорбенти, пластир', category: 'безпека' },
  { id: 5, task: 'Туристична газова плитка та балони', category: 'комфорт' },
];

const Checklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(defaultChecklist);
  const [completed, setCompleted] = useState<number[]>([]);
  const [newItemText, setNewItemText] = useState('');

  const toggleTask = (id: number) => {
    setCompleted(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    
    const newItem: ChecklistItem = {
      id: Date.now(),
      task: newItemText,
      category: 'комфорт'
    };
    
    setItems([...items, newItem]);
    setNewItemText('');
  };

  const removeItem = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems(items.filter(item => item.id !== id));
    setCompleted(completed.filter(i => i !== id));
  };

  return (
    <div className="py-24 bg-[#0a0f1e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4">Персональний план</h2>
          <p className="text-4xl font-extrabold text-white mb-4">Твоя готовність</p>
          <p className="text-slate-400">Створіть власний список необхідного. Дані зберігаються у вашій сесії.</p>
        </div>

        <div className="bg-slate-900/50 rounded-[2.5rem] p-6 md:p-10 border border-white/5 backdrop-blur-sm shadow-2xl">
          <form onSubmit={addItem} className="mb-10 flex gap-4">
            <input 
              type="text" 
              placeholder="Додати свій пункт..."
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              className="flex-1 bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500"
            />
            <button 
              type="submit"
              className="bg-amber-600 text-white px-8 rounded-2xl font-bold hover:bg-amber-500 transition-all flex items-center"
            >
              Додати
            </button>
          </form>

          <div className="space-y-3">
            {items.map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleTask(item.id)}
                className={`flex items-center p-5 rounded-2xl cursor-pointer transition-all border group ${
                  completed.includes(item.id) 
                    ? 'bg-amber-500/5 border-amber-500/20' 
                    : 'bg-slate-800/40 border-white/5 hover:border-white/10'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg mr-4 flex items-center justify-center border-2 transition-all ${
                  completed.includes(item.id) ? 'bg-amber-500 border-amber-500' : 'border-slate-600'
                }`}>
                  {completed.includes(item.id) && (
                    <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-base font-medium transition-all ${completed.includes(item.id) ? 'text-slate-500 line-through' : 'text-white'}`}>
                    {item.task}
                  </p>
                </div>
                <button 
                  onClick={(e) => removeItem(item.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-600 hover:text-red-500 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">
              <span>Прогрес підготовки</span>
              <span className="text-amber-500">{Math.round((completed.length / items.length) * 100 || 0)}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-amber-500 h-full transition-all duration-700 ease-out" 
                style={{ width: `${(completed.length / items.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checklist;
