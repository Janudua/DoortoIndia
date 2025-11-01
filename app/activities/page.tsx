"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowRight, Mountain, Waves, Users, Flame } from "lucide-react"

const activities = [
  {
    id: 1,
    title: "Mountain Trekking",
    description: "Explore the majestic Himalayas and experience breathtaking mountain landscapes",
    icon: Mountain,
    image: "/himalayan-mountains-trekking.jpg",
    color: "from-blue-500 to-teal-500",
    delay: "0s",
  },
  {
    id: 2,
    title: "Water Sports",
    description: "Enjoy thrilling water adventures in pristine lakes and rivers across India",
    icon: Waves,
    image: "/water-sports-kerala-backwaters.jpg",
    color: "from-cyan-500 to-blue-500",
    delay: "0.1s",
  },
  {
    id: 3,
    title: "Cultural Experiences",
    description: "Immerse yourself in India's rich heritage through local traditions and festivals",
    icon: Users,
    image: "/indian-cultural-festival-celebrations.jpg",
    color: "from-orange-500 to-red-500",
    delay: "0.2s",
  },
  {
    id: 4,
    title: "Spiritual Journeys",
    description: "Connect with your inner self through meditation and spiritual retreats",
    icon: Flame,
    image: "/spiritual-yoga-meditation-ashram.jpg",
    color: "from-purple-500 to-pink-500",
    delay: "0.3s",
  },
  {
    id: 5,
    title: "Wildlife Safari",
    description: "Encounter exotic wildlife in India's national parks and sanctuaries",
    icon: Mountain,
    image: "/tiger-wildlife-safari-jungle.jpg",
    color: "from-emerald-500 to-green-500",
    delay: "0.4s",
  },
  {
    id: 6,
    title: "Culinary Tours",
    description: "Taste authentic Indian cuisine and learn traditional cooking techniques",
    icon: Flame,
    image: "/indian-spices-cooking-market.jpg",
    color: "from-amber-500 to-orange-500",
    delay: "0.5s",
  },
]

export default function ActivitiesPage() {
  const router = useRouter()
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Unforgettable <span className="text-primary">Experiences</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the diverse range of activities and adventures waiting for you across India. From mountain treks
              to spiritual journeys, we have something for every traveler.
            </p>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => {
              const IconComponent = activity.icon
              return (
                <div
                  key={activity.id}
                  className="activity-card group"
                  style={
                    {
                      "--animation-delay": activity.delay,
                    } as React.CSSProperties
                  }
                  onMouseEnter={() => setHoveredId(activity.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="relative bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                      <img
                        src={activity.image || "/placeholder.svg"}
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${activity.color}`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="font-serif text-xl font-semibold text-foreground">{activity.title}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">{activity.description}</p>
                      </div>

                      {/* CTA */}
                      <button className="mt-4 flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group/btn">
                        Explore
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Hover Border Animation */}
                    <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90">
            Let us help you plan the perfect itinerary tailored to your interests and preferences.
          </p>
          <button
            onClick={() => router.push("/contact")}
            className="w-full sm:w-auto bg-background text-primary px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-muted transition-colors duration-300 text-sm sm:text-base"
          >
            Start Planning
          </button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
