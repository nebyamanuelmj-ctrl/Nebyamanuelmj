import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Brain, AlertCircle, CheckCircle2 } from 'lucide-react';

export const SystemToggle: React.FC = () => {
  const [system, setSystem] = useState<1 | 2>(1);

  return (
    <section className="p-6 glass rounded-3xl" id="system-toggle">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-bold tracking-tight">System Check</h2>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl relative">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setSystem(1)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all relative z-10 ${system === 1 ? 'text-brand-ink' : 'text-gray-400'}`}
          >
            System 1
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setSystem(2)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all relative z-10 ${system === 2 ? 'text-brand-ink' : 'text-gray-400'}`}
          >
            System 2
          </motion.button>
          <motion.div 
            layoutId="system-switch"
            className="absolute inset-y-1 bg-white rounded-lg shadow-sm"
            initial={false}
            animate={{ 
              left: system === 1 ? 4 : '50%',
              right: system === 1 ? '50%' : 4
            }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        </div>
      </div>

      <div className="min-h-[120px] relative">
        <AnimatePresence mode="wait">
          {system === 1 ? (
            <motion.div 
              key="system1"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Impulsive / Stress-Based</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                You're currently operating on <strong>autopilot</strong>. Decisions are fast, emotional, and often driven by cortisol. 
                <br/><br/>
                <span className="italic text-gray-400">"Is this a reaction or a choice?"</span>
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="system2"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-emerald-500">
                <CheckCircle2 size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Calm / Logical</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                You've engaged your <strong>prefrontal cortex</strong>. Decisions are deliberate, calculated, and aligned with long-term goals.
                <br/><br/>
                <span className="italic text-gray-400">"You are in control of the narrative."</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-tighter">Inspired by 'Thinking, Fast and Slow'</p>
    </section>
  );
};
