// ...existing code...
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Plus, MapPin, Calendar, 
  Filter, Bell, Star, BarChart2, Target, Zap
} from 'lucide-react';
import { PriceTicker } from '@/components/market-price/PriceTicker';
import { WatchlistCard } from '@/components/market-price/WatchlistCard';
import { CropPriceCard } from '@/components/market-price/CropPriceCard';
import { MarketCharts } from '@/components/market-price/MarketCharts';
import { PriceAlertCard } from '@/components/market-price/PriceAlertCard';
import { RecommendationCard } from '@/components/market-price/RecommendationCard';

// Mock data for demonstration
const MOCK_MARKET_DATA = {
  liveTickerPrices: [
    { crop: 'Wheat', price: 2450, change: 5.2, unit: '₹/quintal', location: 'Delhi' },
    { crop: 'Rice', price: 3200, change: -2.1, unit: '₹/quintal', location: 'Punjab' },
    { crop: 'Maize', price: 1850, change: 12.3, unit: '₹/quintal', location: 'UP' },
    { crop: 'Soybean', price: 4500, change: -8.7, unit: '₹/quintal', location: 'MP' },
    { crop: 'Cotton', price: 5800, change: 3.4, unit: '₹/quintal', location: 'Gujarat' },
    { crop: 'Onion', price: 25, change: 18.5, unit: '₹/kg', location: 'Maharashtra' },
    { crop: 'Tomato', price: 45, change: -15.2, unit: '₹/kg', location: 'Karnataka' },
    { crop: 'Potato', price: 18, change: 7.8, unit: '₹/kg', location: 'UP' }
  ],
  watchlistCrops: [
    { 
      id: 1, 
      crop: 'Wheat', 
      price: 2450, 
      change: 5.2, 
      unit: '₹/quintal',
      sparklineData: [2400, 2420, 2380, 2410, 2450, 2470, 2450],
        recommendation: 'SELL' as const,
      location: 'Delhi Mandi'
    },
    { 
      id: 2, 
      crop: 'Rice', 
      price: 3200, 
      change: -2.1, 
      unit: '₹/quintal',
      sparklineData: [3250, 3280, 3220, 3200, 3180, 3190, 3200],
        recommendation: 'HOLD' as const,
      location: 'Punjab Mandi'
    },
    { 
      id: 3, 
      crop: 'Maize', 
      price: 1850, 
      change: 12.3, 
      unit: '₹/quintal',
      sparklineData: [1650, 1680, 1720, 1780, 1820, 1840, 1850],
        recommendation: 'SELL' as const,
      location: 'UP Mandi'
    }
  ],
  trendingCrops: [
    { crop: 'Onion', change: 18.5, price: 25, unit: '₹/kg' },
    { crop: 'Maize', change: 12.3, price: 1850, unit: '₹/quintal' },
    { crop: 'Potato', change: 7.8, price: 18, unit: '₹/kg' }
  ],
  priceAlerts: [
     { id: 1, type: 'success' as const, crop: 'Maize', message: 'Maize price up 12% since last week – good time to sell!', timestamp: '2 mins ago' },
     { id: 2, type: 'warning' as const, crop: 'Rice', message: 'Stable market for Rice, wait for better rates.', timestamp: '1 hour ago' },
     { id: 3, type: 'danger' as const, crop: 'Tomato', message: 'Tomato prices dropping fast – hold if possible.', timestamp: '3 hours ago' }
  ]
};

export default function MarketPricePage() {
  const [selectedLocation, setSelectedLocation] = useState('All Regions');
  const [selectedTimeRange, setSelectedTimeRange] = useState('1 week');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100">
      {/* Live Price Ticker */}
      <PriceTicker prices={MOCK_MARKET_DATA.liveTickerPrices} />
      
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-yellow-400 bg-clip-text text-transparent">
            Market Price Tracking
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Stay updated with real-time mandi prices and crop trends to make informed selling decisions
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center items-center pt-4">
            <motion.button 
              className="liquid-glass-dark flex items-center gap-2 px-6 py-3 rounded-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              Add to Watchlist
            </motion.button>
            
            <motion.button 
              onClick={() => setShowFilters(!showFilters)}
              className="glassmorphism-dark flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-700/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter size={20} />
              Filters
            </motion.button>
          </div>
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="glassmorphism-dark p-6 rounded-2xl border border-gray-700/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <MapPin size={16} />
                    Location
                  </label>
                  <select 
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 focus:border-green-400 focus:outline-none"
                  >
                    <option>All Regions</option>
                    <option>Delhi</option>
                    <option>Punjab</option>
                    <option>Maharashtra</option>
                    <option>Gujarat</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <Calendar size={16} />
                    Time Range
                  </label>
                  <select 
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 focus:border-green-400 focus:outline-none"
                  >
                    <option>1 week</option>
                    <option>1 month</option>
                    <option>3 months</option>
                    <option>6 months</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <Target size={16} />
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      placeholder="Min"
                      className="w-1/2 p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 focus:border-green-400 focus:outline-none"
                    />
                    <input 
                      type="number" 
                      placeholder="Max"
                      className="w-1/2 p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 focus:border-green-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Price Alerts */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            <Bell className="text-yellow-400" />
            Price Alerts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOCK_MARKET_DATA.priceAlerts.map((alert, index) => (
              <PriceAlertCard key={alert.id} alert={alert} index={index} />
            ))}
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Watchlist Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
                <Star className="text-yellow-400" />
                My Watchlist
              </h2>
              <span className="text-sm text-gray-400">{MOCK_MARKET_DATA.watchlistCrops.length} crops</span>
            </div>
            
            <WatchlistCard crops={MOCK_MARKET_DATA.watchlistCrops} />
            
            {/* Detailed Crop Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_MARKET_DATA.watchlistCrops.map((crop, index) => (
                <CropPriceCard key={crop.id} crop={crop} index={index} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Crops */}
            <div className="glassmorphism-dark p-6 rounded-2xl border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2 mb-4">
                <TrendingUp className="text-green-400" />
                Trending Crops
              </h3>
              <div className="space-y-3">
                {MOCK_MARKET_DATA.trendingCrops.map((crop, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div>
                      <div className="font-medium text-gray-100">{crop.crop}</div>
                      <div className="text-sm text-gray-400">{crop.price} {crop.unit}</div>
                    </div>
                    <div className={`flex items-center gap-1 ${crop.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {crop.change > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      <span className="font-semibold">{Math.abs(crop.change)}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <RecommendationCard />
          </div>
        </div>

        {/* Market Charts */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            <BarChart2 className="text-blue-400" />
            Market Analysis
          </h2>
          <MarketCharts />
        </div>
      </div>
    </div>
  );
}
// ...existing code...
