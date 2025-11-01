"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Star, MapPin, Clock, Users } from "lucide-react"

const toursData = [
  {
    id: 1,
    name: "Golden Triangle Explorer",
    destination: "Delhi, Agra, Jaipur",
    duration: "5 Days",
    groupSize: "2-12 People",
    rating: 4.8,
    reviews: 234,
    image: "/taj-mahal-golden-triangle.jpg",
    description: "Experience the iconic trio of India's most famous destinations",
    highlights: ["Taj Mahal", "Agra Fort", "City Palace", "Hawa Mahal"],
    category: "Cultural Tours",
  },
  {
    id: 2,
    name: "Kerala Backwaters Bliss",
    destination: "Kochi, Alleppey, Munnar",
    duration: "6 Days",
    groupSize: "2-10 People",
    rating: 4.9,
    reviews: 189,
    image: "/kerala-backwaters-houseboat.jpg",
    description: "Explore the lush green backwaters and spice plantations",
    highlights: ["Houseboat Cruise", "Munnar Tea Gardens", "Spice Market", "Beach Resorts"],
    category: "Beach Tours",
  },
  {
    id: 3,
    name: "Rajasthan Desert Adventure",
    destination: "Jodhpur, Jaisalmer, Bikaner",
    duration: "7 Days",
    groupSize: "2-15 People",
    rating: 4.7,
    reviews: 156,
    image: "/rajasthan-desert-camel-safari.jpg",
    description: "Adventure through the golden sands and magnificent forts",
    highlights: ["Camel Safari", "Mehrangarh Fort", "Desert Camping", "Sand Dunes"],
    category: "Adventure Tours",
  },
  {
    id: 4,
    name: "Himalayan Mountain Trek",
    destination: "Himachal Pradesh",
    duration: "8 Days",
    groupSize: "2-8 People",
    rating: 4.9,
    reviews: 112,
    image: "/himalayan-mountains-trek.jpg",
    description: "Trek through stunning alpine meadows and pristine peaks",
    highlights: ["Mountain Trekking", "Paragliding", "Local Villages", "Snow Views"],
    category: "Adventure Tours",
  },
  {
    id: 5,
    name: "Goa Beach Paradise",
    destination: "Goa",
    duration: "4 Days",
    groupSize: "2-20 People",
    rating: 4.6,
    reviews: 298,
    image: "/goa-beaches-sunset.jpg",
    description: "Relax on pristine beaches with vibrant nightlife",
    highlights: ["Beach Relaxation", "Water Sports", "Local Cuisine", "Portuguese Forts"],
    category: "Beach Tours",
  },
  {
    id: 6,
    name: "Spiritual India Journey",
    destination: "Varanasi, Ayodhya, Mathura",
    duration: "5 Days",
    groupSize: "2-10 People",
    rating: 4.8,
    reviews: 167,
    image: "/varanasi-spiritual-temples.jpg",
    description: "Discover the spiritual heart of India",
    highlights: ["Temple Tours", "Ghat Ceremonies", "Meditation", "Ashram Visits"],
    category: "Pilgrimage Tours",
  },
  {
    id: 7,
    name: "Romantic Shimla Escape",
    destination: "Shimla, Manali",
    duration: "5 Days",
    groupSize: "2 People",
    rating: 4.9,
    reviews: 145,
    image: "/shimla-manali-honeymoon.jpg",
    description: "A romantic getaway in the picturesque Himalayan hill stations",
    highlights: ["Scenic Drives", "Couple Spa", "Mountain Views", "Romantic Dinners"],
    category: "Honeymoon Tours",
  },
  {
    id: 8,
    name: "Kerala Houseboat Honeymoon",
    destination: "Kerala Backwaters",
    duration: "6 Days",
    groupSize: "2 People",
    rating: 4.95,
    reviews: 203,
    image: "/kerala-honeymoon-houseboat.jpg",
    description: "Intimate journey through serene backwaters and tropical gardens",
    highlights: ["Private Houseboat", "Ayurvedic Massage", "Sunset Cruises", "Spice Plantation Tour"],
    category: "Honeymoon Tours",
  },
  {
    id: 9,
    name: "Rajasthan Palace Honeymoon",
    destination: "Udaipur, Jaipur",
    duration: "7 Days",
    groupSize: "2 People",
    rating: 4.9,
    reviews: 178,
    image: "/rajasthan-palace-honeymoon.jpg",
    description: "Experience royal luxury in magnificent Rajasthani palaces",
    highlights: ["Palace Stays", "Lake Cruises", "Traditional Dance", "Royal Dining"],
    category: "Honeymoon Tours",
  },
  {
    id: 10,
    name: "Taj Mahal & Heritage Trail",
    destination: "Agra, Delhi, Mathura",
    duration: "5 Days",
    groupSize: "2-12 People",
    rating: 4.8,
    reviews: 267,
    image: "/taj-mahal-heritage.jpg",
    description: "Explore India's greatest architectural and cultural monuments",
    highlights: ["Taj Mahal", "Red Fort", "Museum Tours", "Historical Guides"],
    category: "Arts and Museum",
  },
  {
    id: 11,
    name: "Ancient India Museum Quest",
    destination: "New Delhi, Varanasi",
    duration: "6 Days",
    groupSize: "2-15 People",
    rating: 4.7,
    reviews: 134,
    image: "/museum-ancient-india.jpg",
    description: "Discover India's rich history through world-class museums and ancient sites",
    highlights: ["National Museum", "Ancient Ruins", "Art Galleries", "Archaeological Sites"],
    category: "Arts and Museum",
  },
  {
    id: 12,
    name: "Contemporary Art & Culture",
    destination: "Mumbai, Bangalore, Delhi",
    duration: "7 Days",
    groupSize: "2-10 People",
    rating: 4.6,
    reviews: 89,
    image: "/contemporary-art-culture.jpg",
    description: "Experience modern and contemporary art across India's cultural hubs",
    highlights: ["Art Galleries", "Cultural Centers", "Street Art Tours", "Artist Workshops"],
    category: "Arts and Museum",
  },
]

const categories = Array.from(new Set(toursData.map((tour) => tour.category)))

export default function ToursPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredTours = selectedCategory ? toursData.filter((tour) => tour.category === selectedCategory) : toursData

  const groupedTours = categories.map((category) => ({
    category,
    tours: toursData.filter((tour) => tour.category === category),
  }))

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-balance mb-4">Our Tour Packages</h1>
          <p className="text-lg text-gray-200">
            Explore curated travel experiences across India. From ancient temples to pristine beaches.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-muted-foreground mb-6">Filter by Category:</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 sm:px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                  : "bg-card text-foreground border-2 border-primary/20 hover:border-primary/50 hover:shadow-md"
              }`}
            >
              All Tours
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                    : "bg-card text-foreground border-2 border-primary/20 hover:border-primary/50 hover:shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {selectedCategory ? (
          <>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">{selectedCategory}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredTours.map((tour) => (
                <div
                  key={tour.id}
                  className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <img src={tour.image || "/placeholder.svg"} alt={tour.name} className="w-full h-64 object-cover" />
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{tour.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">{tour.description}</p>

                    <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} className="text-primary flex-shrink-0" />
                        <span className="line-clamp-1">{tour.destination}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-primary flex-shrink-0" />
                        {tour.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-primary flex-shrink-0" />
                        {tour.groupSize}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < Math.floor(tour.rating) ? "fill-primary text-primary" : "text-muted"}
                          />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-foreground">{tour.rating}</span>
                      <span className="text-xs text-muted-foreground">({tour.reviews} reviews)</span>
                    </div>

                    <div className="flex justify-center sm:justify-end pt-4 border-t border-border">
                      <button className="w-full sm:w-auto bg-primary text-primary-foreground px-4 sm:px-6 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {groupedTours.map((group) => (
              <div key={group.category} className="mb-16 sm:mb-20">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">{group.category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
                  {group.tours.map((tour) => (
                    <div
                      key={tour.id}
                      className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <img
                        src={tour.image || "/placeholder.svg"}
                        alt={tour.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{tour.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-4">{tour.description}</p>

                        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin size={16} className="text-primary flex-shrink-0" />
                            <span className="line-clamp-1">{tour.destination}</span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4 text-xs sm:text-sm">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-primary flex-shrink-0" />
                            {tour.duration}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-primary flex-shrink-0" />
                            {tour.groupSize}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < Math.floor(tour.rating) ? "fill-primary text-primary" : "text-muted"}
                              />
                            ))}
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-foreground">{tour.rating}</span>
                          <span className="text-xs text-muted-foreground">({tour.reviews} reviews)</span>
                        </div>

                        <div className="flex justify-center sm:justify-end pt-4 border-t border-border">
                          <button className="w-full sm:w-auto bg-primary text-primary-foreground px-4 sm:px-6 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
                            Enquire Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </section>

      <Footer />
    </main>
  )
}
