import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { guideNames } from '../data';
import type { Archetype } from '../data';

export function Handoff({ archetype }: { archetype: string }) {
  const guideName = guideNames[archetype as Archetype] || guideNames['Рантье'];

  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center bg-brand-beige-light overflow-hidden px-4 py-5 md:py-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 md:mb-10"
      >
        <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl text-black font-bold uppercase leading-tight">
          Нажмите, чтобы скачать материалы:
        </h1>
      </motion.div>

      {/* Download CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="w-full max-w-lg text-center flex flex-col gap-5"
      >
        <div>
          <p className="text-black text-xs md:text-sm mb-2 font-semibold leading-snug">
            «{guideName}»
          </p>
          <a
            href={`/pdfs/${archetype}.pdf`}
            download
            className="w-full flex items-center justify-center gap-2 bg-brand-gold text-white px-6 py-4 font-semibold tracking-[0.08em] text-xs uppercase hover:bg-brand-gold-dark transition-colors rounded-lg shadow-lg shadow-brand-gold/15"
          >
            <Download className="w-4 h-4" />
            Скачать ваш профиль инвестора
          </a>
        </div>

        <div>
          <p className="text-black text-xs md:text-sm mb-2 font-semibold leading-snug">
            «Проекты-лидеры для инвестиций - Октябрь 2026»
          </p>
          <a
            href="/pdfs/Проекты-лидеры для инвестиций - Октябрь 2026.pdf"
            download
            className="w-full flex items-center justify-center gap-2 bg-black text-white px-6 py-4 font-semibold tracking-[0.08em] text-xs uppercase hover:bg-zinc-800 transition-colors rounded-lg shadow-lg shadow-black/15"
          >
            <Download className="w-4 h-4" />
            Скачать подборку проектов
          </a>
        </div>
      </motion.div>
    </div>
  );
}
