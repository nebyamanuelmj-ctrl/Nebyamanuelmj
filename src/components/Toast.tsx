import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto"
            >
              <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md ${
                toast.type === 'success' ? 'bg-emerald-500/90 border-emerald-400 text-white' :
                toast.type === 'error' ? 'bg-red-500/90 border-red-400 text-white' :
                'bg-brand-ink/90 border-gray-700 text-white'
              }`}>
                {toast.type === 'success' && <CheckCircle2 size={18} />}
                {toast.type === 'error' && <AlertCircle size={18} />}
                {toast.type === 'info' && <Info size={18} />}
                <p className="text-sm font-bold tracking-tight">{toast.message}</p>
                <button 
                  onClick={() => removeToast(toast.id)}
                  className="ml-2 p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
