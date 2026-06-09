import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function PreLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);

      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 200);
      }
    };

    requestAnimationFrame(tick);
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
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>

      <span className="mt-8 text-brand-gray text-xs tracking-[0.3em] uppercase animate-pulse">
        {progress < 100 ? 'Загрузка...' : 'Готово'}
      </span>
    </div>
  );
}
