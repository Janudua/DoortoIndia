"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronLeft, Thermometer, Clock } from "lucide-react"
import Link from "next/link"

const allDestinations = {
  "taj-mahal-agra": {
    name: "Taj Mahal - Agra",
    region: "Uttar Pradesh",
    bestTime: "Oct - Mar",
    description: "The symbol of eternal love and one of the Seven Wonders of the World.",
    image: "/taj-mahal-agra.jpg",
    highlights: ["Monument", "Architecture", "Photography", "Night Visit"],
    temperature: "15°C - 30°C",
    fullDescription:
      "The Taj Mahal stands as an eternal monument to love, built by Emperor Shah Jahan for his beloved wife Mumtaz Mahal. This masterpiece of Mughal architecture showcases intricate marble inlay work, stunning dome architecture, and perfectly manicured gardens. Visit at sunrise for the most magical experience, or explore the monument under moonlight during the full moon.",
    itinerary: [
      "Day 1: Arrive in Agra, visit Taj Mahal at sunrise",
      "Day 2: Explore Agra Fort and local markets",
      "Day 3: Visit Fatehpur Sikri and return to Agra",
    ],
    price: "₹45,000 - ₹75,000 per person",
    duration: "3 days / 2 nights",
    included: ["Accommodation", "Guided tours", "Meals", "Transportation"],
  },
  "varanasi-ghats": {
    name: "Varanasi Ghats",
    region: "Uttar Pradesh",
    bestTime: "Oct - Mar",
    description: "The spiritual heart of India with ancient temples and sacred ceremonies.",
    image: "/varanasi-ganges-ghats.jpg",
    highlights: ["Temples", "Spirituality", "Culture", "Ceremonies"],
    temperature: "10°C - 32°C",
    fullDescription:
      "Varanasi is one of the world's oldest continuously inhabited cities and the spiritual epicenter of Hinduism. Witness the sacred Ganges Aarti ceremony at the ghats, visit ancient temples, and experience the profound spiritual energy that permeates this holy city. The early morning boat rides offer unforgettable views and a deep connection to Indian spirituality.",
    itinerary: [
      "Day 1: Arrive in Varanasi, boat ride on Ganges",
      "Day 2: Temple visits and Aarti ceremony",
      "Day 3: Explore local culture and ashrams",
    ],
    price: "₹35,000 - ₹55,000 per person",
    duration: "3 days / 2 nights",
    included: ["Accommodation", "Boat rides", "Guided tours", "Meals"],
  },
  "jaipur-city": {
    name: "Jaipur City",
    region: "Rajasthan",
    bestTime: "Oct - Mar",
    description: "The Pink City famous for its magnificent palaces, forts, and vibrant culture.",
    image: "/jaipur-city-palace.jpg",
    highlights: ["Palaces", "Shopping", "Culture", "Markets"],
    temperature: "12°C - 35°C",
    fullDescription:
      "Jaipur, the Pink City, is a vibrant capital known for its unique color-coded architecture, grand palaces, and lively bazaars. Explore the magnificent City Palace, climb to Nahargarh Fort for panoramic views, and shop in the bustling markets for traditional Rajasthani crafts and textiles.",
    itinerary: [
      "Day 1: City Palace and Jantar Mantar",
      "Day 2: Nahargarh Fort and local bazaars",
      "Day 3: Day trip to Amber Fort",
    ],
    price: "₹40,000 - ₹65,000 per person",
    duration: "3 days / 2 nights",
    included: ["Accommodation", "Guided tours", "Cultural experiences", "Meals"],
  },
  "jaisalmer-desert": {
    name: "Jaisalmer Desert",
    region: "Rajasthan",
    bestTime: "Oct - Mar",
    description: "Golden sand dunes, desert camels, and ancient desert forts.",
    image: "/jaisalmer-desert-sand.jpg",
    highlights: ["Desert Safari", "Camel Ride", "Dunes", "Fort"],
    temperature: "8°C - 38°C",
    fullDescription:
      "Experience the magical desert landscape of Jaisalmer with camel safaris, golden sand dunes, and the stunning Jaisalmer Fort. Spend nights in traditional desert camps under the stars, enjoy cultural performances, and immerse yourself in the authentic desert lifestyle.",
    itinerary: [
      "Day 1: Explore Jaisalmer Fort and havelis",
      "Day 2: Camel safari and desert camp night",
      "Day 3: Sand dunes and cultural activities",
    ],
    price: "₹50,000 - ₹80,000 per person",
    duration: "3 days / 2 nights",
    included: ["Desert camp accommodation", "Camel safari", "Cultural shows", "Meals"],
  },
  "kerala-backwaters": {
    name: "Kerala Backwaters",
    region: "Kerala",
    bestTime: "Aug - Mar",
    description: "Serene backwaters with palm-fringed canals, houseboats, and tropical beauty.",
    image: "/kerala-backwaters.jpg",
    highlights: ["Backwaters", "Houseboat", "Local Life", "Nature"],
    temperature: "24°C - 32°C",
    fullDescription:
      "Kerala's backwaters are a network of serene lagoons, lakes, and canals fringed with coconut palms. Experience the tranquil beauty on a traditional houseboat cruise, witness local fishing techniques, and enjoy authentic Kerala cuisine. The lush landscape and peaceful atmosphere create an unforgettable tropical paradise.",
    itinerary: [
      "Day 1: Arrive in Kochi, houseboat cruise begins",
      "Day 2: Explore Alleppey backwaters",
      "Day 3: Visit local villages and return",
    ],
    price: "₹55,000 - ₹90,000 per person",
    duration: "3 days / 2 nights",
    included: ["Houseboat accommodation", "Meals", "Guided tours", "Local experiences"],
  },
  "munnar-tea": {
    name: "Munnar Tea Gardens",
    region: "Kerala",
    bestTime: "Sep - Mar",
    description: "Picturesque tea plantations with cool climate and rolling green hills.",
    image: "/munnar-tea-plantation.jpg",
    highlights: ["Tea Plantations", "Nature", "Trekking", "Local Culture"],
    temperature: "10°C - 20°C",
    fullDescription:
      "Nestled in the Western Ghats, Munnar is famous for its sprawling tea estates and misty mountains. Trek through lush tea gardens, visit tea factories to learn about tea processing, and stay in cozy hillside resorts. The cool climate and natural beauty make it perfect for relaxation and adventure.",
    itinerary: [
      "Day 1: Arrive in Munnar, explore tea gardens",
      "Day 2: Tea factory visit and trekking",
      "Day 3: Local village visits and nature walks",
    ],
    price: "₹40,000 - ₹65,000 per person",
    duration: "3 days / 2 nights",
    included: ["Resort accommodation", "Guided tours", "Tea tasting", "Meals"],
  },
  "goa-beaches": {
    name: "Goa Beaches",
    region: "Goa",
    bestTime: "Nov - Feb",
    description: "Golden beaches, Portuguese architecture, and vibrant nightlife.",
    image: "/goa-beaches.jpg",
    highlights: ["Beaches", "Water Sports", "Nightlife", "Cuisine"],
    temperature: "20°C - 32°C",
    fullDescription:
      "Goa offers a unique blend of beach culture, Portuguese colonial heritage, and vibrant nightlife. Relax on pristine beaches, explore historic churches and fortresses, enjoy water sports, and indulge in fresh seafood at beachside shacks.",
    itinerary: [
      "Day 1: Beach relaxation and Portuguese heritage tour",
      "Day 2: Water sports and spice plantation visit",
      "Day 3: Nightlife and local cuisine exploration",
    ],
    price: "₹45,000 - ₹70,000 per person",
    duration: "3 days / 2 nights",
    included: ["Beach resort accommodation", "Water sports", "Tours", "Meals"],
  },
  "darjeeling-hills": {
    name: "Darjeeling Hills",
    region: "West Bengal",
    bestTime: "Mar - May, Sep - Nov",
    description: "Misty mountains, tea estates, and the iconic toy train rides.",
    image: "/darjeeling-hills.jpg",
    highlights: ["Tea Estates", "Toy Train", "Mountains", "Trekking"],
    temperature: "5°C - 20°C",
    fullDescription:
      "Darjeeling is a charming hill station famous for its exceptional tea, the UNESCO-listed Darjeeling Himalayan Railway (Toy Train), and stunning mountain views. Enjoy sunrise at Tiger Hill, ride the iconic toy train, and trek through misty hills.",
    itinerary: [
      "Day 1: Arrive in Darjeeling, Tiger Hill sunrise",
      "Day 2: Toy train ride and tea garden tour",
      "Day 3: Hiking and local culture exploration",
    ],
    price: "₹38,000 - ₹58,000 per person",
    duration: "3 days / 2 nights",
    included: ["Hill resort accommodation", "Toy train tickets", "Tea tasting", "Guided tours"],
  },
  "sundarbans-delta": {
    name: "Sundarbans Delta",
    region: "West Bengal",
    bestTime: "Nov - Feb",
    description: "UNESCO World Heritage Site with tigers, mangroves, and wildlife.",
    image: "/sundarbans-wildlife.jpg",
    highlights: ["Wildlife", "Tiger Safari", "Mangroves", "Backwaters"],
    temperature: "15°C - 30°C",
    fullDescription:
      "The Sundarbans is the world's largest mangrove forest and a UNESCO World Heritage Site, home to the iconic Bengal Tiger. Experience thrilling wildlife safaris, navigate through waterways by boat, and witness unique mangrove ecosystems.",
    itinerary: [
      "Day 1: Arrive in Sundarbans, boat orientation",
      "Day 2: Tiger safari and mangrove exploration",
      "Day 3: Wildlife spotting and nature walks",
    ],
    price: "₹52,000 - ₹85,000 per person",
    duration: "3 days / 2 nights",
    included: ["Safari camp accommodation", "Boat tours", "Guided safaris", "Meals"],
  },
  "himalayan-mountains": {
    name: "Himalayan Mountains",
    region: "Himachal Pradesh",
    bestTime: "Mar - Jun, Sep - Oct",
    description: "Majestic peaks, pristine valleys, and adventure activities.",
    image: "/himalayan-mountains.jpg",
    highlights: ["Trekking", "Adventure", "Nature", "Villages"],
    temperature: "5°C - 20°C",
    fullDescription:
      "The Himalayas offer breathtaking alpine scenery, challenging treks, and pristine wilderness. Explore mountain villages, experience adventure sports, and connect with nature in one of the world's most majestic mountain ranges.",
    itinerary: [
      "Day 1: Arrive in Himachal, acclimatization hike",
      "Day 2: Mountain trekking and village visits",
      "Day 3: Adventure activities and nature exploration",
    ],
    price: "₹48,000 - ₹75,000 per person",
    duration: "3 days / 2 nights",
    included: ["Mountain lodge accommodation", "Guided treks", "Meals", "Adventure equipment"],
  },
  "udaipur-palaces": {
    name: "Udaipur Palaces",
    region: "Rajasthan",
    bestTime: "Oct - Mar",
    description: "The City of Lakes with stunning palaces, temples, and romantic boat rides.",
    image: "/udaipur-palaces.jpg",
    highlights: ["Palaces", "Lakes", "Culture", "Architecture"],
    temperature: "12°C - 35°C",
    fullDescription:
      "Udaipur, the City of Lakes, is renowned for its romantic palace architecture, sparkling lakes, and vibrant culture. Stay in luxurious palace hotels, enjoy boat rides on Lake Pichola, and explore ornate temples and historic sites.",
    itinerary: [
      "Day 1: City Palace and Lake Pichola boat ride",
      "Day 2: Jagdish Temple and local bazaars",
      "Day 3: Sahelion ki Bari gardens and cultural experiences",
    ],
    price: "₹55,000 - ₹85,000 per person",
    duration: "3 days / 2 nights",
    included: ["Palace hotel accommodation", "Boat rides", "Guided tours", "Meals"],
  },
}

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams()
  const showEnquire = searchParams.get("section") === "enquire"
  const [activeTab, setActiveTab] = useState<"overview">("overview")
  const [enquireOpen, setEnquireOpen] = useState(showEnquire)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    guests: "1",
    message: "",
  })

  const destination = allDestinations[params.slug as keyof typeof allDestinations]

  if (!destination) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-muted-foreground">Destination not found</p>
        </div>
        <Footer />
      </main>
    )
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Enquiry submitted:", formData)
    alert("Thank you for your enquiry! We'll contact you soon.")
    setEnquireOpen(false)
    setFormData({ name: "", email: "", phone: "", travelDate: "", guests: "1", message: "" })
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Back Button */}
      <div className="bg-secondary text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/destinations" className="flex items-center gap-2 hover:opacity-80 transition w-fit">
            <ChevronLeft size={20} />
            Back to Destinations
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-96 overflow-hidden">
        <img
          src={destination.image || "/placeholder.svg"}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-white text-balance">{destination.name}</h1>
            <p className="text-gray-200 mt-2">{destination.region}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">About this Destination</h2>
                <p className="text-card-foreground leading-relaxed">{destination.fullDescription}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer size={20} className="text-primary" />
                    <span className="font-semibold text-foreground">Temperature</span>
                  </div>
                  <p className="text-card-foreground">{destination.temperature}</p>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={20} className="text-primary" />
                    <span className="font-semibold text-foreground">Best Time to Visit</span>
                  </div>
                  <p className="text-card-foreground">{destination.bestTime}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {destination.highlights.map((highlight, i) => (
                    <span key={i} className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg sticky top-20 space-y-4">
              <button
                onClick={() => setEnquireOpen(true)}
                className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Enquire Now
              </button>

              <div className="bg-background p-4 rounded-lg text-sm text-card-foreground">
                <p className="font-semibold text-foreground mb-2">Need Help?</p>
                <p>Contact our travel experts for personalized recommendations and special offers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquire Modal */}
      {enquireOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg max-w-md w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-secondary text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Enquire About This Tour</h2>
              <button onClick={() => setEnquireOpen(false)} className="text-2xl hover:opacity-80">
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Preferred Travel Date</label>
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Number of Guests</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold hover:bg-primary/90 transition mt-6"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
