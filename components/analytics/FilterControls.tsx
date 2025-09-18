'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Filter, 
  Calendar, 
  Wheat, 
  ChevronDown, 
  Check, 
  X,
  RotateCcw,
  GitCompare
} from 'lucide-react';

interface FilterControlsProps {
  selectedCrop: string;
  dateRange: string;
  compareMode: boolean;
  onCropChange: (crop: string) => void;
  onDateRangeChange: (range: string) => void;
  onCompareModeToggle: (enabled: boolean) => void;
  onReset: () => void;
}

const CROPS = [
  { id: 'all', name: 'All Crops', icon: '🌾' },
  { id: 'wheat', name: 'Wheat', icon: '🌾' },
  { id: 'rice', name: 'Rice', icon: '🌾' },
  { id: 'cotton', name: 'Cotton', icon: '☁️' },
  { id: 'corn', name: 'Corn', icon: '🌽' },
  { id: 'sugarcane', name: 'Sugarcane', icon: '🎋' }
];

const DATE_RANGES = [
  { id: '1week', name: 'Last Week', days: 7 },
  { id: '1month', name: 'Last Month', days: 30 },
  { id: '3months', name: 'Last 3 Months', days: 90 },
  { id: '6months', name: 'Last 6 Months', days: 180 },
  { id: '1year', name: 'Last Year', days: 365 },
  { id: 'custom', name: 'Custom Range', days: null }
];

export function FilterControls({
  selectedCrop,
  dateRange,
  compareMode,
  onCropChange,
  onDateRangeChange,
  onCompareModeToggle,
  onReset
}: FilterControlsProps) {
  const [cropDropdownOpen, setCropDropdownOpen] = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const selectedCropData = CROPS.find(crop => crop.id === selectedCrop);
  const selectedDateData = DATE_RANGES.find(range => range.id === dateRange);

  const handleCropSelect = (cropId: string) => {
    onCropChange(cropId);
    setCropDropdownOpen(false);
  };

  const handleDateRangeSelect = (rangeId: string) => {
    onDateRangeChange(rangeId);
    setDateDropdownOpen(false);
  };

  const resetFilters = () => {
    onReset();
    onCompareModeToggle(false);
    setCropDropdownOpen(false);
    setDateDropdownOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card className="glassmorphism-dark border-white/20 p-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          {/* Filter Icon & Title */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-green-400" />
            <span className="text-white font-medium">Filters</span>
          </div>

          {/* Main Filters */}
          <div className="flex flex-wrap items-center gap-3 flex-1">
            {/* Crop Selector */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setCropDropdownOpen(!cropDropdownOpen)}
                className="liquid-glass-dark border-white/20 text-white hover:bg-white/10 min-w-[120px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <Wheat className="w-4 h-4" />
                  <span>{selectedCropData?.name}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${cropDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>

              <AnimatePresence>
                {cropDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 z-50"
                  >
                    <Card className="glassmorphism-dark border border-white/20 shadow-2xl overflow-hidden">
                      <div className="max-h-60 overflow-y-auto">
                        {CROPS.map((crop, index) => (
                          <motion.button
                            key={crop.id}
                            onClick={() => handleCropSelect(crop.id)}
                            className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors group flex items-center justify-between"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{crop.icon}</span>
                              <span className="text-white text-sm font-medium group-hover:text-green-300 transition-colors">
                                {crop.name}
                              </span>
                            </div>
                            
                            {selectedCrop === crop.id && (
                              <Check className="w-4 h-4 text-green-400" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Date Range Selector */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                className="liquid-glass-dark border-white/20 text-white hover:bg-white/10 min-w-[140px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedDateData?.name}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${dateDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>

              <AnimatePresence>
                {dateDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 z-50"
                  >
                    <Card className="glassmorphism-dark border border-white/20 shadow-2xl overflow-hidden">
                      <div className="max-h-60 overflow-y-auto">
                        {DATE_RANGES.map((range, index) => (
                          <motion.button
                            key={range.id}
                            onClick={() => handleDateRangeSelect(range.id)}
                            className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors group flex items-center justify-between"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-3">
                              <Calendar className="w-4 h-4 text-yellow-400" />
                              <div>
                                <div className="text-white text-sm font-medium group-hover:text-yellow-300 transition-colors">
                                  {range.name}
                                </div>
                                {range.days && (
                                  <div className="text-xs text-gray-400">
                                    {range.days} days
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {dateRange === range.id && (
                              <Check className="w-4 h-4 text-yellow-400" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Season Compare Toggle */}
            <Button
              variant={compareMode ? "default" : "outline"}
              onClick={() => onCompareModeToggle(!compareMode)}
              className={compareMode 
                ? "bg-cyan-600/20 border-cyan-500/50 text-cyan-300 hover:bg-cyan-600/30" 
                : "liquid-glass-dark border-white/20 text-white hover:bg-white/10"
              }
            >
              <GitCompare className="w-4 h-4 mr-2" />
              Compare Seasons
            </Button>

            {/* Advanced Filters Toggle */}
            <Button
              variant="ghost"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-gray-400 hover:text-white hover:bg-white/5"
            >
              Advanced
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Reset & Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-white/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Field Size Filter */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Field Size</label>
                  <select className="w-full glassmorphism-dark border border-white/20 rounded-lg px-3 py-2 text-white text-sm bg-transparent">
                    <option value="all">All Sizes</option>
                    <option value="small">Small (&lt; 2 acres)</option>
                    <option value="medium">Medium (2-5 acres)</option>
                    <option value="large">Large (&gt; 5 acres)</option>
                  </select>
                </div>

                {/* Irrigation Type */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Irrigation Type</label>
                  <select className="w-full glassmorphism-dark border border-white/20 rounded-lg px-3 py-2 text-white text-sm bg-transparent">
                    <option value="all">All Types</option>
                    <option value="drip">Drip Irrigation</option>
                    <option value="sprinkler">Sprinkler</option>
                    <option value="flood">Flood Irrigation</option>
                  </select>
                </div>

                {/* Soil Type */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Soil Type</label>
                  <select className="w-full glassmorphism-dark border border-white/20 rounded-lg px-3 py-2 text-white text-sm bg-transparent">
                    <option value="all">All Soil Types</option>
                    <option value="clay">Clay</option>
                    <option value="loam">Loam</option>
                    <option value="sandy">Sandy</option>
                  </select>
                </div>

                {/* Weather Condition */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Weather Condition</label>
                  <select className="w-full glassmorphism-dark border border-white/20 rounded-lg px-3 py-2 text-white text-sm bg-transparent">
                    <option value="all">All Conditions</option>
                    <option value="normal">Normal</option>
                    <option value="drought">Drought</option>
                    <option value="excess-rain">Excess Rain</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters Summary */}
        {(selectedCrop !== 'all' || dateRange !== '6months' || compareMode) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 pt-4 border-t border-white/10"
          >
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Active filters:</span>
              
              {selectedCrop !== 'all' && (
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-md flex items-center gap-1">
                  {selectedCropData?.name}
                  <button 
                    onClick={() => onCropChange('all')}
                    className="hover:bg-green-500/30 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {dateRange !== '6months' && (
                <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-md flex items-center gap-1">
                  {selectedDateData?.name}
                  <button 
                    onClick={() => onDateRangeChange('6months')}
                    className="hover:bg-yellow-500/30 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {compareMode && (
                <span className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-md flex items-center gap-1">
                  Season Compare
                  <button 
                    onClick={() => onCompareModeToggle(false)}
                    className="hover:bg-cyan-500/30 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </motion.div>
        )}
      </Card>

      {/* Backdrop for dropdowns */}
      {(cropDropdownOpen || dateDropdownOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setCropDropdownOpen(false);
            setDateDropdownOpen(false);
          }}
        />
      )}
    </motion.div>
  );
}