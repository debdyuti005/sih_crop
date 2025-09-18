'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Brain,
  Target,
  Zap,
  ArrowRight,
  X,
  Bookmark,
  Share2,
  Eye,
  EyeOff
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  message: string;
  value?: string;
  icon: any;
  color: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  dismissed?: boolean;
}

interface AISuggestion {
  id: string;
  title: string;
  description: string;
  impact: string;
  confidence: number;
  category: 'cost-reduction' | 'yield-improvement' | 'efficiency' | 'sustainability';
  actionRequired: boolean;
  estimatedSavings?: number;
  timeToImplement: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface AIInsightsCardProps {
  alerts: Alert[];
  suggestions: AISuggestion[];
  onAlertDismiss: (alertId: string) => void;
  onSuggestionSave: (suggestionId: string) => void;
}

const CATEGORY_CONFIG = {
  'cost-reduction': {
    color: 'yellow',
    icon: TrendingDown,
    label: 'Cost Reduction'
  },
  'yield-improvement': {
    color: 'green', 
    icon: TrendingUp,
    label: 'Yield Improvement'
  },
  'efficiency': {
    color: 'blue',
    icon: Zap,
    label: 'Efficiency'
  },
  'sustainability': {
    color: 'purple',
    icon: Activity,
    label: 'Sustainability'
  }
};

const PRIORITY_CONFIG = {
  high: { color: 'red', pulse: true },
  medium: { color: 'yellow', pulse: false },
  low: { color: 'green', pulse: false }
};

export function AIInsightsCard({ 
  alerts, 
  suggestions, 
  onAlertDismiss, 
  onSuggestionSave 
}: AIInsightsCardProps) {
  const [activeTab, setActiveTab] = useState<'alerts' | 'suggestions'>('alerts');
  const [filteredCategory, setFilteredCategory] = useState<string>('all');
  const [showDismissed, setShowDismissed] = useState(false);

  const activeAlerts = alerts.filter(alert => showDismissed || !alert.dismissed);
  const filteredSuggestions = suggestions.filter(suggestion => 
    filteredCategory === 'all' || suggestion.category === filteredCategory
  );

  const getAlertIcon = (alert: Alert) => {
    const IconComponent = alert.icon;
    return <IconComponent className={`w-5 h-5 text-${alert.color}-400`} />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">AI Insights</h2>
          </div>
          
          <div className="flex bg-white/5 rounded-lg p-1">
            <Button
              variant={activeTab === 'alerts' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('alerts')}
              className={activeTab === 'alerts' 
                ? 'bg-red-600/20 text-red-300 hover:bg-red-600/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Alerts ({activeAlerts.length})
            </Button>
            <Button
              variant={activeTab === 'suggestions' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('suggestions')}
              className={activeTab === 'suggestions' 
                ? 'bg-green-600/20 text-green-300 hover:bg-green-600/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Suggestions ({suggestions.length})
            </Button>
          </div>
        </div>

        {activeTab === 'alerts' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDismissed(!showDismissed)}
            className="text-gray-400 hover:text-white"
          >
            {showDismissed ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
            {showDismissed ? 'Hide Dismissed' : 'Show All'}
          </Button>
        )}

        {activeTab === 'suggestions' && (
          <div className="flex items-center gap-2">
            <select
              value={filteredCategory}
              onChange={(e) => setFilteredCategory(e.target.value)}
              className="glassmorphism-dark border border-white/20 rounded-lg px-3 py-1 text-sm text-white bg-transparent"
            >
              <option value="all">All Categories</option>
              {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'alerts' ? (
          <motion.div
            key="alerts"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {activeAlerts.length === 0 ? (
              <Card className="glassmorphism-dark border-white/10 p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">All Clear!</h3>
                <p className="text-gray-400">No active alerts at the moment.</p>
              </Card>
            ) : (
              activeAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`glassmorphism-dark border-${alert.color}-500/30 p-4 relative overflow-hidden ${
                    PRIORITY_CONFIG[alert.priority].pulse ? 'animate-pulse' : ''
                  }`}>
                    <div className={`absolute inset-0 bg-gradient-to-r from-${alert.color}-500/10 to-transparent`} />
                    
                    <div className="flex items-start gap-3 relative z-10">
                      <div className={`p-2 bg-${alert.color}-500/20 rounded-lg flex-shrink-0`}>
                        {getAlertIcon(alert)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-white">{alert.title}</h4>
                            <Badge 
                              variant="secondary" 
                              className={`bg-${PRIORITY_CONFIG[alert.priority].color}-500/20 text-${PRIORITY_CONFIG[alert.priority].color}-300 px-2 py-1`}
                            >
                              {alert.priority}
                            </Badge>
                          </div>
                          
                          {alert.value && (
                            <span className={`text-sm font-bold text-${alert.color}-400 flex-shrink-0`}>
                              {alert.value}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-400 text-sm mb-3">{alert.message}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {alert.timestamp.toLocaleString()}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onAlertDismiss(alert.id)}
                              className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        ) : (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            {filteredSuggestions.map((suggestion, index) => {
              const categoryConfig = CATEGORY_CONFIG[suggestion.category];
              const IconComponent = categoryConfig.icon;
              
              return (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`glassmorphism-dark border-${categoryConfig.color}-500/30 p-4 relative overflow-hidden group hover:scale-[1.02] transition-all cursor-pointer`}>
                    <div className={`absolute inset-0 bg-gradient-to-r from-${categoryConfig.color}-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
                    
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 bg-${categoryConfig.color}-500/20 rounded-lg`}>
                            <IconComponent className={`w-5 h-5 text-${categoryConfig.color}-400`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white group-hover:text-green-300 transition-colors">
                              {suggestion.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge 
                                variant="secondary" 
                                className={`bg-${categoryConfig.color}-500/20 text-${categoryConfig.color}-300 text-xs px-2 py-1`}
                              >
                                {categoryConfig.label}
                              </Badge>
                              <Badge 
                                variant="secondary" 
                                className={`${
                                  suggestion.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                                  suggestion.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                  'bg-red-500/20 text-red-300'
                                } text-xs px-2 py-1`}
                              >
                                {suggestion.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-green-400">
                          <Target className="w-3 h-3" />
                          {suggestion.confidence}%
                        </div>
                      </div>
                      
                      {/* Content */}
                      <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                        {suggestion.description}
                      </p>
                      
                      {/* Impact & Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="text-xs text-gray-400 mb-1">Impact</div>
                          <div className="text-sm font-medium text-green-300">
                            {suggestion.impact}
                          </div>
                        </div>
                        
                        {suggestion.estimatedSavings && (
                          <div className="bg-white/5 rounded-lg p-3">
                            <div className="text-xs text-gray-400 mb-1">Est. Savings</div>
                            <div className="text-sm font-medium text-yellow-300">
                              {formatCurrency(suggestion.estimatedSavings)}
                            </div>
                          </div>
                        )}
                        
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="text-xs text-gray-400 mb-1">Time to Implement</div>
                          <div className="text-sm font-medium text-cyan-300">
                            {suggestion.timeToImplement}
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {suggestion.actionRequired && (
                            <Badge variant="secondary" className="bg-red-500/20 text-red-300 text-xs px-2 py-1">
                              Action Required
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onSuggestionSave(suggestion.id)}
                            className="text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10"
                          >
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white hover:bg-white/10"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
            
            {filteredSuggestions.length === 0 && (
              <Card className="glassmorphism-dark border-white/10 p-8 text-center">
                <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Suggestions</h3>
                <p className="text-gray-400">No AI suggestions available for the selected category.</p>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}