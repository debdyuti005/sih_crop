'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, X, MapPin, Calendar, Leaf, Loader2 } from 'lucide-react';

interface ImageUploadCardProps {
  onImageUpload: (imageDataUrl: string) => void;
  uploadedImage: string | null;
  isAnalyzing: boolean;
}

export function ImageUploadCard({ onImageUpload, uploadedImage, isAnalyzing }: ImageUploadCardProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [cropName, setCropName] = useState('');
  const [location, setLocation] = useState('');
  const [cropStage, setCropStage] = useState('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageUpload(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageUpload(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    onImageUpload('');
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <motion.div
        className={`glassmorphism-dark p-8 rounded-2xl border-2 border-dashed transition-all duration-300 ${
          isDragOver
            ? 'border-green-400/50 bg-green-400/5'
            : uploadedImage
            ? 'border-green-400/30'
            : 'border-gray-600/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {uploadedImage ? (
            <motion.div
              key="image-preview"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-xl border border-gray-700/50">
                <img
                  src={uploadedImage}
                  alt="Uploaded crop image"
                  className="w-full h-64 object-cover"
                />
                
                {/* Analysis Overlay */}
                {isAnalyzing && (
                  <motion.div
                    className="absolute inset-0 bg-black/60 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-center space-y-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="flex justify-center"
                      >
                        <Loader2 className="w-8 h-8 text-green-400" />
                      </motion.div>
                      <div className="text-white">
                        <div className="font-semibold">Analyzing Image...</div>
                        <div className="text-sm text-gray-300">AI is detecting pests & diseases</div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Remove Button */}
                {!isAnalyzing && (
                  <button
                    onClick={clearImage}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              {!isAnalyzing && (
                <div className="mt-4 text-center">
                  <p className="text-green-400 font-medium">Image uploaded successfully!</p>
                  <p className="text-gray-400 text-sm">AI analysis will begin automatically</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="upload-prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-6"
            >
              {/* Upload Icon */}
              <motion.div
                className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center transition-colors ${
                  isDragOver 
                    ? 'bg-green-400/20 text-green-400' 
                    : 'bg-gray-800/50 text-gray-400'
                }`}
                animate={isDragOver ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, repeat: isDragOver ? Infinity : 0 }}
              >
                <Upload size={32} />
              </motion.div>
              
              {/* Upload Text */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-100">
                  Upload Crop Image
                </h3>
                <p className="text-gray-400">
                  Drag and drop your crop image here, or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Supports JPG, PNG • Max file size: 10MB
                </p>
              </div>
              
              {/* Upload Button */}
              <div className="space-y-4">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <motion.div
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium shadow-lg glow-effect"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Camera size={20} />
                    Select Image
                  </motion.div>
                </label>
                
                <div className="text-xs text-gray-500">
                  Or use camera to take a photo
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Optional Crop Information */}
      <motion.div
        className="glassmorphism-dark p-6 rounded-2xl border border-gray-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h4 className="text-lg font-semibold text-gray-100 mb-4">
          Additional Information (Optional)
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <Leaf size={16} />
              Crop Name
            </label>
            <input
              type="text"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              placeholder="e.g., Tomato, Wheat"
              className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:border-green-400 focus:outline-none transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <MapPin size={16} />
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Delhi, Punjab"
              className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:border-green-400 focus:outline-none transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <Calendar size={16} />
              Growth Stage
            </label>
            <select
              value={cropStage}
              onChange={(e) => setCropStage(e.target.value)}
              className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 focus:border-green-400 focus:outline-none transition-colors"
            >
              <option value="">Select stage</option>
              <option value="seedling">Seedling</option>
              <option value="vegetative">Vegetative</option>
              <option value="flowering">Flowering</option>
              <option value="fruiting">Fruiting</option>
              <option value="maturity">Maturity</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-300">
            💡 <strong>Tip:</strong> Providing crop details helps our AI give more accurate treatment recommendations
          </p>
        </div>
      </motion.div>
    </div>
  );
}