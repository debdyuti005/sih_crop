'use client';

import { motion } from 'framer-motion';
import { 
  BarChart2, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Calendar
} from 'lucide-react';

interface HealthAnalytics {
  healthyPercentage: number;
  infectedPercentage: number;
  trendData: Array<{
    month: string;
    healthy: number;
    infected: number;
  }>;
  commonPests: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
}

interface CropHealthChartsProps {
  data: HealthAnalytics;
}

export function CropHealthCharts({ data }: CropHealthChartsProps) {
  const maxCount = Math.max(...data.trendData.map(d => Math.max(d.healthy, d.infected)));
  
  return (
    <div className="space-y-6">
      {/* Health Overview Pie Chart */}
      <motion.div
        className="glassmorphism-dark p-6 rounded-2xl border border-gray-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <PieChart className="text-green-400" size={24} />
          <h3 className="text-lg font-semibold text-gray-100">Crop Health Overview</h3>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Animated Pie Chart */}
          <div className="relative w-48 h-48 mx-auto">
            <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
              {/* Background Circle */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="rgba(75, 85, 99, 0.3)"
                strokeWidth="20"
              />
              
              {/* Healthy Percentage */}
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="url(#healthyGradient)"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 80}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                animate={{ 
                  strokeDashoffset: 2 * Math.PI * 80 * (1 - data.healthyPercentage / 100) 
                }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              
              {/* Infected Percentage */}
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="url(#infectedGradient)"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 80}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                animate={{ 
                  strokeDashoffset: 2 * Math.PI * 80 * (1 - data.infectedPercentage / 100) 
                }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                transform={`rotate(${(data.healthyPercentage / 100) * 360} 100 100)`}
              />

              {/* Gradients */}
              <defs>
                <linearGradient id="healthyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
                <linearGradient id="infectedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#F87171" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  className="text-2xl font-bold text-gray-100"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring", stiffness: 200 }}
                >
                  {data.healthyPercentage}%
                </motion.div>
                <div className="text-xs text-gray-400">Healthy</div>
              </div>
            </div>
          </div>

          {/* Legend and Stats */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                className="p-4 glassmorphism rounded-xl border border-green-400/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-sm text-gray-300">Healthy Crops</span>
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {data.healthyPercentage}%
                </div>
              </motion.div>

              <motion.div
                className="p-4 glassmorphism rounded-xl border border-red-400/20"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="text-sm text-gray-300">Need Attention</span>
                </div>
                <div className="text-2xl font-bold text-red-400">
                  {data.infectedPercentage}%
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trend Chart */}
      <motion.div
        className="glassmorphism-dark p-6 rounded-2xl border border-gray-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <BarChart2 className="text-blue-400" size={24} />
          <h3 className="text-lg font-semibold text-gray-100">Health Trend Analysis</h3>
        </div>

        <div className="h-64 flex items-end justify-center gap-4 p-4">
          {data.trendData.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2 flex-1 max-w-16">
              {/* Bars Container */}
              <div className="flex items-end gap-1 h-40">
                {/* Healthy Bar */}
                <motion.div
                  className="bg-gradient-to-t from-green-600 to-green-400 rounded-t-md min-w-[16px] relative group"
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.healthy / maxCount) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-400 text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.healthy}%
                  </div>
                </motion.div>

                {/* Infected Bar */}
                <motion.div
                  className="bg-gradient-to-t from-red-600 to-red-400 rounded-t-md min-w-[16px] relative group"
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.infected / maxCount) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-400 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.infected}%
                  </div>
                </motion.div>
              </div>

              {/* Month Label */}
              <div className="text-xs text-gray-400 text-center">
                {item.month}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-green-600 to-green-400" />
            <span className="text-sm text-gray-300">Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-red-600 to-red-400" />
            <span className="text-sm text-gray-300">Infected</span>
          </div>
        </div>
      </motion.div>

      {/* Common Pests Breakdown */}
      <motion.div
        className="glassmorphism-dark p-6 rounded-2xl border border-gray-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Activity className="text-amber-400" size={24} />
          <h3 className="text-lg font-semibold text-gray-100">Pest Detection Analytics</h3>
        </div>

        <div className="space-y-4">
          {data.commonPests.map((pest, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-3 glassmorphism rounded-lg hover:bg-gray-800/30 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="text-gray-100 font-medium">{pest.name}</div>
                <div className="text-sm text-gray-400">({pest.count} detections)</div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${pest.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.8 }}
                  />
                </div>
                <div className="text-sm font-semibold text-amber-400 min-w-[3rem]">
                  {pest.percentage}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Footer */}
        <motion.div
          className="mt-6 p-4 bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-amber-500/20 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center gap-2 text-amber-300">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">
              Peak pest activity detected in current season. Monitor crops closely.
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}