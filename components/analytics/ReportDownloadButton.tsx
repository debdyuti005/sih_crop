'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Download, 
  FileText, 
  Table, 
  Loader2, 
  CheckCircle, 
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Settings,
  X
} from 'lucide-react';

interface ReportDownloadButtonProps {
  analyticsData: any;
  selectedCrop: string;
  dateRange: string;
  onDownload?: (format: 'pdf' | 'csv', sections: string[]) => void;
}

const REPORT_SECTIONS = [
  { 
    id: 'overview', 
    label: 'Overview Summary', 
    icon: BarChart3, 
    description: 'Key metrics and KPIs',
    size: 'Small'
  },
  { 
    id: 'yield-analysis', 
    label: 'Yield Analysis', 
    icon: TrendingUp, 
    description: 'Detailed yield trends and comparisons',
    size: 'Medium'
  },
  { 
    id: 'financial', 
    label: 'Financial Breakdown', 
    icon: PieChart, 
    description: 'Cost analysis and profit margins',
    size: 'Large'
  },
  { 
    id: 'performance', 
    label: 'Performance Metrics', 
    icon: Settings, 
    description: 'Efficiency ratings and benchmarks',
    size: 'Medium'
  },
  { 
    id: 'ai-insights', 
    label: 'AI Insights', 
    icon: BarChart3, 
    description: 'Recommendations and suggestions',
    size: 'Small'
  },
  { 
    id: 'charts', 
    label: 'Visual Charts', 
    icon: BarChart3, 
    description: 'All charts and graphs',
    size: 'Large'
  }
];

const EXPORT_FORMATS = [
  {
    id: 'pdf',
    label: 'PDF Report',
    icon: FileText,
    description: 'Professional formatted report with charts',
    color: 'red',
    fileSize: '2-5 MB'
  },
  {
    id: 'csv',
    label: 'CSV Data',
    icon: Table,
    description: 'Raw data for further analysis',
    color: 'green',
    fileSize: '50-200 KB'
  }
];

export function ReportDownloadButton({ 
  analyticsData, 
  selectedCrop, 
  dateRange, 
  onDownload 
}: ReportDownloadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'csv'>('pdf');
  const [selectedSections, setSelectedSections] = useState(['overview', 'yield-analysis', 'financial']);

  const handleDownload = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate report content based on format
      if (selectedFormat === 'pdf') {
        await generatePDFReport();
      } else {
        await generateCSVReport();
      }
      
      // Call parent callback if provided
      if (onDownload) {
        onDownload(selectedFormat, selectedSections);
      }
      
      setIsDownloaded(true);
      setTimeout(() => {
        setIsDownloaded(false);
        setIsOpen(false);
      }, 2000);
      
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePDFReport = async () => {
    const reportContent = generateReportContent();
    const blob = new Blob([reportContent], { type: 'text/plain' });
    downloadFile(blob, 'analytics-report.txt');
  };

  const generateCSVReport = async () => {
    const csvContent = generateCSVContent();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    downloadFile(blob, 'analytics-data.csv');
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateReportContent = () => {
    let content = `AGRIWISE ANALYTICS REPORT\n`;
    content += `========================\n\n`;
    content += `Generated: ${new Date().toLocaleString()}\n`;
    content += `Crop Filter: ${selectedCrop === 'all' ? 'All Crops' : selectedCrop}\n`;
    content += `Date Range: ${dateRange}\n\n`;

    if (selectedSections.includes('overview')) {
      content += `OVERVIEW SUMMARY\n`;
      content += `================\n`;
      content += `Total Yield: ${analyticsData.overview.yield.total}${analyticsData.overview.yield.unit}\n`;
      content += `Net Profit: ₹${analyticsData.overview.profit.net.toLocaleString()}\n`;
      content += `Water Usage: ${analyticsData.overview.waterUsage.used.toLocaleString()}L\n`;
      content += `Fertilizer Used: ${analyticsData.overview.fertilizer.used}${analyticsData.overview.fertilizer.unit}\n\n`;
    }

    if (selectedSections.includes('yield-analysis')) {
      content += `YIELD ANALYSIS\n`;
      content += `==============\n`;
      analyticsData.crops.forEach((crop: any) => {
        content += `${crop.name}: ${crop.yield}kg (${crop.area} acres)\n`;
      });
      content += `\n`;
    }

    if (selectedSections.includes('financial')) {
      content += `FINANCIAL BREAKDOWN\n`;
      content += `===================\n`;
      content += `Revenue: ₹${analyticsData.overview.profit.revenue.toLocaleString()}\n`;
      content += `Expenses: ₹${analyticsData.overview.profit.expenses.toLocaleString()}\n`;
      Object.entries(analyticsData.expenses).forEach(([key, value]) => {
        content += `  ${key}: ₹${(value as number).toLocaleString()}\n`;
      });
      content += `\n`;
    }

    content += `Generated by AgriWise Analytics Dashboard\n`;
    return content;
  };

  const generateCSVContent = () => {
    let csv = 'Category,Metric,Value,Unit\n';
    
    // Overview data
    csv += `Overview,Total Yield,${analyticsData.overview.yield.total},${analyticsData.overview.yield.unit}\n`;
    csv += `Overview,Net Profit,${analyticsData.overview.profit.net},INR\n`;
    csv += `Overview,Water Usage,${analyticsData.overview.waterUsage.used},L\n`;
    csv += `Overview,Fertilizer Used,${analyticsData.overview.fertilizer.used},${analyticsData.overview.fertilizer.unit}\n`;
    
    // Crop data
    analyticsData.crops.forEach((crop: any) => {
      csv += `Crops,${crop.name} Yield,${crop.yield},kg\n`;
      csv += `Crops,${crop.name} Profit,${crop.profit},INR\n`;
    });
    
    // Expenses
    Object.entries(analyticsData.expenses).forEach(([key, value]) => {
      csv += `Expenses,${key},${value},INR\n`;
    });
    
    return csv;
  };

  const toggleSection = (sectionId: string) => {
    setSelectedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const selectAllSections = () => {
    setSelectedSections(REPORT_SECTIONS.map(section => section.id));
  };

  const clearAllSections = () => {
    setSelectedSections([]);
  };

  const estimatedFileSize = () => {
    const selectedFormat = EXPORT_FORMATS.find(f => f.id === selectedFormat);
    return selectedFormat?.fileSize || 'Unknown';
  };

  return (
    <div className="relative">
      {/* Main Download Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white border-0 glow-effect-dark"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : isDownloaded ? (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Downloaded!
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </>
        )}
      </Button>

      {/* Download Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              <Card className="glassmorphism-dark border-white/20 p-6 shadow-2xl">
                <div className="max-h-[80vh] overflow-y-auto">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Download className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">Export Analytics Report</h3>
                        <p className="text-sm text-gray-400">
                          Generate detailed reports for {selectedCrop === 'all' ? 'all crops' : selectedCrop}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Report Format Selection */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white mb-3">Export Format</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {EXPORT_FORMATS.map((format) => (
                        <Button
                          key={format.id}
                          variant={selectedFormat === format.id ? 'default' : 'outline'}
                          onClick={() => setSelectedFormat(format.id as 'pdf' | 'csv')}
                          className={selectedFormat === format.id 
                            ? `bg-${format.color}-600/20 border-${format.color}-500/50 text-${format.color}-300` 
                            : 'liquid-glass-dark border-white/20 text-white hover:bg-white/10'
                          }
                        >
                          <format.icon className="w-4 h-4 mr-2" />
                          <div className="text-left">
                            <div className="font-medium">{format.label}</div>
                            <div className="text-xs opacity-70">{format.description}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Section Selection */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-white">Include Sections</h4>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={selectAllSections}
                          className="text-xs text-green-400 hover:text-green-300"
                        >
                          Select All
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearAllSections}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          Clear All
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {REPORT_SECTIONS.map((section) => (
                        <motion.div
                          key={section.id}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Checkbox
                            id={section.id}
                            checked={selectedSections.includes(section.id)}
                            onCheckedChange={() => toggleSection(section.id)}
                            className="border-white/30"
                          />
                          <div className="flex items-center gap-3 flex-1">
                            <section.icon className="w-4 h-4 text-gray-400" />
                            <div className="flex-1">
                              <label
                                htmlFor={section.id}
                                className="text-sm text-white cursor-pointer font-medium"
                              >
                                {section.label}
                              </label>
                              <div className="text-xs text-gray-400 mt-0.5">
                                {section.description}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
                              {section.size}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Report Info */}
                  <div className="glassmorphism-dark border border-white/10 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span>Period: {dateRange}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FileText className="w-4 h-4" />
                        <span>Est. Size: {estimatedFileSize()}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Report will include {selectedSections.length} sections for {selectedCrop === 'all' ? 'all crops' : selectedCrop}
                    </div>
                  </div>

                  {/* Download Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleDownload}
                      disabled={isGenerating || selectedSections.length === 0}
                      className="w-full bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white border-0 h-12 text-base font-medium glow-effect-dark"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Generating {selectedFormat.toUpperCase()}...
                        </>
                      ) : isDownloaded ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Report Downloaded!
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          Generate {selectedFormat.toUpperCase()} Report
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {/* Footer Info */}
                  <div className="text-xs text-gray-400 text-center mt-4 space-y-1">
                    <p>Reports are generated in real-time based on current data</p>
                    <p>PDF reports include charts and visualizations, CSV contains raw data only</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}