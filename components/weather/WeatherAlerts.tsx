'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  AlertTriangle, 
  X, 
  Clock, 
  MapPin, 
  Info,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WeatherAlert {
  id: string;
  type: 'warning' | 'advisory' | 'severe';
  severity: 'low' | 'moderate' | 'high' | 'severe';
  title: string;
  description: string;
  timeRange: string;
  crops: string[];
  actions: string[];
}

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

export function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  const getSeverityConfig = (severity: string) => {
    const configs = {
      severe: {
        color: 'bg-red-900/50 border-red-500/70',
        textColor: 'text-red-300',
        icon: XCircle,
        glow: 'shadow-[0_0_30px_rgba(239,68,68,0.5)]',
        animation: { scale: [1, 1.02, 1], transition: { duration: 2, repeat: Infinity } }
      },
      high: {
        color: 'bg-orange-900/50 border-orange-500/70',
        textColor: 'text-orange-300',
        icon: AlertTriangle,
        glow: 'shadow-[0_0_25px_rgba(251,146,60,0.4)]',
        animation: { scale: [1, 1.01, 1], transition: { duration: 3, repeat: Infinity } }
      },
      moderate: {
        color: 'bg-yellow-900/50 border-yellow-500/70',
        textColor: 'text-yellow-300',
        icon: Info,
        glow: 'shadow-[0_0_20px_rgba(234,179,8,0.3)]',
        animation: {}
      },
      low: {
        color: 'bg-blue-900/50 border-blue-500/70',
        textColor: 'text-blue-300',
        icon: CheckCircle,
        glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]',
        animation: {}
      }
    };
    
    return configs[severity as keyof typeof configs] || configs.moderate;
  };

  const handleDismissAlert = (alertId: string) => {
    setDismissedAlerts(prev => [...prev, alertId]);
  };

  const activeAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id));

  if (activeAlerts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphism-dark p-4 rounded-xl border border-green-500/30 mb-6"
      >
        <div className="flex items-center gap-3 text-green-300">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">All Clear - No Active Weather Alerts</span>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4 mb-8">
      <AnimatePresence>
        {activeAlerts.map((alert, index) => {
          const config = getSeverityConfig(alert.severity);
          const IconComponent = config.icon;
          
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -100, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                scale: 1,
                ...config.animation
              }}
              exit={{ 
                opacity: 0, 
                x: 100, 
                scale: 0.8,
                transition: { duration: 0.3 }
              }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className={`${config.color} ${config.glow} border rounded-xl p-6 relative overflow-hidden group`}
            >
              {/* Background Animation for Severe Alerts */}
              {alert.severity === 'severe' && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10"
                  animate={{ 
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  }}
                />
              )}

              {/* Header */}
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className={`w-8 h-8 ${config.textColor} flex-shrink-0 mt-1`} />
                  </motion.div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`font-bold text-lg ${config.textColor}`}>
                        {alert.title}
                      </h3>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${config.color.split(' ')[0]} ${config.textColor}`}
                      >
                        {alert.type.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className={`${config.textColor}/90 leading-relaxed`}>
                      {alert.description}
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDismissAlert(alert.id)}
                  className={`${config.textColor} hover:bg-white/10 relative z-10`}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Time Range */}
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <Clock className={`w-4 h-4 ${config.textColor}`} />
                <span className={`text-sm ${config.textColor}/80`}>
                  {alert.timeRange}
                </span>
              </div>

              {/* Affected Crops */}
              {alert.crops.length > 0 && (
                <div className="mb-4 relative z-10">
                  <h4 className={`text-sm font-semibold ${config.textColor} mb-2`}>
                    Affected Crops:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {alert.crops.map((crop, cropIndex) => (
                      <Badge 
                        key={cropIndex}
                        variant="secondary" 
                        className={`text-xs bg-white/10 ${config.textColor} border-white/20`}
                      >
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Actions */}
              {alert.actions.length > 0 && (
                <div className="relative z-10">
                  <h4 className={`text-sm font-semibold ${config.textColor} mb-2`}>
                    Recommended Actions:
                  </h4>
                  <ul className="space-y-1">
                    {alert.actions.map((action, actionIndex) => (
                      <li 
                        key={actionIndex}
                        className={`text-sm ${config.textColor}/90 flex items-center gap-2`}
                      >
                        <div className={`w-1.5 h-1.5 ${config.color.split(' ')[0]} rounded-full`} />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Shimmer Effect */}
              <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}