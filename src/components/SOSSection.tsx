import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, Shield, Zap, RefreshCw, ChevronRight } from 'lucide-react';
import { SOSExercise } from '../types';
import { BreathingModal } from './BreathingModal';

const SOS_EXERCISES: SOSExercise[] = [
  {
    id: '4-7-8-breathing',
    title: '4-7-8 Breathing',
    description: 'The "natural tranquilizer" for the nervous system.',
    duration: '2 mins',
    steps: [
      { text: 'Inhale', duration: 4 },
      { text: 'Hold', duration: 7 },
      { text: 'Exhale', duration: 8 }
    ],
    source: 'Dr. Andrew Weil'
  },
  {
    id: 'box-breathing',
    title: 'Box Breathing',
    description: 'The Navy SEAL technique for instant nervous system reset.',
    duration: '60s',
    steps: [
      { text: 'Inhale', duration: 4 },
      { text: 'Hold', duration: 4 },
      { text: 'Exhale', duration: 4 },
      { text: 'Hold', duration: 4 }
    ]
  },
  {
    id: 'somatic-shake',
    title: 'Somatic Shake',
    description: 'Stress is stored in the muscles. Shake it off physically.',
    duration: '60s',
    steps: [
      { text: 'Shake your hands', duration: 15 },
      { text: 'Shake your arms', duration: 15 },
      { text: 'Bounce on your heels', duration: 15 },
      { text: 'Full body wiggle', duration: 15 }
    ],
    source: 'The Body Keeps the Score'
  },
  {
    id: 'cycle-closer',
    title: 'The Cycle Closer',
    description: 'Signal to your brain that the "lion" is gone.',
    duration: '20s',
    steps: [
      { text: '20-second long hug', duration: 10 },
      { text: 'Brisk walk in place', duration: 10 }
    ],
    source: 'Burnout'
  }
];

export const SOSSection: React.FC = () => {
  const [activeExercise, setActiveExercise] = useState<SOSExercise | null>(null);

  return (
    <section className="p-8 glass rounded-[2rem] card-hover" id="sos-section">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-50 rounded-xl">
            <Shield className="w-6 h-6 text-red-500" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">SOS Relief</h2>
        </div>
        <motion.span 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1.5 rounded-full border border-red-100 shadow-sm shadow-red-500/10"
        >
          Instant Reset
        </motion.span>
      </div>

      <div className="grid gap-3">
        {SOS_EXERCISES.map((ex) => (
          <motion.button
            key={ex.id}
            whileHover={{ x: 6, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveExercise(ex)}
            className="flex items-center justify-between p-5 text-left bg-white border border-brand-border rounded-2xl shadow-sm hover:shadow-md transition-all group hover:border-red-100"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="font-bold text-gray-900">{ex.title}</h3>
                {ex.source && (
                  <span className="text-[9px] font-bold uppercase tracking-tighter bg-emerald-50 px-2 py-0.5 rounded text-emerald-600">
                    {ex.source}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 line-clamp-1">{ex.description}</p>
            </div>
            <div className="flex items-center gap-4 ml-4">
              <span className="text-[11px] font-bold text-gray-300 font-mono uppercase">{ex.duration}</span>
              <div className="p-2 rounded-full bg-gray-50 group-hover:bg-emerald-50 transition-colors">
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeExercise && (
          <BreathingModal 
            exercise={activeExercise} 
            onClose={() => setActiveExercise(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};
