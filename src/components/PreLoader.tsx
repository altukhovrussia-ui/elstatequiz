import { useEffect } from 'react';
import { motion } from 'motion/react';

export function PreLoader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center bg-black">
      <div className="font-serif text-2xl tracking-[0.3em] uppercase text-white mb-12">
        ELSTATE
      </div>

      <div className="w-48 md:w-64 h-[2px] bg-white/10 relative overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-brand-gold"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      <span className="mt-8 text-brand-gray text-xs tracking-[0.3em] uppercase animate-pulse">
        Загрузка...
      </span>
    </div>
  );
}
