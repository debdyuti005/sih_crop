'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud } from 'lucide-react';

interface SoilInputModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SoilInputModal({ isOpen, onClose }: SoilInputModalProps) {
    const [activeTab, setActiveTab] = useState('manual');

    if (!isOpen) return null;

    const TabButton = ({ id, label }: { id: string; label: string }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === id 
                ? 'bg-slate-700/50 text-green-400 border-b-2 border-green-400' 
                : 'text-slate-400 hover:bg-slate-800/50'
            }`}
        >
            {label}
        </button>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="glassmorphism-dark w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-700"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-slate-700">
                            <h2 className="text-xl font-bold text-white">Upload Soil Data</h2>
                            <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-700/50 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-2 border-b border-slate-800">
                            <div className="flex space-x-1">
                                <TabButton id="manual" label="Manual Entry" />
                                <TabButton id="csv" label="Upload CSV" />
                                <TabButton id="image" label="Upload Report Image" />
                            </div>
                        </div>

                        <div className="p-6">
                            {activeTab === 'manual' && (
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input 
                                          type="text" 
                                          placeholder="Field Name" 
                                          className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500" 
                                        />
                                        <select className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500">
                                            <option>Select Soil Type</option>
                                            <option>Loamy</option>
                                            <option>Clay</option>
                                            <option>Sandy</option>
                                            <option>Alluvial</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <input 
                                          type="number" 
                                          placeholder="Soil pH" 
                                          className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500" 
                                        />
                                        <input 
                                          type="number" 
                                          placeholder="Moisture (%)" 
                                          className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500" 
                                        />
                                        <input 
                                          type="number" 
                                          placeholder="Organic Matter (%)" 
                                          className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500" 
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <input 
                                          type="number" 
                                          placeholder="Nitrogen (N)" 
                                          className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500" 
                                        />
                                        <input 
                                          type="number" 
                                          placeholder="Phosphorus (P)" 
                                          className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500" 
                                        />
                                        <input 
                                          type="number" 
                                          placeholder="Potassium (K)" 
                                          className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500" 
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-4 pt-4">
                                        <button 
                                          type="button" 
                                          className="liquid-glass-dark px-4 py-2 hover:bg-slate-700/80"
                                        >
                                          Save to Profile
                                        </button>
                                        <button 
                                          type="submit" 
                                          className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-500 transition-all duration-300 glow-effect-dark"
                                        >
                                          Analyze Now
                                        </button>
                                    </div>
                                </form>
                            )}
                             {activeTab === 'csv' && (
                                <div className="text-center">
                                    <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 flex flex-col items-center justify-center space-y-3">
                                        <UploadCloud className="w-12 h-12 text-slate-500" />
                                        <p className="text-slate-300">Drag & drop your CSV file here</p>
                                        <p className="text-slate-500 text-sm">or</p>
                                        <button className="bg-slate-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-600">
                                          Browse Files
                                        </button>
                                    </div>
                                    <a href="#" className="text-sm text-green-400 hover:underline mt-4 inline-block">
                                      Download sample CSV template
                                    </a>
                                </div>
                            )}
                            {activeTab === 'image' && (
                                 <div className="text-center">
                                    <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 flex flex-col items-center justify-center space-y-3">
                                        <UploadCloud className="w-12 h-12 text-slate-500" />
                                        <p className="text-slate-300">Upload an image of your soil test report</p>
                                        <p className="text-slate-500 text-sm">Our AI will try to read it (feature coming soon)</p>
                                        <button className="bg-slate-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-600">
                                          Upload Image
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}