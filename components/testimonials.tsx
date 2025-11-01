"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "USA",
    image: "/woman-portrait-happy-traveler.jpg",
    rating: 5,
    text: "Door to India made my dream trip a reality! The attention to detail and personalized service was exceptional. I felt like a local experiencing authentic India.",
    tour: "Golden Triangle Tour",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Canada",
    image: "/man-portrait-smiling-traveler.jpg",
    rating: 5,
    text: "Best travel experience ever! The guides were knowledgeable, the accommodations were perfect, and the itinerary was well-planned. Highly recommended!",
    tour: "Himalayan Trekking",
  },
  {
    id: 3,
    name: "Emma Wilson",
    location: "UK",
    image: "/woman-portrait-traveler-enjoying.jpg",
    rating: 4.5,
    text: "Amazing journey through Kerala! The backwater cruise was unforgettable. Door to India truly understands what travelers need.",
    tour: "Kerala Backwaters Tour",
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest">WHAT TRAVELERS SAY</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-3">Our Happy Travelers</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(testimonial.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>

              <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
              <p className="text-sm font-semibold text-primary">{testimonial.tour}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
