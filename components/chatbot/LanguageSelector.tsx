'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronDown, Globe } from 'lucide-react';
import type { Language } from '@/app/chatbot/page';

interface LanguageSelectorProps {
  languages: Language[];
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({ 
  languages, 
  selectedLanguage, 
  onLanguageChange 
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (language: Language) => {
    onLanguageChange(language);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full glassmorphism-dark border-white/20 text-white hover:bg-white/10 justify-between"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{selectedLanguage.flag}</span>
          <span className="font-medium">{selectedLanguage.name}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </Button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 z-[9999]"
          >
            <div className="glassmorphism-dark border border-white/20 rounded-lg overflow-hidden">
              {languages.map((language, index) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language)}
                  className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center justify-between group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{language.flag}</span>
                    <div>
                      <div className="font-medium text-white group-hover:text-yellow-300 transition-colors">
                        {language.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {getLanguageNativeName(language.code)}
                      </div>
                    </div>
                  </div>
                  
                  {selectedLanguage.code === language.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-400"
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
              
              {/* Language Stats */}
              <div className="border-t border-white/10 p-3">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Globe className="w-3 h-3" />
                  <span>
                    {languages.length} languages supported
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {getSupportedFeatures(selectedLanguage.code).map((feature, index) => (
                    <Badge 
                      key={index}
                      variant="secondary" 
                      className="text-xs bg-green-500/20 text-green-300 border-green-500/30"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

function getLanguageNativeName(langCode: string): string {
  const nativeNames = {
    en: 'English',
    hi: 'हिंदी',
    bn: 'বাংলা',
    ta: 'தமிழ்',
    te: 'తెలుగు'
  };
  return nativeNames[langCode as keyof typeof nativeNames] || langCode;
}

function getSupportedFeatures(langCode: string): string[] {
  const features = {
    en: ['Voice Input', 'Text-to-Speech', 'Full Support'],
    hi: ['Voice Input', 'Text-to-Speech', 'Regional Support'],
    bn: ['Voice Input', 'Text-to-Speech', 'Regional Support'],
    ta: ['Voice Input', 'Text-to-Speech', 'Regional Support'],
    te: ['Voice Input', 'Text-to-Speech', 'Regional Support']
  };
  return features[langCode as keyof typeof features] || ['Basic Support'];
}