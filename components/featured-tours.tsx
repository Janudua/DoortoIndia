"use client"

import { Star, Clock, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useData } from "@/contexts/data-context"

export default function FeaturedTours() {
  const { tours } = useData()
  const router = useRouter()

  // Get featured tours (limit to 6 for homepage)
  const featuredTours = tours.filter(tour => tour.featured).slice(0, 6)

  return (
    <section id="tours" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest">FEATURED TOURS</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-3">Amazing Tour Packages Across India</h2>
        </div>

        {/* Tours Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground text-lg">No featured tours available. Please add tours in the admin panel.</p>
            </div>
          ) : (
            featuredTours.map((tour) => (
              <div key={tour.id} className="group cursor-pointer">
                {/* Image */}
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img
                    src={tour.image || "/placeholder.svg"}
                    alt={tour.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {tour.category}
                  </div>
                  {tour.videoUrl && (
                    <div className="absolute top-4 right-4 bg-white text-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      📹 Video
                    </div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition">
                    {tour.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tour.description}</p>

                  {/* Details */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock size={16} className="text-primary" />
                      {tour.duration}
                    </div>
                  </div>

                  {/* Price */}
                  <p className="text-lg font-bold text-primary mb-4">₹{tour.price.toLocaleString()}</p>

                  <div className="flex justify-end">
                    <button className="bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition">→</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* View All */}
        <div className="text-center mt-16">
          <button
            onClick={() => router.push("/tours")}
            className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition"
          >
            View All Tours
          </button>
        </div>
      </div>
    </section>
  )
}
