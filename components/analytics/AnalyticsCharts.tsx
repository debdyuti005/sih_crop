'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Activity, 
  Calendar,
  Eye,
  EyeOff
} from 'lucide-react';

interface AnalyticsChartsProps {
  analyticsData: any;
  selectedCrop?: string;
  dateRange?: string;
}

const CHART_COLORS = {
  primary: '#66BB6A', // Neon Green
  secondary: '#FFD54F', // Golden Yellow
  accent: '#4DD0E1', // Aqua Blue
  danger: '#E53935', // Red
  purple: '#AB47BC',
  orange: '#FF7043'
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glassmorphism-dark border border-white/20 rounded-lg p-3 shadow-lg">
        <p className="text-white font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
            {entry.unit && ` ${entry.unit}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Heatmap Calendar Component
function HeatmapCalendar({ data }: { data: any[] }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  const getIntensity = (value: number) => {
    const normalized = Math.min(value / 1000, 1); // Normalize to 0-1
    return normalized;
  };

  return (
    <div className="grid grid-cols-12 gap-1 p-4">
      {months.map((month, monthIndex) => (
        <div key={month} className="text-center">
          <div className="text-xs text-gray-400 mb-2">{month}</div>
          <div className="space-y-1">
            {weeks.map((week, weekIndex) => {
              const value = Math.random() * 1200 + 200; // Mock data
              const intensity = getIntensity(value);
              return (
                <motion.div
                  key={week}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (monthIndex * 4 + weekIndex) * 0.02 }}
                  className="w-4 h-4 rounded-sm cursor-pointer relative group"
                  style={{
                    backgroundColor: `rgba(102, 187, 106, ${intensity})`,
                    border: '1px solid rgba(102, 187, 106, 0.3)',
                    boxShadow: intensity > 0.7 ? '0 0 8px rgba(102, 187, 106, 0.4)' : 'none'
                  }}
                  title={`${month} ${week}: ${Math.round(value)}kg`}
                >
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs bg-black/80 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {Math.round(value)}kg
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function AnalyticsCharts({ analyticsData, selectedCrop = 'all', dateRange = '6months' }: AnalyticsChartsProps) {
  const [visibleCharts, setVisibleCharts] = useState({
    yieldTrend: true,
    cropComparison: true,
    costProfit: true,
    expenseBreakdown: true,
    performance: true,
    heatmap: true
  });

  const toggleChart = (chartId: keyof typeof visibleCharts) => {
    setVisibleCharts(prev => ({
      ...prev,
      [chartId]: !prev[chartId]
    }));
  };

  // Prepare expense data for donut chart
  const expenseData = Object.entries(analyticsData.expenses).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value as number,
    color: Object.values(CHART_COLORS)[Object.keys(analyticsData.expenses).indexOf(key)]
  }));

  // Prepare performance data for radar chart
  const performanceData = [
    { metric: 'Fertilizer Efficiency', value: analyticsData.performance.fertilizerEfficiency, fullMark: 100 },
    { metric: 'Water Efficiency', value: analyticsData.performance.waterEfficiency, fullMark: 100 },
    { metric: 'Soil Health', value: analyticsData.performance.soilHealth, fullMark: 100 },
    { metric: 'Pest Resistance', value: analyticsData.performance.pestResistance, fullMark: 100 },
    { metric: 'Yield Quality', value: analyticsData.performance.yieldQuality, fullMark: 100 }
  ];

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(visibleCharts).map(([key, visible]) => (
          <Button
            key={key}
            variant="outline"
            size="sm"
            onClick={() => toggleChart(key as keyof typeof visibleCharts)}
            className={`liquid-glass-dark border-white/20 text-white hover:bg-white/10 ${
              visible ? 'bg-green-500/20 border-green-500/50' : ''
            }`}
          >
            {visible ? <Eye className="w-4 h-4 mr-1" /> : <EyeOff className="w-4 h-4 mr-1" />}
            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yield Trend Line Chart */}
        {visibleCharts.yieldTrend && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <Card className="glassmorphism-dark border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Yield Trends Over Time</h3>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.timeSeriesYield}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#B0BEC5"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#B0BEC5"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="wheat" 
                    stroke={CHART_COLORS.primary}
                    strokeWidth={3}
                    dot={{ fill: CHART_COLORS.primary, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: CHART_COLORS.primary, stroke: '#fff', strokeWidth: 2 }}
                    filter="drop-shadow(0 0 6px rgba(102, 187, 106, 0.4))"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rice" 
                    stroke={CHART_COLORS.secondary}
                    strokeWidth={3}
                    dot={{ fill: CHART_COLORS.secondary, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: CHART_COLORS.secondary, stroke: '#fff', strokeWidth: 2 }}
                    filter="drop-shadow(0 0 6px rgba(255, 213, 79, 0.4))"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cotton" 
                    stroke={CHART_COLORS.accent}
                    strokeWidth={3}
                    dot={{ fill: CHART_COLORS.accent, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: CHART_COLORS.accent, stroke: '#fff', strokeWidth: 2 }}
                    filter="drop-shadow(0 0 6px rgba(77, 208, 225, 0.4))"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        )}

        {/* Crop Comparison Bar Chart */}
        {visibleCharts.cropComparison && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glassmorphism-dark border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">Crop-by-Crop Comparison</h3>
              </div>
              
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={analyticsData.crops}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#B0BEC5"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#B0BEC5"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="yield" 
                    fill={CHART_COLORS.primary}
                    radius={[4, 4, 0, 0]}
                    filter="drop-shadow(0 0 8px rgba(102, 187, 106, 0.3))"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        )}

        {/* Cost vs Profit Stacked Bar Chart */}
        {visibleCharts.costProfit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glassmorphism-dark border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">Cost vs Profit Analysis</h3>
              </div>
              
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={analyticsData.crops}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#B0BEC5"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#B0BEC5"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="profit" 
                    stackId="a"
                    fill={CHART_COLORS.secondary}
                    radius={[4, 4, 0, 0]}
                    name="Profit"
                  />
                  <Bar 
                    dataKey="water" 
                    stackId="a"
                    fill={CHART_COLORS.accent}
                    name="Water Cost"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        )}

        {/* Expense Breakdown Donut Chart */}
        {visibleCharts.expenseBreakdown && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glassmorphism-dark border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <PieChartIcon className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Expense Breakdown</h3>
              </div>
              
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        style={{
                          filter: `drop-shadow(0 0 8px ${entry.color}40)`
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        )}

        {/* Performance Radar Chart */}
        {visibleCharts.performance && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glassmorphism-dark border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Performance Metrics</h3>
              </div>
              
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={performanceData}>
                  <PolarGrid stroke="rgba(255,255,255,0.2)" />
                  <PolarAngleAxis 
                    dataKey="metric" 
                    tick={{ fill: '#B0BEC5', fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]}
                    tick={{ fill: '#B0BEC5', fontSize: 10 }}
                  />
                  <Radar
                    name="Performance Score"
                    dataKey="value"
                    stroke={CHART_COLORS.primary}
                    fill={CHART_COLORS.primary}
                    fillOpacity={0.3}
                    strokeWidth={3}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        )}

        {/* Seasonal Heatmap */}
        {visibleCharts.heatmap && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="glassmorphism-dark border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-white">Seasonal Yield Heatmap</h3>
                <div className="ml-auto flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-3 h-3 bg-green-900 rounded-sm"></div>
                  <span>Low</span>
                  <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                  <span>High</span>
                </div>
              </div>
              
              <HeatmapCalendar data={[]} />
            </Card>
          </motion.div>
        )}
      </div>

      {/* AI Prediction Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="glassmorphism-dark border-green-500/30 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/5" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">AI Yield Prediction</h3>
                <p className="text-sm text-gray-400">Next season estimate based on current trends</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-green-400 mb-1">3,240kg</div>
                <div className="text-sm text-gray-400">Predicted Wheat Yield</div>
                <div className="text-xs text-green-300 mt-1">+14% from this season</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400 mb-1">₹58,500</div>
                <div className="text-sm text-gray-400">Expected Profit</div>
                <div className="text-xs text-yellow-300 mt-1">+22% improvement</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-cyan-400 mb-1">94%</div>
                <div className="text-sm text-gray-400">Confidence Score</div>
                <div className="text-xs text-cyan-300 mt-1">High accuracy</div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}