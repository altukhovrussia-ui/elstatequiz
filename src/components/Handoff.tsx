import { motion } from 'motion/react';
import { Download, ExternalLink } from 'lucide-react';
import { guideNames } from '../data';
import type { Archetype } from '../data';

const archetypeData: Record<string, { emoji: string; traits: string[]; description: string; expectedReturn: string }> = {
  'Рантье': {
    emoji: '🏦',
    traits: ['Стабильность', 'Пассивный доход', 'Долгосрочность'],
    description: 'Ваш фокус — надёжный арендный доход. Вы предпочитаете проверенные локации с гарантированной доходностью и минимальным участием в управлении.',
    expectedReturn: '7–10% годовых',
  },
  'Флиппер': {
    emoji: '⚡',
    traits: ['Скорость', 'Высокий ROI', 'Активные сделки'],
    description: 'Вы нацелены на быструю перепродажу объектов на этапе строительства для максимальной прибыли. Ваш горизонт — 1–3 года.',
    expectedReturn: '20–40% за цикл',
  },
  'Стратег': {
    emoji: '📊',
    traits: ['Аналитика', 'Потенциал роста', 'Недооцененные районы'],
    description: 'Вы ищете скрытые жемчужины рынка и входите в проекты на ранних стадиях развития инфраструктуры для защиты и роста капитала.',
    expectedReturn: '12–15% годовых',
  },
  'Релокант': {
    emoji: '🌍',
    traits: ['Комфорт', 'ВНЖ', 'Семья'],
    description: 'Ваша цель — жизнь в ОАЭ. Вы ищете баланс между комфортом для семьи, инфраструктурой и инвестиционной привлекательностью.',
    expectedReturn: '15–25% рост капитала',
  },
};

export function Handoff({ archetype }: { archetype: string }) {
  const data = archetypeData[archetype] || archetypeData['Рантье'];
  const guideName = guideNames[archetype as Archetype] || guideNames['Рантье'];

  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center bg-brand-beige-light overflow-hidden px-4 py-4 md:py-6">
      <div className="w-full max-w-lg flex flex-col items-center flex-1 min-h-0 justify-center gap-4 md:gap-5">

        {/* Congrats Header — compact */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-brand-gold text-[10px] md:text-xs tracking-[0.3em] uppercase block mb-1.5 font-medium">
            Поздравляем
          </span>
          <h1 className="font-serif text-xl md:text-3xl lg:text-4xl text-black font-bold uppercase leading-tight">
            ВЫ — {archetype.toUpperCase()}
          </h1>
        </motion.div>

        {/* Compact Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full bg-white border border-black/8 shadow-lg rounded-xl overflow-hidden"
        >
          {/* Emoji + Traits row */}
          <div className="flex items-center gap-3 px-5 md:px-6 pt-4 md:pt-5 pb-3">
            <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center">
              <span className="text-lg md:text-2xl">{data.emoji}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {data.traits.map((trait, i) => (
                <span key={i} className="px-2.5 py-0.5 border border-brand-gold/20 text-brand-gold text-[9px] md:text-[10px] tracking-wider uppercase font-medium rounded-full">
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Description + Return */}
          <div className="px-5 md:px-6 pb-4 md:pb-5">
            <p className="text-black/55 text-xs md:text-sm leading-relaxed font-light mb-3">
              {data.description}
            </p>
            <div className="flex items-center justify-between py-2 px-3 bg-brand-beige-light/60 border border-brand-gold/10 rounded-lg">
              <span className="text-[10px] md:text-xs text-black/40 uppercase tracking-wider">Ожидаемая доходность</span>
              <span className="text-sm md:text-base font-semibold text-brand-gold">{data.expectedReturn}</span>
            </div>
          </div>
        </motion.div>

        {/* Download CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full text-center"
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

        {/* Divider */}
        <div className="w-12 h-[1px] bg-black/10" />

        {/* Instagram CTA — compact */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-center"
        >
          <p className="text-xs md:text-sm text-black/45 font-light leading-relaxed max-w-sm mb-3">
            Пока мы готовим вашу подборку — напишите{' '}
            <strong className="text-brand-gold font-bold tracking-wider uppercase">ДУБАЙ</strong>
            {' '}в директ и получите топ-3 проекта месяца.
          </p>
          <a
            href="https://instagram.com/elstate_dubai"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-col items-center bg-black text-white px-8 py-3 font-semibold tracking-[0.12em] text-xs uppercase hover:bg-zinc-800 transition-all duration-300 rounded-lg"
          >
            <span className="flex items-center gap-2">
              Перейти в Instagram
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            <span className="text-white/40 text-[10px] tracking-[0.1em] font-normal mt-0.5">@elstate_dubai</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
