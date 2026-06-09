import { motion } from 'motion/react';
import elstateLogo from '../assets/elstate-logo.svg';

export function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="w-full flex flex-col bg-brand-beige-light text-black font-sans h-[100dvh] overflow-hidden">
      {/* Hero Section — plain beige, no pattern */}
      <section className="relative h-full flex flex-col items-center justify-center p-6 lg:p-12 text-center bg-brand-beige-light">
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
            className="bg-brand-gold text-white px-12 py-5 font-bold tracking-[0.15em] text-sm uppercase hover:bg-brand-gold-dark transition-colors duration-300 shadow-xl shadow-brand-gold/10 mb-8 rounded-lg"
          >
            Начать тест
          </button>

          <p className="text-base md:text-lg text-brand-gray-dark max-w-2xl mx-auto leading-relaxed font-light">
            Пройдите тест из 4 вопросов и узнайте свою идеальную стратегию на рынке недвижимости ОАЭ.
          </p>
        </div>
      </section>
    </div>
  );
}
