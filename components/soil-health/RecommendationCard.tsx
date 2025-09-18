'use client';

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Clipboard, Check } from 'lucide-react';

interface RecommendationCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export function RecommendationCard({ icon, title, children }: RecommendationCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const content = Array.isArray(children) 
      ? children.join(' ') 
      : (typeof children === 'object' ? JSON.stringify(children) : children);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content as string);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glassmorphism-dark p-4 border-l-4 border-green-400"
        >
            <div className="flex items-start justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-start space-x-3">
                    <div className="text-green-400 mt-1">{icon}</div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-100">{title}</h4>
                    </div>
                </div>
                <button className="text-slate-400 hover:text-white">
                    {isOpen ? <ChevronDown /> : <ChevronRight />}
                </button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-3 pl-10 text-slate-300 space-y-2">
                            {children}
                        </div>
                        <div className="flex items-center justify-end space-x-2 mt-4">
                            <button 
                              onClick={handleCopy} 
                              className="liquid-glass-dark px-3 py-1.5 hover:bg-slate-700/80 flex items-center space-x-1.5"
                            >
                                {copied ? <Check size={16} className="text-green-400" /> : <Clipboard size={16} />}
                                <span>{copied ? 'Copied!' : 'Copy'}</span>
                            </button>
                            <button 
                              onClick={() => alert('Feature to save to profile is in development!')} 
                              className="liquid-glass-dark px-3 py-1.5 hover:bg-slate-700/80"
                            >
                              Save
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}