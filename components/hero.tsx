"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

const slides = [
  {
    title: "DISCOVER INDIA'S GOLDEN TEMPLES",
    subtitle: "Step Through the Door",
    image: "/golden-temple-india-architecture-spiritual.jpg",
    description: "Experience the spiritual heart of India with our curated temple tours",
  },
  {
    title: "TREK THE HIMALAYAS",
    subtitle: "Adventure Awaits",
    image: "/himalayan-mountains-trekking-nature-landscape.jpg",
    description: "Explore majestic peaks and pristine valleys in the roof of the world",
  },
  {
    title: "EMBRACE THE DESERT",
    subtitle: "Rajasthan's Magic",
    image: "/rajasthan-desert-camel-safari-golden-sand-dunes.jpg",
    description: "Witness stunning sunsets over the Thar Desert with ancient forts",
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-dark-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-start">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
          <div className="max-w-2xl">
            <div className="mb-6">
              <span className="text-primary text-lg font-semibold italic">{slides[current].subtitle}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              {slides[current].title}
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-xl">{slides[current].description}</p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => router.push("/destinations")}
                className="bg-primary text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-primary/90 transition flex items-center gap-2 text-sm sm:text-base"
              >
                LET'S GET STARTED
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-8 right-8 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1 rounded-full transition-all ${index === current ? "bg-primary w-12" : "bg-white/30 w-2"}`}
          />
        ))}
      </div>

      {/* Next Slide Button */}
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 bg-primary/80 hover:bg-primary text-white p-3 rounded-full transition"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  )
}
