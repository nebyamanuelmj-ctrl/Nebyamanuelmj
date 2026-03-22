import React from 'react';
import { motion } from 'motion/react';
import { X, Shield, Mail, Lock, Eye, FileText } from 'lucide-react';

interface PrivacyPolicyModalProps {
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ onClose }) => {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

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
        className="relative w-full max-w-2xl max-h-[80vh] overflow-hidden bg-white rounded-[2.5rem] shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="p-8 border-b border-black/5 flex items-center justify-between shrink-0 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <Shield className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Privacy Policy</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Last Updated: {lastUpdated}</p>
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
        <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 scrollbar-hide">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-brand-ink">
              <FileText size={18} />
              <h3 className="font-bold text-lg">1. Introduction</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Welcome to <strong>BMJ MED</strong>. We are committed to protecting your personal information and your right to privacy. This policy explains how we handle your data across our three core pillars: Psychology, Nutrition, and Stress Management.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-brand-ink">
              <Eye size={18} />
              <h3 className="font-bold text-lg">2. Data We Collect</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              To provide a personalized experience based on the "Holistic Trio," we collect:
            </p>
            <ul className="space-y-3">
              {[
                { label: 'Mental Wellbeing Data', desc: 'Mood logs, micro-journaling entries, and cognitive reframing exercises.' },
                { label: 'Nutritional Data', desc: 'Food logs, meal timings, and energy level reports.' },
                { label: 'Physical Stress Markers', desc: 'If integrated, data from health kits (Google Fit/Apple Health) such as heart rate, sleep patterns, and step counts.' },
                { label: 'Account Info', desc: 'Name, email address, and basic profile details.' }
              ].map((item, i) => (
                <li key={i} className="flex gap-3 p-3 bg-gray-50 rounded-2xl border border-black/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <p className="text-sm text-gray-600">
                    <strong className="text-brand-ink">{item.label}:</strong> {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-brand-ink">
              <Sparkles size={18} className="text-emerald-500" />
              <h3 className="font-bold text-lg">3. How We Use Your Data</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use your information to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Connect the Dots', desc: 'Analyze how your nutrition affects your stress and mood.' },
                { title: 'Stress Killers', desc: 'Suggest immediate interventions based on your reported state.' },
                { title: 'Personalized Insights', desc: 'Reference scientific frameworks to give you tailored advice.' },
                { title: 'Improve the AI', desc: 'Train our internal models to better understand holistic health patterns.' }
              ].map((item, i) => (
                <div key={i} className="p-4 border border-black/5 rounded-2xl">
                  <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-brand-ink">
              <Lock size={18} className="text-blue-500" />
              <h3 className="font-bold text-lg">4. Data Storage & Security</h3>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                <strong className="text-brand-ink">Encryption:</strong> All personal health and psychological data is encrypted both in transit and at rest.
              </p>
              <p className="text-sm text-gray-600">
                <strong className="text-brand-ink">Anonymization:</strong> When we analyze trends to improve the app, your identity is stripped from the data.
              </p>
              <p className="text-sm text-gray-600">
                <strong className="text-brand-ink">User Control:</strong> You own your data. You can export or delete your entire history at any time within the app settings.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-brand-ink">
              <Shield size={18} className="text-purple-500" />
              <h3 className="font-bold text-lg">5. Third-Party Sharing</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We do not sell your personal health or psychological data to third parties. Data is only shared with:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-4">
              <li>Cloud Providers: For secure hosting (e.g., Google Firebase or AWS).</li>
              <li>AI Processors: To generate your personalized coaching responses.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-brand-ink">
              <Shield size={18} className="text-orange-500" />
              <h3 className="font-bold text-lg">6. Your Rights</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Under global and local data protection laws (including the Uganda Data Protection and Privacy Act), you have the right to:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['Access your data', 'Correct inaccuracies', 'Request deletion', 'Withdraw consent'].map((right, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg border border-black/5">
                  <div className="w-1 h-1 rounded-full bg-orange-500" />
                  {right}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4 pt-6 border-t border-black/5">
            <div className="flex items-center gap-2 text-brand-ink">
              <Mail size={18} />
              <h3 className="font-bold text-lg">7. Contact Us</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about this policy, contact us at: 
              <a href="mailto:nebyamanuelmj@gmail.com" className="text-emerald-600 font-bold ml-1 hover:underline">
                nebyamanuelmj@gmail.com
              </a>
            </p>
          </section>

          <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
            <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-2">Medical Disclaimer</p>
            <p className="text-xs text-emerald-600 leading-relaxed italic">
              "This app provides educational insights based on scientific literature and is not a substitute for professional medical advice or therapy."
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-black/5 bg-gray-50 shrink-0">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-brand-ink text-white rounded-2xl font-bold text-sm hover:shadow-lg transition-all active:scale-95"
          >
            I Understand
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

import { Sparkles } from 'lucide-react';
