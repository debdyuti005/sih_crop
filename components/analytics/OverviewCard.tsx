'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { ReactNode } from 'react';

interface OverviewCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  subtitle?: string;
  icon: ReactNode;
  gradient: string;
  accentColor: string;
  efficiency?: number;
  target?: string;
}

export function OverviewCard({
  title,
  value,
  unit = '',
  change,
  trend = 'neutral',
  subtitle,
  icon,
  gradient,
  accentColor,
  efficiency,
  target
}: OverviewCardProps) {
  const formatNumber = (num: number | string) => {
    if (typeof num === 'string') return num;
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return `text-${accentColor}-400`;
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingDown className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`glassmorphism-dark border-${accentColor}-500/30 p-6 relative overflow-hidden group cursor-pointer glow-effect-dark`}>
        {/* Hover Background Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className={`p-2 bg-${accentColor}-500/20 rounded-lg group-hover:bg-${accentColor}-500/30 transition-colors`}>
            {icon}
          </div>
          
          {/* Change/Efficiency Indicator */}
          <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
            {efficiency !== undefined ? (
              <>
                <Activity className="w-4 h-4" />
                {efficiency}%
              </>
            ) : change !== undefined ? (
              <>
                {getTrendIcon()}
                {change > 0 ? '+' : ''}{change}%
              </>
            ) : null}
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-gray-400 text-sm font-medium mb-1 group-hover:text-gray-300 transition-colors">
            {title}
          </h3>
          
          {/* Main Value */}
          <div className="text-2xl font-bold text-white mb-1 group-hover:text-white transition-colors">
            {formatNumber(value)}{unit && ` ${unit}`}
          </div>
          
          {/* Subtitle/Target */}
          {subtitle && (
            <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
              {subtitle}
            </div>
          )}
          
          {target && (
            <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
              Target: {target}
            </div>
          )}
        </div>

        {/* Progress Bar (for efficiency) */}
        {efficiency !== undefined && (
          <div className="mt-4 relative z-10">
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${efficiency}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-2 bg-gradient-to-r from-${accentColor}-500 to-${accentColor}-400 rounded-full`}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Efficiency: {efficiency}%
            </div>
          </div>
        )}

        {/* Shimmer Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-${accentColor}-500/5 via-transparent to-${accentColor}-600/5 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Glow Border Animation */}
        <div className={`absolute inset-0 rounded-lg border border-${accentColor}-500/20 group-hover:border-${accentColor}-500/50 transition-all duration-300`} />
      </Card>
    </motion.div>
  );
}

// Preset components for common overview cards
export function YieldOverviewCard({ data }: { data: any }) {
  return (
    <OverviewCard
      title="Total Yield"
      value={data.total}
      unit={data.unit}
      change={data.change}
      trend={data.trend}
      target={`${data.target} ${data.unit}`}
      icon={<Activity className="w-5 h-5 text-green-400" />}
      gradient="from-green-500/10 to-green-600/5"
      accentColor="green"
    />
  );
}

export function ProfitOverviewCard({ data }: { data: any }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <OverviewCard
      title="Net Profit"
      value={formatCurrency(data.net)}
      change={data.change}
      trend={data.change >= 0 ? 'up' : 'down'}
      subtitle={`Revenue: ${formatCurrency(data.revenue)}`}
      icon={<Activity className="w-5 h-5 text-yellow-400" />}
      gradient="from-yellow-500/10 to-yellow-600/5"
      accentColor="yellow"
    />
  );
}

export function WaterUsageCard({ data }: { data: any }) {
  return (
    <OverviewCard
      title="Water Usage"
      value={data.used}
      unit="L"
      efficiency={data.efficiency}
      subtitle={`Recommended: ${data.recommended}L`}
      icon={<Activity className="w-5 h-5 text-cyan-400" />}
      gradient="from-cyan-500/10 to-cyan-600/5"
      accentColor="cyan"
    />
  );
}

export function FertilizerCard({ data }: { data: any }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <OverviewCard
      title="Fertilizer Used"
      value={data.used}
      unit={data.unit}
      efficiency={data.efficiency}
      subtitle={`Cost: ${formatCurrency(data.cost)}`}
      icon={<Activity className="w-5 h-5 text-purple-400" />}
      gradient="from-purple-500/10 to-purple-600/5"
      accentColor="purple"
    />
  );
}