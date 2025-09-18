'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeatherOverviewCard } from '@/components/weather/WeatherOverviewCard';
import { WeatherInsightsCard } from '@/components/weather/WeatherInsightsCard';
import { WeatherAlerts } from '@/components/weather/WeatherAlerts';
import { WeatherCharts } from '@/components/weather/WeatherCharts';
import { WeatherLocationSelector } from '@/components/weather/WeatherLocationSelector';
import { WeatherReportDownload } from '@/components/weather/WeatherReportDownload';

// Location interface
interface Location {
  name: string;
  coordinates: { lat: number; lng: number };
  timezone: string;
}
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CloudRain, 
  Sun, 
  Wind, 
  Thermometer, 
  MapPin, 
  AlertTriangle, 
  TrendingUp,
  Droplets,
  Eye,
  Gauge,
  Download,
  Settings,
  RefreshCw
} from 'lucide-react';

// Mock Weather Data for UI demonstration
const MOCK_WEATHER_DATA = {
  location: {
    name: "Patna, Bihar",
    coordinates: { lat: 25.5941, lng: 85.1376 },
    timezone: "Asia/Kolkata"
  },
  current: {
    temperature: 28,
    feelsLike: 32,
    humidity: 65,
    windSpeed: 12,
    windDirection: "NE",
    visibility: 8,
    uvIndex: 6,
    pressure: 1013,
    condition: "partly-cloudy",
    description: "Partly Cloudy",
    icon: "⛅",
    lastUpdated: "2025-09-18T14:30:00Z"
  },
  forecast: [
    {
      date: "2025-09-18",
      day: "Today",
      high: 32,
      low: 24,
      condition: "partly-cloudy",
      icon: "⛅",
      rainChance: 20,
      humidity: 65,
      windSpeed: 12
    },
    {
      date: "2025-09-19",
      day: "Tomorrow", 
      high: 30,
      low: 22,
      condition: "rainy",
      icon: "🌧️",
      rainChance: 85,
      humidity: 78,
      windSpeed: 18
    },
    {
      date: "2025-09-20",
      day: "Friday",
      high: 27,
      low: 20,
      condition: "thunderstorm",
      icon: "⛈️",
      rainChance: 95,
      humidity: 82,
      windSpeed: 25
    }
  ],
  alerts: [
    {
      id: "alert-1",
      type: "warning",
      severity: "moderate",
      title: "Heavy Rainfall Expected",
      description: "Moderate to heavy rainfall expected tomorrow. Consider postponing pesticide application and ensure proper field drainage.",
      timeRange: "Tomorrow 6:00 AM - 8:00 PM",
      crops: ["Rice", "Cotton", "Sugarcane"],
      actions: ["Delay irrigation", "Postpone spraying", "Check drainage"]
    },
    {
      id: "alert-2", 
      type: "advisory",
      severity: "low",
      title: "Optimal Sowing Conditions",
      description: "Current weather conditions are favorable for wheat sowing. Soil moisture and temperature are within ideal ranges.",
      timeRange: "Next 3 days",
      crops: ["Wheat", "Barley", "Mustard"],
      actions: ["Prepare seeds", "Plan sowing", "Check soil"]
    }
  ],
  insights: {
    irrigation: {
      recommendation: "Reduce irrigation by 40%",
      reason: "Heavy rainfall expected in next 48 hours",
      confidence: 85
    },
    pesticide: {
      recommendation: "Postpone application",
      reason: "High wind speed and incoming rain",
      confidence: 90
    },
    harvesting: {
      recommendation: "Accelerate harvest",
      reason: "Severe weather approaching",
      confidence: 75
    },
    planting: {
      recommendation: "Ideal conditions for wheat",
      reason: "Optimal soil moisture and temperature",
      confidence: 88
    }
  },
  historical: {
    temperatureTrend: [
      { day: "Mon", high: 30, low: 22 },
      { day: "Tue", high: 32, low: 24 },
      { day: "Wed", high: 28, low: 21 },
      { day: "Thu", high: 29, low: 23 },
      { day: "Fri", high: 27, low: 20 },
      { day: "Sat", high: 25, low: 18 },
      { day: "Sun", high: 28, low: 21 }
    ],
    rainfallData: [
      { day: "Mon", rainfall: 0, chance: 10 },
      { day: "Tue", rainfall: 2, chance: 25 },
      { day: "Wed", rainfall: 12, chance: 60 },
      { day: "Thu", rainfall: 8, chance: 45 },
      { day: "Fri", rainfall: 25, chance: 90 },
      { day: "Sat", rainfall: 15, chance: 70 },
      { day: "Sun", rainfall: 5, chance: 30 }
    ]
  }
};

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState(MOCK_WEATHER_DATA);
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [locationDetecting, setLocationDetecting] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const reportRef = useRef<HTMLDivElement>(null);

  // Auto-refresh weather data
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // In real app, this would fetch fresh weather data
    }, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const handleLocationDetect = async () => {
    setLocationDetecting(true);
    
    // Mock GPS detection
    setTimeout(() => {
      setLocationDetecting(false);
      // In real app, this would use navigator.geolocation
    }, 2000);
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
    // Mock data refresh animation
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return 'bg-red-500/20 border-red-500/50 text-red-300';
      case 'moderate': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300';
      default: return 'bg-blue-500/20 border-blue-500/50 text-blue-300';
    }
  };

  const getWeatherIcon = (condition: string) => {
    const icons = {
      'sunny': '☀️',
      'partly-cloudy': '⛅',
      'cloudy': '☁️',
      'rainy': '🌧️',
      'thunderstorm': '⛈️',
      'snow': '❄️',
      'fog': '🌫️'
    };
    return icons[condition as keyof typeof icons] || '⛅';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1E1E1E] text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold gradient-text-dark mb-2">
                Weather Intelligence
              </h1>
              <p className="text-gray-400">
                Advanced alerts & predictive insights for smarter farming decisions
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Badge 
                variant="secondary" 
                className="bg-green-500/20 text-green-300 px-3 py-1"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                Live Data
              </Badge>
              
              <WeatherLocationSelector
                currentLocation={weatherData.location}
                onLocationSelect={(location: Location) => {
                  setWeatherData(prev => ({ ...prev, location }));
                }}
                isDetecting={locationDetecting}
                onDetectLocation={handleLocationDetect}
              />
              
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="liquid-glass-dark"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="liquid-glass-dark"
              >
                <Download className="w-4 h-4 mr-2" />
                Report
              </Button>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-4 text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </motion.div>

        {/* Weather Alerts */}
        <WeatherAlerts alerts={weatherData.alerts} />

        {/* Main Content */}
        <div ref={reportRef} className="space-y-8">
          {/* Weather Overview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Current Weather */}
            <WeatherOverviewCard
              title="Current Weather"
              icon={<span className="text-4xl animate-pulse">{weatherData.current.icon}</span>}
              gradient="from-blue-500 to-cyan-500"
            >
              <div className="space-y-2">
                <div className="text-3xl font-bold">{weatherData.current.temperature}°C</div>
                <div className="text-sm text-gray-400">Feels like {weatherData.current.feelsLike}°C</div>
                <div className="text-sm">{weatherData.current.description}</div>
              </div>
            </WeatherOverviewCard>

            {/* 3-Day Forecast */}
            <WeatherOverviewCard
              title="3-Day Forecast"
              icon={<TrendingUp className="w-8 h-8 text-yellow-400" />}
              gradient="from-yellow-500 to-orange-500"
            >
              <div className="space-y-2">
                {weatherData.forecast.slice(0, 3).map((day, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>{day.day}</span>
                    <div className="flex items-center gap-2">
                      <span>{day.icon}</span>
                      <span>{day.high}°/{day.low}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </WeatherOverviewCard>

            {/* Rainfall & Humidity */}
            <WeatherOverviewCard
              title="Moisture Conditions"
              icon={<Droplets className="w-8 h-8 text-blue-400" />}
              gradient="from-blue-500 to-indigo-500"
            >
              <div className="space-y-3">
                <div>
                  <div className="text-lg font-semibold">{weatherData.current.humidity}%</div>
                  <div className="text-xs text-gray-400">Humidity</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">{weatherData.forecast[1].rainChance}%</div>
                  <div className="text-xs text-gray-400">Rain Chance Tomorrow</div>
                </div>
              </div>
            </WeatherOverviewCard>

            {/* Wind & Farming Conditions */}
            <WeatherOverviewCard
              title="Farming Conditions"
              icon={<Wind className="w-8 h-8 text-green-400" />}
              gradient="from-green-500 to-emerald-500"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Wind Speed</span>
                  <span className="font-semibold">{weatherData.current.windSpeed} km/h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">UV Index</span>
                  <span className="font-semibold">{weatherData.current.uvIndex}</span>
                </div>
                <div className="mt-3 p-2 bg-green-500/20 rounded text-xs text-green-300">
                  Good conditions for field work
                </div>
              </div>
            </WeatherOverviewCard>
          </motion.div>

          {/* AI Insights Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold gradient-text-dark flex items-center gap-3">
              <TrendingUp className="text-yellow-400" />
              Predictive Insights
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WeatherInsightsCard
                title="Irrigation Advisory"
                icon={<Droplets className="w-6 h-6" />}
                confidence={weatherData.insights.irrigation.confidence}
                gradient="from-blue-500 to-cyan-500"
              >
                <div className="space-y-2">
                  <p className="font-semibold text-blue-300">
                    {weatherData.insights.irrigation.recommendation}
                  </p>
                  <p className="text-sm text-gray-400">
                    {weatherData.insights.irrigation.reason}
                  </p>
                </div>
              </WeatherInsightsCard>

              <WeatherInsightsCard
                title="Pesticide Application"
                icon={<Wind className="w-6 h-6" />}
                confidence={weatherData.insights.pesticide.confidence}
                gradient="from-yellow-500 to-orange-500"
              >
                <div className="space-y-2">
                  <p className="font-semibold text-yellow-300">
                    {weatherData.insights.pesticide.recommendation}
                  </p>
                  <p className="text-sm text-gray-400">
                    {weatherData.insights.pesticide.reason}
                  </p>
                </div>
              </WeatherInsightsCard>

              <WeatherInsightsCard
                title="Harvest Planning"
                icon={<Sun className="w-6 h-6" />}
                confidence={weatherData.insights.harvesting.confidence}
                gradient="from-green-500 to-emerald-500"
              >
                <div className="space-y-2">
                  <p className="font-semibold text-green-300">
                    {weatherData.insights.harvesting.recommendation}
                  </p>
                  <p className="text-sm text-gray-400">
                    {weatherData.insights.harvesting.reason}
                  </p>
                </div>
              </WeatherInsightsCard>

              <WeatherInsightsCard
                title="Planting Conditions"
                icon={<div className="text-lg">🌱</div>}
                confidence={weatherData.insights.planting.confidence}
                gradient="from-purple-500 to-pink-500"
              >
                <div className="space-y-2">
                  <p className="font-semibold text-purple-300">
                    {weatherData.insights.planting.recommendation}
                  </p>
                  <p className="text-sm text-gray-400">
                    {weatherData.insights.planting.reason}
                  </p>
                </div>
              </WeatherInsightsCard>
            </div>
          </motion.div>

          {/* Data Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold gradient-text-dark flex items-center gap-3 mb-6">
              <Gauge className="text-cyan-400" />
              Weather Analytics
            </h2>
            
            <WeatherCharts weatherData={weatherData} />
          </motion.div>

          {/* Weather Report Download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <WeatherReportDownload
              weatherData={{
                location: weatherData.location.name,
                temperature: weatherData.current.temperature,
                humidity: weatherData.current.humidity,
                windSpeed: weatherData.current.windSpeed,
                rainfall: 0
              }}
              insights={[
                {
                  title: weatherData.insights.irrigation.recommendation,
                  description: weatherData.insights.irrigation.reason,
                  confidence: weatherData.insights.irrigation.confidence
                },
                {
                  title: weatherData.insights.harvesting.recommendation,
                  description: weatherData.insights.harvesting.reason,
                  confidence: weatherData.insights.harvesting.confidence
                },
                {
                  title: weatherData.insights.planting.recommendation,
                  description: weatherData.insights.planting.reason,
                  confidence: weatherData.insights.planting.confidence
                }
              ]}
              alerts={weatherData.alerts}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}