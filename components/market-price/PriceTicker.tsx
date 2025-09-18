'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, MapPin } from 'lucide-react';

interface PriceData {
  crop: string;
  price: number;
  change: number;
  unit: string;
  location: string;
}

interface PriceTickerProps {
  prices: PriceData[];
}

export function PriceTicker({ prices }: PriceTickerProps) {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800/50 overflow-hidden">
      <div className="relative">
        <motion.div
          className="flex gap-8 py-4 px-6"
          animate={{ x: ['0%', '-100%'] }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {/* Duplicate the prices array for seamless loop */}
          {[...prices, ...prices].map((item, index) => (
            <motion.div
              key={`${item.crop}-${index}`}
              className="flex-shrink-0 flex items-center gap-4 min-w-fit"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl glassmorphism-dark border border-gray-700/30">
                {/* Crop Name */}
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-100 text-sm">
                    {item.crop}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin size={10} />
                    <span>{item.location}</span>
                  </div>
                </div>
                
                {/* Price */}
                <div className="text-right">
                  <div className="font-bold text-gray-100">
                    {item.price.toLocaleString()} {item.unit}
                  </div>
                  
                  {/* Change Indicator */}
                  <div 
                    className={`flex items-center gap-1 text-xs font-semibold ${
                      item.change > 0 
                        ? 'text-green-400' 
                        : item.change < 0 
                        ? 'text-red-400' 
                        : 'text-yellow-400'
                    }`}
                  >
                    {item.change > 0 ? (
                      <TrendingUp size={12} />
                    ) : item.change < 0 ? (
                      <TrendingDown size={12} />
                    ) : null}
                    <span>
                      {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Glowing effect for significant changes */}
              {Math.abs(item.change) > 10 && (
                <div 
                  className={`absolute inset-0 rounded-xl opacity-20 blur-md ${
                    item.change > 0 
                      ? 'bg-green-400 shadow-lg shadow-green-400/50' 
                      : 'bg-red-400 shadow-lg shadow-red-400/50'
                  }`}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Gradient Fade Effect */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
        
        {/* Live Indicator */}
        <div className="absolute top-2 right-4 flex items-center gap-2 text-xs">
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-green-400 font-medium">LIVE</span>
        </div>
      </div>
    </div>
  );
}