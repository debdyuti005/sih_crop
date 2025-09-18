'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SoilOverviewCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  unit?: string;
  status?: {
    text: string;
    color: string;
  };
  children?: ReactNode;
}

export function SoilOverviewCard({ icon, title, value, unit, status, children, ...props }: SoilOverviewCardProps) {
  return (
    <motion.div 
        className="glassmorphism-dark p-4 flex flex-col justify-between hover:border-green-400/80 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...props}
    >
        <div>
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-300">{title}</h3>
                {icon}
            </div>
            <p className="text-4xl font-bold text-white">
              {value}
              {unit && <span className="text-lg font-medium text-slate-400 ml-1">{unit}</span>}
            </p>
            {status && (
              <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${status.color}`}>
                {status.text}
              </span>
            )}
        </div>
        {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
}