"use client"

import { MapPin, Users, Award } from "lucide-react"
import { useRouter } from "next/navigation"

export default function About() {
  const router = useRouter()

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="/indian-family-traveling-taj-mahal-cultural-experie.jpg"
              alt="Travel experience in India"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute bottom-6 left-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
              <p className="text-lg font-semibold text-foreground italic">
                "Step Through the Door to unlock India's untold stories"
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest">EXPLORE THE WORLD</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-6">
              Great Opportunity For Adventure & Travels
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Welcome to Door to India, your gateway to authentic experiences across this diverse continent. We are a
              professional and trusted travel company offering expertly curated journeys to travelers from around the
              world.
            </p>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10">
                    <MapPin className="text-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Trusted Travel Guide</h3>
                  <p className="text-muted-foreground">9+ years of experience crafting memorable journeys</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-accent/10">
                    <Users className="text-accent" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Personalized Trips</h3>
                  <p className="text-muted-foreground">Customized itineraries tailored to your interests</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-secondary/10">
                    <Award className="text-secondary" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Award Winning Service</h3>
                  <p className="text-muted-foreground">Recognized for excellence in travel planning</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push("/about")}
              className="mt-8 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
