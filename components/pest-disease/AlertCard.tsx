'use client';

import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  X,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
}

interface AlertCardProps {
  alert: Alert;
  index: number;
}

export function AlertCard({ alert, index }: AlertCardProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  const getAlertConfig = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          icon: <AlertTriangle size={20} />,
          color: 'text-red-400',
          bg: 'bg-red-400/10',
          border: 'border-red-400/30',
          glowColor: 'shadow-red-400/50',
          pulseColor: 'rgba(239, 68, 68, 0.4)'
        };
      case 'warning':
        return {
          icon: <AlertTriangle size={20} />,
          color: 'text-amber-400',
          bg: 'bg-amber-400/10',
          border: 'border-amber-400/30',
          glowColor: 'shadow-amber-400/30',
          pulseColor: 'rgba(245, 158, 11, 0.3)'
        };
      case 'info':
        return {
          icon: <Info size={20} />,
          color: 'text-blue-400',
          bg: 'bg-blue-400/10',
          border: 'border-blue-400/30',
          glowColor: 'shadow-blue-400/20',
          pulseColor: 'rgba(59, 130, 246, 0.3)'
        };
      default:
        return {
          icon: <Info size={20} />,
          color: 'text-gray-400',
          bg: 'bg-gray-400/10',
          border: 'border-gray-400/30',
          glowColor: 'shadow-gray-400/20',
          pulseColor: 'rgba(156, 163, 175, 0.3)'
        };
    }
  };

  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'high':
        return { dots: 3, color: 'bg-red-400' };
      case 'medium':
        return { dots: 2, color: 'bg-amber-400' };
      case 'low':
        return { dots: 1, color: 'bg-green-400' };
      default:
        return { dots: 1, color: 'bg-gray-400' };
    }
  };

  const config = getAlertConfig(alert.type);
  const priorityConfig = getPriorityIndicator(alert.priority);

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <motion.div
      className={`glassmorphism-dark p-4 rounded-xl border ${config.border} ${config.bg} shadow-lg relative overflow-hidden`}
      initial={{ opacity: 0, x: -50, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        scale: 1,
        boxShadow: alert.type === 'critical' 
          ? [
              '0 0 0 0 rgba(239, 68, 68, 0.4)',
              '0 0 0 10px rgba(239, 68, 68, 0)',
              '0 0 0 0 rgba(239, 68, 68, 0.4)'
            ]
          : undefined
      }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        boxShadow: {
          duration: 2,
          repeat: alert.type === 'critical' ? Infinity : 0,
          ease: "easeInOut"
        }
      }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className={`w-full h-full ${config.bg}`}
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${config.pulseColor} 2px, transparent 2px)`,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className="flex items-center gap-3 flex-1">
          {/* Alert Icon */}
          <motion.div
            className={`p-2 rounded-lg ${config.bg} ${config.color} flex-shrink-0`}
            animate={alert.type === 'critical' ? { 
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0] 
            } : {}}
            transition={{ 
              duration: 1, 
              repeat: alert.type === 'critical' ? Infinity : 0,
              repeatDelay: 1 
            }}
          >
            {config.icon}
          </motion.div>

          {/* Alert Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className={`font-semibold ${config.color} truncate`}>
                {alert.title}
              </h4>
              
              {/* Priority Indicator */}
              <div className="flex items-center gap-1">
                {Array.from({ length: priorityConfig.dots }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${priorityConfig.color}`}
                    animate={alert.priority === 'high' ? {
                      opacity: [1, 0.3, 1],
                      scale: [1, 1.2, 1]
                    } : {}}
                    transition={{ 
                      duration: 1.5, 
                      repeat: alert.priority === 'high' ? Infinity : 0,
                      delay: i * 0.2 
                    }}
                  />
                ))}
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              {alert.message}
            </p>
          </div>
        </div>

        {/* Dismiss Button */}
        <motion.button
          onClick={handleDismiss}
          className="p-1 rounded-full hover:bg-gray-700/50 text-gray-400 hover:text-gray-300 transition-colors flex-shrink-0 ml-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={16} />
        </motion.button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs relative z-10">
        <div className="flex items-center gap-2 text-gray-500">
          <Clock size={12} />
          <span>{alert.timestamp}</span>
        </div>
        
        {/* Action Button */}
        <motion.button
          className={`px-3 py-1 rounded-md text-xs font-medium ${config.bg} ${config.color} border ${config.border} hover:bg-opacity-20 transition-all`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {alert.type === 'critical' ? 'Take Action' : alert.type === 'warning' ? 'View Details' : 'Learn More'}
        </motion.button>
      </div>

      {/* Severity Indicator Bar */}
      <motion.div
        className={`absolute bottom-0 left-0 h-1 ${config.color.replace('text-', 'bg-')} rounded-full`}
        initial={{ width: 0 }}
        animate={{ 
          width: alert.type === 'critical' ? '100%' : alert.type === 'warning' ? '70%' : '40%'
        }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Glow Effect for Critical Alerts */}
      {alert.type === 'critical' && (
        <motion.div
          className="absolute inset-0 rounded-xl border border-red-400/50 pointer-events-none"
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0.95, 1.02, 0.95]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
}