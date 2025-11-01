"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import { useState } from "react"
import CookiePolicyModal from "./cookie-policy-modal"

export default function Footer() {
  const [showCookiePolicy, setShowCookiePolicy] = useState(false)

  return (
    <>
      <footer className="bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_fbn6eefbn6eefbn6-esl1kzcoV9ttVHCmXg6yfEnaJ4l00y.png"
                  alt="Door to India Logo"
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
                <span className="font-bold text-lg">Door to India</span>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                India Beyond Maps — Step Through the Door to unforgettable experiences.
              </p>
              <div className="flex gap-3">
                <Facebook size={18} className="cursor-pointer hover:text-primary" />
                <Instagram size={18} className="cursor-pointer hover:text-primary" />
                <Twitter size={18} className="cursor-pointer hover:text-primary" />
                <Linkedin size={18} className="cursor-pointer hover:text-primary" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/" className="hover:text-primary transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/tours" className="hover:text-primary transition">
                    Tours
                  </Link>
                </li>
                <li>
                  <Link href="/destinations" className="hover:text-primary transition">
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary transition">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Popular Tours */}
            <div>
              <h4 className="font-bold mb-4">Popular Tours</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/tours" className="hover:text-primary transition">
                    Golden Triangle
                  </Link>
                </li>
                <li>
                  <Link href="/tours" className="hover:text-primary transition">
                    Kerala Backwaters
                  </Link>
                </li>
                <li>
                  <Link href="/tours" className="hover:text-primary transition">
                    Rajasthan Desert
                  </Link>
                </li>
                <li>
                  <Link href="/tours" className="hover:text-primary transition">
                    Himalayan Trek
                  </Link>
                </li>
                <li>
                  <Link href="/tours" className="hover:text-primary transition">
                    Goa Beaches
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-primary" />
                  +91 86073 05777
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-primary" />
                  info@doortoindia.in
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                  New Delhi, India
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <p className="text-center md:text-left">&copy; 2025 Door to India. All rights reserved.</p>
              <button
                onClick={() => setShowCookiePolicy(true)}
                className="hover:text-primary transition whitespace-nowrap px-3 py-1 rounded hover:bg-gray-800"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Policy Modal */}
      {showCookiePolicy && <CookiePolicyModal onClose={() => setShowCookiePolicy(false)} />}
    </>
  )
}
