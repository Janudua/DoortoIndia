"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Star, MapPin, Clock, Users } from "lucide-react"
import { useData } from "@/contexts/data-context"

export default function ToursPage() {
  const { tours } = useData()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(tours.map((tour) => tour.category)))

  const filteredTours = selectedCategory ? tours.filter((tour) => tour.category === selectedCategory) : tours

  const groupedTours = categories.map((category) => ({
    category,
    tours: tours.filter((tour) => tour.category === category),
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
        {tours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No tours available. Please add tours in the admin panel.</p>
          </div>
        ) : selectedCategory ? (
          <>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">{selectedCategory}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredTours.map((tour) => (
                <div
                  key={tour.id}
                  className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <img src={tour.image || "/placeholder.svg"} alt={tour.title} className="w-full h-64 object-cover" />
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{tour.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">{tour.description}</p>

                    <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} className="text-primary flex-shrink-0" />
                        <span className="line-clamp-1">{tour.category}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-primary flex-shrink-0" />
                        {tour.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-primary flex-shrink-0" />
                        ₹{tour.price.toLocaleString()}
                      </div>
                    </div>

                    {tour.videoUrl && (
                      <div className="mb-4">
                        <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">📹 Video Available</span>
                      </div>
                    )}

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
                        alt={tour.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{tour.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-4">{tour.description}</p>

                        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin size={16} className="text-primary flex-shrink-0" />
                            <span className="line-clamp-1">{tour.category}</span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4 text-xs sm:text-sm">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-primary flex-shrink-0" />
                            {tour.duration}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-primary flex-shrink-0" />
                            ₹{tour.price.toLocaleString()}
                          </div>
                        </div>

                        {tour.videoUrl && (
                          <div className="mb-4">
                            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">📹 Video Available</span>
                          </div>
                        )}

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
