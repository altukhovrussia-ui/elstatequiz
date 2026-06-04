import { Banknote, TrendingUp, Compass, Crown, Map, PieChart, MapPin, Clock, MessageSquare, UserCheck, Gift } from 'lucide-react';
import { motion } from 'motion/react';
import { Footer } from './Footer';
import elstateLogo from '../assets/elstate-logo.svg';

export function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="w-full flex flex-col bg-brand-beige-light text-black font-sans">
      {/* Hero Section — plain beige, no pattern */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 lg:p-12 text-center bg-brand-beige-light">
        {/* Header */}
        <header className="absolute top-0 left-0 w-full z-50 flex justify-center items-center p-8 lg:px-16">
          <img src={elstateLogo} alt="Elstate" className="h-6 md:h-7" />
        </header>

        <div className="relative z-10 flex flex-col items-center max-w-4xl pt-20">
          <span className="tracking-[0.3em] text-brand-gold text-xs uppercase mb-6 font-semibold">
            МЕНЬШЕ ЧЕМ ЗА 5 МИНУТ
          </span>
          <h1
            className="font-serif uppercase font-bold text-black mb-8 whitespace-nowrap"
            style={{ fontSize: 'clamp(1.8rem, 7vw, 7rem)' }}
          >
            КАКОЙ ВЫ ИНВЕСТОР?
          </h1>

          {/* Button ABOVE subtitle */}
          <button
            onClick={onStart}
            className="bg-brand-gold text-white px-12 py-5 font-bold tracking-[0.15em] text-sm uppercase hover:bg-brand-gold-dark transition-colors duration-300 shadow-xl shadow-brand-gold/10 mb-8"
          >
            Начать тест
          </button>

          <p className="text-base md:text-lg text-brand-gray-dark max-w-2xl mx-auto leading-relaxed font-light">
            Пройдите тест из 5 вопросов и узнайте свою идеальную стратегию на рынке недвижимости ОАЭ.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 cursor-pointer opacity-50 hover:opacity-80 transition-opacity"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-gray font-medium">Scroll</span>
            <div className="w-6 h-10 border-2 border-brand-gray/40 rounded-full flex items-start justify-center p-1.5">
              <motion.div
                className="w-1.5 h-1.5 bg-brand-gold rounded-full"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Archetype Preview */}
      <section className="py-24 lg:py-40 px-6 md:px-12 bg-white flex flex-col items-center">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-black mb-20 text-center font-medium">
          6 типов инвесторов
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 max-w-7xl w-full">
          {[
            { title: 'Рантье', desc: 'Фокус на стабильном пассивном доходе от долгосрочной аренды.', icon: Banknote },
            { title: 'Флиппер', desc: 'Быстрая перепродажа объектов на этапе строительства для максимизации прибыли.', icon: TrendingUp },
            { title: 'Стратег', desc: 'Глубокий анализ рынка, поиск недооцененных районов с высоким потенциалом роста.', icon: Compass },
            { title: 'Статусный', desc: 'Инвестиции в эксклюзивные и трофейные объекты премиум-класса.', icon: Crown },
            { title: 'Релокант', desc: 'Покупка недвижимости для собственного проживания и получения ВНЖ.', icon: Map },
            { title: 'Диверсификатор', desc: 'Распределение капитала для защиты активов и снижения рисков.', icon: PieChart },
          ].map((item, i) => (
            <div key={i} className="flex flex-col border-t border-zinc-200 pt-8 group cursor-default">
              <item.icon className="w-8 h-8 text-brand-gold mb-8 stroke-[1.5] group-hover:-translate-y-2 transition-transform duration-500" />
              <h3 className="font-serif text-2xl uppercase tracking-wide font-medium mb-3 text-black">{item.title}</h3>
              <p className="text-zinc-500 font-sans leading-relaxed text-base font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About the Quiz */}
      <section className="py-24 lg:py-40 px-6 md:px-12 bg-[#F9F9F9] flex flex-col items-center">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32">
          <div className="flex flex-col">
            <span className="tracking-[0.2em] text-brand-gray text-xs uppercase mb-6 font-bold">Назначение</span>
            <h3 className="font-serif text-4xl md:text-5xl mb-16 text-black uppercase leading-[1.1] tracking-tight font-medium">Зачем<br/>проходить?</h3>
            <div className="flex flex-col">
              {[
                { icon: MapPin, text: 'Точный подбор эмирата и района' },
                { icon: TrendingUp, text: 'Оценка потенциальной доходности' },
                { icon: Clock, text: 'Экономия времени на анализ рынка' }
              ].map((item, i) => (
                <div key={i} className="border-b border-zinc-200 py-8 flex items-center gap-8 group">
                  <item.icon className="w-8 h-8 text-brand-gold stroke-[1.5] flex-shrink-0 group-hover:scale-110 transition-transform duration-500" />
                  <div className="text-lg md:text-xl text-zinc-900 font-light tracking-wide">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="tracking-[0.2em] text-brand-gray text-xs uppercase mb-6 font-bold">Процесс</span>
            <h3 className="font-serif text-4xl md:text-5xl mb-16 text-black uppercase leading-[1.1] tracking-tight font-medium">Как это<br/>работает</h3>
            <div className="flex flex-col">
              {[
                { icon: MessageSquare, text: 'Ответьте на 5 вопросов' },
                { icon: UserCheck, text: 'Получите свой профиль' },
                { icon: Gift, text: 'Заберите топ-3 проекта под вашу стратегию' }
              ].map((item, i) => (
                <div key={i} className="border-b border-zinc-200 py-8 flex items-center gap-8 group">
                  <item.icon className="w-8 h-8 text-brand-gold stroke-[1.5] flex-shrink-0 group-hover:scale-110 transition-transform duration-500" />
                  <div className="text-lg md:text-xl text-zinc-900 font-light tracking-wide">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 lg:py-48 px-6 bg-black flex flex-col items-center text-center">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white uppercase tracking-tighter mb-16 max-w-4xl leading-[1.1]">
          ГОТОВЫ УЗНАТЬ <br/>
          <span className="text-brand-gold italic font-light lowercase tracking-normal">свою стратегию?</span>
        </h2>
        <button
          onClick={onStart}
          className="bg-brand-gold text-white px-14 py-6 font-sans font-bold tracking-[0.2em] text-sm uppercase hover:bg-brand-gold-dark transition-colors duration-300"
        >
          Начать тест
        </button>
      </section>

      <Footer />
    </div>
  );
}
