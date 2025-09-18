'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Camera, 
  AlertTriangle, 
  CheckCircle, 
  Bug,
  Leaf,
  MapPin,
  Calendar,
  Volume2,
  Save,
  MessageSquare,
  Globe
} from 'lucide-react';
import { ImageUploadCard } from '@/components/pest-disease/ImageUploadCard';
import { DiagnosisCard } from '@/components/pest-disease/DiagnosisCard';
import { TreatmentCard } from '@/components/pest-disease/TreatmentCard';
import { AlertCard } from '@/components/pest-disease/AlertCard';
import { CropHealthCharts } from '@/components/pest-disease/CropHealthCharts';
import { SaveReportButton } from '@/components/pest-disease/SaveReportButton';

// Mock data for demonstration
const MOCK_DETECTION_DATA = {
  diagnosis: {
    pestName: 'Aphid Infestation',
    pestType: 'pest',
    severity: 'medium', // low, medium, high
    confidence: 87,
    affectedArea: 15,
    description: 'Small, soft-bodied insects found on leaves and stems, causing yellowing and stunted growth.',
    symptoms: ['Yellowing leaves', 'Sticky honeydew', 'Curled foliage', 'Stunted growth']
  },
  treatments: {
    organic: [
      {
        name: 'Neem Oil Spray',
        description: 'Natural insecticide that disrupts pest feeding',
        dosage: '2-3ml per liter of water',
        frequency: 'Every 7 days',
        safety: 'Safe for beneficial insects'
      },
      {
        name: 'Ladybug Release',
        description: 'Biological control using natural predators',
        dosage: '1000-2000 ladybugs per acre',
        frequency: 'One-time release',
        safety: 'Completely organic solution'
      }
    ],
    chemical: [
      {
        name: 'Imidacloprid 17.8% SL',
        description: 'Systemic insecticide for effective aphid control',
        dosage: '0.3ml per liter of water',
        frequency: 'Apply once, repeat after 15 days',
        safety: 'Follow safety precautions, wear protective gear'
      }
    ],
    preventive: [
      {
        name: 'Proper Plant Spacing',
        description: 'Ensure adequate air circulation between plants',
        implementation: 'Maintain 30-45cm spacing between plants'
      },
      {
        name: 'Regular Monitoring',
        description: 'Weekly inspection of plants for early detection',
        implementation: 'Check undersides of leaves daily'
      }
    ]
  },
  alerts: [
    {
      id: 1,
      type: 'warning',
      title: 'Moderate Pest Activity Detected',
      message: 'Aphid population is increasing. Monitor crops daily and consider treatment.',
      priority: 'medium',
      timestamp: '5 mins ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'Seasonal Advisory',
      message: 'Current weather conditions favor aphid reproduction. Take preventive measures.',
      priority: 'low',
      timestamp: '1 hour ago'
    }
  ],
  healthAnalytics: {
    healthyPercentage: 85,
    infectedPercentage: 15,
    trendData: [
      { month: 'Jan', healthy: 95, infected: 5 },
      { month: 'Feb', healthy: 92, infected: 8 },
      { month: 'Mar', healthy: 88, infected: 12 },
      { month: 'Apr', healthy: 85, infected: 15 }
    ],
    commonPests: [
      { name: 'Aphids', count: 12, percentage: 40 },
      { name: 'Thrips', count: 8, percentage: 27 },
      { name: 'Whitefly', count: 6, percentage: 20 },
      { name: 'Spider Mites', count: 4, percentage: 13 }
    ]
  }
};

export default function PestDiseasePage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('Tomato');

  // Voice narration functionality
  const speakText = (text: string, language: string = 'English') => {
    if (!isVoiceEnabled || !window.speechSynthesis) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language based on selection
    const languageMap: { [key: string]: string } = {
      'English': 'en-US',
      'Hindi': 'hi-IN',
      'Bengali': 'bn-IN',
      'Tamil': 'ta-IN',
      'Telugu': 'te-IN',
      'Marathi': 'mr-IN',
      'Gujarati': 'gu-IN',
      'Kannada': 'kn-IN',
      'Malayalam': 'ml-IN',
      'Punjabi': 'pa-IN'
    };
    
    utterance.lang = languageMap[language] || 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    window.speechSynthesis.speak(utterance);
  };

  const handleImageUpload = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
    setIsAnalyzing(true);
    
    if (isVoiceEnabled) {
      speakText("Image uploaded successfully. Starting AI analysis.", selectedLanguage);
    }
    
    // Simulate AI analysis with progressive updates
    setTimeout(() => {
      if (isVoiceEnabled) {
        speakText("Analyzing crop image for pest and disease detection.", selectedLanguage);
      }
    }, 1000);
    
    setTimeout(() => {
      if (isVoiceEnabled) {
        speakText("Processing complete. Displaying results.", selectedLanguage);
      }
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const handleVoiceNarration = () => {
    const newVoiceState = !isVoiceEnabled;
    setIsVoiceEnabled(newVoiceState);
    
    const message = newVoiceState 
      ? "Voice guidance activated. I will help narrate your crop analysis."
      : "Voice guidance deactivated.";
    
    speakText(message, selectedLanguage);
    
    // If enabling voice and results are available, narrate them
    if (newVoiceState && showResults) {
      setTimeout(() => {
        speakText(
          `Analysis complete. Detected: ${MOCK_DETECTION_DATA.diagnosis.pestName}. Severity level: ${MOCK_DETECTION_DATA.diagnosis.severity}. Confidence: ${MOCK_DETECTION_DATA.diagnosis.confidence} percent.`,
          selectedLanguage
        );
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-yellow-400 bg-clip-text text-transparent">
            Pest & Disease Detection
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Upload crop images for instant AI-powered detection and get comprehensive treatment guidance to protect your harvest
          </p>
          
          {/* Language & Voice Controls */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <Globe className="text-blue-400" size={20} />
              <select 
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                  if (isVoiceEnabled) {
                    speakText(`Language changed to ${e.target.value}`, e.target.value);
                  }
                }}
                className="px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-xl text-gray-100 focus:border-green-400 focus:outline-none min-w-[140px]"
              >
                <option value="English">🇺🇸 English</option>
                <option value="Hindi">🇮🇳 हिंदी</option>
                <option value="Bengali">🇮🇳 বাংলা</option>
                <option value="Tamil">🇮🇳 தமிழ்</option>
                <option value="Telugu">🇮🇳 తెలుగు</option>
                <option value="Marathi">🇮🇳 मराठी</option>
                <option value="Gujarati">🇮🇳 ગુજરાતી</option>
                <option value="Kannada">🇮🇳 ಕನ್ನಡ</option>
                <option value="Malayalam">🇮🇳 മലയാളം</option>
                <option value="Punjabi">🇮🇳 ਪੰਜਾਬੀ</option>
              </select>
            </div>
            
            <motion.button 
              onClick={handleVoiceNarration}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                isVoiceEnabled 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' 
                  : 'glassmorphism-dark border border-gray-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Volume2 size={20} />
              Voice Guide
            </motion.button>
          </div>
        </motion.div>

        {/* Active Alerts */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
            <AlertTriangle className="text-amber-400" />
            Active Alerts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_DETECTION_DATA.alerts.map((alert, index) => (
              <AlertCard key={alert.id} alert={alert} index={index} />
            ))}
          </div>
        </div>

        {/* Main Detection Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload & Analysis */}
          <div className="space-y-6">
            <ImageUploadCard 
              onImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
              isAnalyzing={isAnalyzing}
            />
            
            {/* Analysis Results */}
            <AnimatePresence>
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <DiagnosisCard diagnosis={MOCK_DETECTION_DATA.diagnosis} />
                  
                  <div className="grid grid-cols-1 gap-4">
                    <TreatmentCard 
                      title="Organic Treatment" 
                      treatments={MOCK_DETECTION_DATA.treatments.organic}
                      type="organic"
                    />
                    <TreatmentCard 
                      title="Chemical Treatment" 
                      treatments={MOCK_DETECTION_DATA.treatments.chemical}
                      type="chemical"
                    />
                    <TreatmentCard 
                      title="Preventive Measures" 
                      treatments={MOCK_DETECTION_DATA.treatments.preventive}
                      type="preventive"
                    />
                  </div>

                  <div className="flex gap-4">
                    <SaveReportButton 
                      reportData={{
                        cropType: selectedCrop || 'Tomato',
                        analysisDate: new Date().toISOString().split('T')[0],
                        diagnosis: {
                          disease: MOCK_DETECTION_DATA.diagnosis.pestName,
                          severity: MOCK_DETECTION_DATA.diagnosis.severity,
                          confidence: MOCK_DETECTION_DATA.diagnosis.confidence
                        },
                        treatment: {
                          type: 'organic',
                          recommendations: MOCK_DETECTION_DATA.treatments.organic.map(t => t.name)
                        },
                        healthMetrics: {
                          healthy: MOCK_DETECTION_DATA.healthAnalytics.healthyPercentage,
                          infected: MOCK_DETECTION_DATA.healthAnalytics.infectedPercentage
                        }
                      }}
                    />
                    <motion.button
                      className="flex items-center gap-2 px-6 py-3 liquid-glass-dark rounded-xl border border-gray-700/50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageSquare size={20} />
                      Ask AI Chat
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Analytics & Insights */}
          <div className="space-y-6">
            <CropHealthCharts data={MOCK_DETECTION_DATA.healthAnalytics} />
            
            {/* Quick Stats */}
            <div className="glassmorphism-dark p-6 rounded-2xl border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-400" />
                Detection Summary
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {MOCK_DETECTION_DATA.healthAnalytics.healthyPercentage}%
                  </div>
                  <div className="text-sm text-gray-400">Healthy Crops</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {MOCK_DETECTION_DATA.healthAnalytics.infectedPercentage}%
                  </div>
                  <div className="text-sm text-gray-400">Need Attention</div>
                </div>
              </div>
            </div>

            {/* Recent Detections */}
            <div className="glassmorphism-dark p-6 rounded-2xl border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <Bug className="text-amber-400" />
                Common Pests This Month
              </h3>
              <div className="space-y-3">
                {MOCK_DETECTION_DATA.healthAnalytics.commonPests.map((pest, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-300">{pest.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-gray-400">{pest.count} cases</div>
                      <div className="w-16 h-2 bg-gray-700 rounded-full">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-400 to-red-500 rounded-full"
                          style={{ width: `${pest.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}