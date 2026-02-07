
import React, { useState, useMemo } from 'react';
import { Dish, DishCategory } from '../types';
import { INGREDIENTS_DB } from './Shop';

interface RecipesProps {
  onAddToCart: (item: any) => void;
}

const dishesData: Dish[] = [
  { id: 1, title: 'Гречка в термосі', category: 'термос', time: '2 год', ingredients: ['Гречка', 'Сіль йодована', 'Олія соняшникова'], description: 'Базовий спосіб приготування поживної крупи без доступу до плити.', instructions: 'Промийте 1 склянку гречки. Засипте в термос. Залийте 2 склянками окропу. Додайте сіль та олію. Щільно закрийте та залиште на 2-3 години. Страва буде гарячою та розсипчастою.' },
  { id: 2, title: 'Кускус з тунцем', category: 'без_вогню', time: '5 хв', ingredients: ['Кускус', 'Тунець консервований', 'Сіль йодована', 'Олія соняшникова'], description: 'Високобілкова страва, що готується миттєво.', instructions: 'Насипте кускус у глибоку миску. Залийте водою (можна холодною) у пропорції 1:1. Почекайте 5-10 хвилин. Додайте консервований тунець, сіль та ложку олії. Ретельно перемішайте.' },
  { id: 3, title: 'Вівсянка з родзинками', category: 'швидко', time: '15 хв', ingredients: ['Вівсяні пластівці', 'Родзинки', 'Мед натуральний'], description: 'Енергетичний сніданок для підтримки сил.', instructions: 'Вівсяні пластівці залийте водою або соком. Залиште для набухання на 15 хвилин. Додайте жменю родзинок та мед для солодкості. Можна також додати горіхи за наявності.' },
  { id: 4, title: 'Салат з білої квасолі', category: 'ситне', time: '5 хв', ingredients: ['Квасоля біла', 'Оливки без кісточки', 'Олія соняшникова', 'Суміш спецій'], description: 'Ситний салат з готових до вживання інгредієнтів.', instructions: 'Відкрийте банку білої квасолі, злийте зайву рідину. Додайте нарізані оливки. Заправте соняшниковою олією та сумішшю спецій. Добре перемішайте.' },
  { id: 5, title: 'Паштет на хлібцях', category: 'швидко', time: '2 хв', ingredients: ['Паштет печінковий', 'Хлібці пшеничні'], description: 'Максимально швидкий перекус.', instructions: 'Візьміть пшеничні хлібці. Відкрийте банку печінкового паштету. Рівномірно розподіліть паштет по поверхні хлібців. Смакує з чаєм або сухофруктами.' },
  { id: 6, title: 'Рис з кукурудзою', category: 'термос', time: '3 год', ingredients: ['Рис пропарений', 'Кукурудза солодка', 'Сіль йодована'], description: 'Гарячий гарнір з додаванням солодких зерен.', instructions: 'Промитий рис засипте в термос (1/3 об’єму). Залийте окропом. Через 3 години злийте воду, якщо залишилась. Додайте консервовану кукурудзу та сіль.' },
  { id: 7, title: 'Нут у томаті', category: 'ситне', time: '5 хв', ingredients: ['Нут консервований', 'Томатна паста', 'Суміш спецій'], description: 'Пряна страва у середземноморському стилі.', instructions: 'Змішайте консервований нут з двома ложками томатної пасти. Додайте універсальну суміш спецій. Якщо є можливість, підігрійте на пальнику, якщо ні — вживайте холодним.' },
  { id: 8, title: 'Роли з лаваша', category: 'без_вогню', time: '5 хв', ingredients: ['Лаваш тонкий', 'Кукурудза солодка', 'Квасоля біла'], description: 'Зручна форма подачі звичних овочів.', instructions: 'Розстеліть лист лаваша. На край викладіть суміш квасолі та кукурудзи. Туго згорніть рулетом. Можна додати будь-який паштет для соковитості.' },
  { id: 9, title: 'Сендвіч з сардинами', category: 'швидко', time: '3 хв', ingredients: ['Сардини в олії', 'Галети'], description: 'Перекус з високим вмістом кальцію.', instructions: 'Розім’яти сардина у тарілці разом з олією з консерви. Викласти отриману масу на галети. Зверху можна покласти шматочок твердого сиру.' },
  { id: 10, title: 'Енергетик з фініків', category: 'десерт', time: '10 хв', ingredients: ['Фініки сушені', 'Горіхи волоські', 'Какао-порошок'], description: 'Натуральна заміна солодощам.', instructions: 'Вийміть кісточки з фініків. Розімніть їх виделкою. Змішайте з подрібненими волоськими горіхами. Сформуйте невеликі кульки та обваляйте їх у какао-порошку.' },
  { id: 11, title: 'Салат "Протеїн"', category: 'без_вогню', time: '5 хв', ingredients: ['Тунець консервований', 'Кукурудза солодка', 'Оливки без кісточки'], description: 'Поживна суміш, багата на білок та корисні жири.', instructions: 'Злийте рідину з тунця та кукурудзи. Змішайте інгредієнти у глибокій мисці. Додайте нарізані оливки. Можна заправити олією з консерви тунця.' },
  { id: 12, title: 'Булгур з горіхами', category: 'термос', time: '2.5 год', ingredients: ['Булгур', 'Горіхи волоські', 'Сіль йодована'], description: 'Ситна каша з приємним горіховим присмаком.', instructions: 'Засипте булгур у термос (1/3 об’єму). Додайте сіль та подрібнені горіхи. Залийте окропом. Залиште на 2.5 години. Смакує як самостійна страва або гарнір.' },
  { id: 13, title: 'Червона сочевиця', category: 'термос', time: '1.5 год', ingredients: ['Сочевиця червона', 'Томатна паста', 'Сіль йодована'], description: 'М’яка каша, що швидко готується навіть без варіння.', instructions: 'Червона сочевиця дуже ніжна. Промийте її, засипте в термос. Додайте томатну пасту та сіль. Залийте окропом. Через 1.5 години ви отримаєте густу поживну кашу.' },
  { id: 14, title: 'Какао-батончик', category: 'десерт', time: '5 хв', ingredients: ['Какао-порошок', 'Мед натуральний', 'Горіхи волоські'], description: 'Домашні солодощі для швидкої енергії.', instructions: 'Змішайте мед з какао до стану густої пасти. Додайте подрібнені горіхи. Сформуйте невеликі плитки або кульки. Можна вживати відразу.' },
  { id: 15, title: 'Енерго-хлібці', category: 'швидко', time: '3 хв', ingredients: ['Хлібці пшеничні', 'Арахісова паста', 'Фініки сушені'], description: 'Ідеально для сніданку чи перекусу під час активності.', instructions: 'Намажте хлібці арахісовою пастою. Зверху викладіть нарізані на слайси фініки (попередньо видаливши кісточки). Поєднання білка та швидких вуглеводів.' },
  { id: 16, title: 'Морський коктейль', category: 'без_вогню', time: '2 хв', ingredients: ['Морська капуста', 'Кукурудза солодка', 'Олія соняшникова'], description: 'Легкий салат з йодом та вітамінами.', instructions: 'Змішайте морську капусту з консервованою кукурудзою. Додайте трохи соняшникової олії. Дуже швидка та корисна страва.' },
  { id: 17, title: 'Ячка з паштетом', category: 'термос', time: '3 год', ingredients: ['Ячна крупа', 'Паштет печінковий', 'Сіль йодована'], description: 'Ситна страва, що нагадує домашню кашу з м’ясом.', instructions: 'Засипте ячну крупу в термос. Залийте окропом (1:2). Через 3 години, коли каша набрякне, змішайте її з печінкового паштетом. Добре перемішайте до однорідності.' },
  { id: 18, title: 'Закуска "Шпротна"', category: 'без_вогню', time: '4 хв', ingredients: ['Шпроти в олії', 'Галети', 'Оливки без кісточки'], description: 'Класичне поєднання для швидкої вечері.', instructions: 'На галетне печиво викладіть по одній шпротині. Зверху прикрасьте половинкою оливки. Сіль додавати не потрібно, консерва вже достатньо солона.' },
  { id: 19, title: 'Солодка вівсянка', category: 'швидко', time: '10 хв', ingredients: ['Вівсяні пластівці', 'Згущене молоко', 'Родзинки'], description: 'Ситний десертний сніданок.', instructions: 'Пластівці залийте невеликою кількістю окропу. Залиште на 10 хвилин під кришкою. Додайте згущене молоко та родзинки. Перемішайте.' },
  { id: 20, title: 'Пшеничка Артек', category: 'термос', time: '2 год', ingredients: ['Пшенична крупа', 'Олія соняшникова', 'Сіль йодована'], description: 'Традиційна пшенична каша, розсипчаста та тепла.', instructions: 'Промийте крупу Артек. Засипте в термос, додайте сіль та олію. Залийте окропом у пропорції 1:2. Закрийте термос і зачекайте 2 години. Каша вийде ідеальної консистенції.' },
];

type TimeFilter = 'all' | '5' | '15' | 'long';

const Recipes: React.FC<RecipesProps> = ({ onAddToCart }) => {
  const [filter, setFilter] = useState<DishCategory | 'всі'>('всі');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleBuyIngredients = (ingredients: string[]) => {
    ingredients.forEach(name => {
      const item = INGREDIENTS_DB.find(i => i.name === name);
      if (item) onAddToCart(item);
    });
  };

  const parseTimeToMinutes = (time: string): number => {
    const match = time.match(/(\d+)\s*(хв|год)/);
    if (!match) return 0;
    const val = parseInt(match[1]);
    const unit = match[2];
    return unit === 'год' ? val * 60 : val;
  };

  const filteredDishes = useMemo(() => {
    let result = filter === 'всі' ? dishesData : dishesData.filter(d => d.category === filter);
    
    // Preparation Time Filtering
    if (timeFilter !== 'all') {
      result = result.filter(d => {
        const mins = parseTimeToMinutes(d.time);
        if (timeFilter === '5') return mins <= 5;
        if (timeFilter === '15') return mins <= 15;
        if (timeFilter === 'long') return mins > 15;
        return true;
      });
    }

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.filter(d => 
        d.title.toLowerCase().includes(query) || 
        d.ingredients.some(ing => ing.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [filter, timeFilter, searchTerm]);

  return (
    <div className="py-24 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter">
            Книга <span className="text-cyan-500 text-glow">Рецептів</span>
          </h1>
          
          {/* Пошуковий рядок */}
          <div className="max-w-2xl mx-auto mb-10 relative">
            <input 
              type="text" 
              placeholder="Шукай за назвою або інгредієнтом (напр. 'гречка' або 'тунець')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/60 border border-white/10 rounded-[2rem] px-8 py-5 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-sm font-medium placeholder:text-slate-600 shadow-xl"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>

          <div className="space-y-6">
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              <span className="w-full md:w-auto flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2 md:mb-0 md:mr-4">Категорія:</span>
              {['всі', 'без_вогню', 'швидко', 'ситне', 'термос', 'десерт'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as any)}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${filter === cat ? 'bg-cyan-500 border-cyan-400 text-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}
                >
                  {cat.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Time Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              <span className="w-full md:w-auto flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2 md:mb-0 md:mr-4">Час приготування:</span>
              {[
                { id: 'all', label: 'Будь-який' },
                { id: '5', label: '⚡ До 5 хв' },
                { id: '15', label: '⏱️ До 15 хв' },
                { id: 'long', label: '🍲 Довго' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTimeFilter(t.id as TimeFilter)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${timeFilter === t.id ? 'bg-slate-700 border-cyan-500/50 text-cyan-400 shadow-lg' : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredDishes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDishes.map((dish) => (
              <div 
                key={dish.id} 
                className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all cursor-pointer group relative overflow-hidden flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-cyan-500 text-[9px] font-black uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">{dish.category.replace('_', ' ')}</span>
                  <div className="flex items-center space-x-2 text-slate-500 text-[10px] font-bold uppercase">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{dish.time}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors leading-tight">{dish.title}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">{dish.description}</p>
                
                <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dish.ingredients.slice(0, 3).map((ing, i) => (
                      <span key={i} className="text-[8px] bg-white/5 border border-white/10 px-2 py-1 rounded-md text-slate-500 font-bold uppercase">{ing}</span>
                    ))}
                    {dish.ingredients.length > 3 && <span className="text-[8px] text-slate-600 font-bold">+{dish.ingredients.length - 3}</span>}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleBuyIngredients(dish.ingredients)}
                      className="flex-1 py-4 bg-emerald-600/10 border border-emerald-500/20 rounded-2xl text-[9px] font-black text-emerald-500 uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      🛒 Купити все
                    </button>
                    <button 
                      onClick={() => setExpandedId(expandedId === dish.id ? null : dish.id)}
                      className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      {expandedId === dish.id ? 'Сховати' : 'Інструкція'}
                    </button>
                  </div>
                </div>

                {expandedId === dish.id && (
                  <div className="mt-8 animate-in fade-in slide-in-from-top-4 space-y-6">
                    <div>
                      <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-3">Необхідні інгредієнти:</p>
                      <div className="flex flex-wrap gap-2">
                        {dish.ingredients.map((ing, i) => (
                          <span key={i} className="text-[10px] bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-xl text-cyan-300 font-bold uppercase tracking-wider">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-3">Як готувати:</p>
                      <p className="text-slate-300 text-sm leading-relaxed bg-black/40 p-6 rounded-2xl border border-white/5 shadow-inner">
                        {dish.instructions}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-slate-900/20 border border-dashed border-white/5 rounded-[3rem]">
            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
               <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p className="text-slate-500 font-black uppercase tracking-widest text-sm">Страви за такими параметрами відсутні</p>
            <button 
              onClick={() => {setSearchTerm(''); setFilter('всі'); setTimeFilter('all');}} 
              className="mt-6 px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-cyan-500 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Скинути всі фільтри
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;