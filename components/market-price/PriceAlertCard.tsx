'use client';

import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Clock, X, Bell } from 'lucide-react';

interface PriceAlert {
  id: number;
  type: 'success' | 'warning' | 'danger';
  crop: string;
  message: string;
  timestamp: string;
}

interface PriceAlertCardProps {
  alert: PriceAlert;
  index: number;
}

export function PriceAlertCard({ alert, index }: PriceAlertCardProps) {
  const getAlertConfig = (type: string) => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle size={24} />,
          color: 'text-green-400',
          bg: 'bg-green-400/10',
          border: 'border-green-400/30',
          glow: 'shadow-green-400/20',
          accent: 'bg-green-400'
        };
      case 'warning':
        return {
          icon: <AlertTriangle size={24} />,
          color: 'text-yellow-400',
          bg: 'bg-yellow-400/10',
          border: 'border-yellow-400/30',
          glow: 'shadow-yellow-400/20',
          accent: 'bg-yellow-400'
        };
      case 'danger':
        return {
          icon: <XCircle size={24} />,
          color: 'text-red-400',
          bg: 'bg-red-400/10',
          border: 'border-red-400/30',
          glow: 'shadow-red-400/20',
          accent: 'bg-red-400'
        };
      default:
        return {
          icon: <Bell size={24} />,
          color: 'text-gray-400',
          bg: 'bg-gray-400/10',
          border: 'border-gray-400/30',
          glow: 'shadow-gray-400/20',
          accent: 'bg-gray-400'
        };
    }
  };

  const config = getAlertConfig(alert.type);

  return (
    <motion.div
      className={`glassmorphism-dark p-4 rounded-2xl border ${config.border} ${config.bg} relative overflow-hidden group hover:${config.glow} hover:shadow-xl transition-all duration-300`}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Animated Border Pulse */}
      <motion.div
        className={`absolute inset-0 rounded-2xl border-2 ${config.border} opacity-0 group-hover:opacity-100`}
        animate={{
          opacity: [0, 0.5, 0],
          scale: [1, 1.02, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Accent Strip */}
      <div className={`absolute top-0 left-0 w-full h-1 ${config.accent} rounded-t-2xl`} />
      
      {/* Glowing Orb Animation */}
      <motion.div
        className={`absolute top-2 right-2 w-2 h-2 ${config.accent} rounded-full`}
        animate={{
          opacity: [1, 0.3, 1],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <motion.div
              className={config.color}
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
            >
              {config.icon}
            </motion.div>
            <div>
              <h4 className={`font-semibold ${config.color}`}>
                {alert.crop} Alert
              </h4>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                <Clock size={12} />
                <span>{alert.timestamp}</span>
              </div>
            </div>
          </div>
          
          <motion.button
            className="p-1 rounded-lg hover:bg-gray-700/50 text-gray-400 hover:text-gray-300 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={16} />
          </motion.button>
        </div>

        {/* Message */}
        <motion.p
          className="text-sm text-gray-300 leading-relaxed mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
        >
          {alert.message}
        </motion.p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${config.color} ${config.bg} hover:${config.bg} border ${config.border} transition-all duration-200`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.6 }}
          >
            View Details
          </motion.button>
          
          <motion.button
            className="px-3 py-1 rounded-lg text-xs font-semibold text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.7 }}
          >
            Dismiss
          </motion.button>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${config.color.replace('text-', 'rgb(').replace('-400', ')').replace('text-', '').replace('rgb()', 'rgb(156, 163, 175)')} 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl ${config.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
      
      {/* Animated Particles for Success */}
      {alert.type === 'success' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full"
              initial={{ 
                x: Math.random() * 200,
                y: Math.random() * 100,
                opacity: 0 
              }}
              animate={{
                y: [null, -20],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}