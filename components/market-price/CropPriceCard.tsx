'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, MapPin, Clock, Target, Zap } from 'lucide-react';

interface CropPriceCardProps {
  crop: {
    id: number;
    crop: string;
    price: number;
    change: number;
    unit: string;
    sparklineData: number[];
    recommendation: 'SELL' | 'HOLD' | 'AVOID';
    location: string;
  };
  index: number;
}

export function CropPriceCard({ crop, index }: CropPriceCardProps) {
  const getRecommendationConfig = (recommendation: string) => {
    switch (recommendation) {
      case 'SELL':
        return {
          color: 'text-green-400',
          bg: 'bg-green-400/20',
          border: 'border-green-400/30',
          glow: 'shadow-green-400/20',
          message: 'Best time to SELL',
          icon: <Zap size={16} />
        };
      case 'HOLD':
        return {
          color: 'text-yellow-400',
          bg: 'bg-yellow-400/20',
          border: 'border-yellow-400/30',
          glow: 'shadow-yellow-400/20',
          message: 'Hold for better rates',
          icon: <Clock size={16} />
        };
      case 'AVOID':
        return {
          color: 'text-red-400',
          bg: 'bg-red-400/20',
          border: 'border-red-400/30',
          glow: 'shadow-red-400/20',
          message: 'Avoid selling now',
          icon: <Target size={16} />
        };
      default:
        return {
          color: 'text-gray-400',
          bg: 'bg-gray-400/20',
          border: 'border-gray-400/30',
          glow: 'shadow-gray-400/20',
          message: 'No recommendation',
          icon: null
        };
    }
  };

  const config = getRecommendationConfig(crop.recommendation);
  const isPositiveChange = crop.change > 0;

  return (
    <motion.div
      className="glassmorphism-dark p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background Glow Effect */}
      <div className={`absolute inset-0 ${config.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
      
      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-100">{crop.crop}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
              <MapPin size={14} />
              <span>{crop.location}</span>
            </div>
          </div>
          
          <div className={`p-3 rounded-xl ${config.bg} ${config.border} border`}>
            {config.icon}
          </div>
        </div>

        {/* Price Display */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-100">
              ₹{crop.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400">{crop.unit}</span>
          </div>
          
          <div className={`flex items-center gap-2 ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`}>
            {isPositiveChange ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
            <span className="font-semibold">
              {isPositiveChange ? '+' : ''}{crop.change.toFixed(1)}%
            </span>
            <span className="text-xs text-gray-400">from last week</span>
          </div>
        </div>

        {/* Sparkline Chart */}
        <div className="relative">
          <div className="text-sm text-gray-400 mb-2">7-day trend</div>
          <div className="h-16 w-full">
            <svg className="w-full h-full" viewBox="0 0 200 64">
              {/* Grid Lines */}
              <defs>
                <pattern id={`grid-${crop.id}`} width="20" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 16" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="200" height="64" fill={`url(#grid-${crop.id})`} />
              
              {/* Area Fill */}
              <motion.path
                d={`M 0,${64 - ((crop.sparklineData[0] - Math.min(...crop.sparklineData)) / (Math.max(...crop.sparklineData) - Math.min(...crop.sparklineData))) * 64} ${crop.sparklineData.map((value, idx) => 
                  `L ${idx * (200 / (crop.sparklineData.length - 1))},${64 - ((value - Math.min(...crop.sparklineData)) / (Math.max(...crop.sparklineData) - Math.min(...crop.sparklineData))) * 64}`
                ).join(' ')} L 200,64 L 0,64 Z`}
                fill={`url(#gradient-${crop.id})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1.5, delay: index * 0.2 }}
              />
              
              {/* Gradient Definition */}
              <defs>
                <linearGradient id={`gradient-${crop.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={isPositiveChange ? "#4ade80" : "#f87171"} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={isPositiveChange ? "#4ade80" : "#f87171"} stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Main Line */}
              <motion.polyline
                fill="none"
                stroke={isPositiveChange ? "#4ade80" : "#f87171"}
                strokeWidth="2"
                strokeLinecap="round"
                points={crop.sparklineData.map((value, idx) => 
                  `${idx * (200 / (crop.sparklineData.length - 1))},${64 - ((value - Math.min(...crop.sparklineData)) / (Math.max(...crop.sparklineData) - Math.min(...crop.sparklineData))) * 64}`
                ).join(' ')}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: index * 0.2 }}
              />
              
              {/* Data Points */}
              {crop.sparklineData.map((value, idx) => (
                <motion.circle
                  key={idx}
                  cx={idx * (200 / (crop.sparklineData.length - 1))}
                  cy={64 - ((value - Math.min(...crop.sparklineData)) / (Math.max(...crop.sparklineData) - Math.min(...crop.sparklineData))) * 64}
                  r="3"
                  fill={isPositiveChange ? "#4ade80" : "#f87171"}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.2 + idx * 0.1 }}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Recommendation Badge */}
        <motion.div
          className={`flex items-center justify-between p-3 rounded-xl ${config.bg} ${config.border} border ${config.glow} shadow-lg`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
        >
          <div className="flex items-center gap-2">
            <div className={config.color}>
              {config.icon}
            </div>
            <span className={`font-semibold ${config.color}`}>
              {config.message}
            </span>
          </div>
          
          <div className={`px-3 py-1 rounded-lg ${config.color} ${config.bg} text-xs font-bold`}>
            {crop.recommendation}
          </div>
        </motion.div>

        {/* Price Range Info */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-700/30">
          <div>
            <div className="text-xs text-gray-400">Today's High</div>
            <div className="font-semibold text-gray-100">₹{Math.max(...crop.sparklineData).toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Today's Low</div>
            <div className="font-semibold text-gray-100">₹{Math.min(...crop.sparklineData).toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Animated Border Glow */}
      <motion.div
        className={`absolute inset-0 rounded-2xl border-2 ${config.border} opacity-0 group-hover:opacity-100`}
        animate={{
          boxShadow: [
            `0 0 0 ${config.color.replace('text-', 'rgba(').replace('-400', ', 0.3)')}`,
            `0 0 20px ${config.color.replace('text-', 'rgba(').replace('-400', ', 0.5)')}`,
            `0 0 0 ${config.color.replace('text-', 'rgba(').replace('-400', ', 0.3)')}`
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}