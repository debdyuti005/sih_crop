'use client';

import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { TrendingUp, BarChart2, PieChartIcon, Map } from 'lucide-react';

// Mock data for charts
const priceHistoryData = [
  { date: '2024-01-01', wheat: 2300, rice: 3100, maize: 1650, soybean: 4200 },
  { date: '2024-01-08', wheat: 2350, rice: 3150, maize: 1680, soybean: 4100 },
  { date: '2024-01-15', wheat: 2400, rice: 3200, maize: 1720, soybean: 4300 },
  { date: '2024-01-22', wheat: 2420, rice: 3180, maize: 1780, soybean: 4250 },
  { date: '2024-01-29', wheat: 2450, rice: 3200, maize: 1820, soybean: 4500 },
  { date: '2024-02-05', wheat: 2470, rice: 3220, maize: 1840, soybean: 4400 },
  { date: '2024-02-12', wheat: 2450, rice: 3200, maize: 1850, soybean: 4500 }
];

const regionalData = [
  { region: 'Punjab', wheat: 2500, rice: 3300, maize: 1900 },
  { region: 'UP', wheat: 2400, rice: 3150, maize: 1850 },
  { region: 'MP', wheat: 2350, rice: 3100, maize: 1800 },
  { region: 'Maharashtra', wheat: 2450, rice: 3200, maize: 1820 },
  { region: 'Gujarat', wheat: 2480, rice: 3250, maize: 1880 }
];

const cropShareData = [
  { name: 'Wheat', value: 35, color: '#4ade80' },
  { name: 'Rice', value: 25, color: '#60a5fa' },
  { name: 'Maize', value: 20, color: '#fbbf24' },
  { name: 'Soybean', value: 15, color: '#f87171' },
  { name: 'Others', value: 5, color: '#a78bfa' }
];

const marketInsights = [
  { metric: 'Price Stability', A: 120, B: 110, fullMark: 150 },
  { metric: 'Supply Volume', A: 98, B: 130, fullMark: 150 },
  { metric: 'Demand Growth', A: 86, B: 130, fullMark: 150 },
  { metric: 'Quality Score', A: 99, B: 85, fullMark: 150 },
  { metric: 'Market Access', A: 85, B: 90, fullMark: 150 },
  { metric: 'Transport Cost', A: 65, B: 85, fullMark: 150 }
];

export function MarketCharts() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glassmorphism-dark p-3 rounded-lg border border-gray-700/50">
          <p className="text-gray-300 text-sm">{`Date: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ₹${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Price Trends Chart */}
      <motion.div
        className="glassmorphism-dark p-6 rounded-2xl border border-gray-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-green-400" />
          <h3 className="text-lg font-semibold text-gray-100">Price Trends</h3>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="#9ca3af" 
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="wheat" 
                stroke="#4ade80" 
                strokeWidth={2}
                name="Wheat"
                dot={{ fill: '#4ade80', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="rice" 
                stroke="#60a5fa" 
                strokeWidth={2}
                name="Rice"
                dot={{ fill: '#60a5fa', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="maize" 
                stroke="#fbbf24" 
                strokeWidth={2}
                name="Maize"
                dot={{ fill: '#fbbf24', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Regional Comparison Chart */}
      <motion.div
        className="glassmorphism-dark p-6 rounded-2xl border border-gray-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-100">Regional Prices</h3>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="region" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="wheat" fill="#4ade80" name="Wheat" radius={[2, 2, 0, 0]} />
              <Bar dataKey="rice" fill="#60a5fa" name="Rice" radius={[2, 2, 0, 0]} />
              <Bar dataKey="maize" fill="#fbbf24" name="Maize" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Crop Portfolio Distribution */}
      <motion.div
        className="glassmorphism-dark p-6 rounded-2xl border border-gray-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <PieChartIcon className="text-purple-400" />
          <h3 className="text-lg font-semibold text-gray-100">Portfolio Distribution</h3>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={cropShareData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {cropShareData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Market Insights Radar */}
      <motion.div
        className="glassmorphism-dark p-6 rounded-2xl border border-gray-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Map className="text-cyan-400" />
          <h3 className="text-lg font-semibold text-gray-100">Market Insights</h3>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={marketInsights}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 10 }} />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 150]} 
                tick={{ fill: '#9ca3af', fontSize: 8 }}
              />
              <Radar
                name="Current Market"
                dataKey="A"
                stroke="#4ade80"
                fill="#4ade80"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Last Month"
                dataKey="B"
                stroke="#60a5fa"
                fill="#60a5fa"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}