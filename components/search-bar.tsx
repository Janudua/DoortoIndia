"use client"

import { Search } from "lucide-react"
import { useState } from "react"

export default function SearchBar() {
  const [destination, setDestination] = useState("Rajasthan")
  const [duration, setDuration] = useState("3-4 days")
  const [guests, setGuests] = useState("2")

  const destinations = ["Rajasthan", "Kerala", "Himalayas", "Goa", "Varanasi", "Agra", "Mumbai", "Bangalore"]
  const durations = ["2-3 days", "3-4 days", "5-7 days", "1-2 weeks", "2-3 weeks"]

  return (
    <div className="relative -mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Destination */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-muted-foreground mb-2">Destination</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="flex items-center gap-2 bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {destinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-muted-foreground mb-2">Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="flex items-center gap-2 bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {durations.map((dur) => (
                <option key={dur} value={dur}>
                  {dur}
                </option>
              ))}
            </select>
          </div>

          {/* Guests */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-muted-foreground mb-2">Guests</label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min="1"
              max="20"
              className="bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Search Button */}
          <div className="flex flex-col justify-end">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2 w-full">
              <Search size={20} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 flex justify-between items-center border-t border-border pt-6">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-white" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              <strong className="text-foreground">5,000+</strong> travelers booked tours this month
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
