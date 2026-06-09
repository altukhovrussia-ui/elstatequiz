import { motion } from 'motion/react';
import { Download, ExternalLink } from 'lucide-react';
import { guideNames } from '../data';
import type { Archetype } from '../data';

const archetypeData: Record<string, { emoji: string; traits: string[]; description: string; stats: { label: string; value: string }[] }> = {
  'Рантье': {
    emoji: '🏦',
    traits: ['Стабильность', 'Пассивный доход', 'Долгосрочность'],
    description: 'Ваш фокус — надёжный арендный доход. Вы предпочитаете проверенные локации с гарантированной доходностью и минимальным участием в управлении.',
    stats: [
      { label: 'Доходность', value: '7–10% / год' },
      { label: 'Горизонт', value: '10–14 лет' },
      { label: 'Управление', value: 'Через агента' },
    ],
  },
  'Флиппер': {
    emoji: '⚡',
    traits: ['Скорость', 'Высокий ROI', 'Активные сделки'],
    description: 'Вы нацелены на быструю перепродажу объектов на этапе строительства для максимальной прибыли. Ваш горизонт — 1–3 года.',
    stats: [
      { label: 'ROI', value: '20–40%' },
      { label: 'Горизонт', value: '1–3 года' },
      { label: 'Стратегия', value: 'Off-plan' },
    ],
  },
  'Стратег': {
    emoji: '📊',
    traits: ['Аналитика', 'Потенциал роста', 'Недооцененные районы'],
    description: 'Вы ищете скрытые жемчужины рынка и входите в проекты на ранних стадиях развития инфраструктуры для защиты и роста капитала.',
    stats: [
      { label: 'Рост цены', value: '30–50% / 5 лет' },
      { label: 'Горизонт', value: '3–7 лет' },
      { label: 'Фокус', value: 'Новые районы' },
    ],
  },
  'Релокант': {
    emoji: '🌍',
    traits: ['Комфорт', 'ВНЖ', 'Семья'],
    description: 'Ваша цель — жизнь в ОАЭ. Вы ищете баланс между комфортом для семьи, инфраструктурой и инвестиционной привлекательностью.',
    stats: [
      { label: 'ВНЖ', value: 'от $205 000' },
      { label: 'Рост капитала', value: '15–25%' },
      { label: 'Фокус', value: 'Семья' },
    ],
  },
};

export function Handoff({ archetype }: { archetype: string }) {
  const data = archetypeData[archetype] || archetypeData['Рантье'];
  const guideName = guideNames[archetype as Archetype] || guideNames['Рантье'];

  return (
    <div className="h-[100dvh] flex flex-col items-center bg-brand-beige-light overflow-hidden px-4 py-5 md:py-8">

      {/* Spacer to center content */}
      <div className="flex-1" />

      {/* Header — pushed to top, big */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center pt-2 md:pt-4 mb-5 md:mb-6"
      >
        <span className="text-brand-gold text-[10px] md:text-xs tracking-[0.3em] uppercase block mb-2 font-medium">
          Поздравляем
        </span>
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-black font-bold uppercase leading-none">
          ВЫ — {archetype.toUpperCase()}
        </h1>
      </motion.div>

      {/* Compact Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="w-full max-w-lg bg-white border border-black/8 shadow-lg rounded-xl overflow-hidden mb-4 md:mb-5"
      >
        {/* Emoji + Traits row */}
        <div className="flex items-center gap-3 px-5 md:px-6 pt-4 md:pt-5 pb-2.5">
          <div className="w-10 h-10 md:w-11 md:h-11 flex-shrink-0 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center">
            <span className="text-lg md:text-xl">{data.emoji}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {data.traits.map((trait, i) => (
              <span key={i} className="px-2.5 py-0.5 border border-brand-gold/20 text-brand-gold text-[9px] md:text-[10px] tracking-wider uppercase font-medium rounded-full">
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="px-5 md:px-6 pb-3">
          <p className="text-black/55 text-xs md:text-sm leading-relaxed font-light">
            {data.description}
          </p>
        </div>

        {/* 3 Stats row */}
        <div className="grid grid-cols-3 border-t border-black/5">
          {data.stats.map((stat, i) => (
            <div key={i} className={`px-3 md:px-4 py-3 text-center ${i < 2 ? 'border-r border-black/5' : ''}`}>
              <span className="text-[9px] md:text-[10px] text-black/35 uppercase tracking-wider block mb-0.5">{stat.label}</span>
              <span className="text-xs md:text-sm font-semibold text-brand-gold">{stat.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Download CTA */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.24 }}
        className="w-full max-w-lg text-center mb-4"
      >
        <p className="text-black/70 text-xs md:text-sm mb-3 font-semibold leading-snug">
          «{guideName}»
        </p>
        <button
          onClick={() => {/* PDF download logic */}}
          className="w-full flex items-center justify-center gap-2 bg-brand-gold text-white px-6 py-4 font-semibold tracking-[0.08em] text-xs uppercase hover:bg-brand-gold-dark transition-colors rounded-lg shadow-lg shadow-brand-gold/15"
        >
          <Download className="w-4 h-4" />
          Скачать ваш персональный гайд
        </button>
      </motion.div>

      {/* Spacer to push IG to bottom */}
      <div className="flex-1" />

      {/* Instagram CTA — pinned to bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center pb-2 md:pb-4 w-full max-w-lg"
      >
        <p className="text-[11px] md:text-xs text-black/40 font-light leading-relaxed mb-3">
          Пока вы изучаете свою стратегию — напишите{' '}
          <strong className="text-brand-gold font-bold tracking-wider uppercase">ДУБАЙ</strong>
          {' '}в директ и получите топ-3 проекта месяца.
        </p>
        <a
          href="https://instagram.com/elstate_dubai"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex flex-col items-center bg-black text-white px-10 py-3 hover:bg-zinc-800 transition-all duration-300 rounded-lg"
        >
          <span className="flex items-center gap-2 justify-center font-semibold tracking-[0.12em] text-xs uppercase">
            Перейти в Instagram
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          <span className="text-white/20 text-[8px] tracking-[0.06em] font-normal mt-0.5">@elstate_dubai</span>
        </a>
      </motion.div>
    </div>
  );
}
