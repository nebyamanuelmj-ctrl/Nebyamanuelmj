import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Menu, Bell, User, LayoutDashboard, Shield, Utensils, BookOpen, Trophy, Sparkles, X, Search, HelpCircle, FileText, LogOut, ChevronRight, MessageSquare } from 'lucide-react';
import { SOSSection } from './components/SOSSection';
import { MoodFoodLog } from './components/MoodFoodLog';
import { DailyWins } from './components/DailyWins';
import { MicroJournal } from './components/MicroJournal';
import { SystemToggle } from './components/SystemToggle';
import { GlucoseHacks } from './components/GlucoseHacks';
import { DailyDozen } from './components/DailyDozen';
import { IdentityTracker } from './components/IdentityTracker';
import { BookSearch } from './components/BookSearch';
import { ToastProvider, useToast } from './components/Toast';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { HelpCenterModal } from './components/HelpCenterModal';
import { getSourceOfTheDay } from './services/gemini';

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sourceTip, setSourceTip] = useState<string | null>(null);
  const [showTip, setShowTip] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    getSourceOfTheDay().then(setSourceTip);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setActiveTab('mindset');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-black/5 p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-brand-ink rounded-xl flex items-center justify-center">
            <Activity className="text-white w-6 h-6" />
          </div>
          <h1 className="font-bold text-xl leading-tight tracking-tighter">BMJ MED</h1>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            icon={<Shield size={20} />} 
            label="SOS Relief" 
            active={activeTab === 'sos'} 
            onClick={() => setActiveTab('sos')} 
          />
          <NavItem 
            icon={<Utensils size={20} />} 
            label="Fuel Log" 
            active={activeTab === 'fuel'} 
            onClick={() => setActiveTab('fuel')} 
          />
          <NavItem 
            icon={<BookOpen size={20} />} 
            label="Mindset" 
            active={activeTab === 'mindset'} 
            onClick={() => setActiveTab('mindset')} 
          />
          {activeTab === 'mindset' && (
            <div className="ml-12 mt-1">
              <span className="px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-bold uppercase tracking-widest rounded-full">Active</span>
            </div>
          )}
        </nav>

        <div className="mt-auto pt-6 border-t border-black/5 space-y-4">
          <button 
            onClick={() => {
              window.location.href = 'mailto:nebyamanuelmj@gmail.com?subject=Stress Killer Suggestion';
            }}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-orange-500 transition-colors"
          >
            <MessageSquare size={12} />
            Suggest Stress Killer
          </button>
          <button 
            onClick={() => setIsHelpOpen(true)}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-blue-500 transition-colors"
          >
            <HelpCircle size={12} />
            Help Center
          </button>
          <button 
            onClick={() => setIsPrivacyOpen(true)}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-emerald-500 transition-colors"
          >
            <Shield size={12} />
            Privacy Policy
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
              MM
            </div>
            <div>
              <p className="text-sm font-bold">BMJ MED</p>
              <p className="text-xs text-gray-500">High Achiever</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 max-w-7xl mx-auto w-full pb-24 md:pb-10">
        {/* Source of the Day Banner */}
        {sourceTip && showTip && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -4, 0]
            }}
            transition={{
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="mb-10 p-6 bg-brand-ink text-white rounded-[2rem] flex items-center gap-6 relative overflow-hidden shadow-2xl shadow-black/10"
          >
            <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium leading-relaxed pr-8">{sourceTip}</p>
            </div>
            <button 
              onClick={() => setShowTip(false)}
              className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors p-1"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="flex-1">
            <h2 className="text-4xl font-serif font-bold tracking-tight mb-2 italic">
              Hello, <span className="text-red-600 font-bold italic">BMJ MED</span>.
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 flex-1 justify-end">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('mindset')}
              className="w-full md:max-w-xs relative group cursor-pointer"
            >
              <div className="absolute -top-3 left-4 px-2 py-0.5 bg-emerald-500 text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-sm z-10">
                Searching Mode
              </div>
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400 group-hover:text-emerald-500 transition-colors" />
              </div>
              <div className="w-full bg-white border border-black/5 rounded-2xl py-3 pl-12 pr-4 text-sm text-gray-400 font-medium shadow-sm hover:shadow-md hover:border-emerald-100 transition-all">
                Search wellness library...
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-50 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-black/5">
                ⌘K
              </div>
            </motion.div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Current Focus</span>
                <span className="text-sm font-bold">Metabolic Stability</span>
              </div>
              <button 
                onClick={() => {
                  showToast("Notifications cleared", "info");
                }}
                className="p-3 glass rounded-2xl hover:bg-white transition-all active:scale-95 group"
              >
                <Bell size={22} className="text-gray-500 group-hover:text-emerald-500 transition-colors" />
              </button>
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden p-3 glass rounded-2xl hover:bg-white transition-all active:scale-95"
              >
                <Menu size={22} className="text-gray-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {activeTab === 'dashboard' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <SystemToggle />
                  </motion.div>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <IdentityTracker />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <SOSSection />
                  </motion.div>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <MicroJournal />
                  </motion.div>
                </div>
                
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <MoodFoodLog />
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <DailyDozen />
                </motion.div>
              </>
            )}

            {activeTab === 'mindset' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <BookSearch />
              </motion.div>
            )}

            {activeTab === 'sos' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <SOSSection />
              </motion.div>
            )}

            {activeTab === 'fuel' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <MoodFoodLog />
              </motion.div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <DailyWins stressLevel={4} />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <GlucoseHacks />
            </motion.div>

            {/* Performance Stats */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="p-8 glass rounded-[2rem]"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-emerald-50 rounded-xl">
                  <Activity size={20} className="text-emerald-500" />
                </div>
                <h3 className="font-bold text-lg">System Status</h3>
              </div>
              <div className="space-y-6">
                <StatBar label="Metabolic Stability" value={85} color="bg-emerald-500" />
                <StatBar label="Nervous System" value={72} color="bg-blue-500" />
                <StatBar label="Cognitive Load" value={45} color="bg-yellow-500" />
              </div>
              
              <div className="mt-10 p-5 bg-gray-50 rounded-2xl border border-brand-border">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your system is optimized for <strong>Deep Work</strong> today. Prioritize high-leverage tasks before 2 PM.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="p-8 bg-emerald-50 border border-emerald-100 rounded-[2rem]"
            >
              <p className="text-xs text-emerald-700 leading-relaxed italic text-center">
                "This app provides educational insights based on scientific literature and is not a substitute for professional medical advice or therapy."
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 p-4 flex justify-around items-center z-50">
        <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'text-brand-ink' : 'text-gray-400'}>
          <LayoutDashboard size={24} />
        </button>
        <button onClick={() => setActiveTab('sos')} className={activeTab === 'sos' ? 'text-brand-ink' : 'text-gray-400'}>
          <Shield size={24} />
        </button>
        <button onClick={() => setActiveTab('fuel')} className={activeTab === 'fuel' ? 'text-brand-ink' : 'text-gray-400'}>
          <Utensils size={24} />
        </button>
        <button onClick={() => setActiveTab('mindset')} className={activeTab === 'mindset' ? 'text-brand-ink' : 'text-gray-400'}>
          <BookOpen size={24} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-80 bg-white z-[70] md:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-black/5 flex items-center justify-between">
                <h2 className="font-bold text-lg">Menu</h2>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-xl transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Account Section */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Account</p>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-black/5">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg">
                      MM
                    </div>
                    <div>
                      <p className="font-bold">BMJ MED</p>
                      <p className="text-xs text-gray-500">High Achiever</p>
                    </div>
                    <ChevronRight size={16} className="ml-auto text-gray-300" />
                  </div>
                </div>

                {/* Settings/Info Section */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Support & Legal</p>
                  <button 
                    onClick={() => {
                      setIsHelpOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-black/5 rounded-xl transition-colors text-gray-600"
                  >
                    <HelpCircle size={20} className="text-blue-500" />
                    <span className="font-semibold text-sm">Help Center</span>
                  </button>
                  <button 
                    onClick={() => {
                      setIsPrivacyOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-black/5 rounded-xl transition-colors text-gray-600"
                  >
                    <FileText size={20} className="text-emerald-500" />
                    <span className="font-semibold text-sm">Privacy Policy</span>
                  </button>
                  <button 
                    onClick={() => {
                      window.location.href = 'mailto:nebyamanuelmj@gmail.com?subject=Stress Killer Suggestion';
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors text-orange-600 border border-orange-100"
                  >
                    <MessageSquare size={20} />
                    <span className="font-bold text-xs">Have a suggestion for a new Stress Killer? Tell us!</span>
                  </button>
                </div>

                {/* App Info */}
                <div className="pt-6 border-t border-black/5">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    <span>App Version</span>
                    <span className="text-brand-ink">v1.0.0</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-black/5">
                <button className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-bold text-sm hover:bg-red-100 transition-colors">
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPrivacyOpen && (
          <PrivacyPolicyModal onClose={() => setIsPrivacyOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHelpOpen && (
          <HelpCenterModal 
            onClose={() => setIsHelpOpen(false)} 
            onOpenPrivacy={() => {
              setIsHelpOpen(false);
              setIsPrivacyOpen(true);
            }}
            onStartBreathing={() => {
              setActiveTab('sos');
              showToast("Starting breathing exercise...", "info");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      data-label={label}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${
        active 
          ? 'text-white' 
          : 'text-gray-500 hover:text-brand-ink'
      }`}
    >
      {active && (
        <motion.div 
          layoutId="nav-active"
          className="absolute inset-0 bg-brand-ink rounded-xl shadow-lg shadow-black/10"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{icon}</span>
      <span className="font-semibold text-sm relative z-10">{label}</span>
      {!active && (
        <motion.div 
          className="absolute inset-0 bg-black/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
        />
      )}
    </button>
  );
}

function StatBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <motion.div 
      whileHover={{ x: 4 }}
      className="cursor-default"
    >
      <div className="flex justify-between text-xs font-bold mb-1">
        <span className="text-gray-400 uppercase tracking-wider">{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color}`}
        />
      </div>
    </motion.div>
  );
}
