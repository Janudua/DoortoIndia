"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/door-to-india-logo.png"
              alt="Door to India Logo"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground">Door to India</span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                India Beyond Maps, Step Through the Door
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="/tours" className="text-foreground hover:text-primary transition">
              Tours
            </Link>
            <Link href="/activities" className="text-foreground hover:text-primary transition">
              Activities
            </Link>
            <Link href="/destinations" className="text-foreground hover:text-primary transition">
              Destinations
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
          </nav>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition">
              Book Now
            </button>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-border pt-4">
            <Link href="/" className="block text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="/tours" className="block text-foreground hover:text-primary transition">
              Tours
            </Link>
            <Link href="/activities" className="block text-foreground hover:text-primary transition">
              Activities
            </Link>
            <Link href="/destinations" className="block text-foreground hover:text-primary transition">
              Destinations
            </Link>
            <Link href="/about" className="block text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="block text-foreground hover:text-primary transition">
              Contact
            </Link>
            <button className="w-full bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition">
              Book Now
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
