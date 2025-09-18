'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

interface WeatherInsightsCardProps {
  title: string;
  icon: ReactNode;
  confidence: number;
  gradient: string;
  children: ReactNode;
  className?: string;
}

export function WeatherInsightsCard({ 
  title, 
  icon, 
  confidence, 
  gradient, 
  children, 
  className = '' 
}: WeatherInsightsCardProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'bg-green-500/20 text-green-300 border-green-500/30';
    if (confidence >= 70) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    return 'bg-red-500/20 text-red-300 border-red-500/30';
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 85) return 'High Confidence';
    if (confidence >= 70) return 'Medium Confidence';
    return 'Low Confidence';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glassmorphism-dark p-6 rounded-2xl border border-white/10 relative overflow-hidden group ${className}`}
    >
      {/* Gradient Background Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      {/* Glowing Border */}
      <div 
        className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
        style={{ 
          backgroundClip: 'padding-box',
          border: '2px solid transparent'
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient} group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-white transition-colors">
            {title}
          </h3>
        </div>

        <Badge 
          variant="outline" 
          className={`text-xs ${getConfidenceColor(confidence)}`}
        >
          <TrendingUp className="w-3 h-3 mr-1" />
          {confidence}%
        </Badge>
      </div>

      {/* Content */}
      <div className="relative z-10 mb-4">
        {children}
      </div>

      {/* Confidence Indicator */}
      <div className="relative z-10">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <span>Prediction Confidence</span>
          <span>{getConfidenceText(confidence)}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div 
            className={`h-2 rounded-full bg-gradient-to-r ${gradient}`}
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>

      {/* Animated Glow Effect */}
      <motion.div 
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700 -z-10`}
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0, 0.1, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Pulse Animation for High Confidence */}
      {confidence >= 85 && (
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      )}
    </motion.div>
  );
}