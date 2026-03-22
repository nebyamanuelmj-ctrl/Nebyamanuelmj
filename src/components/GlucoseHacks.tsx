import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Droplets, CheckCircle2, Circle, Info } from 'lucide-react';
import { useToast } from './Toast';

const HACKS = [
  { id: 'fiber', title: 'Fiber First', description: 'Eat your greens/fiber before carbs to flatten the glucose curve.' },
  { id: 'vinegar', title: 'Vinegar Shot', description: '1 tbsp apple cider vinegar in water before a heavy meal.' },
  { id: 'movement', title: 'Post-Meal Walk', description: '10 mins of light movement after eating to use the glucose.' },
  { id: 'savory', title: 'Savory Breakfast', description: 'Prioritize protein and fats over sugar to start the day stable.' }
];

export const GlucoseHacks: React.FC = () => {
  const [completed, setCompleted] = useState<string[]>([]);
  const { showToast } = useToast();

  const toggle = (id: string) => {
    const hack = HACKS.find(h => h.id === id);
    if (!hack) return;

    if (!completed.includes(id)) {
      showToast(`Hack applied: ${hack.title}`, 'success');
    }
    setCompleted(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <section className="p-6 glass rounded-3xl" id="glucose-hacks">
      <div className="flex items-center gap-2 mb-6">
        <Droplets className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold tracking-tight">Glucose Hacks</h2>
      </div>

      <div className="space-y-3">
        {HACKS.map((hack) => (
          <motion.button
            key={hack.id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggle(hack.id)}
            className={`flex items-start gap-3 p-3 text-left transition-all border rounded-2xl w-full ${
              completed.includes(hack.id) 
                ? 'bg-blue-50 border-blue-100 opacity-75' 
                : 'bg-white border-black/5 hover:border-blue-200'
            }`}
          >
            <div className="mt-0.5">
              {completed.includes(hack.id) ? (
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
              ) : (
                <Circle className="w-4 h-4 text-gray-300" />
              )}
            </div>
            <div>
              <h3 className={`text-sm font-bold ${completed.includes(hack.id) ? 'line-through text-gray-500' : ''}`}>
                {hack.title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{hack.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
      
      <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-tighter">Inspired by 'The Glucose Revolution'</p>
    </section>
  );
};
