'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Mic, 
  MicOff, 
  Loader2, 
  Keyboard,
  Volume2
} from 'lucide-react';
import type { Language } from '@/app/chatbot/page';

interface ChatInputBarProps {
  onSendMessage: (message: string) => void;
  language: Language;
  isVoiceMode: boolean;
}

export function ChatInputBar({ onSendMessage, language, isVoiceMode }: ChatInputBarProps) {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  // Check for speech recognition support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setSpeechSupported(!!SpeechRecognition);
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        
        // Set language for recognition
        const langMap = {
          'hi': 'hi-IN',
          'bn': 'bn-BD', 
          'ta': 'ta-IN',
          'te': 'te-IN',
          'en': 'en-US'
        };
        recognition.lang = langMap[language.code as keyof typeof langMap] || 'en-US';
        
        recognition.onstart = () => {
          setIsRecording(true);
          setIsProcessing(false);
        };
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsRecording(false);
          setIsProcessing(false);
          
          // Auto-send in voice mode
          if (isVoiceMode && transcript.trim()) {
            handleSendMessage(transcript);
          }
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
          setIsProcessing(false);
        };
        
        recognition.onend = () => {
          setIsRecording(false);
          setIsProcessing(false);
        };
        
        recognitionRef.current = recognition;
      }
    }
  }, [language.code, isVoiceMode]);

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text) return;
    
    onSendMessage(text);
    setInput('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startVoiceRecognition = () => {
    if (!speechSupported || !recognitionRef.current) return;
    
    try {
      setIsProcessing(true);
      recognitionRef.current.start();
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      setIsProcessing(false);
    }
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    setIsProcessing(false);
  };

  const getPlaceholder = () => {
    const placeholders = {
      en: "Type your question (e.g., 'Which fertilizer for wheat now?')",
      hi: "अपना प्रश्न लिखें (जैसे, 'गेहूं के लिए अभी कौन सी खाद डालें?')",
      bn: "আপনার প্রশ্ন লিখুন (যেমন, 'গমের জন্য এখন কোন সার দেব?')",
      ta: "உங்கள் கேள்வியை எழுதுங்கள் (உதா, 'கோதுமைக்கு இப்போது எந்த உரம்?')",
      te: "మీ ప్రశ్నను రాయండి (ఉదా, 'గోధుమలకు ఇప్పుడు ఏ ఎరువు?')"
    };
    return placeholders[language.code as keyof typeof placeholders] || placeholders.en;
  };

  const getVoiceStatus = () => {
    if (isRecording) {
      const statuses = {
        en: "Listening...",
        hi: "सुन रहा है...",
        bn: "শুনছি...",
        ta: "கேட்கிறது...",
        te: "వింటోంది..."
      };
      return statuses[language.code as keyof typeof statuses] || statuses.en;
    }
    if (isProcessing) {
      const statuses = {
        en: "Processing...",
        hi: "प्रोसेसिंग...",
        bn: "প্রক্রিয়াকরণ...",
        ta: "செயலாக்கம்...",
        te: "ప్రాసెసింగ్..."
      };
      return statuses[language.code as keyof typeof statuses] || statuses.en;
    }
    return null;
  };

  return (
    <div className="space-y-3">
      {/* Voice Status */}
      {(isRecording || isProcessing) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 py-2"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
            <Volume2 className="w-3 h-3 mr-1" />
            {getVoiceStatus()}
          </Badge>
        </motion.div>
      )}

      {/* Input Area */}
      <div className="relative">
        <div className="flex gap-3 items-end">
          {/* Text Input */}
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                // Auto-resize
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
              onKeyPress={handleKeyPress}
              placeholder={getPlaceholder()}
              disabled={isRecording || isProcessing}
              className="glassmorphism-dark border-white/20 text-white placeholder-gray-400 resize-none min-h-[48px] max-h-[120px] pr-12"
              rows={1}
            />
            
            {/* Input Mode Indicator */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isVoiceMode ? (
                <Badge variant="outline" className="border-green-400/50 text-green-400 text-xs">
                  <Mic className="w-3 h-3 mr-1" />
                  Voice
                </Badge>
              ) : (
                <Badge variant="outline" className="border-blue-400/50 text-blue-400 text-xs">
                  <Keyboard className="w-3 h-3 mr-1" />
                  Text
                </Badge>
              )}
            </div>
          </div>

          {/* Voice Button */}
          {speechSupported && (
            <Button
              onClick={isRecording ? stopVoiceRecognition : startVoiceRecognition}
              disabled={isProcessing}
              className={`liquid-glass-dark h-12 w-12 p-0 ${
                isRecording ? 'glow-effect-dark bg-red-500/20 border-red-400' : 
                isVoiceMode ? 'glow-effect-dark bg-green-500/20 border-green-400' : ''
              }`}
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isRecording ? (
                <MicOff className="w-5 h-5 text-red-400" />
              ) : (
                <Mic className={`w-5 h-5 ${isVoiceMode ? 'text-green-400' : 'text-gray-400'}`} />
              )}
            </Button>
          )}

          {/* Send Button */}
          <Button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isRecording || isProcessing}
            className="liquid-glass-dark h-12 w-12 p-0 bg-green-500/20 border-green-400 glow-effect-dark"
          >
            <Send className="w-5 h-5 text-green-400" />
          </Button>
        </div>

        {/* Character Limit */}
        {input.length > 0 && (
          <div className="text-xs text-gray-500 mt-1 text-right">
            {input.length}/500
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      {!input && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2"
        >
          {getQuickSuggestions(language.code).map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInput(suggestion)}
              className="text-xs bg-white/5 border-white/20 hover:bg-white/10 text-gray-300"
            >
              {suggestion}
            </Button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function getQuickSuggestions(langCode: string): string[] {
  const suggestions = {
    en: [
      "Best fertilizer for wheat?",
      "Pest control tips",
      "Today's market price",
      "Weather forecast"
    ],
    hi: [
      "गेहूं के लिए सबसे अच्छी खाद?",
      "कीट नियंत्रण के तरीके",
      "आज का मंडी भाव",
      "मौसम की जानकारी"
    ],
    bn: [
      "গমের জন্য সেরা সার?",
      "পোকা নিয়ন্ত্রণের উপায়",
      "আজকের বাজারদর",
      "আবহাওয়ার খবর"
    ],
    ta: [
      "கோதுமைக்கு சிறந்த உரம்?",
      "பூச்சி கட்டுப்பாடு வழிகள்",
      "இன்றைய சந்தை விலை",
      "வானிலை அறிக்கை"
    ],
    te: [
      "గోధుమలకు మంచి ఎరువు?",
      "కీటకాల నియంత్రణ మార్गాలు",
      "నేటి మార్కెట్ రేట్",
      "వాతావరణ సమాచారం"
    ]
  };
  
  return suggestions[langCode as keyof typeof suggestions] || suggestions.en;
}