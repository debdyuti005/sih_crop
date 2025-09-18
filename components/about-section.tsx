"use client"

import { Card } from "@/components/ui/card"
import { Target, Heart, Lightbulb, Users } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span className="text-foreground">About</span>
            <br />
            <span className="gradient-text">AgriWise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We are dedicated to empowering small and marginal farmers with cutting-edge AI technology, making modern
            agricultural practices accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">Our Mission</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              To bridge the technology gap in agriculture by providing intelligent, accessible, and affordable solutions
              that help farmers make data-driven decisions, increase productivity, and improve their livelihoods.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe that every farmer, regardless of their size or resources, deserves access to the same advanced
              agricultural intelligence that large commercial operations use.
            </p>
          </div>
          <div className="glassmorphism rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                <div className="text-sm text-muted-foreground">Farmers Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-chart-3 mb-2">35%</div>
                <div className="text-sm text-muted-foreground">Avg. Yield Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-chart-4 mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">AI Support</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Target,
              title: "Precision Agriculture",
              description:
                "Leveraging AI and data analytics to provide precise, actionable insights for optimal crop management.",
            },
            {
              icon: Heart,
              title: "Farmer-Centric",
              description:
                "Every feature is designed with the farmer in mind, ensuring ease of use and practical value.",
            },
            {
              icon: Lightbulb,
              title: "Innovation",
              description: "Continuously evolving our platform with the latest agricultural technology and research.",
            },
            {
              icon: Users,
              title: "Community",
              description: "Building a supportive community of farmers sharing knowledge and best practices.",
            },
          ].map((value, index) => (
            <Card
              key={index}
              className="liquid-glass p-6 text-center group hover:scale-105 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-3">{value.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
