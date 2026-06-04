import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, Target, Timer, Shield, Home, ChevronLeft, ChevronRight, Hand } from 'lucide-react';
import { questions } from '../data';

const questionIcons = [DollarSign, Target, Timer, Shield, Home];

const answerDescriptions: (string | null)[][] = [
  [null, null, null, null],
  [
    'Стабильный арендный доход без лишних забот',
    'Быстрая прибыль от перепродажи на этапе строительства',
    'Новый дом и ВНЖ в ОАЭ для всей семьи',
    'Распределение активов по разным рынкам',
  ],
  [
    'Максимально быстрый результат',
    'Краткосрочная стратегия с гибкостью',
    'Среднесрочное планирование роста',
    'Долгосрочная стабильная инвестиция',
  ],
  [
    'Надёжность и предсказуемый доход',
    'Высокий ROI любой ценой',
    'Элитные объекты и премиум-локации',
    'Возможность быстро выйти из актива',
  ],
  [
    'Динамика мегаполиса и деловая среда',
    'Спокойствие, природа и приватность',
    'Нетворкинг и деловые возможности',
    'Уют, школы и инфраструктура',
  ],
];

function SpotlightCard({
  children,
  isActive,
  isSelected,
  onClick,
  className = '',
  ...rest
}: {
  children: React.ReactNode;
  isActive: boolean;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
  [key: string]: any;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative overflow-hidden cursor-pointer transition-all duration-500 ${className} ${
        isSelected
          ? 'ring-2 ring-brand-gold shadow-[0_0_30px_rgba(149,126,102,0.4)]'
          : ''
      }`}
    >
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(149,126,102,0.15), transparent 60%)`,
          }}
        />
      )}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-xl"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(149,126,102,0.25), transparent 50%)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
            borderRadius: '12px',
          }}
        />
      )}
      {children}
      {isSelected && (
        <div className="absolute top-2 right-2 z-20 w-5 h-5 bg-brand-gold rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  );
}

export function QuestionContainer({ onComplete }: { onComplete: (answers: number[]) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const currentQuestion = questions[currentIndex];
  const progressPercent = ((currentIndex) / questions.length) * 100;
  const IconForQuestion = questionIcons[currentIndex] || DollarSign;
  const totalCards = currentQuestion.answers.length;

  // Lock body scroll while quiz is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = '0';
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, []);

  // Hide hint after first interaction
  useEffect(() => {
    if (activeCardIndex !== 0 || selectedAnswer !== null) {
      setShowHint(false);
    }
  }, [activeCardIndex, selectedAnswer]);

  const rotate = useCallback((direction: number) => {
    setActiveCardIndex(prev => (prev + direction + totalCards) % totalCards);
  }, [totalCards]);

  const handleCardClick = useCallback((cardIndex: number) => {
    setSelectedAnswer(cardIndex);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedAnswer === null || isTransitioning) return;
    setIsTransitioning(true);

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setActiveCardIndex(0);
        setSelectedAnswer(null);
      } else {
        onComplete(newAnswers);
      }
      setIsTransitioning(false);
    }, 400);
  }, [selectedAnswer, answers, currentIndex, isTransitioning, onComplete]);

  // Responsive radius — smaller on mobile
  const getCardTransform = (index: number) => {
    const offset = ((index - activeCardIndex + totalCards) % totalCards);
    const angleStep = 360 / totalCards;
    const angle = offset * angleStep;
    const radian = (angle * Math.PI) / 180;

    // Use smaller radius on mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const radius = isMobile ? 160 : 240;
    const translateX = Math.sin(radian) * radius;
    const translateZ = Math.cos(radian) * radius - radius;
    const scale = 0.55 + 0.45 * ((translateZ + radius) / (radius * 2));
    const zIndex = Math.round(scale * 10);
    const opacity = offset === 2 ? 0.15 : 0.35 + 0.65 * scale;

    return {
      x: translateX,
      z: translateZ,
      scale,
      zIndex,
      opacity,
      isFront: offset === 0,
    };
  };

  // Touch handling
  const dragStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - dragStartX.current;
    if (Math.abs(diff) > 40) {
      rotate(diff > 0 ? -1 : 1);
    }
  };

  return (
    <div
      className="h-[100dvh] flex flex-col items-center px-4 py-3 md:py-8 md:px-12 bg-brand-beige-light overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      <div className="w-full max-w-2xl flex flex-col flex-1 min-h-0">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-3 md:mb-5">
          <span className="text-brand-gray-dark text-xs md:text-sm uppercase tracking-[0.15em] font-semibold">
            Вопрос {currentIndex + 1}/{questions.length}
          </span>
          <span className="font-serif text-xs md:text-sm tracking-[0.2em] text-brand-gray">ELSTATE</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[2px] bg-black/10 mb-3 md:mb-6 relative">
          <motion.div
            className="absolute left-0 top-0 h-full bg-brand-gold"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Question */}
        <div className="mb-2 md:mb-4">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="font-serif text-lg md:text-2xl lg:text-3xl leading-[1.2] text-black font-medium text-center"
            >
              {currentQuestion.question}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Carousel area — takes remaining space */}
        <div className="flex-1 min-h-0 flex flex-col">
          {/* Navigation arrows + carousel */}
          <div className="flex items-center flex-1 min-h-0">
            {/* Left arrow */}
            <button
              onClick={() => rotate(-1)}
              className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-black/5 text-brand-gray hover:text-brand-gold hover:border-brand-gold/30 transition-all shadow-sm z-30 mr-1 md:mr-3"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Carousel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`carousel-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative flex-1 h-full"
                style={{ perspective: 800, touchAction: 'none' }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                  {currentQuestion.answers.map((ans, i) => {
                    const transform = getCardTransform(i);
                    const description = answerDescriptions[currentIndex]?.[i] ?? null;

                    return (
                      <motion.div
                        key={`${currentIndex}-${i}`}
                        className="absolute"
                        style={{
                          width: 'min(320px, 75vw)',
                          zIndex: transform.zIndex,
                        }}
                        animate={{
                          x: transform.x,
                          scale: transform.scale,
                          opacity: transform.opacity,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <SpotlightCard
                          isActive={transform.isFront}
                          isSelected={selectedAnswer === i}
                          onClick={() => handleCardClick(i)}
                          className="bg-white rounded-xl border border-black/8 overflow-hidden shadow-lg"
                        >
                          {/* Icon area — taller for 4:5 total */}
                          <div className="relative w-full" style={{ paddingBottom: '105%' }}>
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-beige-light/60 to-white">
                              <IconForQuestion className="w-10 h-10 md:w-14 md:h-14 text-brand-gold/40 stroke-[1]" />
                            </div>
                          </div>
                          {/* Text area — single line */}
                          <div className="px-3 md:px-4 pb-3 pt-2 border-t border-black/5">
                            <h4 className="font-serif text-sm md:text-base font-medium text-black leading-tight truncate">
                              {ans}
                            </h4>
                          </div>
                        </SpotlightCard>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right arrow */}
            <button
              onClick={() => rotate(1)}
              className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-black/5 text-brand-gray hover:text-brand-gold hover:border-brand-gold/30 transition-all shadow-sm z-30 ml-1 md:ml-3"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Swipe hint — right under cards */}
          {showHint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-0.5 pt-1 pb-0 text-brand-gray"
            >
              <Hand className="w-4 h-4 swipe-hint" />
              <span className="text-[9px] md:text-xs tracking-wider uppercase font-light">Листайте карточки</span>
            </motion.div>
          )}

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 py-1">
            {currentQuestion.answers.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveCardIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeCardIndex
                    ? 'bg-brand-gold w-5'
                    : selectedAnswer === i
                      ? 'bg-brand-gold/60'
                      : 'bg-black/15 hover:bg-black/25'
                }`}
              />
            ))}
          </div>

          {/* Selected + Next */}
          <div className="flex flex-col items-center gap-2 pb-2">
            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <span className="text-[10px] md:text-xs text-brand-gray uppercase tracking-wider">Выбрано: </span>
                <span className="text-xs md:text-sm font-medium text-black">{currentQuestion.answers[selectedAnswer]}</span>
              </motion.div>
            )}

            <button
              onClick={handleNext}
              disabled={selectedAnswer === null || isTransitioning}
              className={`w-full max-w-sm py-3 md:py-4 font-semibold tracking-[0.1em] text-xs uppercase transition-all duration-300 ${
                selectedAnswer !== null
                  ? 'bg-brand-gold text-white hover:bg-brand-gold-dark shadow-lg'
                  : 'bg-black/5 text-brand-gray cursor-not-allowed'
              }`}
            >
              {currentIndex < questions.length - 1 ? 'Далее' : 'Узнать результат'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
