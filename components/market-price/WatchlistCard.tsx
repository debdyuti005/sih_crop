'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Star, StarOff, TrendingUp, TrendingDown, MoreVertical, Plus } from 'lucide-react';
import { useState } from 'react';

interface WatchlistCrop {
  id: number;
  crop: string;
  price: number;
  change: number;
  unit: string;
  sparklineData: number[];
  recommendation: 'SELL' | 'HOLD' | 'AVOID';
  location: string;
}

interface WatchlistCardProps {
  crops: WatchlistCrop[];
}

export function WatchlistCard({ crops }: WatchlistCardProps) {
  const [hoveredCrop, setHoveredCrop] = useState<number | null>(null);
  const [removedCrops, setRemovedCrops] = useState<Set<number>>(new Set());

  const handleRemoveCrop = (cropId: number) => {
    setRemovedCrops(prev => new Set(prev.add(cropId)));
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'SELL': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'HOLD': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'AVOID': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const activeCrops = crops.filter(crop => !removedCrops.has(crop.id));

  return (
    <div className="glassmorphism-dark p-6 rounded-2xl border border-gray-700/50 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400" fill="currentColor" />
          <h3 className="text-lg font-semibold text-gray-100">Pinned Crops</h3>
        </div>
        <motion.button
          className="liquid-glass-dark p-2 rounded-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus size={16} />
        </motion.button>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {activeCrops.map((crop, index) => (
            <motion.div
              key={crop.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, x: -100 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative group"
              onMouseEnter={() => setHoveredCrop(crop.id)}
              onMouseLeave={() => setHoveredCrop(null)}
            >
              <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  {/* Crop Info */}
                  <div>
                    <div className="font-semibold text-gray-100">{crop.crop}</div>
                    <div className="text-sm text-gray-400">{crop.location}</div>
                  </div>

                  {/* Mini Sparkline */}
                  <div className="hidden sm:block w-20 h-8">
                    <svg className="w-full h-full" viewBox="0 0 80 32">
                      <motion.polyline
                        fill="none"
                        stroke={crop.change > 0 ? "#4ade80" : "#f87171"}
                        strokeWidth="2"
                        points={crop.sparklineData.map((value, index) => 
                          `${index * (80 / (crop.sparklineData.length - 1))},${32 - ((value - Math.min(...crop.sparklineData)) / (Math.max(...crop.sparklineData) - Math.min(...crop.sparklineData))) * 32}`
                        ).join(' ')}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Price */}
                  <div className="text-right">
                    <div className="font-bold text-gray-100">
                      {crop.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">{crop.unit}</div>
                  </div>

                  {/* Change */}
                  <div className={`flex items-center gap-1 ${crop.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {crop.change > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span className="font-semibold">
                      {crop.change > 0 ? '+' : ''}{crop.change.toFixed(1)}%
                    </span>
                  </div>

                  {/* Recommendation Badge */}
                  <div className={`px-2 py-1 rounded-lg text-xs font-semibold border ${getRecommendationColor(crop.recommendation)}`}>
                    {crop.recommendation}
                  </div>

                  {/* Menu Button */}
                  <div className="relative">
                    <motion.button
                      className="p-1 rounded-lg hover:bg-gray-700/50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleRemoveCrop(crop.id)}
                    >
                      <StarOff size={16} className="text-gray-400" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <AnimatePresence>
                {hoveredCrop === crop.id && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/10 to-blue-400/10 border border-green-400/20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {activeCrops.length === 0 && (
          <motion.div
            className="text-center py-8 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Star size={48} className="mx-auto mb-4 opacity-50" />
            <p>No crops in your watchlist</p>
            <p className="text-sm">Add crops to track their prices</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}