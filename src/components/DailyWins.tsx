import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, CheckCircle2, Circle, RefreshCw, Sparkles } from 'lucide-react';
import { getAdaptiveWins } from '../services/gemini';
import { DailyWin } from '../types';
import { useToast } from './Toast';
import confetti from 'canvas-confetti';

export const DailyWins: React.FC<{ stressLevel: number }> = ({ stressLevel }) => {
  const [wins, setWins] = useState<DailyWin[]>([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const fetchWins = async () => {
    setLoading(true);
    const data = await getAdaptiveWins(stressLevel);
    setWins(data.map((w: any, i: number) => ({ ...w, id: i.toString(), completed: false })));
    setLoading(false);
  };

  useEffect(() => {
    fetchWins();
  }, []);

  const toggleWin = (id: string) => {
    setWins(prev => prev.map(w => {
      if (w.id === id) {
        const newState = !w.completed;
        if (newState) {
          showToast(`Win logged: ${w.title}`, 'success');
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10B981', '#34D399', '#6EE7B7']
          });
        }
        return { ...w, completed: newState };
      }
      return w;
    }));
  };

  return (
    <section className="p-8 glass rounded-[2rem] card-hover" id="daily-wins">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-50 rounded-xl">
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Daily Wins</h2>
        </div>
        <motion.button 
          whileHover={{ rotate: 180 }}
          whileTap={{ scale: 0.8 }}
          onClick={fetchWins}
          disabled={loading}
          className="p-2 transition-all rounded-full hover:bg-gray-100"
        >
          <RefreshCw className={`w-4 h-4 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      <div className="space-y-4">
        {wins.map((win) => (
          <button
            key={win.id}
            onClick={() => toggleWin(win.id)}
            className={`flex items-start gap-4 p-5 text-left transition-all border rounded-2xl w-full group ${
              win.completed 
                ? 'bg-emerald-50/50 border-emerald-100' 
                : 'bg-white border-brand-border hover:border-emerald-200'
            }`}
          >
            <div className="mt-0.5 relative">
              <AnimatePresence mode="wait">
                {win.completed ? (
                  <motion.div 
                    key="checked"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="p-1 bg-emerald-500 rounded-full"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="unchecked"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="p-1 border-2 border-gray-200 rounded-full group-hover:border-emerald-300 transition-colors"
                  >
                    <div className="w-3 h-3" />
                  </motion.div>
                )}
              </AnimatePresence>
              {win.completed && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  className="absolute inset-0 bg-emerald-400 rounded-full pointer-events-none"
                />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400">
                  {win.category}
                </span>
              </div>
              <h3 className={`font-bold text-gray-900 ${win.completed ? 'line-through opacity-40' : ''}`}>
                {win.title}
              </h3>
              <p className={`text-sm mt-1 ${win.completed ? 'opacity-40' : 'text-gray-500'}`}>
                {win.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
