'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Loader2, 
  Search, 
  ChevronDown, 
  Navigation, 
  CheckCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Location {
  name: string;
  coordinates: { lat: number; lng: number };
  timezone: string;
}

interface WeatherLocationSelectorProps {
  currentLocation: Location;
  onLocationSelect: (location: Location) => void;
  isDetecting: boolean;
  onDetectLocation: () => void;
}

const POPULAR_LOCATIONS = [
  { name: "Patna, Bihar", coordinates: { lat: 25.5941, lng: 85.1376 }, timezone: "Asia/Kolkata" },
  { name: "Delhi, NCR", coordinates: { lat: 28.6139, lng: 77.2090 }, timezone: "Asia/Kolkata" },
  { name: "Pune, Maharashtra", coordinates: { lat: 18.5204, lng: 73.8567 }, timezone: "Asia/Kolkata" },
  { name: "Bengaluru, Karnataka", coordinates: { lat: 12.9716, lng: 77.5946 }, timezone: "Asia/Kolkata" },
  { name: "Hyderabad, Telangana", coordinates: { lat: 17.3850, lng: 78.4867 }, timezone: "Asia/Kolkata" },
  { name: "Chennai, Tamil Nadu", coordinates: { lat: 13.0827, lng: 80.2707 }, timezone: "Asia/Kolkata" },
  { name: "Kolkata, West Bengal", coordinates: { lat: 22.5726, lng: 88.3639 }, timezone: "Asia/Kolkata" },
  { name: "Jaipur, Rajasthan", coordinates: { lat: 26.9124, lng: 75.7873 }, timezone: "Asia/Kolkata" }
];

export function WeatherLocationSelector({ 
  currentLocation, 
  onLocationSelect, 
  isDetecting, 
  onDetectLocation 
}: WeatherLocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(POPULAR_LOCATIONS);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = POPULAR_LOCATIONS.filter(location =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationSelect = (location: Location) => {
    onLocationSelect(location);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Location Selector Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isDetecting}
        className="liquid-glass-dark border-white/20 text-white hover:bg-white/10 justify-between min-w-[200px]"
      >
        <div className="flex items-center gap-2">
          {isDetecting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <MapPin className="w-4 h-4" />
          )}
          <span className="truncate">
            {isDetecting ? 'Detecting...' : currentLocation.name}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <div className="glassmorphism-dark border border-white/20 rounded-xl overflow-hidden shadow-2xl">
              {/* GPS Detection Button */}
              <div className="p-4 border-b border-white/10">
                <Button
                  onClick={() => {
                    onDetectLocation();
                    setIsOpen(false);
                  }}
                  disabled={isDetecting}
                  className="w-full bg-green-600/20 hover:bg-green-600/30 border-green-500/50 text-green-300"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Use My Current Location
                </Button>
              </div>

              {/* Search Input */}
              <div className="p-4 border-b border-white/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="glassmorphism-dark border-white/20 text-white placeholder-gray-400 pl-10"
                  />
                </div>
              </div>

              {/* Popular Locations */}
              <div className="max-h-60 overflow-y-auto">
                <div className="p-2">
                  <div className="text-xs font-medium text-gray-400 px-3 py-2">
                    Popular Locations
                  </div>
                  
                  {filteredLocations.length > 0 ? (
                    <div className="space-y-1">
                      {filteredLocations.map((location, index) => (
                        <motion.button
                          key={location.name}
                          onClick={() => handleLocationSelect(location)}
                          className="w-full px-3 py-2 text-left hover:bg-white/10 rounded-lg transition-colors group flex items-center justify-between"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-blue-400" />
                            <div>
                              <div className="text-white text-sm font-medium group-hover:text-blue-300 transition-colors">
                                {location.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {location.coordinates.lat.toFixed(2)}°, {location.coordinates.lng.toFixed(2)}°
                              </div>
                            </div>
                          </div>
                          
                          {currentLocation.name === location.name && (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-3 py-4 text-center text-gray-400 text-sm">
                      No locations found matching "{searchTerm}"
                    </div>
                  )}
                </div>
              </div>

              {/* Current Selection Info */}
              <div className="p-4 bg-green-500/10 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  <span>Current: {currentLocation.name}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Timezone: {currentLocation.timezone}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}