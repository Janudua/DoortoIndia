"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import {
  Tour,
  Destination,
  HeroTour,
  Testimonial,
  FooterData,
  ToursService,
  DestinationsService,
  HeroToursService,
  TestimonialsService,
  FooterService,
  initializeDefaultData,
} from '@/lib/data-service'

interface DataContextType {
  tours: Tour[]
  destinations: Destination[]
  heroTours: HeroTour[]
  testimonials: Testimonial[]
  footer: FooterData | null
  refreshData: () => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [tours, setTours] = useState<Tour[]>([])
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [heroTours, setHeroTours] = useState<HeroTour[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [footer, setFooter] = useState<FooterData | null>(null)

  const loadData = () => {
    setTours(ToursService.getAll())
    setDestinations(DestinationsService.getAll())
    setHeroTours(HeroToursService.getAll())
    setTestimonials(TestimonialsService.getAll())
    setFooter(FooterService.get())
  }

  useEffect(() => {
    // Initialize default data structure
    initializeDefaultData()
    
    // Load initial data
    loadData()

    // Listen for storage changes (from admin or other tabs)
    const handleStorageChange = () => {
      loadData()
    }

    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const refreshData = () => {
    loadData()
  }

  return (
    <DataContext.Provider
      value={{
        tours,
        destinations,
        heroTours,
        testimonials,
        footer,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
