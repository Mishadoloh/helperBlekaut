
import React from 'react';
import { View } from '../App';

interface HeroProps {
  onNavigate: (view: View) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] z-0"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[100px] z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full">
                <span className="flex items-center space-x-2">
                  <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Твій гід у темні часи</span>
                </span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8">
              Зберігай <span className="amber-gradient text-glow">тепло та світло</span> всередині.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Найповніша база знань для виживання в умовах блекауту: від швидких рецептів до схем утеплення оселі.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button 
                onClick={() => onNavigate('recipes')} 
                className="bg-amber-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-amber-500 transition-all shadow-xl shadow-amber-900/20 text-center flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                База знань
              </button>
              <button 
                onClick={() => onNavigate('warmth')}
                className="bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-slate-700 transition-all text-center"
              >
                Як зігрітися?
              </button>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative z-20 group">
              <div className="relative rounded-[3rem] overflow-hidden border-8 border-slate-800/50 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <img 
                  src="public/images/chatgpt-image.png.png" 
                  alt="Затишок при свічках" 
                  className="w-full h-auto opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 text-left">
                  <p className="text-white text-3xl font-bold mb-2">Ми вистоїмо.</p>
                  <p className="text-amber-500 font-medium">Світло завжди перемагає.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
