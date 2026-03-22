import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Send } from 'lucide-react';
import { useToast } from './Toast';

export const MicroJournal: React.FC = () => {
  const [entry, setEntry] = useState('');
  const [saved, setSaved] = useState(false);
  const { showToast } = useToast();

  const handleSave = () => {
    if (!entry) return;
    setSaved(true);
    showToast("Journal entry saved", "success");
    setTimeout(() => {
      setSaved(false);
      setEntry('');
    }, 2000);
  };

  return (
    <section className="p-6 glass rounded-3xl" id="micro-journal">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold tracking-tight">Micro-Journaling</h2>
      </div>

      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="relative"
      >
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="What's the one thing on your mind? Reframe it using CBT: Is this a fact or a feeling?"
          className="w-full h-32 p-4 bg-white border resize-none rounded-2xl border-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
        <button
          onClick={handleSave}
          disabled={!entry || saved}
          className="absolute bottom-4 right-4 p-2 bg-brand-ink text-white rounded-xl hover:bg-black transition-all disabled:opacity-50"
        >
          {saved ? (
            <span className="text-xs font-bold px-2">Saved</span>
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </motion.div>
      
      <p className="mt-4 text-xs text-gray-400 italic">
        "The obstacle is the way." — Marcus Aurelius
      </p>
    </section>
  );
};
