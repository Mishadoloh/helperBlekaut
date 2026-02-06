
import React, { useState } from 'react';

const Registration: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
    // В реальному додатку тут був би запит до API
  };

  if (isRegistered) {
    return (
      <div className="py-24 bg-slate-900 text-center">
        <div className="max-w-md mx-auto bg-slate-800/50 p-12 rounded-[3rem] border border-amber-500/30">
          <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <svg className="w-10 h-10 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-4">Вітаємо у спільноті!</h2>
          <p className="text-slate-400 mb-8">Ми надіслали лист для підтвердження на вашу пошту. Тепер ви можете зберігати улюблені рецепти.</p>
          <button 
            onClick={() => setIsRegistered(false)}
            className="text-amber-500 font-bold hover:underline"
          >
            Повернутися назад
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-slate-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] p-8 md:p-16 border border-white/5 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Приєднуйся до спільноти</h2>
            <p className="text-slate-400">Отримуй сповіщення про нові рецепти та зберігай корисні інструкції у свій кабінет.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Ім'я</label>
              <input 
                type="text" 
                className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="Твоє ім'я"
                required
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Електронна пошта</label>
              <input 
                type="email" 
                className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="email@example.com"
                required
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Пароль</label>
              <input 
                type="password" 
                className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="••••••••"
                required
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-5 rounded-2xl transition-all shadow-lg shadow-amber-900/40 text-lg mt-4"
            >
              Створити акаунт
            </button>
            <p className="text-center text-slate-500 text-xs mt-6">
              Реєструючись, ви погоджуєтесь з правилами спільноти та затишку.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
