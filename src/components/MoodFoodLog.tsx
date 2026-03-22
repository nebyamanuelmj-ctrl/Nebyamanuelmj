import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Utensils, Brain, ArrowRight, Sparkles } from 'lucide-react';
import { getConnectTheDots } from '../services/gemini';
import ReactMarkdown from 'react-markdown';
import { useToast } from './Toast';

export const MoodFoodLog: React.FC = () => {
  const [meal, setMeal] = useState('');
  const [mood, setMood] = useState('');
  const [stress, setStress] = useState(5);
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleAnalyze = async () => {
    if (!meal || !mood) return;
    setLoading(true);
    const result = await getConnectTheDots(mood, meal, stress);
    setInsight(result);
    setLoading(false);
    showToast("Analysis complete", "success");
  };

  return (
    <section className="p-8 glass rounded-[2rem] card-hover" id="mood-food-log">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-emerald-50 rounded-xl">
          <Utensils className="w-6 h-6 text-emerald-500" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Mood-Food Log</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="section-title">What did you eat?</label>
          <input 
            type="text" 
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            placeholder="e.g., Double espresso and a croissant"
            className="input-field"
          />
        </div>

        <div className="space-y-2">
          <label className="section-title">How's the headspace?</label>
          <input 
            type="text" 
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="e.g., Anxious but wired"
            className="input-field"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="section-title mb-0">Stress Level</label>
            <span className="text-sm font-bold text-emerald-600 font-mono">{stress}/10</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={stress}
            onChange={(e) => setStress(parseInt(e.target.value))}
            className="w-full h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        <button 
          onClick={handleAnalyze}
          disabled={loading || !meal || !mood}
          className="btn-primary w-full flex items-center justify-center gap-3"
        >
          {loading ? (
            <Sparkles className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Connect the Dots
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        {insight && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mt-6 border bg-emerald-50/50 border-emerald-100 rounded-2xl"
          >
            <div className="flex items-center gap-2 mb-2 text-emerald-700">
              <Brain className="w-4 h-4" />
              <span className="text-sm font-bold">Architect's Insight</span>
            </div>
            <div className="text-sm leading-relaxed text-gray-700 markdown-body">
              <ReactMarkdown>{insight}</ReactMarkdown>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
