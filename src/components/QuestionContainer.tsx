import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, Target, Timer, Shield, Home, ChevronLeft, ChevronRight } from 'lucide-react';
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
}: {
  children: React.ReactNode;
  isActive: boolean;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
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
      {/* Spotlight glow overlay */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(149,126,102,0.15), transparent 60%)`,
          }}
        />
      )}
      {/* Border glow on hover */}
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
      {/* Selected check */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-20 w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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

  const currentQuestion = questions[currentIndex];
  const progressPercent = ((currentIndex) / questions.length) * 100;
  const IconForQuestion = questionIcons[currentIndex] || DollarSign;
  const totalCards = currentQuestion.answers.length;

  // Rotate carousel
  const rotate = useCallback((direction: number) => {
    setActiveCardIndex(prev => (prev + direction + totalCards) % totalCards);
  }, [totalCards]);

  // Select the front card
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

  // Calculate 3D positions for the circular arrangement
  const getCardTransform = (index: number) => {
    const offset = ((index - activeCardIndex + totalCards) % totalCards);
    // Positions: 0=front, 1=right, 2=back, 3=left
    const angleStep = 360 / totalCards;
    const angle = offset * angleStep;
    const radian = (angle * Math.PI) / 180;

    const radius = 180;
    const translateX = Math.sin(radian) * radius;
    const translateZ = Math.cos(radian) * radius - radius;
    const scale = 0.65 + 0.35 * ((translateZ + radius) / (radius * 2));
    const zIndex = Math.round(scale * 10);
    const opacity = offset === 2 ? 0.3 : 0.5 + 0.5 * scale;

    return {
      x: translateX,
      z: translateZ,
      scale,
      zIndex,
      opacity,
      isFront: offset === 0,
    };
  };

  // Touch/drag handling — prevent page scroll
  const dragStartX = useRef(0);
  const isDragging = useRef(false);
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging.current) {
      e.preventDefault();
    }
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    isDragging.current = false;
    const diff = e.changedTouches[0].clientX - dragStartX.current;
    if (Math.abs(diff) > 40) {
      rotate(diff > 0 ? -1 : 1);
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col items-center px-4 py-4 md:py-8 md:px-12 bg-brand-beige-light overflow-hidden">
      <div className="w-full max-w-2xl flex flex-col flex-1 min-h-0">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-5">
          <span className="text-brand-gray-dark text-sm uppercase tracking-[0.15em] font-semibold">
            Вопрос {currentIndex + 1}/{questions.length}
          </span>
          <span className="font-serif text-sm tracking-[0.2em] text-brand-gray">ELSTATE</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[2px] bg-black/10 mb-4 md:mb-8 relative">
          <motion.div
            className="absolute left-0 top-0 h-full bg-brand-gold"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Question */}
        <div className="mb-3 md:mb-6">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="font-serif text-xl md:text-3xl leading-[1.2] text-black font-medium text-center"
            >
              {currentQuestion.question}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* 3D Circular Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`carousel-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative mx-auto mb-3 md:mb-6 flex-1 min-h-0"
            style={{ maxHeight: 440, perspective: 800, touchAction: 'none' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation arrows */}
            <button
              onClick={() => rotate(-1)}
              className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-black/5 text-brand-gray hover:text-brand-gold hover:border-brand-gold/30 transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => rotate(1)}
              className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-black/5 text-brand-gray hover:text-brand-gold hover:border-brand-gold/30 transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Cards */}
            <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
              {currentQuestion.answers.map((ans, i) => {
                const transform = getCardTransform(i);
                const description = answerDescriptions[currentIndex]?.[i] ?? null;

                return (
                  <motion.div
                    key={`${currentIndex}-${i}`}
                    className="absolute"
                    style={{
                      width: 'min(220px, 45vw)',
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
                      <div className="flex items-center justify-center bg-gradient-to-br from-brand-beige-light/60 to-white p-4 md:p-6 aspect-[4/5]">
                        <IconForQuestion className="w-10 h-10 md:w-14 md:h-14 text-brand-gold/40 stroke-[1]" />
                      </div>
                      <div className="px-4 pb-4 pt-3 border-t border-black/5">
                        <h4 className="font-serif text-sm md:text-base font-medium text-black leading-snug mb-1">
                          {ans}
                        </h4>
                        {description && (
                          <p className="text-[10px] md:text-[11px] text-brand-gray font-light leading-relaxed line-clamp-2">
                            {description}
                          </p>
                        )}
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel dots */}
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-6">
          {currentQuestion.answers.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveCardIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeCardIndex
                  ? 'bg-brand-gold w-6'
                  : selectedAnswer === i
                    ? 'bg-brand-gold/60'
                    : 'bg-black/15 hover:bg-black/25'
              }`}
            />
          ))}
        </div>

        {/* Selected answer + Next */}
        <div className="flex flex-col items-center gap-3">
          {selectedAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <span className="text-xs text-brand-gray uppercase tracking-wider">Выбрано: </span>
              <span className="text-sm font-medium text-black">{currentQuestion.answers[selectedAnswer]}</span>
            </motion.div>
          )}

          <button
            onClick={handleNext}
            disabled={selectedAnswer === null || isTransitioning}
            className={`w-full max-w-sm py-4 font-semibold tracking-[0.1em] text-xs uppercase transition-all duration-300 ${
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
  );
}
