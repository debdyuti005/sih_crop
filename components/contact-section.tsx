"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Get in</span>
            <br />
            <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to revolutionize your farming practices? Contact us today to learn more about our AI-powered
            agricultural solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="liquid-glass p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="glassmorphism border-border/50 focus:border-primary"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="glassmorphism border-border/50 focus:border-primary"
                    placeholder="Your phone number"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="glassmorphism border-border/50 focus:border-primary"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="glassmorphism border-border/50 focus:border-primary min-h-32"
                  placeholder="Tell us about your farming needs..."
                  required
                />
              </div>
              <Button type="submit" className="w-full glow-effect bg-primary hover:bg-primary/90">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We're here to help you transform your farming practices with our AI-powered solutions. Reach out to us
                through any of the following channels.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  content: "support@smartcropadvisory.com",
                  description: "Send us an email anytime",
                },
                {
                  icon: Phone,
                  title: "Phone",
                  content: "+1 (555) 123-4567",
                  description: "24/7 support hotline",
                },
                {
                  icon: MapPin,
                  title: "Address",
                  content: "123 Agriculture Tech Hub, Farm City, FC 12345",
                  description: "Visit our headquarters",
                },
              ].map((contact, index) => (
                <Card key={index} className="glassmorphism p-6 group hover:scale-105 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <contact.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-1">{contact.title}</h4>
                      <p className="text-foreground font-medium mb-1">{contact.content}</p>
                      <p className="text-sm text-muted-foreground">{contact.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="glassmorphism p-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <Button variant="outline" className="w-full liquid-glass justify-start bg-transparent">
                  Schedule a Demo
                </Button>
                <Button variant="outline" className="w-full liquid-glass justify-start bg-transparent">
                  Download Brochure
                </Button>
                <Button variant="outline" className="w-full liquid-glass justify-start bg-transparent">
                  Join Newsletter
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
