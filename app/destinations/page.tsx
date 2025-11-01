"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { Thermometer, Users } from "lucide-react"

const destinationsByRegion = {
  "North India": [
    {
      id: "taj-mahal-agra",
      slug: "taj-mahal-agra",
      name: "Taj Mahal - Agra",
      region: "Uttar Pradesh",
      bestTime: "Oct - Mar",
      description: "The symbol of eternal love and one of the Seven Wonders of the World.",
      image: "/taj-mahal-agra.jpg",
      highlights: ["Monument", "Architecture", "Photography", "Night Visit"],
      temperature: "15°C - 30°C",
    },
    {
      id: "varanasi-ghats",
      slug: "varanasi-ghats",
      name: "Varanasi Ghats",
      region: "Uttar Pradesh",
      bestTime: "Oct - Mar",
      description: "The spiritual heart of India with ancient temples and sacred ceremonies.",
      image: "/varanasi-ganges-ghats.jpg",
      highlights: ["Temples", "Spirituality", "Culture", "Ceremonies"],
      temperature: "10°C - 32°C",
    },
    {
      id: "jaipur-city",
      slug: "jaipur-city",
      name: "Jaipur City",
      region: "Rajasthan",
      bestTime: "Oct - Mar",
      description: "The Pink City famous for its magnificent palaces, forts, and vibrant culture.",
      image: "/jaipur-city-palace.jpg",
      highlights: ["Palaces", "Shopping", "Culture", "Markets"],
      temperature: "12°C - 35°C",
    },
    {
      id: "jaisalmer-desert",
      slug: "jaisalmer-desert",
      name: "Jaisalmer Desert",
      region: "Rajasthan",
      bestTime: "Oct - Mar",
      description: "Golden sand dunes, desert camels, and ancient desert forts.",
      image: "/jaisalmer-desert-sand.jpg",
      highlights: ["Desert Safari", "Camel Ride", "Dunes", "Fort"],
      temperature: "8°C - 38°C",
    },
  ],
  "South India": [
    {
      id: "kerala-backwaters",
      slug: "kerala-backwaters",
      name: "Kerala Backwaters",
      region: "Kerala",
      bestTime: "Aug - Mar",
      description: "Serene backwaters with palm-fringed canals, houseboats, and tropical beauty.",
      image: "/kerala-backwaters.jpg",
      highlights: ["Backwaters", "Houseboat", "Local Life", "Nature"],
      temperature: "24°C - 32°C",
    },
    {
      id: "munnar-tea",
      slug: "munnar-tea",
      name: "Munnar Tea Gardens",
      region: "Kerala",
      bestTime: "Sep - Mar",
      description: "Picturesque tea plantations with cool climate and rolling green hills.",
      image: "/munnar-tea-plantation.jpg",
      highlights: ["Tea Plantations", "Nature", "Trekking", "Local Culture"],
      temperature: "10°C - 20°C",
    },
    {
      id: "goa-beaches",
      slug: "goa-beaches",
      name: "Goa Beaches",
      region: "Goa",
      bestTime: "Nov - Feb",
      description: "Golden beaches, Portuguese architecture, and vibrant nightlife.",
      image: "/goa-beaches.jpg",
      highlights: ["Beaches", "Water Sports", "Nightlife", "Cuisine"],
      temperature: "20°C - 32°C",
    },
  ],
  "East India": [
    {
      id: "darjeeling-hills",
      slug: "darjeeling-hills",
      name: "Darjeeling Hills",
      region: "West Bengal",
      bestTime: "Mar - May, Sep - Nov",
      description: "Misty mountains, tea estates, and the iconic toy train rides.",
      image: "/darjeeling-hills.jpg",
      highlights: ["Tea Estates", "Toy Train", "Mountains", "Trekking"],
      temperature: "5°C - 20°C",
    },
    {
      id: "sundarbans-delta",
      slug: "sundarbans-delta",
      name: "Sundarbans Delta",
      region: "West Bengal",
      bestTime: "Nov - Feb",
      description: "UNESCO World Heritage Site with tigers, mangroves, and wildlife.",
      image: "/sundarbans-wildlife.jpg",
      highlights: ["Wildlife", "Tiger Safari", "Mangroves", "Backwaters"],
      temperature: "15°C - 30°C",
    },
  ],
  "West India": [
    {
      id: "himalayan-mountains",
      slug: "himalayan-mountains",
      name: "Himalayan Mountains",
      region: "Himachal Pradesh",
      bestTime: "Mar - Jun, Sep - Oct",
      description: "Majestic peaks, pristine valleys, and adventure activities.",
      image: "/himalayan-mountains.jpg",
      highlights: ["Trekking", "Adventure", "Nature", "Villages"],
      temperature: "5°C - 20°C",
    },
    {
      id: "udaipur-palaces",
      slug: "udaipur-palaces",
      name: "Udaipur Palaces",
      region: "Rajasthan",
      bestTime: "Oct - Mar",
      description: "The City of Lakes with stunning palaces, temples, and romantic boat rides.",
      image: "/udaipur-palaces.jpg",
      highlights: ["Palaces", "Lakes", "Culture", "Architecture"],
      temperature: "12°C - 35°C",
    },
  ],
}

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-balance mb-4">Explore India's Destinations</h1>
          <p className="text-lg text-gray-200">
            Discover the beauty, culture, and adventure across India's most iconic destinations.
          </p>
        </div>
      </section>

      {Object.entries(destinationsByRegion).map(([region, destinations]) => (
        <section key={region} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">{region}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <div className="grid sm:grid-cols-2 gap-0">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="w-full h-64 sm:h-full object-cover"
                  />
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{destination.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{destination.region}</p>
                      <p className="text-sm text-card-foreground mb-4">{destination.description}</p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Thermometer size={16} className="text-primary" />
                          <span className="text-muted-foreground">{destination.temperature}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users size={16} className="text-primary" />
                          <span className="text-muted-foreground">Best: {destination.bestTime}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {destination.highlights.map((highlight, i) => (
                          <span key={i} className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                            {highlight}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <Link
                          href={`/destinations/${destination.slug}`}
                          className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition text-center"
                        >
                          View
                        </Link>
                        <Link
                          href={`/destinations/${destination.slug}?section=enquire`}
                          className="flex-1 border-2 border-primary text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary/10 transition text-center"
                        >
                          Enquire Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <Footer />
    </main>
  )
}
