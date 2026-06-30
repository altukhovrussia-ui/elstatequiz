import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { questions } from '../data';

export function PreLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Gather all image URLs from the quiz questions and add background images
    const imageUrls = [
      ...questions.flatMap(q => q.images || []),
      '/bg/bg-1.webp',
      '/bg/bg-2.webp'
    ];
    
    const preloadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Resolve on error so we don't block the app indefinitely
      });
    };

    const imagePromises = imageUrls.map(src => preloadImage(src));
    
    let isImagesLoaded = false;
    let isTimeUp = false;

    Promise.all(imagePromises).then(() => {
      isImagesLoaded = true;
    });

    const duration = 2000;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const timeProgress = Math.min((elapsed / duration) * 100, 100);
      
      if (timeProgress === 100) {
        isTimeUp = true;
      }

      // If time is up but images are still loading, stall the progress bar at 95%
      if (!isImagesLoaded && timeProgress >= 95) {
        setProgress(95);
        requestAnimationFrame(tick);
      } else if (isTimeUp && isImagesLoaded) {
        setProgress(100);
        setTimeout(onComplete, 200);
      } else {
        setProgress(timeProgress);
        requestAnimationFrame(tick);
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
