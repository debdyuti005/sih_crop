'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import { ChatInputBar } from './ChatInputBar';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Loader2 } from 'lucide-react';
import type { Message, Language } from '@/app/chatbot/page';

interface ChatbotWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isTyping: boolean;
  language: Language;
  isVoiceMode: boolean;
}

export function ChatbotWindow({ 
  messages, 
  onSendMessage, 
  isTyping, 
  language, 
  isVoiceMode 
}: ChatbotWindowProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  return (
    <Card className="glassmorphism-dark h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-yellow-400 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-semibold gradient-text-dark">AgriWise Assistant</h2>
            <p className="text-sm text-gray-400">
              Always here to help • {language.name}
            </p>
          </div>
          <div className="ml-auto">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <ChatMessage message={message} language={language} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-yellow-400 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="glassmorphism-dark p-3 rounded-2xl rounded-tl-sm border border-yellow-400/30 max-w-xs">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-yellow-400" />
                    <span className="text-sm text-gray-300">
                      {getTypingText(language.code)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10">
        <ChatInputBar 
          onSendMessage={onSendMessage}
          language={language}
          isVoiceMode={isVoiceMode}
        />
      </div>
    </Card>
  );
}

function getTypingText(langCode: string): string {
  const typingTexts = {
    en: "AgriWise is typing...",
    hi: "AgriWise टाइप कर रहा है...",
    bn: "AgriWise টাইপ করছে...",
    ta: "AgriWise தட்டச்சு செய்கிறது...",
    te: "AgriWise టైప్ చేస్తోంది..."
  };
  return typingTexts[langCode as keyof typeof typingTexts] || typingTexts.en;
}