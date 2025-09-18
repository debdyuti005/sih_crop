'use client';

import { motion } from 'framer-motion';
import { Brain, Zap, TrendingUp, MapPin, Calendar, Target, ArrowRight, Lightbulb, Clock } from 'lucide-react';

export function RecommendationCard() {
  const recommendations = [
    {
      id: 1,
      type: 'sell',
      title: 'Optimal Selling Window',
      crop: 'Maize',
      message: 'Current prices are 12% above seasonal average. Consider selling within the next 3-5 days.',
      confidence: 92,
      action: 'Sell Now',
      timeframe: '3-5 days',
      icon: <Zap size={20} />,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 2,
      type: 'location',
      title: 'Better Market Available',
      crop: 'Wheat',
      message: 'Azadpur Mandi offering ₹150/quintal higher rates than your local market.',
      confidence: 87,
      action: 'Check Transport Cost',
      timeframe: 'Today',
      icon: <MapPin size={20} />,
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      id: 3,
      type: 'timing',
      title: 'Seasonal Pattern Alert',
      crop: 'Onion',
      message: 'Historical data shows 25% price increase typically occurs in next 2 weeks.',
      confidence: 78,
      action: 'Hold & Monitor',
      timeframe: '2 weeks',
      icon: <Calendar size={20} />,
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      id: 4,
      type: 'switch',
      title: 'Crop Switching Opportunity',
      crop: 'Cotton',
      message: 'Consider switching to Soybean for next season. 18% higher profit margins expected.',
      confidence: 83,
      action: 'Plan Next Season',
      timeframe: 'Next season',
      icon: <Target size={20} />,
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="glassmorphism-dark p-6 rounded-2xl border border-gray-700/50 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="text-purple-400" />
        <h3 className="text-lg font-semibold text-gray-100">AI Recommendations</h3>
        <div className="ml-auto">
          <motion.div
            className="flex items-center gap-1 text-xs text-purple-400"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lightbulb size={14} />
            <span>AI Powered</span>
          </motion.div>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 relative overflow-hidden">
              
              {/* Background Gradient Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${rec.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`} />
              
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`p-2 rounded-lg bg-gradient-to-r ${rec.gradient} text-white`}
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {rec.icon}
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-gray-100 text-sm">
                      {rec.title}
                    </h4>
                    <p className="text-xs text-gray-400">{rec.crop}</p>
                  </div>
                </div>
                
                {/* Confidence Score */}
                <div className="text-right">
                  <div className="text-xs text-gray-400">Confidence</div>
                  <div className={`text-sm font-bold ${rec.confidence >= 90 ? 'text-green-400' : rec.confidence >= 80 ? 'text-yellow-400' : 'text-orange-400'}`}>
                    {rec.confidence}%
                  </div>
                </div>
              </div>

              {/* Message */}
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                {rec.message}
              </p>

              {/* Action Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-gray-400" />
                  <span className="text-xs text-gray-400">{rec.timeframe}</span>
                </div>
                
                <motion.button
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r ${rec.gradient} text-white text-xs font-semibold`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {rec.action}
                  <ArrowRight size={12} />
                </motion.button>
              </div>

              {/* Confidence Bar */}
              <div className="mt-3 pt-3 border-t border-gray-700/30">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Prediction Accuracy</span>
                  <span>{rec.confidence}%</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-1">
                  <motion.div
                    className={`h-1 rounded-full bg-gradient-to-r ${rec.gradient}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${rec.confidence}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
            </div>

            {/* Hover Glow Effect */}
            <motion.div
              className={`absolute inset-0 rounded-xl bg-gradient-to-r ${rec.gradient} opacity-0 group-hover:opacity-10 blur-sm transition-opacity duration-300 -z-10`}
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1 }}
            />
          </motion.div>
        ))}
      </div>

      {/* AI Insights Summary */}
      <motion.div
        className="mt-6 p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl border border-purple-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="text-purple-400" size={16} />
          <span className="text-sm font-semibold text-purple-400">Market Intelligence</span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">
          AI analysis of 10,000+ market data points suggests optimal selling opportunities exist for 
          <span className="text-green-400 font-semibold"> Maize </span> 
          and strategic holding for 
          <span className="text-yellow-400 font-semibold"> Onion</span>. 
          Transport cost optimization could increase profits by 
          <span className="text-blue-400 font-semibold">₹2,400</span>.
        </p>
      </motion.div>
    </div>
  );
}