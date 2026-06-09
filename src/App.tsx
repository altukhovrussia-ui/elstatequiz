import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Landing } from './components/Landing';
import { PreLoader } from './components/PreLoader';
import { QuestionContainer } from './components/QuestionContainer';
import { Calculation } from './components/Calculation';
import { LeadCapture } from './components/LeadCapture';
import { Handoff } from './components/Handoff';
import { calculateArchetype } from './data';
import type { Archetype } from './data';

type Phase = 'landing' | 'preloader' | 'quiz' | 'calculating' | 'lead' | 'handoff';

export default function App() {
  const [phase, setPhase] = useState<Phase>('landing');
  const [archetype, setArchetype] = useState<Archetype>('Рантье');

  const handleQuizComplete = (quizAnswers: number[]) => {
    const result = calculateArchetype(quizAnswers);
    setArchetype(result);
    setPhase('calculating');
  };

  return (
    <div className="w-full min-h-screen text-black relative">
      <AnimatePresence mode="wait">
        {phase === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Landing onStart={() => setPhase('preloader')} />
          </motion.div>
        )}

        {phase === 'preloader' && (
          <motion.div
            key="preloader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PreLoader onComplete={() => setPhase('quiz')} />
          </motion.div>
        )}

        {phase === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <QuestionContainer onComplete={handleQuizComplete} />
          </motion.div>
        )}

        {phase === 'calculating' && (
          <motion.div
            key="calculating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Calculation archetype={archetype} onComplete={() => setPhase('lead')} />
          </motion.div>
        )}

        {phase === 'lead' && (
          <motion.div
            key="lead"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <LeadCapture archetype={archetype} onSubmit={() => setPhase('handoff')} />
          </motion.div>
        )}

        {phase === 'handoff' && (
          <motion.div
            key="handoff"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Handoff archetype={archetype} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
