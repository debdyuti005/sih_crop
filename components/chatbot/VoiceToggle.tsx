'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Keyboard, 
  MessageSquare,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import type { Language } from '@/app/chatbot/page';

interface VoiceToggleProps {
  isVoiceMode: boolean;
  onToggle: (enabled: boolean) => void;
  language: Language;
}

export function VoiceToggle({ isVoiceMode, onToggle, language }: VoiceToggleProps) {
  const [speechSupported, setSpeechSupported] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(false);
  const [testingVoice, setTestingVoice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check Speech Recognition support
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setSpeechSupported(!!SpeechRecognition);
      
      // Check Text-to-Speech support
      setTtsSupported('speechSynthesis' in window);
    }
  }, []);

  const testVoice = async () => {
    if (!ttsSupported) return;
    
    setTestingVoice(true);
    
    try {
      const testMessage = getTestMessage(language.code);
      const utterance = new SpeechSynthesisUtterance(testMessage);
      
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
      
      utterance.onend = () => setTestingVoice(false);
      utterance.onerror = () => setTestingVoice(false);
      
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Voice test failed:', error);
      setTestingVoice(false);
    }
  };

  const getVoiceStatus = (): 'full' | 'partial' | 'none' => {
    if (speechSupported && ttsSupported) return 'full';
    if (speechSupported || ttsSupported) return 'partial';
    return 'none';
  };

  const getStatusMessage = () => {
    const status = getVoiceStatus();
    const messages = {
      en: {
        full: 'Full voice support available',
        partial: 'Limited voice support',
        none: 'Voice features not supported'
      },
      hi: {
        full: 'पूर्ण आवाज सहायता उपलब्ध',
        partial: 'सीमित आवाज सहायता',
        none: 'आवाज सुविधाएं समर्थित नहीं'
      },
      bn: {
        full: 'সম্পূর্ণ ভয়েস সাপোর্ট উপলব্ধ',
        partial: 'সীমিত ভয়েস সাপোর্ট',
        none: 'ভয়েস ফিচার সাপোর্টেড নয়'
      },
      ta: {
        full: 'முழு குரல் ஆதரவு கிடைக்கிறது',
        partial: 'வரையறுக்கப்பட்ட குரல் ஆதரவு',
        none: 'குரல் அம்சங்கள் ஆதரிக்கப்படவில்லை'
      },
      te: {
        full: 'పూర్తి వాయిస్ సపోర్ట్ అందుబాటులో',
        partial: 'పరిమిత వాయిస్ సపోర్ట్',
        none: 'వాయిస్ ఫీచర్లు సపోర్టెడ్ కాదు'
      }
    };
    
    const langMessages = messages[language.code as keyof typeof messages] || messages.en;
    return langMessages[status];
  };

  const getFeatureList = () => {
    const features = [];
    
    if (speechSupported) {
      const speechText = {
        en: 'Speech Recognition',
        hi: 'आवाज पहचान',
        bn: 'বক্তৃতা স্বীকৃতি',
        ta: 'பேச்சு அங்கீகாரம்',
        te: 'వాక్ గుర్తింపు'
      };
      features.push(speechText[language.code as keyof typeof speechText] || speechText.en);
    }
    
    if (ttsSupported) {
      const ttsText = {
        en: 'Text-to-Speech',
        hi: 'पाठ से आवाज',
        bn: 'টেক্সট-টু-স্পিচ',
        ta: 'உரை-से-பேச्चு',
        te: 'టెక్స్ట్-టు-స్పీచ్'
      };
      features.push(ttsText[language.code as keyof typeof ttsText] || ttsText.en);
    }
    
    return features;
  };

  return (
    <div className="space-y-4">
      {/* Voice Mode Toggle */}
      <div className="flex items-center justify-between p-3 glassmorphism-dark rounded-lg border border-white/10">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: isVoiceMode ? 1.1 : 1 }}
            className={`p-2 rounded-lg ${
              isVoiceMode 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-gray-500/20 text-gray-400'
            }`}
          >
            {isVoiceMode ? <Mic className="w-5 h-5" /> : <Keyboard className="w-5 h-5" />}
          </motion.div>
          
          <div>
            <div className="font-medium text-white">
              {isVoiceMode ? (
                language.code === 'en' ? 'Voice Mode' :
                language.code === 'hi' ? 'आवाज मोड' :
                language.code === 'bn' ? 'ভয়েস মোড' :
                language.code === 'ta' ? 'குரல் முறை' :
                language.code === 'te' ? 'వాయిస్ మోడ్' : 'Voice Mode'
              ) : (
                language.code === 'en' ? 'Text Mode' :
                language.code === 'hi' ? 'टेक्स्ट मोड' :
                language.code === 'bn' ? 'টেক্সট মোড' :
                language.code === 'ta' ? 'உரை முறை' :
                language.code === 'te' ? 'టెక్స్ట్ మోడ్' : 'Text Mode'
              )}
            </div>
            <div className="text-xs text-gray-400">
              {getStatusMessage()}
            </div>
          </div>
        </div>
        
        <Switch
          checked={isVoiceMode}
          onCheckedChange={onToggle}
          disabled={getVoiceStatus() === 'none'}
          className="data-[state=checked]:bg-green-500"
        />
      </div>

      {/* Feature Status */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-300 mb-2">
          {language.code === 'en' ? 'Available Features' :
           language.code === 'hi' ? 'उपलब्ध सुविधाएं' :
           language.code === 'bn' ? 'উপলব্ধ ফিচার' :
           language.code === 'ta' ? 'கிடைக்கும் அம்சங்கள்' :
           language.code === 'te' ? 'అందుబాటులో ఉన్న ఫీచర్లు' : 'Available Features'}
        </div>
        
        {/* Speech Recognition Status */}
        <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">
              {language.code === 'en' ? 'Speech Input' :
               language.code === 'hi' ? 'आवाज इनपुट' :
               language.code === 'bn' ? 'ভয়েস ইনপুট' :
               language.code === 'ta' ? 'குரல் உள்ளீடு' :
               language.code === 'te' ? 'వాయిస్ ఇన్‌పుట్' : 'Speech Input'}
            </span>
          </div>
          {speechSupported ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
        </div>

        {/* Text-to-Speech Status */}
        <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">
              {language.code === 'en' ? 'Voice Output' :
               language.code === 'hi' ? 'आवाज आउटपुट' :
               language.code === 'bn' ? 'ভয়েস আউটপুট' :
               language.code === 'ta' ? 'குரல் வெளியீடு' :
               language.code === 'te' ? 'వాయిస్ అవుట్‌పుట్' : 'Voice Output'}
            </span>
          </div>
          {ttsSupported ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
        </div>
      </div>

      {/* Test Voice Button */}
      {ttsSupported && (
        <Button
          onClick={testVoice}
          disabled={testingVoice}
          variant="outline"
          className="w-full glassmorphism-dark border-white/20 hover:bg-white/10"
        >
          {testingVoice ? (
            <VolumeX className="w-4 h-4 mr-2 animate-pulse" />
          ) : (
            <Volume2 className="w-4 h-4 mr-2" />
          )}
          {testingVoice ? (
            language.code === 'en' ? 'Testing Voice...' :
            language.code === 'hi' ? 'आवाज परीक्षण...' :
            language.code === 'bn' ? 'ভয়েস টেস্ট করছি...' :
            language.code === 'ta' ? 'குரல் சோதனை...' :
            language.code === 'te' ? 'వాయిస్ టెస్ట్...' : 'Testing Voice...'
          ) : (
            language.code === 'en' ? 'Test Voice' :
            language.code === 'hi' ? 'आवाज परीक्षण' :
            language.code === 'bn' ? 'ভয়েস টেস্ট' :
            language.code === 'ta' ? 'குரல் சோதனை' :
            language.code === 'te' ? 'వాయిస్ టెస్ట్' : 'Test Voice'
          )}
        </Button>
      )}

      {/* Language Support Info */}
      <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <div className="flex items-start gap-2">
          <MessageSquare className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-blue-300">
            <div className="font-medium mb-1">
              {language.code === 'en' ? 'Language Support' :
               language.code === 'hi' ? 'भाषा सहायता' :
               language.code === 'bn' ? 'ভাষা সাহায্য' :
               language.code === 'ta' ? 'மொழி ஆதரவு' :
               language.code === 'te' ? 'భాషా మద్దతు' : 'Language Support'}
            </div>
            <div>
              {language.code === 'en' ? 
                `Voice features optimized for ${language.name}. Quality may vary by browser and device.` :
               language.code === 'hi' ? 
                `${language.name} के लिए आवाज सुविधाएं अनुकूलित। गुणवत्ता ब्राउज़र और डिवाइस के अनुसार भिन्न हो सकती है।` :
               language.code === 'bn' ? 
                `${language.name} এর জন্য ভয়েস ফিচার অপ্টিমাইজড। ব্राউজার এবং ডিভাইস অনুযায়ী মান ভিন্ন হতে পারে।` :
               language.code === 'ta' ? 
                `${language.name} க்கு குரல் அம்சங்கள் உகந்தவை। தரம் உலாவி மற்றும் சாதனத்தின் அடிப்படையில் மாறுபடலाम்।` :
               language.code === 'te' ? 
                `${language.name} కోసం వాయిస్ ఫీచర్లు ఆప్టిమైజ్ చేయబడ్డాయి। నాణ్యత బ్రౌజర్ మరియు పరికరంపై ఆధారపడి ఉంటుంది।` :
                `Voice features optimized for ${language.name}. Quality may vary by browser and device.`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTestMessage(langCode: string): string {
  const messages = {
    en: "Hello! This is a voice test for AgriWise Assistant.",
    hi: "नमस्ते! यह AgriWise सहायक के लिए आवाज परीक्षण है।",
    bn: "হ্যালো! এটি AgriWise সহায়কের জন্য ভয়েস টেস্ট।",
    ta: "வணக்கம்! இது AgriWise உதவியாளருக்கான குரல் சோதனை।",
    te: "హలో! ఇది AgriWise సహాయకుడి కోసం వాయిస్ టెస్ట్।"
  };
  return messages[langCode as keyof typeof messages] || messages.en;
}