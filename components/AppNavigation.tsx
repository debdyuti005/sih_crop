'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  Sprout, 
  CloudRain, 
  TrendingUp, 
  Bot, 
  BarChart2,
  Menu,
  X,
  Leaf
} from 'lucide-react';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: <Home size={20} />
  },
  {
    name: 'Soil Health',
    href: '/soil-health',
    icon: <Sprout size={20} />
  },
  {
    name: 'Weather',
    href: '/weather',
    icon: <CloudRain size={20} />
  },
  {
    name: 'Market Price',
    href: '/market-price',
    icon: <TrendingUp size={20} />
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: <BarChart2 size={20} />
  },
  {
    name: 'AI Assistant',
    href: '/chatbot',
    icon: <Bot size={20} />
  }
];

export function AppNavigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed top-6 left-1/2 transform -translate-x-1/2 z-50 glassmorphism-dark px-6 py-3 rounded-2xl border border-gray-700/50">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mr-6">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Leaf className="text-white" size={16} />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              AgriWise
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 relative ${
                      isActive
                        ? 'text-green-400 bg-green-400/10 border border-green-400/20'
                        : 'text-gray-300 hover:text-green-400 hover:bg-green-400/5'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.name}</span>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl border border-green-400/30 bg-green-400/5"
                        layoutId="activeTab"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="fixed top-0 left-0 right-0 z-50 glassmorphism-dark border-b border-gray-700/50">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <Leaf className="text-white" size={16} />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                AgriWise
              </span>
            </Link>

            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg glassmorphism-dark border border-gray-700/50 text-gray-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="fixed top-16 left-0 right-0 bottom-0 z-40 glassmorphism-dark border-t border-gray-700/50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 space-y-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.div
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'text-green-400 bg-green-400/10 border border-green-400/20'
                          : 'text-gray-300 hover:text-green-400 hover:bg-green-400/5'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Spacer for mobile */}
      <div className="lg:hidden h-16" />
      {/* Spacer for desktop */}
      <div className="hidden lg:block h-20" />
    </>
  );
}