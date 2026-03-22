import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Sparkles, Check } from 'lucide-react';
import { useToast } from './Toast';

export const IdentityTracker: React.FC = () => {
  const [identity, setIdentity] = useState("I am the type of person who fuels my body for energy.");
  const [isEditing, setIsEditing] = useState(false);
  const { showToast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    showToast("Identity updated", "success");
  };

  return (
    <section className="p-6 glass rounded-3xl" id="identity-tracker">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-6 h-6 text-indigo-500" />
        <h2 className="text-xl font-bold tracking-tight">Identity Shift</h2>
      </div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl relative group cursor-pointer"
      >
        <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-indigo-400" />
        
        {isEditing ? (
          <div className="flex gap-2">
            <input 
              type="text"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              className="flex-1 bg-transparent border-b border-indigo-200 focus:outline-none text-sm font-medium text-indigo-900"
              autoFocus
            />
            <button onClick={handleSave} className="p-1 text-indigo-600">
              <Check size={16} />
            </button>
          </div>
        ) : (
          <p 
            onClick={() => setIsEditing(true)}
            className="text-sm font-medium text-indigo-900 leading-relaxed cursor-pointer italic"
          >
            "{identity}"
          </p>
        )}
      </motion.div>

      <p className="mt-4 text-xs text-gray-500 leading-relaxed">
        Focus on <strong>who</strong> you want to become, not what you want to achieve.
      </p>
      
      <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-tighter">Inspired by 'Atomic Habits'</p>
    </section>
  );
};
