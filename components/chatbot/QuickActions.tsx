'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Bug, 
  Wheat, 
  CloudRain, 
  DollarSign, 
  Droplets,
  Thermometer,
  Calendar,
  TrendingUp,
  MapPin,
  Clock,
  Zap
} from 'lucide-react';
import type { Language } from '@/app/chatbot/page';

interface QuickActionsProps {
  onActionClick: (query: string) => void;
  language: Language;
}

interface QuickAction {
  id: string;
  icon: React.ComponentType<any>;
  category: 'fertilizer' | 'pest' | 'crop' | 'weather' | 'market' | 'irrigation' | 'general';
  gradient: string;
  queries: Record<string, string>;
}

const quickActions: QuickAction[] = [
  {
    id: 'fertilizer-recommendation',
    icon: Sparkles,
    category: 'fertilizer',
    gradient: 'from-green-400 to-green-600',
    queries: {
      en: 'What fertilizer should I use for my wheat crop this season?',
      hi: 'इस मौसम में मेरी गेहूं की फसल के लिए कौन सी खाद का उपयोग करना चाहिए?',
      bn: 'এই মৌসুমে আমার গমের ফসলের জন্য কোন সার ব্যবহার করব?',
      ta: 'இந்த பருவத্তில் எनது கোதুমை পযিருক्கু எந্த উরম् পযन्পडুত্ত ভেন্ডুম্?',
      te: 'ఈ సీజన్‌లో నా గోధుమ పంటకు ఏ ఎరువు వాడాలి?'
    }
  },
  {
    id: 'pest-control',
    icon: Bug,
    category: 'pest',
    gradient: 'from-red-400 to-red-600',
    queries: {
      en: 'How can I control pests in my rice field?',
      hi: 'मैं अपने धान के खेत में कीटों को कैसे नियंत्रित करूं?',
      bn: 'আমি কিভাবে আমার ধানের ক্ষেতে পোকামাকড় নিয়ন্ত্রণ করব?',
      ta: 'என் நেल் ভযলিল् পূচ্চিকলै எভ্বারুे কট্টুপ্পডুত্তুভদু?',
      te: 'నా వరి పొలంలో కీటకాలను ఎలా నియంత్రించాలి?'
    }
  },
  {
    id: 'crop-selection',
    icon: Wheat,
    category: 'crop',
    gradient: 'from-yellow-400 to-yellow-600',
    queries: {
      en: 'Which crops are best for my soil type and current season?',
      hi: 'मेरी मिट्टी के प्रकार और वर्तमान मौसम के लिए कौन सी फसल सबसे अच्छी है?',
      bn: 'আমার মাটির ধরন এবং বর্তমান মৌসুমের জন্য কোন ফসল সবচেয়ে ভাল?',
      ta: 'எনদু মন् ভকै মত্রুম् তর্পোদैয পরুভত্তির্কু எন্দ পযির् সিরন্দদু?',
      te: 'నా మట్టి రకం మరియు ప్రస్తుత సీజన్‌కు ఏ పంటలు బెస్ట్?'
    }
  },
  {
    id: 'weather-forecast',
    icon: CloudRain,
    category: 'weather',
    gradient: 'from-blue-400 to-blue-600',
    queries: {
      en: 'What is the weather forecast for the next 7 days?',
      hi: 'अगले 7 दिनों के लिए मौसम का पूर্বানुमान क्या है?',
      bn: 'পরবর্তী ৭ দিনের আবহাওয়ার পূর্বাভাস কী?',
      ta: 'আদুত্ত 7 নাট্কলুক্কান ভানিলै মুন্নরিভিপ্পু এন্ন?',
      te: 'రాబోయే 7 రోజులకు వాతావరణ సూచన ఎলా ఉంది?'
    }
  },
  {
    id: 'market-prices',
    icon: DollarSign,
    category: 'market',
    gradient: 'from-purple-400 to-purple-600',
    queries: {
      en: 'What are today\'s market prices for rice and wheat?',
      hi: 'आज धान और गेहूं के बाজार भाव क्या हैं?',
      bn: 'আজ ধান ও গমের বাজারদর কত?',
      ta: 'ইন্রু অরিসি মত্রুম् কোদুমैযিন् সন্দै ভিলै এন্ন?',
      te: 'ఈరోజు బియ్యం మరియు గోధుమల మార్కెట్ రేట్లు ఎంత?'
    }
  },
  {
    id: 'irrigation-schedule',
    icon: Droplets,
    category: 'irrigation',
    gradient: 'from-cyan-400 to-cyan-600',
    queries: {
      en: 'When should I irrigate my crops next?',
      hi: 'मुझे अपनी फसल की अगली सिंचाई कब करनी चाहिए?',
      bn: 'আমার পরবর্তী সেচ কখন দেওয়া উচিত?',
      ta: 'আদুত্ত মুরै নীর্পাসনম් কব সেয্যবেন্ডুম্?',
      te: 'నా పంటলకు తর్వాత ఎప్పుడు నీరు పెట్టాలి?'
    }
  },
  {
    id: 'soil-health',
    icon: Thermometer,
    category: 'general',
    gradient: 'from-orange-400 to-orange-600',
    queries: {
      en: 'How can I check and improve my soil health?',
      hi: 'मैं अपनी मिट्टी के स्वास्थ्य की जांच और सुधार कैसे कर सकता हूं?',
      bn: 'আমি কিভাবে আমার মাটির স্বাস্থ্য পরীক্ষা ও উন্নতি করতে পারি?',
      ta: 'নান এপ্পডি এন् মন् স্বাস্থ্য পরিসোधনै সেয়তু মুন্নেত্রুবদু?',
      te: 'నా మట్టి ఆరోగ్యాన్ని ఎలా తనిఖీ చేసి మెరుగుపరచాలి?'
    }
  },
  {
    id: 'planting-calendar',
    icon: Calendar,
    category: 'general',
    gradient: 'from-indigo-400 to-indigo-600',
    queries: {
      en: 'What is the best planting calendar for this region?',
      hi: 'इस क्षेत्र के लिए सबसे अच्छा बुआई कैलेंडर क्या है?',
      bn: 'এই অঞ্চলের জন্য সেরা রোপণ ক্যালেন্ডার কী?',
      ta: 'ইন্দ পিরদেশত্তির্কু সিরন্দ নডভু কॅলেন্ডার্ এন্ন?',
      te: 'ఈ ప్రాంతానికి ఉత్తమ నాట్లు క్యాలెండర్ ఏది?'
    }
  }
];

export function QuickActions({ onActionClick, language }: QuickActionsProps) {
  const getActionsByCategory = () => {
    const categories = {
      primary: quickActions.slice(0, 4),
      secondary: quickActions.slice(4)
    };
    return categories;
  };

  const { primary, secondary } = getActionsByCategory();

  const getCategoryName = (category: string) => {
    const categoryNames = {
      en: {
        fertilizer: 'Fertilizer',
        pest: 'Pest Control',
        crop: 'Crop Advisory',
        weather: 'Weather',
        market: 'Market Prices',
        irrigation: 'Irrigation',
        general: 'General'
      },
      hi: {
        fertilizer: 'খাদ',
        pest: 'কীট নিয়ন্ত্রণ',
        crop: 'ফসল সলাহ',
        weather: 'মৌসুম',
        market: 'মন্ডী ভাভ',
        irrigation: 'সিন্চাই',
        general: 'সামান্য'
      },
      bn: {
        fertilizer: 'সার',
        pest: 'কীটপতঙ্গ',
        crop: 'ফসল পরামর্শ',
        weather: 'আবহাওয়া',
        market: 'বাজারদর',
        irrigation: 'সেচ',
        general: 'সাধারণ'
      },
      ta: {
        fertilizer: 'উরम্',
        pest: 'পুচ্চি',
        crop: 'পযির् পরামর্শ',
        weather: 'ভানিলै',
        market: 'সন্দै',
        irrigation: 'নীর্পাসনম্',
        general: 'পোদু'
      },
      te: {
        fertilizer: 'ఎరువు',
        pest: 'కীటকాలు',
        crop: 'పంట సలহా',
        weather: 'వాతావরణం',
        market: 'మార్కెట్',
        irrigation: 'నীটিపారుদল',
        general: 'సాধారণ'
      }
    };
    
    const langCategories = categoryNames[language.code as keyof typeof categoryNames] || categoryNames.en;
    return langCategories[category as keyof typeof langCategories] || category;
  };

  return (
    <div className="space-y-3 w-full">
      {/* Primary Actions */}
      <div>
        <div className="text-sm font-medium text-gray-300 mb-2">
          {language.code === 'en' ? 'Popular Questions' :
           language.code === 'hi' ? 'लोकप्রিয় প्रশ্न' :
           language.code === 'bn' ? 'জনপ্রিয় প্রশ্ন' :
           language.code === 'ta' ? 'পিরিয় কেল্ভিকল্' :
           language.code === 'te' ? 'ప্রসিদ্ধ প্রশ্নলু' : 'Popular Questions'}
        </div>
        
        <div className="grid grid-cols-2 gap-1">
          {primary.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={() => onActionClick(action.queries[language.code] || action.queries.en)}
                variant="outline"
                className="h-auto p-1.5 glassmorphism-dark border-white/20 hover:bg-white/10 text-left flex-col items-start gap-1 group relative overflow-hidden w-full text-xs"
              >
                {/* Background Gradient */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                
                {/* Icon */}
                <div className={`p-1 rounded-md bg-gradient-to-br ${action.gradient} relative z-10`}>
                  <action.icon className="w-3 h-3 text-white" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 text-left">
                  <div className="font-medium text-white text-xs group-hover:text-white transition-colors">
                    {getCategoryName(action.category)}
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                    Quick advice
                  </div>
                </div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Secondary Actions */}
      <div>
        <div className="text-sm font-medium text-gray-300 mb-2">
          {language.code === 'en' ? 'More Topics' :
           language.code === 'hi' ? 'अधিक विषয়' :
           language.code === 'bn' ? 'আরো বিষয়' :
           language.code === 'ta' ? 'अधিক বিষয়কল্' :
           language.code === 'te' ? 'మরিন্নি আংশালু' : 'More Topics'}
        </div>
        
        <div className="space-y-1">
          {secondary.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={() => onActionClick(action.queries[language.code] || action.queries.en)}
                variant="ghost"
                className="w-full justify-start h-auto p-1.5 glassmorphism-dark hover:bg-white/10 group relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
                
                <div className="flex items-center gap-2 relative z-10">
                  {/* Icon */}
                  <div className={`p-1 rounded-md bg-gradient-to-br ${action.gradient}`}>
                    <action.icon className="w-2.5 h-2.5 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="text-left flex-1">
                    <div className="font-medium text-white text-xs group-hover:text-white transition-colors">
                      {getCategoryName(action.category)}
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <Zap className="w-2 h-2 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Usage Stats */}
      <div className="p-2 bg-gradient-to-r from-green-500/10 to-yellow-500/10 border border-green-500/20 rounded-lg">
        <div className="flex items-center gap-1 mb-1">
          <TrendingUp className="w-3 h-3 text-green-400" />
          <span className="text-xs font-medium text-green-300">Most Asked Today</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Badge variant="secondary" className="bg-green-500/20 text-green-300 text-xs px-1.5 py-0.5">
            <Sparkles className="w-2 h-2 mr-1" />
            Fertilizer
          </Badge>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs px-1.5 py-0.5">
            <CloudRain className="w-2 h-2 mr-1" />
            Weather
          </Badge>
        </div>
      </div>
    </div>
  );
}