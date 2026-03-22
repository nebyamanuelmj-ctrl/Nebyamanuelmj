import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, BookOpen, ExternalLink, Sparkles, Loader2 } from 'lucide-react';
import { searchBookIdea } from '../services/gemini';
import Markdown from 'react-markdown';
import { useToast } from './Toast';

export const BookSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; sources: string[] } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const searchResult = await searchBookIdea(query);
    setResult(searchResult);
    setLoading(false);
    showToast("Search complete", "success");
  };

  const suggestedQueries = [
    "Identity-based habits",
    "Glucose spikes and mood",
    "Nervous system freeze response",
    "System 1 vs System 2 thinking",
    "The stress completion cycle"
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-emerald-500 text-white rounded-2xl flex items-center justify-between shadow-lg shadow-emerald-500/20"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span className="text-xs font-bold uppercase tracking-widest">Searching Mode Active</span>
        </div>
        <span className="text-[10px] font-medium opacity-80">Powered by BMJ MED Library</span>
      </motion.div>

      <section className="p-8 glass rounded-[2rem] card-hover" id="book-search">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Mindset Library</h2>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Searching Mode Active</p>
            </div>
          </div>
        </div>

      <form onSubmit={handleSearch} className="relative mb-8">
        <input 
          ref={inputRef}
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ideas from the BMJ MED library..."
          className="input-field pr-12"
        />
        <button 
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-emerald-500 transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </button>
      </form>

      {!result && !loading && (
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Try searching for:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setQuery(q);
                  // Trigger search immediately
                  searchBookIdea(q).then(setResult);
                }}
                className="px-3 py-1.5 bg-gray-50 border border-brand-border rounded-full text-xs font-medium text-gray-600 hover:bg-emerald-50 hover:border-emerald-100 hover:text-emerald-600 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <Sparkles className="w-8 h-8 text-emerald-500 animate-pulse mb-4" />
            <p className="text-sm text-gray-500 italic">Consulting the BMJ MED library...</p>
          </motion.div>
        )}

        {result && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
              <Markdown>{result.text}</Markdown>
            </div>

            {result.sources.length > 0 && (
              <div className="pt-6 border-t border-brand-border">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Sources & Further Reading</p>
                <div className="flex flex-col gap-2">
                  {result.sources.map((source, i) => (
                    <a 
                      key={i}
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-emerald-600 hover:underline group"
                    >
                      <ExternalLink size={12} className="shrink-0" />
                      <span className="truncate">{source}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <button 
              onClick={() => {
                setResult(null);
                setQuery('');
              }}
              className="text-xs font-bold text-gray-400 hover:text-brand-ink transition-colors uppercase tracking-widest"
            >
              Clear Search
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      </section>
    </div>
  );
};
