import { motion } from 'motion/react';
import { Download, ExternalLink } from 'lucide-react';
import { guideNames } from '../data';
import type { Archetype } from '../data';

const archetypeData: Record<string, { emoji: string; traits: string[]; description: string; features: string[]; expectedReturn: string }> = {
  'Рантье': {
    emoji: '🏦',
    traits: ['Стабильность', 'Пассивный доход', 'Долгосрочность'],
    description: 'Ваш фокус — надёжный арендный доход. Вы предпочитаете проверенные локации с гарантированной доходностью и минимальным участием в управлении.',
    features: ['Доходность 7–10% годовых', 'Локации: Dubai Marina, JLT, Business Bay', 'Срок окупаемости: 10–14 лет', 'Минимальное управление через агента'],
    expectedReturn: '7–10% годовых',
  },
  'Флиппер': {
    emoji: '⚡',
    traits: ['Скорость', 'Высокий ROI', 'Активные сделки'],
    description: 'Вы нацелены на быструю перепродажу объектов на этапе строительства для максимальной прибыли. Ваш горизонт — 1–3 года.',
    features: ['ROI 20–40% за 1–3 года', 'Локации: Dubailand, JVC, MBR City', 'Off-plan объекты с рассрочкой', 'Быстрый выход из актива'],
    expectedReturn: '20–40% за цикл',
  },
  'Стратег': {
    emoji: '📊',
    traits: ['Аналитика', 'Потенциал роста', 'Недооцененные районы'],
    description: 'Вы ищете скрытые жемчужины рынка и входите в проекты на ранних стадиях развития инфраструктуры для защиты и роста капитала.',
    features: ['Рост цены 30–50% за 5 лет', 'Локации: Dubai South, Al Furjan, Meydan', 'Инвестиции в развивающиеся районы', 'Среднесрочная перспектива'],
    expectedReturn: '12–15% годовых',
  },
  'Релокант': {
    emoji: '🌍',
    traits: ['Комфорт', 'ВНЖ', 'Семья'],
    description: 'Ваша цель — жизнь в ОАЭ. Вы ищете баланс между комфортом для семьи, инфраструктурой и инвестиционной привлекательностью.',
    features: ['ВНЖ при покупке от $205 000', 'Локации: Arabian Ranches, Dubai Hills', 'Инфраструктура: школы, парки, медицина', 'Потенциал роста капитала 15–25%'],
    expectedReturn: '15–25% рост капитала',
  },
};

export function Handoff({ archetype }: { archetype: string }) {
  const data = archetypeData[archetype] || archetypeData['Рантье'];
  const guideName = guideNames[archetype as Archetype] || guideNames['Рантье'];

  return (
    <div className="min-h-[100dvh] flex flex-col items-center bg-brand-beige-light overflow-y-auto">
      <div className="w-full max-w-xl flex flex-col items-center px-5 py-8 md:py-12">

        {/* Congrats Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-10"
        >
          <span className="text-brand-gold text-[10px] md:text-xs tracking-[0.3em] uppercase block mb-3 font-medium">
            Поздравляем
          </span>
          <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl text-black font-bold uppercase leading-tight">
            ВЫ — {archetype.toUpperCase()}
          </h1>
        </motion.div>

        {/* Archetype Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full bg-white border border-black/8 shadow-xl rounded-xl overflow-hidden mb-6 md:mb-8"
        >
          {/* Emoji + Traits */}
          <div className="px-5 md:px-8 pt-6 md:pt-8 pb-4 text-center bg-gradient-to-b from-brand-gold/[0.06] to-transparent">
            <div className="w-14 h-14 md:w-20 md:h-20 mx-auto mb-3 md:mb-5 rounded-full bg-brand-gold/10 border-2 border-brand-gold/30 flex items-center justify-center">
              <span className="text-2xl md:text-4xl">{data.emoji}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
              {data.traits.map((trait, i) => (
                <span key={i} className="px-3 md:px-4 py-1 md:py-1.5 border border-brand-gold/20 text-brand-gold text-[10px] md:text-[11px] tracking-wider uppercase font-medium rounded-full">
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="px-5 md:px-8 py-4 md:py-5">
            <p className="text-black/60 text-xs md:text-sm leading-relaxed font-light text-center">
              {data.description}
            </p>
          </div>

          {/* Features */}
          <div className="px-5 md:px-8 pb-5 md:pb-7">
            <div className="p-4 md:p-5 border border-brand-gold/10 bg-brand-beige-light/50 rounded-lg">
              <span className="text-black/40 text-[10px] md:text-xs uppercase tracking-wider font-medium block mb-3">
                Характеристики и доходность
              </span>
              <ul className="space-y-2">
                {data.features.map((f, i) => (
                  <li key={i} className="text-black/70 text-sm font-light flex items-start gap-2">
                    <span className="text-brand-gold mt-0.5">•</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-brand-gold/10">
                <span className="text-[10px] md:text-xs text-brand-gray uppercase tracking-wider">Ожидаемая доходность: </span>
                <span className="text-sm font-semibold text-brand-gold">{data.expectedReturn}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Download CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full text-center mb-8 md:mb-10"
        >
          <p className="text-black/40 text-[10px] md:text-xs mb-4 font-light leading-relaxed">
            Ваш персональный гайд: «{guideName}»
          </p>
          <button
            onClick={() => {/* PDF download logic */}}
            className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 bg-black text-white px-6 py-4 font-semibold tracking-[0.1em] text-xs uppercase hover:bg-zinc-800 transition-colors rounded-lg"
          >
            <Download className="w-4 h-4" />
            Скачать вашу персональную стратегию (PDF)
          </button>
        </motion.div>

        {/* Divider */}
        <div className="w-16 h-[2px] bg-brand-gold mb-6 md:mb-8" />

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="font-serif text-lg md:text-xl text-black font-light mb-2 leading-snug">
            Пока мы готовим вашу<br className="md:hidden" /> индивидуальную подборку...
          </h3>
          <p className="text-xs md:text-sm text-black/50 font-light leading-relaxed max-w-md mb-5">
            Подпишитесь на наш Instagram и напишите в директ слово{' '}
            <strong className="text-brand-gold font-bold tracking-wider font-sans uppercase">ДУБАЙ</strong>
            {' '}— пришлём топ-3 проекта этого месяца с аналитикой по каждому.
          </p>
          <a
            href="https://instagram.com/elstate_dubai"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-col items-center bg-black text-white px-10 py-4 font-semibold tracking-[0.15em] text-xs uppercase hover:bg-zinc-800 transition-all duration-300 gap-1 rounded-lg"
          >
            <span className="flex items-center gap-2">
              Перейти в Instagram
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            <span className="text-white/60 text-[11px] tracking-[0.1em]">@elstate_dubai</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
