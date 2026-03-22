import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wind } from 'lucide-react';
import { SOSExercise } from '../types';

interface BreathingModalProps {
  exercise: SOSExercise;
  onClose: () => void;
}

export const BreathingModal: React.FC<BreathingModalProps> = ({ exercise, onClose }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercise.steps[0].duration);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let timer: any;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      const nextIndex = (stepIndex + 1) % exercise.steps.length;
      setStepIndex(nextIndex);
      setTimeLeft(exercise.steps[nextIndex].duration);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, stepIndex, exercise.steps]);

  const currentStep = exercise.steps[stepIndex];

  // Animation variants for the breathing circle
  const circleVariants = {
    'Inhale': { scale: 1.5, opacity: 0.8 },
    'Hold': { scale: 1.5, opacity: 0.6 },
    'Exhale': { scale: 1, opacity: 0.4 },
    'default': { scale: 1, opacity: 0.3 }
  };

  const getVariant = (text: string) => {
    if (text.toLowerCase().includes('inhale')) return 'Inhale';
    if (text.toLowerCase().includes('hold')) return 'Hold';
    if (text.toLowerCase().includes('exhale')) return 'Exhale';
    return 'default';
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-lg overflow-hidden bg-white rounded-3xl shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black transition-colors z-20"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-8 text-emerald-600">
            <Wind size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">{exercise.title}</span>
          </div>

          <div className="relative flex items-center justify-center w-64 h-64 mb-12">
            <AnimatePresence mode="wait">
              <motion.div 
                key={stepIndex}
                variants={circleVariants}
                animate={getVariant(currentStep.text)}
                transition={{ 
                  duration: currentStep.duration, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 rounded-full bg-emerald-100"
              />
            </AnimatePresence>
            
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-6xl font-bold font-mono mb-2">{timeLeft}</span>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Seconds</span>
            </div>
          </div>

          <motion.h3 
            key={currentStep.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-4"
          >
            {currentStep.text}
          </motion.h3>
          
          <p className="text-gray-500 max-w-xs mx-auto mb-8">
            {exercise.description}
          </p>

          <div className="flex gap-2 mb-4">
            {exercise.steps.map((_, i) => (
              <div 
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === stepIndex ? 'w-8 bg-emerald-500' : 'w-2 bg-gray-100'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
