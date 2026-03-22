import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, AlertTriangle, Book, Settings, Mail, ChevronRight, ExternalLink, Wind, Shield, Lock, Key, CheckCircle2, Sparkles } from 'lucide-react';

interface HelpCenterModalProps {
  onClose: () => void;
  onOpenPrivacy: () => void;
  onStartBreathing: () => void;
}

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export const HelpCenterModal: React.FC<HelpCenterModalProps> = ({ onClose, onOpenPrivacy, onStartBreathing }) => {
  const [activeTopic, setActiveTopic] = useState<number | null>(null);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Assume success as per instructions
      setHasKey(true);
    }
  };

  const faqTopics = [
    {
      id: 1,
      section: 'App Guidance',
      question: 'How do I log my meals for the Nutrition pillar?',
      answer: 'Navigate to the "Fuel Log" tab in the sidebar or mobile navigation. Click the "Log Meal" button to record what you ate, the timing, and how it made you feel. This helps the app track your metabolic stability.'
    },
    {
      id: 2,
      section: 'App Guidance',
      question: 'What is a "Psychology Flip" and how do I do it?',
      answer: 'A Psychology Flip is a cognitive reframing exercise. When you have a negative thought, use the "Micro-Journal" to write it down, then "flip" it into a more constructive or balanced perspective based on the Holistic Trio framework.'
    },
    {
      id: 3,
      section: 'App Guidance',
      question: 'How does the app connect my food to my stress levels?',
      answer: 'By tracking both your meals (Nutrition) and your mood/stress (Psychology), BMJ MED analyzes patterns. For example, it might notice that high-sugar meals correlate with increased anxiety or "System 1" impulsive thinking later in the day.'
    },
    {
      id: 4,
      section: 'Technical & Privacy',
      question: 'How do I sync my Apple Health or Google Fit?',
      answer: 'Go to the "System Status" section on your dashboard. If your device supports it, you will see an "Integrate Health Data" button. This allows the app to read stress markers like heart rate variability and sleep patterns.'
    },
    {
      id: 5,
      section: 'Technical & Privacy',
      question: 'Is my mood-journaling data private?',
      answer: 'Yes. All your psychological and health data is encrypted. We do not sell your personal data. You can read more in our Privacy Policy.'
    },
    {
      id: 6,
      section: 'Technical & Privacy',
      question: 'How do I delete my data or reset my account?',
      answer: 'You can request full data deletion by contacting our support team or using the "Reset Account" option in the future settings panel. You own your data.'
    }
  ];

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
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden bg-white rounded-[2.5rem] shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="p-8 border-b border-black/5 flex items-center justify-between shrink-0 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl">
              <HelpCircle className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Help Center</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Support & Guidance</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-black hover:bg-black/5 rounded-xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 scrollbar-hide">
          {/* Section A: Crisis */}
          <section className="p-6 bg-red-50 rounded-3xl border border-red-100 space-y-6">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle size={24} />
              <h3 className="font-bold text-lg">I'm in a Crisis</h3>
            </div>
            <p className="text-sm text-red-700 leading-relaxed">
              If you are experiencing a mental health emergency, please contact a professional immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="https://butabikahospital.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 p-3 bg-white text-red-600 border border-red-200 rounded-2xl font-bold text-xs hover:bg-red-100 transition-all shadow-sm"
              >
                <ExternalLink size={14} />
                Local Emergency Hotlines
              </a>
              <button 
                onClick={() => {
                  onStartBreathing();
                  onClose();
                }}
                className="flex-1 flex items-center justify-center gap-2 p-3 bg-red-600 text-white rounded-2xl font-bold text-xs hover:bg-red-700 transition-all shadow-md shadow-red-200"
              >
                <Wind size={14} />
                Just give me a breathing exercise
              </button>
            </div>
          </section>

          {/* Section B & C: FAQ */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-ink">
                <Book size={18} className="text-emerald-500" />
                <h3 className="font-bold text-lg">App Guidance</h3>
              </div>
              <div className="space-y-3">
                {faqTopics.filter(t => t.section === 'App Guidance').map((topic) => (
                  <div key={topic.id} className="border border-black/5 rounded-2xl overflow-hidden">
                    <button 
                      onClick={() => setActiveTopic(activeTopic === topic.id ? null : topic.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-gray-700">{topic.question}</span>
                      <ChevronRight size={16} className={`text-gray-400 transition-transform ${activeTopic === topic.id ? 'rotate-90' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeTopic === topic.id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 pb-4 text-xs text-gray-500 leading-relaxed"
                        >
                          {topic.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-ink">
                <Settings size={18} className="text-blue-500" />
                <h3 className="font-bold text-lg">Technical & Privacy</h3>
              </div>
              <div className="space-y-3">
                {faqTopics.filter(t => t.section === 'Technical & Privacy').map((topic) => (
                  <div key={topic.id} className="border border-black/5 rounded-2xl overflow-hidden">
                    <button 
                      onClick={() => setActiveTopic(activeTopic === topic.id ? null : topic.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-gray-700">{topic.question}</span>
                      <ChevronRight size={16} className={`text-gray-400 transition-transform ${activeTopic === topic.id ? 'rotate-90' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeTopic === topic.id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 pb-4 text-xs text-gray-500 leading-relaxed"
                        >
                          {topic.answer}
                          {topic.id === 5 && (
                            <button 
                              onClick={onOpenPrivacy}
                              className="block mt-2 text-emerald-600 font-bold hover:underline"
                            >
                              View Privacy Policy
                            </button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Section: API Key */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-ink">
                <Key size={18} className="text-orange-500" />
                <h3 className="font-bold text-lg">Advanced Settings</h3>
              </div>
              <div className="p-6 bg-orange-50/50 border border-orange-100 rounded-3xl space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 rounded-xl shrink-0">
                    <Sparkles className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-orange-900">Uninterrupted AI Access</h4>
                    <p className="text-xs text-orange-700 mt-1 leading-relaxed">
                      If you experience high demand or rate limits, you can provide your own Gemini API key. This ensures your "Architect Insights" are always available.
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={handleSelectKey}
                  className={`w-full flex items-center justify-center gap-2 p-3 rounded-2xl font-bold text-xs transition-all ${
                    hasKey 
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                      : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-200'
                  }`}
                >
                  {hasKey ? (
                    <>
                      <CheckCircle2 size={16} />
                      Personal API Key Active
                    </>
                  ) : (
                    <>
                      <Key size={16} />
                      Select Personal API Key
                    </>
                  )}
                </button>
                
                <p className="text-[9px] text-orange-400 text-center italic">
                  Requires a paid Google Cloud project. See <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline">billing docs</a>.
                </p>
              </div>
            </div>
          </div>

          {/* Section D: Contact */}
          <section className="pt-8 border-t border-black/5 text-center space-y-6">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-gray-100 rounded-full">
                <Mail size={24} className="text-gray-600" />
              </div>
              <h3 className="font-bold text-lg">Talk to a Human</h3>
              <p className="text-sm text-gray-500">Still stuck? Our team is here to help.</p>
            </div>
            <a 
              href="mailto:nebyamanuelmj@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-ink text-white rounded-2xl font-bold text-sm hover:shadow-lg transition-all active:scale-95"
            >
              Contact Support
            </a>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-black/5 bg-gray-50 shrink-0 flex justify-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">BMJ MED Support v1.0</p>
        </div>
      </motion.div>
    </motion.div>
  );
};
