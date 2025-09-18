'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { motion } from 'framer-motion';
import { Thermometer, CloudRain, Wind, Droplets } from 'lucide-react';

interface WeatherData {
  historical: {
    temperatureTrend: Array<{
      day: string;
      high: number;
      low: number;
    }>;
    rainfallData: Array<{
      day: string;
      rainfall: number;
      chance: number;
    }>;
  };
  current: {
    windSpeed: number;
    humidity: number;
    uvIndex: number;
    pressure: number;
  };
}

interface WeatherChartsProps {
  weatherData: WeatherData;
}

const COLORS = {
  temperature: '#FFD54F',
  temperatureLow: '#81D4FA',
  rainfall: '#4CAF50',
  wind: '#FF8A65',
  humidity: '#64B5F6'
};

export function WeatherCharts({ weatherData }: WeatherChartsProps) {
  // Custom Tooltip Components
  const TemperatureTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glassmorphism-dark p-3 rounded-lg border border-white/20">
          <p className="text-white font-medium">{label}</p>
          <p className="text-yellow-300">
            High: {payload[0]?.value}°C
          </p>
          <p className="text-blue-300">
            Low: {payload[1]?.value}°C
          </p>
        </div>
      );
    }
    return null;
  };

  const RainfallTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glassmorphism-dark p-3 rounded-lg border border-white/20">
          <p className="text-white font-medium">{label}</p>
          <p className="text-green-300">
            Rainfall: {payload[0]?.value}mm
          </p>
          <p className="text-blue-300">
            Chance: {payload[1]?.value}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Wind Gauge Data
  const windGaugeData = [
    { name: 'Wind Speed', value: weatherData.current.windSpeed, fill: COLORS.wind }
  ];

  // Humidity and Weather Conditions Pie Chart Data
  const conditionsData = [
    { name: 'Humidity', value: weatherData.current.humidity, fill: COLORS.humidity },
    { name: 'Clear', value: 100 - weatherData.current.humidity, fill: '#424242' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Temperature Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glassmorphism-dark p-6 rounded-2xl border border-white/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
            <Thermometer className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold gradient-text-dark">
            Temperature Trend (7 Days)
          </h3>
        </div>
        
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weatherData.historical.temperatureTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <Tooltip content={<TemperatureTooltip />} />
            <Legend 
              wrapperStyle={{ color: '#9CA3AF' }}
            />
            <Line 
              type="monotone" 
              dataKey="high" 
              stroke={COLORS.temperature}
              strokeWidth={3}
              dot={{ fill: COLORS.temperature, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: COLORS.temperature, strokeWidth: 2 }}
              name="High"
            />
            <Line 
              type="monotone" 
              dataKey="low" 
              stroke={COLORS.temperatureLow}
              strokeWidth={3}
              dot={{ fill: COLORS.temperatureLow, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: COLORS.temperatureLow, strokeWidth: 2 }}
              name="Low"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Rainfall Probability Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glassmorphism-dark p-6 rounded-2xl border border-white/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-500">
            <CloudRain className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold gradient-text-dark">
            Rainfall Forecast
          </h3>
        </div>
        
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weatherData.historical.rainfallData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <Tooltip content={<RainfallTooltip />} />
            <Legend wrapperStyle={{ color: '#9CA3AF' }} />
            <Bar 
              dataKey="rainfall" 
              fill={COLORS.rainfall}
              radius={[4, 4, 0, 0]}
              name="Rainfall (mm)"
            />
            <Bar 
              dataKey="chance" 
              fill={COLORS.humidity}
              radius={[4, 4, 0, 0]}
              name="Chance (%)"
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Wind Speed Gauge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glassmorphism-dark p-6 rounded-2xl border border-white/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
            <Wind className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold gradient-text-dark">
            Wind Speed Monitor
          </h3>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="relative">
            <ResponsiveContainer width={200} height={200}>
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="60%" 
                outerRadius="90%" 
                data={windGaugeData}
                startAngle={90}
                endAngle={450}
              >
                <RadialBar 
                  dataKey="value" 
                  cornerRadius={10} 
                  fill={COLORS.wind}
                  background={{ fill: '#374151' }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            
            {/* Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="text-2xl mb-1"
              >
                💨
              </motion.div>
              <div className="text-2xl font-bold text-orange-400">
                {weatherData.current.windSpeed}
              </div>
              <div className="text-xs text-gray-400">km/h</div>
            </div>
          </div>
        </div>

        {/* Wind Status */}
        <div className="mt-4 text-center">
          <div className={`inline-block px-3 py-1 rounded-full text-sm ${
            weatherData.current.windSpeed > 20 
              ? 'bg-red-500/20 text-red-300' 
              : weatherData.current.windSpeed > 10
              ? 'bg-yellow-500/20 text-yellow-300'
              : 'bg-green-500/20 text-green-300'
          }`}>
            {weatherData.current.windSpeed > 20 
              ? 'High Wind - Avoid Spraying' 
              : weatherData.current.windSpeed > 10
              ? 'Moderate Wind'
              : 'Low Wind - Good for Spraying'}
          </div>
        </div>
      </motion.div>

      {/* Humidity & Atmospheric Conditions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glassmorphism-dark p-6 rounded-2xl border border-white/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
            <Droplets className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold gradient-text-dark">
            Atmospheric Conditions
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Humidity Gauge */}
          <div className="text-center">
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie
                  data={conditionsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  startAngle={90}
                  endAngle={450}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {conditionsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="text-lg font-semibold text-blue-400">
              {weatherData.current.humidity}%
            </div>
            <div className="text-xs text-gray-400">Humidity</div>
          </div>

          {/* Additional Metrics */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">UV Index</span>
              <span className="font-semibold text-yellow-400">
                {weatherData.current.uvIndex}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Pressure</span>
              <span className="font-semibold text-green-400">
                {weatherData.current.pressure} hPa
              </span>
            </div>
            <div className={`text-center p-2 rounded-lg text-xs ${
              weatherData.current.humidity > 80 
                ? 'bg-blue-500/20 text-blue-300' 
                : weatherData.current.humidity > 60
                ? 'bg-yellow-500/20 text-yellow-300'
                : 'bg-green-500/20 text-green-300'
            }`}>
              {weatherData.current.humidity > 80 
                ? 'High Humidity - Disease Risk' 
                : weatherData.current.humidity > 60
                ? 'Moderate Humidity'
                : 'Low Humidity - Irrigation Needed'}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}