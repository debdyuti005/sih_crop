'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OverviewCard, YieldOverviewCard, ProfitOverviewCard, WaterUsageCard, FertilizerCard } from '@/components/analytics/OverviewCard';
import { AnalyticsCharts } from '@/components/analytics/AnalyticsCharts';
import { FilterControls } from '@/components/analytics/FilterControls';
import { AIInsightsCard } from '@/components/analytics/AIInsightsCard';
import { ReportDownloadButton } from '@/components/analytics/ReportDownloadButton';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Droplets, 
  Sprout,
  BarChart3,
  PieChart,
  Download,
  Filter,
  Calendar,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Activity
} from 'lucide-react';

// Mock Analytics Data for UI demonstration
const MOCK_ANALYTICS_DATA = {
  overview: {
    yield: {
      total: 2840,
      unit: 'kg',
      change: 18.5,
      trend: 'up',
      target: 3200
    },
    profit: {
      net: 45230,
      expenses: 28500,
      revenue: 73730,
      change: -5.2,
      trend: 'down'
    },
    waterUsage: {
      used: 12500,
      recommended: 11800,
      efficiency: 85,
      change: 12.3,
      trend: 'up'
    },
    fertilizer: {
      used: 180,
      unit: 'kg',
      efficiency: 92,
      cost: 8500,
      change: -8.1,
      trend: 'down'
    }
  },
  crops: [
    { name: 'Wheat', yield: 1200, profit: 18500, water: 4500, area: 2.5 },
    { name: 'Rice', yield: 980, profit: 15200, water: 6200, area: 2.0 },
    { name: 'Cotton', yield: 660, profit: 11530, water: 1800, area: 1.5 }
  ],
  timeSeriesYield: [
    { month: 'Mar', wheat: 850, rice: 720, cotton: 420 },
    { month: 'Apr', wheat: 920, rice: 780, cotton: 480 },
    { month: 'May', wheat: 1050, rice: 840, cotton: 520 },
    { month: 'Jun', wheat: 1150, rice: 920, cotton: 580 },
    { month: 'Jul', wheat: 1200, rice: 980, cotton: 620 },
    { month: 'Aug', wheat: 1180, rice: 970, cotton: 660 }
  ],
  expenses: {
    seeds: 8500,
    fertilizer: 12000,
    irrigation: 4200,
    labor: 3800,
    equipment: 2500
  },
  performance: {
    fertilizerEfficiency: 92,
    waterEfficiency: 85,
    soilHealth: 78,
    pestResistance: 88,
    yieldQuality: 94
  },
  alerts: [
    {
      id: 'alert-1',
      type: 'success',
      title: 'Excellent Yield Performance',
      message: 'Your wheat yield is 20% higher than last season.',
      value: '+20%',
      icon: CheckCircle,
      color: 'green',
      timestamp: new Date(),
      priority: 'low' as const,
      dismissed: false
    },
    {
      id: 'alert-2',
      type: 'warning',
      title: 'Fertilizer Cost Alert',
      message: 'Fertilizer costs increased by 12% this month.',
      value: '+12%',
      icon: AlertTriangle,
      color: 'yellow',
      timestamp: new Date(),
      priority: 'medium' as const,
      dismissed: false
    },
    {
      id: 'alert-3',
      type: 'danger',
      title: 'Irrigation Efficiency Drop',
      message: 'Water efficiency dropped to 85% — risk of lower yields.',
      value: '-15%',
      icon: Droplets,
      color: 'red',
      timestamp: new Date(),
      priority: 'high' as const,
      dismissed: false
    }
  ],
  aiSuggestions: [
    {
      id: 'suggestion-1',
      title: 'Optimize Water Usage',
      description: 'Reduce irrigation by 15% in sector B to improve water efficiency.',
      impact: 'Save ₹2,500/month',
      confidence: 87,
      category: 'efficiency' as const,
      actionRequired: true,
      estimatedSavings: 2500,
      timeToImplement: '1-2 weeks',
      difficulty: 'medium' as const
    },
    {
      id: 'suggestion-2',
      title: 'Fertilizer Alternative',
      description: 'Switch to organic compost for 30% of fertilizer needs.',
      impact: 'Reduce costs by 18%',
      confidence: 92,
      category: 'cost-reduction' as const,
      actionRequired: false,
      estimatedSavings: 4200,
      timeToImplement: '2-3 weeks',
      difficulty: 'easy' as const
    },
    {
      id: 'suggestion-3',
      title: 'Crop Rotation Suggestion',
      description: 'Plant legumes in field 3 to restore soil nitrogen naturally.',
      impact: 'Improve soil health by 25%',
      confidence: 95,
      category: 'sustainability' as const,
      actionRequired: true,
      timeToImplement: 'Next season',
      difficulty: 'hard' as const
    }
  ]
};

export default function AnalyticsPage() {
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [dateRange, setDateRange] = useState('6months');
  const [compareMode, setCompareMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [analyticsData, setAnalyticsData] = useState(MOCK_ANALYTICS_DATA);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setLastUpdated(new Date());
    // Simulate data refresh
  };

  const handleAlertDismiss = (alertId: string) => {
    setAnalyticsData(prev => ({
      ...prev,
      alerts: prev.alerts.map(alert =>
        alert.id === alertId ? { ...alert, dismissed: true } : alert
      )
    }));
  };

  const handleSuggestionSave = (suggestionId: string) => {
    console.log('Saved suggestion:', suggestionId);
  };

  const handleFiltersReset = () => {
    setSelectedCrop('all');
    setDateRange('6months');
    setCompareMode(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-green-400 via-yellow-500 to-green-600 bg-clip-text text-transparent">
                  Analytics Dashboard
                </span>
              </h1>
              <p className="text-gray-400">
                Track your farm's performance, costs, and yields over time
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

              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="liquid-glass-dark border-white/20 text-white hover:bg-white/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>

              <ReportDownloadButton
                analyticsData={analyticsData}
                selectedCrop={selectedCrop}
                dateRange={dateRange}
              />
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-4 text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </motion.div>

        {/* Filter Controls */}
        <FilterControls
          selectedCrop={selectedCrop}
          dateRange={dateRange}
          compareMode={compareMode}
          onCropChange={setSelectedCrop}
          onDateRangeChange={setDateRange}
          onCompareModeToggle={setCompareMode}
          onReset={handleFiltersReset}
        />

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <YieldOverviewCard data={analyticsData.overview.yield} />
          <ProfitOverviewCard data={analyticsData.overview.profit} />
          <WaterUsageCard data={analyticsData.overview.waterUsage} />
          <FertilizerCard data={analyticsData.overview.fertilizer} />
        </motion.div>

        {/* Analytics Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <PieChart className="text-green-400" />
            Performance Analytics
          </h2>
          
          <AnalyticsCharts
            analyticsData={analyticsData}
            selectedCrop={selectedCrop}
            dateRange={dateRange}
          />
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <AIInsightsCard
            alerts={analyticsData.alerts}
            suggestions={analyticsData.aiSuggestions}
            onAlertDismiss={handleAlertDismiss}
            onSuggestionSave={handleSuggestionSave}
          />
        </motion.div>
      </div>
    </div>
  );
}