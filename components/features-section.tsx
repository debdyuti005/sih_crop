"use client"

import { Card } from "@/components/ui/card"
import { MessageSquare, Leaf, CloudRain, Bug, TrendingUp, Mic, BarChart3, Globe } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: MessageSquare,
    title: "AI-Powered Chatbot",
    description:
      "Multilingual AI assistant providing real-time, location-specific crop advisory with voice support for low-literate users.",
    gradient: "from-blue-500 to-purple-600",
    link: "/chatbot",
  },
  {
    icon: Leaf,
    title: "Soil Health Analysis",
    description:
      "Comprehensive soil health recommendations and personalized fertilizer guidance based on your field conditions.",
    gradient: "from-green-500 to-emerald-600",
    link: "/soil-health",
  },
  {
    icon: CloudRain,
    title: "Weather Intelligence",
    description: "Advanced weather-based alerts and predictive insights to help you make informed farming decisions.",
    gradient: "from-cyan-500 to-blue-600",
    link: "/weather",
  },
  {
    icon: Bug,
    title: "Pest & Disease Detection",
    description:
      "Upload crop images for instant AI-powered pest and disease identification with treatment recommendations.",
    gradient: "from-red-500 to-pink-600",
    link: "/pest-disease",
  },
  {
    icon: TrendingUp,
    title: "Market Price Tracking",
    description: "Real-time market price updates and trends to help you sell your crops at the best possible prices.",
    gradient: "from-yellow-500 to-orange-600",
    link: "/marketprice",
  },
  {
    icon: Mic,
    title: "Voice Support",
    description: "Complete voice interaction support designed specifically for farmers with limited literacy.",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive analytics and insights to track your farming progress and optimize yields.",
    gradient: "from-indigo-500 to-purple-600",
    link: "/analytics",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Available in multiple local languages to ensure accessibility for farmers across different regions.",
    gradient: "from-teal-500 to-green-600",
  },
]

export function FeaturesSection() {

  return (
    <section id="features" className="py-20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Powerful Features</span>
            <br />
            <span className="text-foreground">for Smart Farming</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our comprehensive suite of AI-powered tools is designed to transform traditional farming practices and
            empower farmers with cutting-edge technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            if ((feature as any).link) {
              return (
                <Link key={index} href={(feature as any).link} className="block h-full">
                  <Card className="group liquid-glass hover:scale-105 transition-all duration-300 p-6 relative overflow-hidden cursor-pointer h-full flex flex-col">
                    {/* Gradient Background Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} p-3 mb-4 relative z-10 flex-shrink-0`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-white transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-gray-200 transition-colors flex-1">
                        {feature.description}
                      </p>
                      <div className="mt-3 text-xs text-muted-foreground group-hover:text-gray-300 transition-colors">
                        Click to explore →
                      </div>
                    </div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Card>
                </Link>
              );
            } else {
              return (
                <div key={index}>
                  <Card className="group liquid-glass hover:scale-105 transition-all duration-300 p-6 relative overflow-hidden cursor-default h-full flex flex-col">
                    {/* Gradient Background Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} p-3 mb-4 relative z-10 flex-shrink-0`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-white transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-gray-200 transition-colors flex-1">
                        {feature.description}
                      </p>
                      <div className="mt-3 text-xs text-gray-500">
                        Coming Soon
                      </div>
                    </div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Card>
                </div>
              );
            }
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glassmorphism rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Transform Your Farming?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of farmers who are already using our AI-powered platform to increase their yields and
              profits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all glow-effect">
                Start Free Trial
              </button>
              <button className="px-8 py-3 liquid-glass text-foreground rounded-lg font-medium transition-all">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
