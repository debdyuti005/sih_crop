'use client';

import { motion } from 'framer-motion';
import { 
  Bug, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  TrendingUp,
  Shield,
  Activity
} from 'lucide-react';

interface Diagnosis {
  pestName: string;
  pestType: 'pest' | 'disease';
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  affectedArea: number;
  description: string;
  symptoms: string[];
}

interface DiagnosisCardProps {
  diagnosis: Diagnosis;
}

export function DiagnosisCard({ diagnosis }: DiagnosisCardProps) {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'low':
        return {
          color: 'text-green-400',
          bg: 'bg-green-400/20',
          border: 'border-green-400/30',
          glow: 'shadow-green-400/20',
          icon: <CheckCircle size={20} />
        };
      case 'medium':
        return {
          color: 'text-amber-400',
          bg: 'bg-amber-400/20',
          border: 'border-amber-400/30',
          glow: 'shadow-amber-400/20',
          icon: <AlertTriangle size={20} />
        };
      case 'high':
        return {
          color: 'text-red-400',
          bg: 'bg-red-400/20',
          border: 'border-red-400/30',
          glow: 'shadow-red-400/20',
          icon: <AlertTriangle size={20} />
        };
      default:
        return {
          color: 'text-gray-400',
          bg: 'bg-gray-400/20',
          border: 'border-gray-400/30',
          glow: 'shadow-gray-400/20',
          icon: <Bug size={20} />
        };
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const severityConfig = getSeverityConfig(diagnosis.severity);

  return (
    <motion.div
      className={`glassmorphism-dark p-6 rounded-2xl border-2 ${severityConfig.border} shadow-xl ${severityConfig.glow}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${severityConfig.bg} ${severityConfig.color}`}>
            {diagnosis.pestType === 'pest' ? <Bug size={24} /> : <Shield size={24} />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-100">{diagnosis.pestName}</h3>
            <p className="text-sm text-gray-400 capitalize">{diagnosis.pestType} Detection</p>
          </div>
        </div>
        
        <motion.div
          className={`px-4 py-2 rounded-xl border ${severityConfig.border} ${severityConfig.bg}`}
          animate={{ 
            boxShadow: diagnosis.severity === 'high' 
              ? ['0 0 0 0 rgba(239, 68, 68, 0.4)', '0 0 0 10px rgba(239, 68, 68, 0)', '0 0 0 0 rgba(239, 68, 68, 0.4)']
              : undefined
          }}
          transition={{ duration: 2, repeat: diagnosis.severity === 'high' ? Infinity : 0 }}
        >
          <div className="flex items-center gap-2">
            {severityConfig.icon}
            <span className={`font-semibold capitalize ${severityConfig.color}`}>
              {diagnosis.severity} Severity
            </span>
          </div>
        </motion.div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Confidence Score */}
        <div className="glassmorphism p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-blue-400" size={20} />
            <span className="text-sm text-gray-400">AI Confidence</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${getConfidenceColor(diagnosis.confidence)}`}>
              {diagnosis.confidence}%
            </span>
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  diagnosis.confidence >= 80 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                    : diagnosis.confidence >= 60 
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500'
                    : 'bg-gradient-to-r from-red-400 to-red-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${diagnosis.confidence}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Affected Area */}
        <div className="glassmorphism p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-purple-400" size={20} />
            <span className="text-sm text-gray-400">Affected Area</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-purple-400">{diagnosis.affectedArea}%</span>
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${diagnosis.affectedArea}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Risk Level */}
        <div className="glassmorphism p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className={severityConfig.color} size={20} />
            <span className="text-sm text-gray-400">Risk Level</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold capitalize ${severityConfig.color}`}>
              {diagnosis.severity}
            </span>
            <motion.div
              className={`w-3 h-3 rounded-full ${severityConfig.bg}`}
              animate={{ 
                scale: diagnosis.severity === 'high' ? [1, 1.5, 1] : 1,
                opacity: diagnosis.severity === 'high' ? [1, 0.7, 1] : 1 
              }}
              transition={{ 
                duration: 1.5, 
                repeat: diagnosis.severity === 'high' ? Infinity : 0 
              }}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-100 mb-3">Description</h4>
        <p className="text-gray-300 leading-relaxed">{diagnosis.description}</p>
      </div>

      {/* Symptoms */}
      <div>
        <h4 className="text-lg font-semibold text-gray-100 mb-3">Observed Symptoms</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {diagnosis.symptoms.map((symptom, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 p-3 glassmorphism rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className={`w-2 h-2 rounded-full ${severityConfig.bg}`} />
              <span className="text-gray-300 text-sm">{symptom}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action Required Banner */}
      {diagnosis.severity === 'high' && (
        <motion.div
          className="mt-6 p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-400" size={20} />
            <span className="text-red-400 font-semibold">Immediate Action Required</span>
          </div>
          <p className="text-red-300 text-sm mt-1">
            High severity detection. Please implement treatment recommendations immediately to prevent crop damage.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}