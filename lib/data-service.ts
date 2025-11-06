/**
 * Data Service Layer
 * Manages data persistence using localStorage
 * Shared between admin panel and frontend
 */

// Types
export interface Tour {
  id: number
  title: string
  category: string
  duration: string
  price: number
  description: string
  image: string
  videoUrl: string
  featured: boolean
}

export interface Destination {
  id: number
  name: string
  state: string
  region: string
  description: string
  image: string
  videoUrl: string
  featured: boolean
}

export interface HeroTour {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  featured: boolean
  order: number
}

export interface Testimonial {
  id: number
  name: string
  location: string
  tour: string
  rating: number
  review: string
  image: string
  featured: boolean
  date: string
}

export interface FooterData {
  companyName: string
  tagline: string
  description: string
  email: string
  phone: string
  address: string
  socialMedia: {
    facebook: string
    instagram: string
    twitter: string
    youtube: string
  }
  quickLinks: Array<{ title: string; url: string }>
  policies: Array<{ title: string; url: string }>
  copyright: string
}

// Storage Keys
const STORAGE_KEYS = {
  TOURS: 'doortoindia_tours',
  DESTINATIONS: 'doortoindia_destinations',
  HERO_TOURS: 'doortoindia_hero_tours',
  TESTIMONIALS: 'doortoindia_testimonials',
  FOOTER: 'doortoindia_footer',
}

// Helper to safely access localStorage
const isClient = typeof window !== 'undefined'

// Tours Service
export const ToursService = {
  getAll: (): Tour[] => {
    if (!isClient) return []
    const data = localStorage.getItem(STORAGE_KEYS.TOURS)
    return data ? JSON.parse(data) : []
  },

  save: (tours: Tour[]): void => {
    if (!isClient) return
    localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify(tours))
    // Trigger storage event for cross-tab sync
    window.dispatchEvent(new Event('storage'))
  },

  getFeatured: (): Tour[] => {
    return ToursService.getAll().filter(tour => tour.featured)
  },

  getById: (id: number): Tour | undefined => {
    return ToursService.getAll().find(tour => tour.id === id)
  },

  getByCategory: (category: string): Tour[] => {
    return ToursService.getAll().filter(tour => tour.category === category)
  },
}

// Destinations Service
export const DestinationsService = {
  getAll: (): Destination[] => {
    if (!isClient) return []
    const data = localStorage.getItem(STORAGE_KEYS.DESTINATIONS)
    return data ? JSON.parse(data) : []
  },

  save: (destinations: Destination[]): void => {
    if (!isClient) return
    localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(destinations))
    window.dispatchEvent(new Event('storage'))
  },

  getFeatured: (): Destination[] => {
    return DestinationsService.getAll().filter(dest => dest.featured)
  },

  getById: (id: number): Destination | undefined => {
    return DestinationsService.getAll().find(dest => dest.id === id)
  },

  getByRegion: (region: string): Destination[] => {
    return DestinationsService.getAll().filter(dest => dest.region === region)
  },
}

// Hero Tours Service
export const HeroToursService = {
  getAll: (): HeroTour[] => {
    if (!isClient) return []
    const data = localStorage.getItem(STORAGE_KEYS.HERO_TOURS)
    return data ? JSON.parse(data) : []
  },

  save: (heroTours: HeroTour[]): void => {
    if (!isClient) return
    localStorage.setItem(STORAGE_KEYS.HERO_TOURS, JSON.stringify(heroTours))
    window.dispatchEvent(new Event('storage'))
  },

  getFeatured: (): HeroTour[] => {
    return HeroToursService.getAll()
      .filter(tour => tour.featured)
      .sort((a, b) => a.order - b.order)
  },
}

// Testimonials Service
export const TestimonialsService = {
  getAll: (): Testimonial[] => {
    if (!isClient) return []
    const data = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)
    return data ? JSON.parse(data) : []
  },

  save: (testimonials: Testimonial[]): void => {
    if (!isClient) return
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials))
    window.dispatchEvent(new Event('storage'))
  },

  getFeatured: (): Testimonial[] => {
    return TestimonialsService.getAll().filter(test => test.featured)
  },

  getById: (id: number): Testimonial | undefined => {
    return TestimonialsService.getAll().find(test => test.id === id)
  },
}

// Footer Service
export const FooterService = {
  get: (): FooterData | null => {
    if (!isClient) return null
    const data = localStorage.getItem(STORAGE_KEYS.FOOTER)
    return data ? JSON.parse(data) : null
  },

  save: (footer: FooterData): void => {
    if (!isClient) return
    localStorage.setItem(STORAGE_KEYS.FOOTER, JSON.stringify(footer))
    window.dispatchEvent(new Event('storage'))
  },
}

// Initialize default data if not exists
export const initializeDefaultData = () => {
  if (!isClient) return

  // Check if data already exists
  if (localStorage.getItem(STORAGE_KEYS.TOURS)) return

  // Initialize with default data (will be populated from admin on first save)
  localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify([]))
  localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify([]))
  localStorage.setItem(STORAGE_KEYS.HERO_TOURS, JSON.stringify([]))
  localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify([]))
  localStorage.setItem(STORAGE_KEYS.FOOTER, JSON.stringify(null))
}
