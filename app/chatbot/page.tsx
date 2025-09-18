'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatbotWindow } from '@/components/chatbot/ChatbotWindow';
import { QuickActions } from '@/components/chatbot/QuickActions';
import { LanguageSelector } from '@/components/chatbot/LanguageSelector';
import { VoiceToggle } from '@/components/chatbot/VoiceToggle';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Download } from 'lucide-react';

export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  category?: 'fertilizer' | 'pest' | 'crop-advisory' | 'weather' | 'market';
  language?: string;
  audioUrl?: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  // Welcome message on component mount
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      text: getWelcomeMessage(selectedLanguage.code),
      isBot: true,
      timestamp: new Date(),
      category: 'crop-advisory',
      language: selectedLanguage.code
    };
    setMessages([welcomeMessage]);
  }, []);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getWelcomeMessage = (langCode: string): string => {
    const welcomeMessages = {
      en: "Hello farmer! 👨‍🌾 I'm AgriWise Assistant. Ask me about crops, fertilizers, pest control, weather, or market prices!",
      hi: "नमस्कार किसान जी! 👨‍🌾 मैं AgriWise सहायक हूं। मुझसे फसल, खाद, कीट नियंत्रण, मौसम या बाजार भाव के बारे में पूछें!",
      bn: "নমস্কার কৃষক! 👨‍🌾 আমি AgriWise সহায়ক। ফসল, সার, কীটপতঙ্গ নিয়ন্ত্রণ, আবহাওয়া বা বাজারদর সম্পর্কে জিজ্ঞাসা করুন!",
      ta: "வணக்கம் விவசாயி! 👨‍🌾 நான் AgriWise உதவியாளர். பயிர்கள், உரங்கள், பூச்சி கட்டுப்பாடு, வானிலை அல்லது சந்தை விலைகள் பற்றி கேளுங்கள்!",
      te: "నమస్కారం రైతు గారు! 👨‍🌾 నేను AgriWise సహాయకుడను. పంటలు, ఎరువులు, పెస్ట్ కంట్రోల్, వాతావరణం లేదా మార్కెట్ ధరల గురించి అడగండి!"
    };
    return welcomeMessages[langCode as keyof typeof welcomeMessages] || welcomeMessages.en;
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
      language: selectedLanguage.code
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate API delay
    setTimeout(async () => {
      const botResponse = await getBotResponse(text, selectedLanguage.code);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        isBot: true,
        timestamp: new Date(),
        category: botResponse.category as any,
        language: selectedLanguage.code,
        audioUrl: botResponse.audioUrl
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    const langChangeMessage: Message = {
      id: Date.now().toString(),
      text: getWelcomeMessage(language.code),
      isBot: true,
      timestamp: new Date(),
      category: 'crop-advisory',
      language: language.code
    };
    setMessages(prev => [...prev, langChangeMessage]);
  };

  const exportConversation = () => {
    const conversationText = messages.map(msg => 
      `${msg.isBot ? 'AgriWise' : 'You'} (${new Date(msg.timestamp).toLocaleTimeString()}): ${msg.text}`
    ).join('\n\n');
    
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agriwise-conversation-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1E1E1E] text-white">
      {/* Offline Warning Banner */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-red-500/20 border border-red-500 text-red-100 px-6 py-3 text-center backdrop-blur-sm"
          >
            <div className="flex items-center justify-center gap-2">
              <WifiOff className="w-5 h-5" />
              <span>No internet connection. Some features may not work.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-6 h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text-dark mb-2">
              AgriWise Assistant
            </h1>
            <p className="text-gray-400">Your AI-powered farming companion</p>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-green-500/20 text-green-300">
              <Wifi className="w-4 h-4 mr-1" />
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
            
            <Button 
              onClick={exportConversation}
              className="liquid-glass-dark"
              size="sm"
              disabled={messages.length <= 1}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Chat
            </Button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex gap-6 min-h-0">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-80 flex flex-col gap-4"
          >
            <Card className="glassmorphism-dark p-4">
              <h3 className="font-semibold mb-3 text-yellow-300">Language</h3>
              <LanguageSelector
                languages={languages}
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </Card>

            <Card className="glassmorphism-dark p-4">
              <h3 className="font-semibold mb-3 text-yellow-300">Voice Mode</h3>
              <VoiceToggle
                isVoiceMode={isVoiceMode}
                onToggle={setIsVoiceMode}
                language={selectedLanguage}
              />
            </Card>

            <div className="flex-1 flex flex-col gap-4">
              <Card className="glassmorphism-dark p-4">
                <h3 className="font-semibold mb-3 text-yellow-300">Quick Actions</h3>
                <QuickActions
                  onActionClick={handleQuickAction}
                  language={selectedLanguage}
                />
              </Card>
            </div>
          </motion.div>

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 min-w-0"
          >
            <ChatbotWindow
              messages={messages}
              onSendMessage={handleSendMessage}
              isTyping={isTyping}
              language={selectedLanguage}
              isVoiceMode={isVoiceMode}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Mock AI Response Function
async function getBotResponse(input: string, language: string) {
  const responses = {
    en: {
      fertilizer: "Apply 50kg Urea + 25kg DAP per acre. Best application time is early morning after irrigation. 🌱",
      pest: "Your crop shows blight symptoms. Spray Carbendazim 50% WP @ 1g/liter water. Repeat after 15 days if needed. 🐛",
      crop: "Based on current season and soil conditions, Wheat and Mustard are ideal choices. Expected yield: 45-50 quintals/hectare. 🌾",
      weather: "Heavy rainfall expected in next 48 hours. Delay fertilizer application and ensure proper drainage. ⛈️",
      market: "Today's mandi rates: Rice ₹2100/quintal, Wheat ₹2300/quintal at Patna market. Prices trending upward. 💰",
      default: "I understand your concern. Let me help you with the best agricultural practices for your situation. 👨‍🌾"
    },
    hi: {
      fertilizer: "प्रति एकड़ 50kg यूरिया + 25kg DAP डालें। सुबह सिंचाई के बाद डालना सबसे अच्छा है। 🌱",
      pest: "आपकी फसल में झुलसा रोग दिख रहा है। कार्बेंडाजिम 50% WP @ 1g/लीटर पानी छिड़कें। 15 दिन बाद दोहराएं। 🐛",
      crop: "मौजूदा मौसम के अनुसार गेहूं और सरसों सबसे अच्छी फसल है। अपेक्षित उपज: 45-50 क्विंटल/हेक्टेयर। 🌾",
      weather: "अगले 48 घंटों में भारी बारिश की संभावना। खाद डालना टालें और जल निकासी सुनिश्चित करें। ⛈️",
      market: "आज की मंडी दरें: धान ₹2100/क्विंटल, गेहूं ₹2300/क्विंटल पटना मंडी में। भाव बढ़ रहे हैं। 💰",
      default: "मैं आपकी समस्या समझता हूं। आपकी स्थिति के लिए सबसे अच्छी कृषि पद्धति बताता हूं। 👨‍🌾"
    }
  };

  const langResponses = responses[language as keyof typeof responses] || responses.en;
  
  let category = 'crop-advisory';
  let responseText = langResponses.default;

  const inputLower = input.toLowerCase();
  if (inputLower.includes('fertilizer') || inputLower.includes('खाद') || inputLower.includes('urea')) {
    category = 'fertilizer';
    responseText = langResponses.fertilizer;
  } else if (inputLower.includes('pest') || inputLower.includes('disease') || inputLower.includes('रोग') || inputLower.includes('कीट')) {
    category = 'pest';
    responseText = langResponses.pest;
  } else if (inputLower.includes('crop') || inputLower.includes('seed') || inputLower.includes('फसल') || inputLower.includes('बीज')) {
    category = 'crop';
    responseText = langResponses.crop;
  } else if (inputLower.includes('weather') || inputLower.includes('rain') || inputLower.includes('मौसम') || inputLower.includes('बारिश')) {
    category = 'weather';
    responseText = langResponses.weather;
  } else if (inputLower.includes('price') || inputLower.includes('market') || inputLower.includes('मंडी') || inputLower.includes('भाव')) {
    category = 'market';
    responseText = langResponses.market;
  }

  return {
    text: responseText,
    category,
    audioUrl: `/mock/${category}-${language}.mp3`
  };
}