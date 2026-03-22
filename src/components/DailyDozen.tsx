import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, Plus, Minus } from 'lucide-react';
import { useToast } from './Toast';

const DOZEN = [
  { id: 'beans', title: 'Beans', target: 3 },
  { id: 'berries', title: 'Berries', target: 1 },
  { id: 'other-fruits', title: 'Other Fruits', target: 3 },
  { id: 'cruciferous', title: 'Cruciferous', target: 1 },
  { id: 'greens', title: 'Greens', target: 2 },
  { id: 'other-veggies', title: 'Other Veggies', target: 2 },
  { id: 'flaxseeds', title: 'Flaxseeds', target: 1 },
  { id: 'nuts', title: 'Nuts', target: 1 },
  { id: 'spices', title: 'Spices', target: 1 },
  { id: 'whole-grains', title: 'Whole Grains', target: 3 },
  { id: 'beverages', title: 'Beverages', target: 5 },
  { id: 'exercise', title: 'Exercise', target: 1 }
];

export const DailyDozen: React.FC = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const { showToast } = useToast();

  const update = (id: string, delta: number) => {
    const item = DOZEN.find(d => d.id === id);
    if (!item) return;

    const currentCount = counts[id] || 0;
    const newCount = Math.max(0, Math.min(item.target, currentCount + delta));
    
    if (newCount === item.target && currentCount < item.target) {
      showToast(`Daily Dozen: ${item.title} completed!`, 'success');
    }

    setCounts(prev => ({
      ...prev,
      [id]: newCount
    }));
  };

  return (
    <section className="p-6 glass rounded-3xl" id="daily-dozen">
      <div className="flex items-center gap-2 mb-6">
        <Leaf className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-bold tracking-tight">Daily Dozen</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {DOZEN.map((item) => {
          const count = counts[item.id] || 0;
          const isDone = count >= item.target;
          
          return (
            <motion.div 
              key={item.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`p-3 border rounded-2xl transition-all shadow-sm hover:shadow-md ${
                isDone ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-black/5'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`text-xs font-bold ${isDone ? 'text-emerald-700' : 'text-gray-600'}`}>
                  {item.title}
                </span>
                <span className="text-[10px] font-mono text-gray-400">{count}/{item.target}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => update(item.id, -1)}
                  className="p-1 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <Minus size={12} />
                </button>
                <div className="flex-1 h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all ${isDone ? 'bg-emerald-500' : 'bg-emerald-300'}`}
                    style={{ width: `${(count / item.target) * 100}%` }}
                  />
                </div>
                <button 
                  onClick={() => update(item.id, 1)}
                  className="p-1 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-tighter">Inspired by 'How Not to Die'</p>
    </section>
  );
};
