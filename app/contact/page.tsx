"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Mail, Phone, MapPin, Send, MessageCircle, ChevronDown } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [expandedFAQ, setExpandedFAQ] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    alert("Thank you for your message! We'll get back to you soon.")
  }

  const faqs = [
    {
      id: 1,
      question: "What makes Door to India different from other travel companies?",
      answer:
        "We focus on authenticity with comfort. Each itinerary is personally curated to combine India's cultural richness with refined, hassle-free experiences. No generic group tours — only handcrafted journeys that match your interests, pace, and style.",
    },
    {
      id: 2,
      question: "Do you provide customized or private tours?",
      answer:
        "Yes. Every Door to India journey is 100% customizable. Whether you prefer a private guide, luxury accommodations, or specific cultural themes, our travel specialists design each itinerary around your needs.",
    },
    {
      id: 3,
      question: "Is Door to India suitable for first-time visitors to India?",
      answer:
        "Absolutely. We specialize in hosting international travelers who may be visiting India for the first time. From airport transfers and private drivers to bilingual guides, we handle every detail to ensure your journey is comfortable and stress-free.",
    },
    {
      id: 4,
      question: "What safety measures do you take for international travelers?",
      answer:
        "Safety is our top priority. We partner only with verified hotels, licensed drivers, and experienced licensed guides. Our on-ground team provides 24/7 assistance throughout your trip, ensuring smooth travel and complete peace of mind.",
    },
    {
      id: 5,
      question: "What types of experiences do you offer?",
      answer:
        "Our tours cover everything from cultural heritage and wellness retreats to luxury escapes and offbeat adventures. Whether you want to explore royal Rajasthan, spiritual Varanasi, or serene Kerala, we tailor each experience to your travel goals.",
    },
    {
      id: 6,
      question: "Can I make special requests for dietary, mobility, or religious preferences?",
      answer:
        "Yes, of course. We respect and accommodate all dietary needs, accessibility concerns, and cultural sensitivities. Just inform our travel consultant during booking, and we'll tailor every detail accordingly.",
    },
    {
      id: 7,
      question: "How far in advance should I book my trip?",
      answer:
        "For peak seasons (October to March), we recommend booking at least 6–8 weeks in advance to secure premium accommodations and guides. However, we can also arrange short-notice travel depending on availability.",
    },
    {
      id: 8,
      question: "Do you handle visas, flights, or travel insurance?",
      answer:
        "We provide complete guidance on visa applications and can assist with flight arrangements upon request. While we don't issue visas or insurance directly, we connect you with trusted partners to make the process easy.",
    },
    {
      id: 9,
      question: "What payment methods do you accept?",
      answer:
        "We accept international credit cards, bank transfers, and secure online payments in multiple currencies. A detailed invoice and payment link are shared once your itinerary is finalized.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-balance mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-200">
            Have questions? We'd love to hear from you. Contact us for personalized travel assistance.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Phone */}
          <div className="bg-card p-6 sm:p-8 rounded-lg shadow-lg text-center">
            <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Phone</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-2">+91 86073 05777</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Available 24/7</p>
          </div>

          {/* Email */}
          <div className="bg-card p-6 sm:p-8 rounded-lg shadow-lg text-center">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Email</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-2">info@doortoindia.in</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Response within 24 hours</p>
          </div>

          <div className="bg-card p-6 sm:p-8 rounded-lg shadow-lg text-center">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">WhatsApp</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-2">+91 86073 05777</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Quick responses</p>
          </div>

          {/* Office */}
          <div className="bg-card p-6 sm:p-8 rounded-lg shadow-lg text-center">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Office</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-2">New Delhi, India</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Chhatarpur</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tour inquiry, booking help, etc."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tell us more about your travel plans..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-primary/90 transition flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>

          {/* Additional Info */}
          <div className="bg-secondary text-white p-6 sm:p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6">Why Choose Door to India?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold mb-1">Expert Guides</h4>
                  <p className="text-sm text-gray-200">Knowledgeable local guides with years of experience</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold mb-1">Customized Tours</h4>
                  <p className="text-sm text-gray-200">Tailor-made itineraries based on your preferences</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold mb-1">Best Value</h4>
                  <p className="text-sm text-gray-200">Competitive prices with premium quality service</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold mb-1">24/7 Support</h4>
                  <p className="text-sm text-gray-200">Round-the-clock assistance during your journey</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold mb-1">Quality Services</h4>
                  <p className="text-sm text-gray-200">Consistent high-quality experiences at every touchpoint</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold mb-1">Sustainable Travel</h4>
                  <p className="text-sm text-gray-200">Eco-friendly practices supporting local communities</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-8 border-t border-gray-400">
              <p className="text-sm text-gray-200 mb-4">
                <strong>Still have questions?</strong> Check out our FAQ below.
              </p>
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === -1 ? null : -1)}
                className="w-full bg-accent text-secondary px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-accent/90 transition"
              >
                View FAQ
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-card border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-muted/50 transition"
                >
                  <h3 className="text-left font-semibold text-sm sm:text-base text-foreground">{faq.question}</h3>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-primary transition-transform ${
                      expandedFAQ === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-border">
                    <p className="text-sm sm:text-base text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
