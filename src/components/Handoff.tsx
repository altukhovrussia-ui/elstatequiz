import { ExternalLink } from 'lucide-react';

export function Handoff() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10 md:p-12 bg-white text-center">
      <div className="max-w-xl flex flex-col items-center gap-5 md:gap-6">
        <div className="w-16 h-[2px] bg-brand-gold" />

        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-black font-light leading-[1.25]">
          Пока мы готовим вашу<br className="md:hidden" /> индивидуальную подборку...
        </h2>

        <p className="text-sm md:text-base text-brand-gray-dark font-light leading-relaxed max-w-md">
          Есть кое-что для вас <span className="font-bold uppercase text-black">ПРЯМО СЕЙЧАС</span>! Подпишитесь на наш Instagram и напишите в директ слово <strong className="text-brand-gold font-bold tracking-wider font-sans uppercase">ДУБАЙ</strong> — пришлём топ-3 проекта этого месяца с аналитикой по каждому.
        </p>

        <a
          href="https://instagram.com/elstate_dubai"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center bg-black text-white px-10 py-4 font-semibold tracking-[0.15em] text-xs uppercase hover:bg-zinc-800 transition-all duration-300 mt-2 gap-1"
        >
          <span className="flex items-center gap-2">
            Перейти в Instagram
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          <span className="text-white/60 text-[11px] tracking-[0.1em]">@elstate_dubai</span>
        </a>
      </div>
    </div>
  );
}
