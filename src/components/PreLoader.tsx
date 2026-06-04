import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { questions } from '../data';

export function PreLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Collect all image URLs from the questions data
    const imageUrls = questions.flatMap(q => q.images || []);
    const totalImages = imageUrls.length;
    
    if (totalImages === 0) {
      setTimeout(onComplete, 2000);
      return;
    }

    let loadedCount = 0;
    const startTime = Date.now();
    const MIN_LOAD_TIME = 2000; // Force at least 2 seconds for smooth animation

    // Preload a single image
    const preloadImage = (url: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          // Update progress based on real image loading (0 to 100)
          setProgress((loadedCount / totalImages) * 100);
          resolve();
        };
        img.onerror = () => {
          // Resolve anyway to not block the quiz if an image fails
          loadedCount++;
          setProgress((loadedCount / totalImages) * 100);
          resolve();
        };
      });
    };

    // Start preloading all images
    Promise.all(imageUrls.map(preloadImage)).then(() => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOAD_TIME - elapsed);
      
      // Wait for the minimum time to ensure the bar completes its animation smoothly
      setTimeout(() => {
        onComplete();
      }, remainingTime);
    });
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
          animate={{ width: `${Math.max(progress, 15)}%` }} // Starts at 15% minimum visually
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      <span className="mt-8 text-brand-gray text-xs tracking-[0.3em] uppercase animate-pulse">
        {progress < 100 ? 'Загрузка...' : 'Готово'}
      </span>
    </div>
  );
}
