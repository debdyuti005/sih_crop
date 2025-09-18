'use client';

import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
    PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#4CAF50', '#FFD54F', '#81D4FA', '#F472B6'];

interface SoilData {
  fieldId: string;
  fieldName: string;
  date: string;
  soilIndex: number;
  ph: number;
  moisture: number;
  organicMatter: number;
  n: number;
  p: number;
  k: number;
  soilType: string;
  history: Array<{
    date: string;
    soilIndex: number;
    ph: number;
    moisture: number;
    n: number;
    p: number;
    k: number;
  }>;
}

interface SoilChartsProps {
  data: SoilData;
}

export function SoilCharts({ data }: SoilChartsProps) {
    const npkData = [
        { subject: 'Nitrogen', A: data.n, fullMark: 200 },
        { subject: 'Phosphorus', A: data.p * 5, fullMark: 200 }, // Scale P for better visualization
        { subject: 'Potassium', A: data.k, fullMark: 350 }, // Scale K
    ];
    
    const soilTypeData = [
        { name: 'Loamy', value: 70 },
        { name: 'Clay', value: 20 },
        { name: 'Sandy', value: 10 },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="glassmorphism-dark p-4 h-[400px]">
                <h3 className="text-lg font-semibold mb-4 text-slate-200">Soil Health Trend</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.history.slice().reverse()} margin={{ top: 5, right: 20, left: -10, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2C" />
                        <XAxis dataKey="date" stroke="#B0BEC5" />
                        <YAxis stroke="#B0BEC5" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1E1E1E', 
                            border: '1px solid #2C2C2C',
                            borderRadius: '8px'
                          }} 
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="soilIndex" 
                          name="Soil Index" 
                          stroke="#4CAF50" 
                          strokeWidth={2} 
                          dot={{ r: 4 }} 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="moisture" 
                          name="Moisture %" 
                          stroke="#81D4FA" 
                          strokeWidth={2} 
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
            <div className="glassmorphism-dark p-4 h-[400px]">
                 <h3 className="text-lg font-semibold mb-4 text-slate-200">Nutrient Balance (NPK)</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={npkData}>
                        <PolarGrid stroke="#2C2C2C" />
                        <PolarAngleAxis dataKey="subject" stroke="#F5F5F5" />
                        <PolarRadiusAxis angle={30} domain={[0, 'dataMax + 50']} stroke="#B0BEC5" />
                        <Radar 
                          name={data.fieldName} 
                          dataKey="A" 
                          stroke="#FFD54F" 
                          fill="#FFD54F" 
                          fillOpacity={0.6} 
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1E1E1E', 
                            border: '1px solid #2C2C2C',
                            borderRadius: '8px'
                          }} 
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            
             <div className="glassmorphism-dark p-4 h-[400px] col-span-1 lg:col-span-2">
                <h3 className="text-lg font-semibold mb-4 text-slate-200">Soil Type Distribution (Farm-wide)</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={soilTypeData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {soilTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1E1E1E', 
                            border: '1px solid #2C2C2C',
                            borderRadius: '8px'
                          }} 
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}