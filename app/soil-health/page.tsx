'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
    PieChart, Pie, Cell
} from 'recharts';
import { Download, UploadCloud, Leaf, Droplets, FlaskConical, Tractor, BarChart2, FileText, Bot, Sun, ChevronDown, ChevronRight, X, AlertTriangle, MessageSquare, Clipboard, Check } from 'lucide-react';
import { SoilOverviewCard } from '@/components/soil-health/SoilOverviewCard';
import { SoilInputModal } from '@/components/soil-health/SoilInputModal';
import { RecommendationCard } from '@/components/soil-health/RecommendationCard';
import { SoilCharts } from '@/components/soil-health/SoilCharts';
import { ReportDownloadButton } from '@/components/soil-health/ReportDownloadButton';

// Mock Data for UI demonstration
const MOCK_SOIL_DATA = {
  fieldId: "field-001",
  fieldName: "North Plot",
  date: "2025-09-17",
  soilIndex: 82, // Increased for a better score
  ph: 6.8,
  moisture: 28,
  organicMatter: 3.1,
  n: 140, // Nitrogen (kg/ha)
  p: 25,  // Phosphorus (kg/ha)
  k: 280, // Potassium (kg/ha)
  soilType: "Loamy",
  history: [
    {"date":"2025-06-01","soilIndex":75,"ph":6.5,"moisture":25,"n":120,"p":22,"k":250},
    {"date":"2025-03-01","soilIndex":70,"ph":6.2,"moisture":22,"n":110,"p":18,"k":230},
    {"date":"2024-12-01","soilIndex":65,"ph":6.0,"moisture":20,"n":100,"p":15,"k":210},
    {"date":"2024-09-01","soilIndex":62,"ph":5.8,"moisture":19,"n":95,"p":14,"k":200}
  ]
};

// Helper function to determine pH status
const getPhStatus = (ph: number) => {
    // Business Logic: pH < 6.5 is Acidic, 6.5-7.5 is Neutral, > 7.5 is Alkaline
    if (ph < 6.5) return { text: "Acidic", color: "bg-yellow-500/20 text-yellow-300" };
    if (ph >= 6.5 && ph <= 7.5) return { text: "Neutral", color: "bg-green-500/20 text-green-300" };
    return { text: "Alkaline", color: "bg-sky-500/20 text-sky-300" };
};

// Helper function to get NPK status
const getNpkStatus = (value: number, nutrient: string) => {
    // Business Logic for NPK levels (example thresholds in kg/ha)
    const thresholds: Record<string, { low: number; high: number }> = {
        n: { low: 100, high: 150 },
        p: { low: 20, high: 30 },
        k: { low: 200, high: 300 }
    };
    if (value < thresholds[nutrient].low) return { text: "Low", color: "bg-red-500/20 text-red-300" };
    if (value >= thresholds[nutrient].low && value <= thresholds[nutrient].high) return { text: "Optimal", color: "bg-green-500/20 text-green-300" };
    return { text: "High", color: "bg-yellow-500/20 text-yellow-300" };
}

const IconWrapper = ({ icon: Icon, className }: { icon: any; className: string }) => (
    <div className={`p-2 rounded-full ${className}`}>
        <Icon className="w-6 h-6" />
    </div>
);

export default function SoilHealthPage() {
    const [soilData, setSoilData] = useState(MOCK_SOIL_DATA);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const reportRef = useRef<HTMLDivElement>(null);

    const phStatus = getPhStatus(soilData.ph);

    // Any value outside safe limits triggers an alert
    const showAlert = soilData.ph < 6.0 || soilData.ph > 8.0 || soilData.n < 80;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1E1E1E] text-slate-300 p-4 sm:p-6 lg:p-8">
            <SoilInputModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            
            {/* Header */}
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold gradient-text-dark">Soil Health Analysis</h1>
                    <p className="text-slate-400 mt-1">Comprehensive recommendations for your field conditions.</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <ReportDownloadButton reportRef={reportRef} />
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center space-x-2
                                   transition-all duration-300 hover:scale-105 glow-effect-dark"
                    >
                        <UploadCloud size={18} />
                        <span>Upload Soil Data</span>
                    </button>
                </div>
            </header>

            <main ref={reportRef} className="p-4 bg-transparent">
                 {/* Alert Banner */}
                <AnimatePresence>
                {showAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-red-900/50 border border-red-500/70 rounded-xl p-4 mb-6 flex items-start space-x-3 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                    >
                        <AlertTriangle className="text-red-400 h-8 w-8 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-red-300 text-lg">Urgent Action Required!</h3>
                            <p className="text-red-300/90">One or more soil parameters are outside the safe limits. Immediate corrective action is recommended to prevent yield loss. Check recommendations below for details.</p>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* Top Row: Soil Status Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <SoilOverviewCard title="Soil Health Index" value={soilData.soilIndex} unit="/ 100" icon={<IconWrapper icon={BarChart2} className="bg-green-500/20 text-green-300" />}>
                        <div className="w-full bg-slate-700/50 rounded-full h-2.5">
                            <div className="bg-gradient-to-r from-green-500 to-green-400 h-2.5 rounded-full" style={{ width: `${soilData.soilIndex}%` }}></div>
                        </div>
                    </SoilOverviewCard>

                    <SoilOverviewCard title="Soil pH" value={soilData.ph} status={phStatus} icon={<IconWrapper icon={FlaskConical} className="bg-yellow-500/20 text-yellow-300" />}>
                        <p className="text-xs text-slate-400">Ideal range: 6.5 - 7.5</p>
                    </SoilOverviewCard>

                    <SoilOverviewCard title="Moisture" value={soilData.moisture} unit="%" icon={<IconWrapper icon={Droplets} className="bg-sky-500/20 text-sky-300" />}>
                         <div className="w-full bg-slate-700/50 rounded-full h-2.5">
                            <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: `${soilData.moisture * 2}%` }}></div>
                        </div>
                    </SoilOverviewCard>
                    
                    <SoilOverviewCard title="NPK Levels (kg/ha)" value={`${soilData.n}/${soilData.p}/${soilData.k}`} icon={<IconWrapper icon={Leaf} className="bg-purple-500/20 text-purple-300" />}>
                        <div className="flex space-x-2 text-xs">
                           <span className={`px-2 py-1 rounded-full ${getNpkStatus(soilData.n, 'n').color}`}>N: {getNpkStatus(soilData.n, 'n').text}</span>
                           <span className={`px-2 py-1 rounded-full ${getNpkStatus(soilData.p, 'p').color}`}>P: {getNpkStatus(soilData.p, 'p').text}</span>
                           <span className={`px-2 py-1 rounded-full ${getNpkStatus(soilData.k, 'k').color}`}>K: {getNpkStatus(soilData.k, 'k').text}</span>
                        </div>
                    </SoilOverviewCard>
                </div>
                
                {/* AI Recommendations */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4 flex items-center space-x-3">
                        <Bot className="text-green-400" size={32}/>
                        <span className="gradient-text-dark">AgriWise Recommendation Center</span>
                    </h2>
                    <div className="space-y-4">
                        <RecommendationCard icon={<Leaf />} title="Fertilizer Guidance">
                            <p>Based on your soil&apos;s NPK levels, we recommend the following application per acre:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li><strong>Urea (Nitrogen):</strong> Apply 45 kg. Your Nitrogen is optimal, so this is a maintenance dose.</li>
                                <li><strong>DAP (Phosphorus):</strong> Apply 20 kg. Phosphorus levels are good.</li>
                                <li><strong>MOP (Potassium):</strong> Apply 35 kg. Your Potassium is sufficient for most crops.</li>
                                <li><strong>Organic Matter:</strong> Consider adding 2 tons of farmyard manure to further improve soil structure.</li>
                            </ul>
                        </RecommendationCard>
                        <RecommendationCard icon={<Tractor />} title="Crop Suitability">
                             <p>Your loamy soil with neutral pH is excellent for a variety of crops. Top 3 suitable crops for the upcoming season:</p>
                             <ul className="list-decimal pl-5 mt-2 space-y-1">
                                <li><strong>Maize:</strong> High suitability. Expected yield: 2.5-3.0 tons/acre. Sowing window: June-July.</li>
                                <li><strong>Soybean:</strong> Good suitability. Helps in nitrogen fixation. Expected yield: 0.8-1.0 tons/acre.</li>
                                <li><strong>Wheat (Rabi season):</strong> Excellent choice for the winter season.</li>
                             </ul>
                        </RecommendationCard>
                         <RecommendationCard icon={<Sun />} title="Soil Enrichment & pH Correction">
                             <p>Your soil pH of {soilData.ph} is in the ideal neutral range. No corrective action for pH is needed at this time.</p>
                             <p className="mt-2">To maintain and improve organic matter, consider planting a cover crop like Clover or Sunn Hemp post-harvest.</p>
                        </RecommendationCard>
                    </div>
                </div>

                {/* Charts */}
                <div>
                     <h2 className="text-3xl font-bold mb-4 flex items-center space-x-3">
                        <BarChart2 className="text-sky-400" size={32}/>
                        <span className="gradient-text-dark">Data Visualization</span>
                    </h2>
                    <SoilCharts data={soilData} />
                </div>
                
                {/* History Table */}
                 <div className="mt-8">
                    <h2 className="text-3xl font-bold mb-4 flex items-center space-x-3">
                        <FileText className="text-yellow-400" size={32}/>
                        <span className="gradient-text-dark">Test History</span>
                    </h2>
                    <div className="glassmorphism-dark overflow-x-auto scrollbar-hide">
                        <table className="w-full text-left">
                            <thead className="border-b border-slate-700">
                                <tr>
                                    <th className="p-4 font-semibold text-slate-300">Date</th>
                                    <th className="p-4 font-semibold text-slate-300">Soil Index</th>
                                    <th className="p-4 font-semibold text-slate-300">pH</th>
                                    <th className="p-4 font-semibold text-slate-300">Moisture (%)</th>
                                    <th className="p-4 font-semibold text-slate-300">N (kg/ha)</th>
                                    <th className="p-4 font-semibold text-slate-300">P (kg/ha)</th>
                                    <th className="p-4 font-semibold text-slate-300">K (kg/ha)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {soilData.history.map((record, index) => (
                                    <tr key={index} className="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
                                        <td className="p-4">{record.date}</td>
                                        <td className="p-4">{record.soilIndex}</td>
                                        <td className="p-4">{record.ph}</td>
                                        <td className="p-4">{record.moisture}</td>
                                        <td className="p-4">{record.n}</td>
                                        <td className="p-4">{record.p}</td>
                                        <td className="p-4">{record.k}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </div>
    );
}