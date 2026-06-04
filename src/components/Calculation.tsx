import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { archetypes } from '../data';

export function Calculation({ archetype, onComplete }: { archetype: string; onComplete: () => void }) {
  const [revealed, setRevealed] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const CARD_WIDTH = 280;
  const CARD_GAP = 24;
  const CARD_STEP = CARD_WIDTH + CARD_GAP;
  const TOTAL_DURATION = 5000; // ms
  const CYCLE_COUNT = 6;
  
  // Build a repeating track with enough cards to never show empty space
  const { trackItems, targetIndex } = useMemo(() => {
    const items: string[] = [];
    // Create many cycles of shuffled archetypes
    for (let cycle = 0; cycle < CYCLE_COUNT; cycle++) {
      const shuffled = [...archetypes].sort(() => Math.random() - 0.5);
      items.push(...shuffled);
    }
    // Place the winning archetype at a known position near the end
    const target = items.length;
    items.push(archetype);
    // Add padding cards after
    for (let i = 0; i < 6; i++) {
      items.push(archetypes[Math.floor(Math.random() * archetypes.length)]);
    }
    return { trackItems: items, targetIndex: target };
  }, [archetype]);

  // Custom easing with heavy deceleration (Swiss watch feel)
  const easeOutHeavy = useCallback((t: number): number => {
    // Custom cubic bezier approximation with very heavy ease-out
    return 1 - Math.pow(1 - t, 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const viewportCenter = window.innerWidth / 2;
    const totalTravel = targetIndex * CARD_STEP - viewportCenter + CARD_WIDTH / 2;

    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / TOTAL_DURATION, 1);
      const eased = easeOutHeavy(progress);
      const x = -eased * totalTravel;
      
      track.style.transform = `translateX(${x}px)`;

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete — reveal the winning card
        setTimeout(() => setRevealed(true), 300);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    // Auto-advance to next phase
    const advanceTimer = setTimeout(() => onComplete(), TOTAL_DURATION + 1500);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      clearTimeout(advanceTimer);
    };
  }, [targetIndex, easeOutHeavy, onComplete]);

  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center bg-black overflow-hidden relative">
      {/* Track container */}
      <div className="relative w-full flex items-center justify-center" style={{ height: 240 }}>
        {/* Center target line with glow */}
        <div 
          className="absolute w-[2px] z-20 left-1/2 -translate-x-1/2"
          style={{
            top: '-10%',
            height: '120%',
            background: '#957e66',
            boxShadow: '0 0 20px rgba(149,126,102,0.8), 0 0 40px rgba(149,126,102,0.4)',
          }}
        />

        {/* Card track */}
        <div
          ref={trackRef}
          className="flex items-center absolute left-0 will-change-transform"
          style={{ gap: CARD_GAP }}
        >
          {trackItems.map((name, i) => {
            const isTarget = i === targetIndex;
            const showName = isTarget && revealed;
            return (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center border border-brand-gold/20 bg-white/[0.03] backdrop-blur-sm overflow-hidden"
                style={{ width: CARD_WIDTH, height: 180 }}
              >
                {showName ? (
                  <div className="card-reveal text-center px-6 w-full">
                    <span className="font-serif text-2xl md:text-3xl text-white font-light block break-words leading-tight">
                      {archetype}
                    </span>
                    <span className="text-brand-gold text-xs tracking-[0.2em] uppercase mt-3 block">
                      Ваш архетип
                    </span>
                  </div>
                ) : (
                  <span className="font-serif text-6xl md:text-7xl text-brand-gold/30 select-none">
                    ?
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Status text */}
      <div className="mt-16 text-center">
        <span className="font-sans text-brand-gold tracking-[0.2em] text-xs uppercase block animate-pulse">
          {revealed ? 'Профиль определён' : 'Формируем ваш профиль...'}
        </span>
      </div>
    </div>
  );
}
