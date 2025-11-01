"use client"

import { Star, Clock, Users } from "lucide-react"
import { useRouter } from "next/navigation"

const tours = [
  {
    id: 1,
    title: "5 Days Golden Triangle Tour",
    destination: "Delhi, Agra, Jaipur",
    rating: 4.8,
    reviews: 324,
    duration: "5 days",
    groupSize: "12 Person",
    badge: "Bestseller",
    image: "/taj-mahal-golden-triangle-india-tour.jpg",
    highlights: ["Taj Mahal", "Red Fort", "City Palace"],
  },
  {
    id: 2,
    title: "Kerala Backwaters & Beaches",
    destination: "Kochi, Alleppey, Munnar",
    rating: 4.9,
    reviews: 287,
    duration: "6 days",
    groupSize: "10 Person",
    badge: "Trending",
    image: "/kerala-backwaters-houseboat-tropical-paradise.jpg",
    highlights: ["Backwater Cruise", "Tea Plantations", "Beach Resorts"],
  },
  {
    id: 3,
    title: "Rajasthan Desert Adventure",
    destination: "Jaisalmer, Jodhpur, Udaipur",
    rating: 4.7,
    reviews: 256,
    duration: "7 days",
    groupSize: "15 Person",
    badge: "Hot Pick",
    image: "/rajasthan-fort-camel-safari-desert-golden.jpg",
    highlights: ["Desert Safari", "Ancient Forts", "Palace Hotels"],
  },
  {
    id: 4,
    title: "Himalayan Trekking Expedition",
    destination: "Himachal Pradesh & Uttarakhand",
    rating: 4.9,
    reviews: 198,
    duration: "8 days",
    groupSize: "8 Person",
    badge: "Adventure",
    image: "/himalaya-mountain-trekking-snow-peaks.jpg",
    highlights: ["Mountain Trek", "Valley Views", "Local Culture"],
  },
  {
    id: 5,
    title: "Spiritual Varanasi Journey",
    destination: "Varanasi, Bodh Gaya, Sarnath",
    rating: 4.8,
    reviews: 215,
    duration: "4 days",
    groupSize: "12 Person",
    badge: "Cultural",
    image: "/varanasi-ghats-sacred-river-spiritual-india.jpg",
    highlights: ["Ganga Aarti", "Holy Sites", "Meditation"],
  },
  {
    id: 6,
    title: "Goa Beach & Culture Escape",
    destination: "North Goa, South Goa, Panaji",
    rating: 4.7,
    reviews: 342,
    duration: "5 days",
    groupSize: "14 Person",
    badge: "Relaxation",
    image: "/goa-beach-tropical-paradise-sunset-coastline.jpg",
    highlights: ["Beach Clubs", "Water Sports", "Local Cuisine"],
  },
]

export default function FeaturedTours() {
  const router = useRouter()

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
          {tours.map((tour) => (
            <div key={tour.id} className="group cursor-pointer">
              {/* Image */}
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <img
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {tour.badge}
                </div>
                <div className="absolute top-4 right-4 bg-white text-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star size={14} className="text-yellow-400" />
                  {tour.rating}
                </div>
              </div>

              {/* Content */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">{tour.destination}</p>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition">
                  {tour.title}
                </h3>

                {/* Details */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock size={16} className="text-primary" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} className="text-primary" />
                    {tour.groupSize}
                  </div>
                </div>

                {/* Rating */}
                <p className="text-xs text-muted-foreground mb-4">({tour.reviews} reviews)</p>

                <div className="flex justify-end">
                  <button className="bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition">→</button>
                </div>
              </div>
            </div>
          ))}
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
