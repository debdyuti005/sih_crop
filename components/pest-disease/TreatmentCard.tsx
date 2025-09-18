'use client';

import { motion } from 'framer-motion';
import { 
  Leaf, 
  Zap, 
  Shield, 
  Clock,
  AlertCircle,
  CheckCircle,
  Droplet,
  Target
} from 'lucide-react';

interface Treatment {
  name: string;
  description: string;
  dosage?: string;
  frequency?: string;
  safety?: string;
  implementation?: string;
}

interface TreatmentCardProps {
  title: string;
  treatments: Treatment[];
  type: 'organic' | 'chemical' | 'preventive';
}

export function TreatmentCard({ title, treatments, type }: TreatmentCardProps) {
  const getTypeConfig = (treatmentType: string) => {
    switch (treatmentType) {
      case 'organic':
        return {
          icon: <Leaf size={24} />,
          gradient: 'from-green-500 to-emerald-600',
          borderColor: 'border-green-400/30',
          bgColor: 'bg-green-400/10',
          textColor: 'text-green-400',
          glowColor: 'shadow-green-400/20'
        };
      case 'chemical':
        return {
          icon: <Zap size={24} />,
          gradient: 'from-amber-500 to-orange-600',
          borderColor: 'border-amber-400/30',
          bgColor: 'bg-amber-400/10',
          textColor: 'text-amber-400',
          glowColor: 'shadow-amber-400/20'
        };
      case 'preventive':
        return {
          icon: <Shield size={24} />,
          gradient: 'from-blue-500 to-cyan-600',
          borderColor: 'border-blue-400/30',
          bgColor: 'bg-blue-400/10',
          textColor: 'text-blue-400',
          glowColor: 'shadow-blue-400/20'
        };
      default:
        return {
          icon: <Target size={24} />,
          gradient: 'from-gray-500 to-gray-600',
          borderColor: 'border-gray-400/30',
          bgColor: 'bg-gray-400/10',
          textColor: 'text-gray-400',
          glowColor: 'shadow-gray-400/20'
        };
    }
  };

  const config = getTypeConfig(type);

  return (
    <motion.div
      className={`glassmorphism-dark p-6 rounded-2xl border ${config.borderColor} ${config.glowColor} shadow-lg`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 0 30px rgba(var(--tw-shadow-color), 0.3)'
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl ${config.bgColor} ${config.textColor}`}>
          {config.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-100">{title}</h3>
          <p className="text-sm text-gray-400 capitalize">
            {type === 'preventive' ? 'Preventive Measures' : `${type} Solutions`}
          </p>
        </div>
      </div>

      {/* Treatment Items */}
      <div className="space-y-4">
        {treatments.map((treatment, index) => (
          <motion.div
            key={index}
            className={`p-4 glassmorphism rounded-xl border ${config.borderColor} hover:${config.bgColor} transition-all duration-300`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            {/* Treatment Header */}
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-gray-100 flex-1">{treatment.name}</h4>
              <motion.div
                className={`px-2 py-1 rounded-md text-xs ${config.bgColor} ${config.textColor} border ${config.borderColor}`}
                whileHover={{ scale: 1.05 }}
              >
                {type.toUpperCase()}
              </motion.div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {treatment.description}
            </p>

            {/* Treatment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {treatment.dosage && (
                <div className="flex items-center gap-2">
                  <Droplet size={16} className={config.textColor} />
                  <div>
                    <div className="text-xs text-gray-400">Dosage</div>
                    <div className="text-sm text-gray-200">{treatment.dosage}</div>
                  </div>
                </div>
              )}

              {treatment.frequency && (
                <div className="flex items-center gap-2">
                  <Clock size={16} className={config.textColor} />
                  <div>
                    <div className="text-xs text-gray-400">Frequency</div>
                    <div className="text-sm text-gray-200">{treatment.frequency}</div>
                  </div>
                </div>
              )}

              {treatment.implementation && (
                <div className="flex items-center gap-2 md:col-span-2">
                  <Target size={16} className={config.textColor} />
                  <div>
                    <div className="text-xs text-gray-400">Implementation</div>
                    <div className="text-sm text-gray-200">{treatment.implementation}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Safety Information */}
            {treatment.safety && (
              <div className={`mt-4 p-3 rounded-lg border ${
                type === 'chemical' 
                  ? 'bg-red-500/10 border-red-500/20' 
                  : 'bg-green-500/10 border-green-500/20'
              }`}>
                <div className="flex items-start gap-2">
                  {type === 'chemical' ? (
                    <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Safety Information</div>
                    <div className={`text-sm ${
                      type === 'chemical' ? 'text-red-300' : 'text-green-300'
                    }`}>
                      {treatment.safety}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <motion.button
              className={`mt-4 w-full py-2 px-4 bg-gradient-to-r ${config.gradient} text-white rounded-lg font-medium text-sm shadow-lg`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {type === 'preventive' ? 'Implement Measure' : 'Apply Treatment'}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Type-specific Footer */}
      <motion.div
        className={`mt-6 p-4 rounded-xl ${config.bgColor} border ${config.borderColor}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {type === 'organic' && (
          <div className="flex items-center gap-2">
            <Leaf size={16} className="text-green-400" />
            <span className="text-sm text-green-300">
              🌱 Eco-friendly solutions that protect beneficial insects and soil health
            </span>
          </div>
        )}
        
        {type === 'chemical' && (
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-amber-400" />
            <span className="text-sm text-amber-300">
              ⚠️ Use protective equipment and follow label instructions carefully
            </span>
          </div>
        )}
        
        {type === 'preventive' && (
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-blue-400" />
            <span className="text-sm text-blue-300">
              🛡️ Long-term strategies to prevent future pest and disease outbreaks
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}