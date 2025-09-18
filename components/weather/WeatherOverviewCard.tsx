'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface WeatherOverviewCardProps {
  title: string;
  icon: ReactNode;
  gradient: string;
  children: ReactNode;
  className?: string;
}

export function WeatherOverviewCard({ 
  title, 
  icon, 
  gradient, 
  children, 
  className = '' 
}: WeatherOverviewCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`glassmorphism-dark p-6 rounded-2xl border border-white/10 relative overflow-hidden group ${className}`}
    >
      {/* Gradient Background Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
          {title}
        </h3>
        <div className="group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Animated Border Glow */}
      <div 
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10`}
      />

      {/* Shimmer Effect */}
      <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}