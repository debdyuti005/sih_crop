'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Bot, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Bug, 
  Wheat, 
  CloudRain, 
  DollarSign,
  Clock
} from 'lucide-react';
import type { Message, Language } from '@/app/chatbot/page';

interface ChatMessageProps {
  message: Message;
  language: Language;
}

const categoryIcons = {
  'fertilizer': Sparkles,
  'pest': Bug,
  'crop-advisory': Wheat,
  'weather': CloudRain,
  'market': DollarSign
};

const categoryColors = {
  'fertilizer': 'from-green-400 to-green-600',
  'pest': 'from-red-400 to-red-600',
  'crop-advisory': 'from-yellow-400 to-yellow-600',
  'weather': 'from-blue-400 to-blue-600',
  'market': 'from-purple-400 to-purple-600'
};

export function ChatMessage({ message, language }: ChatMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const playAudio = async () => {
    if (audioError || !message.audioUrl) return;

    try {
      setIsPlaying(true);
      
      // Use Web Speech API for text-to-speech
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(message.text);
        
        // Set language for speech
        const langMap = {
          'hi': 'hi-IN',
          'bn': 'bn-BD', 
          'ta': 'ta-IN',
          'te': 'te-IN',
          'en': 'en-US'
        };
        
        utterance.lang = langMap[language.code as keyof typeof langMap] || 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => {
          setIsPlaying(false);
          setAudioError(true);
        };
        
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Audio playback failed:', error);
      setIsPlaying(false);
      setAudioError(true);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat(language.code === 'hi' ? 'hi-IN' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  if (message.isBot) {
    const CategoryIcon = message.category ? categoryIcons[message.category] : Bot;
    const categoryGradient = message.category ? categoryColors[message.category] : 'from-green-400 to-yellow-400';

    return (
      <div className="flex items-start gap-3 animate-in slide-in-from-left-5 fade-in duration-500">
        {/* Bot Avatar */}
        <motion.div 
          className={`w-8 h-8 rounded-full bg-gradient-to-r ${categoryGradient} flex items-center justify-center flex-shrink-0 glow-effect-dark`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CategoryIcon className="w-4 h-4 text-white" />
        </motion.div>

        {/* Message Content */}
        <div className="flex-1 max-w-md lg:max-w-lg">
          <motion.div 
            className="glassmorphism-dark p-4 rounded-2xl rounded-tl-sm border border-yellow-400/30 relative group"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Category Badge */}
            {message.category && (
              <Badge 
                variant="secondary" 
                className={`absolute -top-2 -right-2 bg-gradient-to-r ${categoryGradient} text-white border-0 text-xs`}
              >
                {getCategoryName(message.category, language.code)}
              </Badge>
            )}

            {/* Message Text */}
            <p className="text-gray-100 leading-relaxed mb-2 text-sm md:text-base">
              {message.text}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                {formatTime(message.timestamp)}
              </div>
              
              {message.audioUrl && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={isPlaying ? stopAudio : playAudio}
                  disabled={audioError}
                  className="h-8 px-3 text-xs hover:bg-white/10 transition-colors"
                >
                  {isPlaying ? (
                    <VolumeX className="w-3 h-3 mr-1" />
                  ) : (
                    <Volume2 className="w-3 h-3 mr-1" />
                  )}
                  {isPlaying ? 'Stop' : 'Listen'}
                </Button>
              )}
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/5 to-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    );
  }

  // User Message
  return (
    <div className="flex items-start gap-3 justify-end animate-in slide-in-from-right-5 fade-in duration-500">
      {/* Message Content */}
      <div className="flex-1 max-w-md lg:max-w-lg">
        <motion.div 
          className="glassmorphism-dark p-4 rounded-2xl rounded-tr-sm border border-green-400/30 relative group ml-auto"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-gray-100 leading-relaxed text-sm md:text-base">
            {message.text}
          </p>
          
          <div className="flex items-center justify-end mt-2 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              {formatTime(message.timestamp)}
            </div>
          </div>

          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-green-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.div>
      </div>

      {/* User Avatar */}
      <motion.div 
        className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center flex-shrink-0"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <User className="w-4 h-4 text-white" />
      </motion.div>
    </div>
  );
}

function getCategoryName(category: string, langCode: string): string {
  const categoryNames = {
    en: {
      'fertilizer': 'Fertilizer',
      'pest': 'Pest Control',
      'crop-advisory': 'Crop Advice',
      'weather': 'Weather',
      'market': 'Market'
    },
    hi: {
      'fertilizer': 'खाद',
      'pest': 'कीट नियंत्रण',
      'crop-advisory': 'फसल सलाह',
      'weather': 'मौसम',
      'market': 'मंडी'
    },
    bn: {
      'fertilizer': 'সার',
      'pest': 'কীটপতঙ্গ নিয়ন্ত্রণ',
      'crop-advisory': 'ফসলের পরামর্শ',
      'weather': 'আবহাওয়া',
      'market': 'বাজার'
    },
    ta: {
      'fertilizer': 'உரம்',
      'pest': 'பூச்சி கட்டுப்பাদு',
      'crop-advisory': 'பயிர் ஆலோசனை',
      'weather': 'வானிலை',
      'market': 'சந்தை'
    },
    te: {
      'fertilizer': 'ఎరువు',
      'pest': 'కీటకాల నియంత్రణ',
      'crop-advisory': 'పంట సలహా',
      'weather': 'వాతావరణం',
      'market': 'మార్కెట్'
    }
  };

  const langCategories = categoryNames[langCode as keyof typeof categoryNames] || categoryNames.en;
  return langCategories[category as keyof typeof langCategories] || category;
}